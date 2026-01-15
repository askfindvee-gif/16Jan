import crypto from 'crypto';
import { env } from '../config/env';
import { AuthProvider, User } from '../domain/user';
import { UserRepository } from '../repositories/userRepository';
import {
  createRefreshToken,
  getRefreshTokenHash,
  signAccessToken,
} from '../utils/tokens';

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
    const { email, phoneNumber, authProvider } = input;

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

    if (email && repo.getUserByEmail(email)) {
      throw new AuthError('A user with this email already exists.', 409);
    }

    if (phoneNumber && repo.getUserByPhoneNumber(phoneNumber)) {
      throw new AuthError('A user with this phone number already exists.', 409);
    }

    return repo.createUser({
      id: crypto.randomUUID(),
      email,
      phoneNumber,
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

  // Issues tokens after a successful "login" (placeholder until real providers).
  const issueTokens = (input: CreateUserInput): TokenPair => {
    const user = getOrCreateUser(input);

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

  return {
    createUser,
    getOrCreateUser,
    issueTokens,
    rotateRefreshToken,
    revokeRefreshToken,
  };
};
