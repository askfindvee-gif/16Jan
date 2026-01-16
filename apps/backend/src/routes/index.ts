import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { locationRoutes } from './locationRoutes';
import { profileRoutes } from './profileRoutes';

export const routes = Router();

// Auth routes: foundation for token issuance and validation.
routes.use('/auth', authRoutes);
routes.use('/location', locationRoutes);
routes.use('/profile', profileRoutes);
