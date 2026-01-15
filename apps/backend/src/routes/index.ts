import { Router } from 'express';
import { authRoutes } from './authRoutes';

export const routes = Router();

// Auth routes: foundation for token issuance and validation.
routes.use('/auth', authRoutes);
