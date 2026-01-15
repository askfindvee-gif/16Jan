import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AuthProvider, RefreshTokenRecord } from '../domain/user';

export type AccessTokenPayload = {
  sub: string;
  provider: AuthProvider;
  type: 'access';
};

const parseDurationToMs = (value: string, fallbackMs: number): number => {
  const match = value.match(/^(\d+)([smhd])$/i);

  if (!match) {
    return fallbackMs;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  const unitToMs: Record<string, number> = {
    s: 1000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };

  return amount * (unitToMs[unit] ?? fallbackMs);
};

export const signAccessToken = (
  userId: string,
  provider: AuthProvider,
): string => {
  const payload: AccessTokenPayload = { sub: userId, provider, type: 'access' };

  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.accessTokenTtl,
    issuer: 'backend',
    audience: 'mobile',
  });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const payload = jwt.verify(token, env.jwtAccessSecret, {
    issuer: 'backend',
    audience: 'mobile',
  });

  return payload as AccessTokenPayload;
};

const hashRefreshToken = (token: string): string => {
  // Hash refresh tokens before storage to reduce breach impact.
  return crypto
    .createHmac('sha256', env.jwtRefreshSecret)
    .update(token)
    .digest('hex');
};

export const createRefreshToken = (userId: string): {
  token: string;
  record: RefreshTokenRecord;
} => {
  const now = new Date();
  const tokenId = crypto.randomUUID();
  const token = crypto.randomBytes(64).toString('base64url');
  const tokenHash = hashRefreshToken(token);
  const expiresAtMs = parseDurationToMs(env.refreshTokenTtl, 30 * 86_400_000);

  const record: RefreshTokenRecord = {
    id: tokenId,
    userId,
    tokenHash,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + expiresAtMs).toISOString(),
  };

  return { token, record };
};

export const getRefreshTokenHash = (token: string): string => {
  return hashRefreshToken(token);
};
