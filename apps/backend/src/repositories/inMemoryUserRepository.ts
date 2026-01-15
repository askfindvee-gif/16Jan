import { RefreshTokenRecord, User } from '../domain/user';
import { CreateUserInput, UserRepository } from './userRepository';

// Simple in-memory store for early development and local testing.
// Swap this with a real database repository later.
export const createInMemoryUserRepository = (): UserRepository => {
  const users = new Map<string, User>();
  const refreshTokensById = new Map<string, RefreshTokenRecord>();
  const refreshTokensByHash = new Map<string, RefreshTokenRecord>();

  const createUser = (input: CreateUserInput): User => {
    const now = new Date().toISOString();
    const user: User = { ...input, createdAt: now, updatedAt: now };

    users.set(user.id, user);

    return user;
  };

  const getUserById = (id: string): User | undefined => users.get(id);

  const getUserByEmail = (email: string): User | undefined => {
    return Array.from(users.values()).find(user => user.email === email);
  };

  const getUserByPhoneNumber = (phoneNumber: string): User | undefined => {
    return Array.from(users.values()).find(
      user => user.phoneNumber === phoneNumber,
    );
  };

  const saveRefreshToken = (record: RefreshTokenRecord) => {
    refreshTokensById.set(record.id, record);
    refreshTokensByHash.set(record.tokenHash, record);
  };

  const getRefreshTokenByHash = (tokenHash: string) => {
    return refreshTokensByHash.get(tokenHash);
  };

  const revokeRefreshToken = (tokenId: string, revokedAt: string) => {
    const record = refreshTokensById.get(tokenId);

    if (!record) {
      return;
    }

    const updated: RefreshTokenRecord = { ...record, revokedAt };
    refreshTokensById.set(tokenId, updated);
    refreshTokensByHash.set(record.tokenHash, updated);
  };

  const replaceRefreshToken = (
    tokenId: string,
    replacedByTokenId: string,
    revokedAt: string,
  ) => {
    const record = refreshTokensById.get(tokenId);

    if (!record) {
      return;
    }

    const updated: RefreshTokenRecord = {
      ...record,
      revokedAt,
      replacedByTokenId,
    };

    refreshTokensById.set(tokenId, updated);
    refreshTokensByHash.set(record.tokenHash, updated);
  };

  return {
    createUser,
    getUserById,
    getUserByEmail,
    getUserByPhoneNumber,
    saveRefreshToken,
    getRefreshTokenByHash,
    revokeRefreshToken,
    replaceRefreshToken,
  };
};
