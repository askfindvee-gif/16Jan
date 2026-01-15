import crypto from 'crypto';
import { env } from '../config/env';
import { AuthProvider, User } from '../domain/user';
import { UserRepository } from '../repositories/userRepository';
import {
  createRefreshToken,
  getRefreshTokenHash,
  signAccessToken,
} from '../utils/tokens';
import { GoogleProfile, verifyGoogleIdToken } from '../utils/googleAuth';

export class AuthError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

type CreateUserInput = {
  email?: string;
  phoneNumber?: string;
  googleId?: string;
  authProvider: AuthProvider;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  accessTokenExpiresIn: string;
};

export const createAuthService = (repo: UserRepository) => {
  // Creates a new user record with minimal validation.
  const createUser = (input: CreateUserInput): User => {
    const { email, phoneNumber, authProvider, googleId } = input;

    if (authProvider !== 'google' && authProvider !== 'sms') {
      throw new AuthError('Auth provider must be google or sms.', 422);
    }

    if (!email && !phoneNumber) {
      throw new AuthError('Email or phone number is required.', 422);
    }

    if (authProvider === 'google' && !email) {
      throw new AuthError('Google login requires an email.', 422);
    }

    if (authProvider === 'sms' && !phoneNumber) {
      throw new AuthError('SMS login requires a phone number.', 422);
    }

    if (authProvider === 'sms' && googleId) {
      throw new AuthError('SMS login cannot include a Google user id.', 422);
    }

    if (authProvider === 'google' && !googleId) {
      throw new AuthError('Google login requires a Google user id.', 422);
    }

    if (email && repo.getUserByEmail(email)) {
      throw new AuthError('A user with this email already exists.', 409);
    }

    if (phoneNumber && repo.getUserByPhoneNumber(phoneNumber)) {
      throw new AuthError('A user with this phone number already exists.', 409);
    }

    if (googleId && repo.getUserByGoogleId(googleId)) {
      throw new AuthError('A user with this Google account already exists.', 409);
    }

    return repo.createUser({
      id: crypto.randomUUID(),
      email,
      phoneNumber,
      googleId,
      authProvider,
      lastLoginAt: null,
      isActive: true,
    });
  };

  // Finds an existing user or creates a new one.
  const getOrCreateUser = (input: CreateUserInput): User => {
    const { email, phoneNumber, authProvider } = input;

    if (authProvider === 'google' && email) {
      const existing = repo.getUserByEmail(email);
      if (existing) {
        return existing;
      }
    }

    if (authProvider === 'sms' && phoneNumber) {
      const existing = repo.getUserByPhoneNumber(phoneNumber);
      if (existing) {
        return existing;
      }
    }

    return createUser(input);
  };

  const issueTokensForUser = (user: User): TokenPair => {
    if (!user.isActive) {
      throw new AuthError('User is inactive.', 403);
    }

    const accessToken = signAccessToken(user.id, user.authProvider);
    const { token: refreshToken, record } = createRefreshToken(user.id);
    const now = new Date().toISOString();

    // Store refresh token server-side and update last login.
    repo.saveRefreshToken(record);
    repo.updateUser(user.id, { lastLoginAt: now });

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      accessTokenExpiresIn: env.accessTokenTtl,
    };
  };

  // Issues tokens after a successful "login" (placeholder until real SMS flow).
  const issueTokens = (input: CreateUserInput): TokenPair => {
    if (input.authProvider === 'google') {
      throw new AuthError('Use /auth/google for Google login.', 422);
    }

    const user = getOrCreateUser(input);
    return issueTokensForUser(user);
  };

  // Rotates refresh tokens to prevent replay attacks.
  const rotateRefreshToken = (refreshToken: string): TokenPair => {
    const tokenHash = getRefreshTokenHash(refreshToken);
    const existing = repo.getRefreshTokenByHash(tokenHash);

    if (!existing) {
      throw new AuthError('Refresh token is invalid.', 401);
    }

    if (existing.revokedAt) {
      throw new AuthError('Refresh token has been revoked.', 401);
    }

    if (new Date(existing.expiresAt).getTime() <= Date.now()) {
      throw new AuthError('Refresh token has expired.', 401);
    }

    const user = repo.getUserById(existing.userId);

    if (!user) {
      throw new AuthError('User not found.', 404);
    }

    if (!user.isActive) {
      throw new AuthError('User is inactive.', 403);
    }

    const accessToken = signAccessToken(user.id, user.authProvider);
    const { token: newRefreshToken, record } = createRefreshToken(user.id);
    const now = new Date().toISOString();

    repo.saveRefreshToken(record);
    repo.replaceRefreshToken(existing.id, record.id, now);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      tokenType: 'Bearer',
      accessTokenExpiresIn: env.accessTokenTtl,
    };
  };

  // Revokes a refresh token (logout).
  const revokeRefreshToken = (refreshToken: string) => {
    const tokenHash = getRefreshTokenHash(refreshToken);
    const existing = repo.getRefreshTokenByHash(tokenHash);

    if (!existing || existing.revokedAt) {
      return;
    }

    repo.revokeRefreshToken(existing.id, new Date().toISOString());
  };

  const usedGoogleTokens = new Map<string, number>();

  // Exchanges a Google ID token for app tokens.
  const loginWithGoogleIdToken = async (idToken: string): Promise<TokenPair> => {
    if (!env.googleClientId) {
      throw new AuthError('Google client id is not configured.', 500);
    }

    let profile: GoogleProfile;

    try {
      profile = await verifyGoogleIdToken(idToken);
    } catch (error) {
      // Treat verification errors as invalid, expired, or suspended tokens.
      throw new AuthError(
        'Google token is invalid, expired, or the account is suspended.',
        401,
      );
    }

    if (!profile.emailVerified) {
      throw new AuthError('Google email is not verified.', 403);
    }

    // Basic replay protection for Google ID tokens.
    // For production, move this to a shared store (Redis) across servers.
    const tokenHash = crypto
      .createHash('sha256')
      .update(idToken)
      .digest('hex');
    const nowMs = Date.now();
    for (const [hash, expiresAt] of usedGoogleTokens.entries()) {
      if (expiresAt <= nowMs) {
        usedGoogleTokens.delete(hash);
      }
    }

    if (usedGoogleTokens.has(tokenHash)) {
      throw new AuthError('Google token has already been used.', 409);
    }

    usedGoogleTokens.set(tokenHash, profile.expiresAtMs);

    const userByGoogleId = repo.getUserByGoogleId(profile.googleId);

    if (userByGoogleId) {
      if (userByGoogleId.email !== profile.email) {
        if (repo.getUserByEmail(profile.email)) {
          throw new AuthError('Email already belongs to another account.', 409);
        }

        repo.updateUser(userByGoogleId.id, { email: profile.email });
      }

      return issueTokensForUser(userByGoogleId);
    }

    const userByEmail = repo.getUserByEmail(profile.email);

    if (userByEmail) {
      if (userByEmail.authProvider !== 'google') {
        throw new AuthError(
          'This email is already linked to SMS login.',
          409,
        );
      }

      repo.updateUser(userByEmail.id, { googleId: profile.googleId });
      return issueTokensForUser(userByEmail);
    }

    const user = createUser({
      email: profile.email,
      googleId: profile.googleId,
      authProvider: 'google',
    });

    return issueTokensForUser(user);
  };

  return {
    createUser,
    getOrCreateUser,
    issueTokens,
    rotateRefreshToken,
    revokeRefreshToken,
    loginWithGoogleIdToken,
  };
};
