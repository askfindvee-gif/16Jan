import { AuthProvider } from '../domain/user';

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        provider: AuthProvider;
      };
    }
  }
}

export {};
