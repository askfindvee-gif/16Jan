# Backend (Node.js + TypeScript)

This folder contains the API server for the project.
The server is intentionally minimal and feature-free for now.

## Auth Foundation
The auth module is a starter setup for token-based login:
- POST `/api/auth/users` -> create a user record
- POST `/api/auth/token` -> issue access + refresh tokens
- POST `/api/auth/refresh` -> rotate refresh tokens
- GET `/api/auth/me` -> example protected route

This uses an in-memory repository for now (no database yet).
