import { AuthProvider, User } from '../domain/user';

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        provider: AuthProvider;
      };
      user?: User;
    }
  }
}

export {};
