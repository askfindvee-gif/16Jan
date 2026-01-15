import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = 'auth.refreshToken';

// Store the refresh token securely in Keychain/Keystore.
export const saveRefreshToken = async (refreshToken: string) => {
  await Keychain.setGenericPassword('refresh', refreshToken, {
    service: SERVICE_NAME,
  });
};

export const getRefreshToken = async (): Promise<string | null> => {
  const stored = await Keychain.getGenericPassword({ service: SERVICE_NAME });

  if (!stored) {
    return null;
  }

  return stored.password;
};

// Remove the refresh token on logout.
export const clearRefreshToken = async () => {
  await Keychain.resetGenericPassword({ service: SERVICE_NAME });
};
