# Monorepo Foundation (React Native + Node.js)

This repository is a clean, beginner-friendly starting point for a mobile app
(React Native for Android + iOS) and a Node.js backend. No product features are
implemented yet — only the foundation and folder layout.

## Folder Structure

```
/apps
  /mobile                -> React Native app (Android + iOS)
  /backend               -> Node.js API server
```

### `apps/mobile`
React Native application with a simple, readable clean architecture layout:

```
/apps/mobile
  /android               -> Native Android project
  /ios                   -> Native iOS project
  /src
    /app                 -> App entry wiring
    /presentation        -> Screens and UI components
    /domain              -> Business types and models
    /data                -> API clients, storage, data adapters
    /shared              -> Reusable helpers and constants
```

### `apps/backend`
Node.js API server with a clean architecture layout:

```
/apps/backend
  /src
    /config              -> Env and configuration
    /routes              -> Route registration
    /controllers         -> HTTP controllers
    /services            -> Business logic
    /repositories        -> Data access
    /domain              -> Core domain models
    /middlewares         -> Express middleware
    /utils               -> Shared helpers
```

## Run Locally

### Prerequisites
- Node.js 20+ (React Native requires a recent Node version)
- For iOS: Xcode + CocoaPods
- For Android: Android Studio + Android SDK

### Install Dependencies
```
cd apps/mobile
npm install

cd ../backend
npm install
```

### Run the Mobile App (React Native)
In one terminal:
```
cd apps/mobile
npm start
```

In another terminal:
```
cd apps/mobile
npm run ios       # for iOS
npm run android   # for Android
```

For iOS, run this once after installing dependencies:
```
cd apps/mobile/ios
pod install
```

### Run the Backend (Node.js)
```
cd apps/backend
cp .env.example .env
npm run dev
```

## Notes
- Everything is written in TypeScript.
- The code is intentionally minimal and ready for feature development.
- The architecture is clean, but simplified for beginners.

## Authentication (Google SSO Only)
### Why Google SSO is the only auth
- One trusted identity provider keeps onboarding fast and secure.
- Eliminates password storage, OTP delivery, and role selection complexity.
- Minimizes support burden for a non-technical team.
- No phone login, OTP, or email/password are supported by design.

### Full login flow (step-by-step)
1) User taps “Continue with Google” in the mobile app.
2) Google returns a verified ID token to the client.
3) The client sends the ID token to `POST /api/auth/google`.
4) The backend verifies the token with Google (server-side).
5) The backend extracts the user profile and finds/creates the user.
6) The backend issues a short-lived access token and a long-lived refresh token.
7) The app stores the refresh token securely and keeps the access token in memory.

### Data that comes from Google
- Full name
- Email address
- Google user ID
- Profile image URL (if available)

### Why profile completion is deferred
- The critical path is emergency access, not full onboarding.
- We collect only what’s required for secure sign-in, then guide profile steps later.
- New users are created with `PROFILE_INCOMPLETE` to enable staged onboarding.

### How this supports PWA + iOS + Android later
- Google ID tokens work across web and mobile with the same backend endpoint.
- The API flow is platform-agnostic: any client can exchange an ID token for JWTs.
- Shared design tokens and auth logic reduce platform-specific divergence.
