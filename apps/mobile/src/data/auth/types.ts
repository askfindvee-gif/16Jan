export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  accessTokenExpiresIn: string;
};

export type GoogleProfile = {
  fullName: string;
  email: string;
  googleId: string;
  profileImageUrl?: string;
};
