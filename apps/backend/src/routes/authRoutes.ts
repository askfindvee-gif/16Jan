import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { createInMemoryUserRepository } from '../repositories/inMemoryUserRepository';
import { AuthError, createAuthService } from '../services/authService';

const repo = createInMemoryUserRepository();
const authService = createAuthService(repo);

export const authRoutes = Router();

// Create a user record (no external provider validation yet).
authRoutes.post('/users', (req, res) => {
  try {
    const user = authService.createUser({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      authProvider: req.body.authProvider,
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Unexpected error.' });
  }
});

// Issue tokens for an existing user (placeholder for real login).
authRoutes.post('/token', (req, res) => {
  try {
    const tokens = authService.issueTokensForUser(req.body.userId);
    return res.status(200).json(tokens);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Unexpected error.' });
  }
});

// Rotate refresh token and issue a new pair.
authRoutes.post('/refresh', (req, res) => {
  try {
    const tokens = authService.rotateRefreshToken(req.body.refreshToken);
    return res.status(200).json(tokens);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Unexpected error.' });
  }
});

// Example protected route to show middleware usage.
authRoutes.get('/me', authenticate, (req, res) => {
  return res.status(200).json({ auth: req.auth });
});
