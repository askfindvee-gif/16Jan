type Env = {
  port: number;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  accessTokenTtl: string;
  refreshTokenTtl: string;
  googleClientId: string;
  geocodingBaseUrl: string;
  geocodingUserAgent: string;
  geocodingTimeoutMs: number;
};

const parsePort = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value ?? fallback);

  // Keep the server usable even if PORT is missing or invalid.
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

const readEnv = (key: string, fallback: string): string => {
  const value = process.env[key];

  // Fallbacks keep local setup simple. Replace in production.
  return value && value.length > 0 ? value : fallback;
};

const readNumber = (key: string, fallback: number): number => {
  const raw = process.env[key];
  const parsed = Number(raw ?? fallback);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const env: Env = {
  port: parsePort(process.env.PORT, 4000),
  jwtAccessSecret: readEnv('JWT_ACCESS_SECRET', 'dev-access-secret-change-me'),
  jwtRefreshSecret: readEnv('JWT_REFRESH_SECRET', 'dev-refresh-secret-change-me'),
  accessTokenTtl: readEnv('ACCESS_TOKEN_TTL', '15m'),
  refreshTokenTtl: readEnv('REFRESH_TOKEN_TTL', '30d'),
  googleClientId: readEnv('GOOGLE_CLIENT_ID', ''),
  geocodingBaseUrl: readEnv(
    'GEOCODING_BASE_URL',
    'https://nominatim.openstreetmap.org/reverse',
  ),
  geocodingUserAgent: readEnv(
    'GEOCODING_USER_AGENT',
    'RapidResponseTeam/1.0',
  ),
  geocodingTimeoutMs: readNumber('GEOCODING_TIMEOUT_MS', 8000),
};
