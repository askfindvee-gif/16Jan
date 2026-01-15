import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';

// Injects the full user object once a request is authenticated.
export const createUserContext = (repo: UserRepository) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
      return res.status(401).json({ message: 'Missing authentication context.' });
    }

    const user = repo.getUserById(req.auth.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'User is inactive.' });
    }

    req.user = user;
    return next();
  };
};
