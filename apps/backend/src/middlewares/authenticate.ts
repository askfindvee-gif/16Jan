import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/tokens';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // This middleware only verifies the JWT and extracts the user id.
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'Missing Authorization header.' });
  }

  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid Authorization header.' });
  }

  try {
    const payload = verifyAccessToken(token);
    req.auth = { userId: payload.sub, provider: payload.provider };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Access token is invalid.' });
  }
};
