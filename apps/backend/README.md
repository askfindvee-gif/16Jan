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

## Auth Foundation (Google SSO Only)
The auth module supports Google SSO only:
- POST `/api/auth/google` -> exchange Google ID token for app tokens
- POST `/api/auth/refresh` -> rotate refresh tokens
- POST `/api/auth/logout` -> revoke refresh token
- GET `/api/auth/me` -> return current user

This uses an in-memory repository for now (no database yet).

## Token Lifecycle (Simple English)
1) The app signs in with Google and gets a Google ID token.
2) The app calls `/auth/google` to get an access token and refresh token.
3) The access token is short-lived and used on every API call.
4) When it expires, the app calls `/auth/refresh` with the refresh token.
5) The backend returns a new access token and a new refresh token.
6) On logout, `/auth/logout` revokes the refresh token so it can’t be used.

Token expiry is configured with:
- `ACCESS_TOKEN_TTL` (default `15m`)
- `REFRESH_TOKEN_TTL` (default `30d`)
- `GOOGLE_CLIENT_ID` (Web client ID from Google Cloud)

## Google SSO (Simple English)
Why backend verification is required:
- The phone app can be tricked. The backend is the only place we trust.
- Google signs the ID token. The backend checks the signature with Google.

Google token vs app JWT:
- Google ID token proves the user signed in with Google.
- Our app JWT is what we use to call our own API.
- We never store Google access tokens on our server.

Step-by-step Google login flow:
1) App signs in with Google and gets a Google ID token.
2) App sends the ID token to `/api/auth/google`.
3) Backend verifies the token with Google.
4) Backend extracts full name, email, Google user ID, and profile image (if present).
5) Backend finds or creates the user with status `PROFILE_INCOMPLETE`.
6) Backend returns our access + refresh tokens.

Common mistakes teams make:
- Trusting client-only verification (not safe).
- Accepting any email without checking Google’s signature.
- Sending Google access tokens to the backend instead of ID tokens.
- Putting sensitive data inside JWTs.
- Forgetting refresh token rotation.

## Edge Cases (Handled)
- New device or reinstall → user logs in again, new refresh token is issued.
- Google email change → backend updates the stored email if safe.
- Email already linked to another Google user → backend blocks login to avoid takeover.
