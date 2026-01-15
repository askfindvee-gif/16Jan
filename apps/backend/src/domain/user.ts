export type AuthProvider = 'google' | 'sms';

export type User = {
  id: string;
  email?: string;
  phoneNumber?: string;
  authProvider: AuthProvider;
  createdAt: string;
  updatedAt: string;
};

export type RefreshTokenRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  revokedAt?: string;
  replacedByTokenId?: string;
};
