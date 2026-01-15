import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { createUserContext } from '../middlewares/attachUser';
import { createInMemoryUserRepository } from '../repositories/inMemoryUserRepository';
import { AuthError, createAuthService } from '../services/authService';

const repo = createInMemoryUserRepository();
const authService = createAuthService(repo);
const userContext = createUserContext(repo);

export const authRoutes = Router();

// Google SSO: exchange Google ID token for app tokens.
authRoutes.post('/google', async (req, res) => {
  try {
    if (!req.body.idToken) {
      return res.status(400).json({ message: 'Google ID token is required.' });
    }

    const tokens = await authService.loginWithGoogleIdToken(req.body.idToken);
    return res.status(200).json(tokens);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Unexpected error.' });
  }
});

// SMS placeholder: issue tokens after SMS verification (to be wired later).
authRoutes.post('/token', (req, res) => {
  try {
    const tokens = authService.issueTokens({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      authProvider: req.body.authProvider,
    });

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
    if (!req.body.refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required.' });
    }

    const tokens = authService.rotateRefreshToken(req.body.refreshToken);
    return res.status(200).json(tokens);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Unexpected error.' });
  }
});

// Invalidate a refresh token (logout).
authRoutes.post('/logout', (req, res) => {
  try {
    if (!req.body.refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required.' });
    }

    authService.revokeRefreshToken(req.body.refreshToken);
    return res.status(200).json({ message: 'Logged out.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected error.' });
  }
});

// Example protected route to show middleware usage.
authRoutes.get('/me', authenticate, userContext, (req, res) => {
  return res.status(200).json({ user: req.user });
});
