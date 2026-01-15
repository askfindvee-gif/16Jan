# Mobile App (React Native)

This is the mobile application for the monorepo.
For the full project overview and setup steps, see the root `README.md`.

## Quick Start
```
npm install
npm start
```

Then in a second terminal:
```
npm run ios
npm run android
```

## Google Sign-In Setup (Production)
1) Create OAuth credentials in Google Cloud (Web client ID).
2) Set `googleWebClientId` in `src/shared/config.ts`.
3) Add `google-services.json` to `android/app`.
4) Add `GoogleService-Info.plist` to `ios`.
5) Re-run `pod install` in `ios` after adding the plist.

Tokens are stored using Keychain/Keystore for production safety.
