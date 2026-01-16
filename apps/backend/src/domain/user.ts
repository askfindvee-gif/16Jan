export type AuthProvider = 'google';

export type UserStatus = 'PROFILE_INCOMPLETE' | 'ACTIVE';

export type User = {
  id: string;
  email?: string;
  googleId?: string;
  fullName?: string;
  profileImageUrl?: string;
  authProvider: AuthProvider;
  status: UserStatus;
  createdAt: string;
  lastLoginAt: string | null;
  isActive: boolean;
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
