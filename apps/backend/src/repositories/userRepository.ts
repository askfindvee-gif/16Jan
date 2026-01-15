import { RefreshTokenRecord, User } from '../domain/user';

export type CreateUserInput = Omit<User, 'createdAt' | 'updatedAt'>;
export type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt'>>;

export type UserRepository = {
  createUser: (input: CreateUserInput) => User;
  updateUser: (id: string, updates: UpdateUserInput) => User | undefined;
  getUserById: (id: string) => User | undefined;
  getUserByEmail: (email: string) => User | undefined;
  getUserByPhoneNumber: (phoneNumber: string) => User | undefined;
  getUserByGoogleId: (googleId: string) => User | undefined;
  saveRefreshToken: (record: RefreshTokenRecord) => void;
  getRefreshTokenByHash: (tokenHash: string) => RefreshTokenRecord | undefined;
  revokeRefreshToken: (tokenId: string, revokedAt: string) => void;
  replaceRefreshToken: (
    tokenId: string,
    replacedByTokenId: string,
    revokedAt: string,
  ) => void;
};
