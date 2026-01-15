# Backend (Node.js + TypeScript)

This folder contains the API server for the project.
The server is intentionally minimal and feature-free for now.

## Folder Guide
- `src/config` -> environment variables and app config
- `src/routes` -> Express route definitions
- `src/controllers` -> request handlers (reserved for later features)
- `src/services` -> business logic (auth lives here)
- `src/repositories` -> data access (in-memory for now)
- `src/domain` -> core types/models
- `src/middlewares` -> auth and request middleware
- `src/utils` -> helper utilities (token helpers live here)

## Auth Foundation
The auth module is a starter setup for token-based login:
- POST `/api/auth/token` -> issue access + refresh tokens (creates user if needed)
- POST `/api/auth/refresh` -> rotate refresh tokens
- POST `/api/auth/logout` -> revoke refresh token
- GET `/api/auth/me` -> return current user

This uses an in-memory repository for now (no database yet).

## Token Lifecycle (Simple English)
1) The app calls `/auth/token` to get an access token and refresh token.
2) The access token is short-lived and used on every API call.
3) When it expires, the app calls `/auth/refresh` with the refresh token.
4) The backend returns a new access token and a new refresh token.
5) On logout, `/auth/logout` revokes the refresh token so it can’t be used.

Token expiry is configured with:
- `ACCESS_TOKEN_TTL` (default `15m`)
- `REFRESH_TOKEN_TTL` (default `30d`)
