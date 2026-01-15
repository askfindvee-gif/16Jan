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
