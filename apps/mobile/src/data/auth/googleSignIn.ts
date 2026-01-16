import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { config } from '../../shared/config';
import { saveRefreshToken } from './tokenStorage';
import { AuthTokens } from './types';

// Configure Google Sign-In once at app startup.
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: config.googleWebClientId,
  });
};

// Sign in with Google and exchange the ID token for backend tokens.
export const signInWithGoogle = async (): Promise<AuthTokens> => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.idToken;

    if (!idToken) {
      throw new Error('Google did not return an ID token.');
    }

    const response = await fetch(`${config.apiBaseUrl}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message = body.message ?? 'Google login failed.';
      throw new Error(message);
    }

    const tokens = (await response.json()) as AuthTokens;

    // Store refresh token securely. Access token should live in memory.
    await saveRefreshToken(tokens.refreshToken);

    return tokens;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('Google sign-in was cancelled.');
    }

    if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Google sign-in is already in progress.');
    }

    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play Services is not available.');
    }

    throw error;
  }
};
