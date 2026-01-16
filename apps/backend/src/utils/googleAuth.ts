import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env';

export type GoogleProfile = {
  email: string;
  googleId: string;
  emailVerified: boolean;
  expiresAtMs: number;
};

const googleClient = new OAuth2Client(env.googleClientId);

// Verifies the Google ID token with Google servers.
export const verifyGoogleIdToken = async (
  idToken: string,
): Promise<GoogleProfile> => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.googleClientId,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email || !payload.sub || !payload.exp) {
    throw new Error('Google token payload is missing required fields.');
  }

  return {
    email: payload.email,
    googleId: payload.sub,
    emailVerified:
      payload.email_verified === true || payload.email_verified === 'true',
    expiresAtMs: payload.exp * 1000,
  };
};
