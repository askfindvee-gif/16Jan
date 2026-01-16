import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { configureGoogleSignIn } from '../data/auth/googleSignIn';
import type { AuthTokens, GoogleProfile } from '../data/auth/types';
import { AuthenticatedScreen } from '../presentation/screens/AuthenticatedScreen';
import { LoginScreen } from '../presentation/screens/LoginScreen';
import { ProfileSetupScreen } from '../presentation/screens/ProfileSetupScreen';
import { defaultTheme } from '../shared/theme';

const App = () => {
  const [session, setSession] = useState<{
    accessToken: string;
    profile: GoogleProfile;
  } | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleAuthenticated = (tokens: AuthTokens, profile: GoogleProfile) => {
    setSession({ accessToken: tokens.accessToken, profile });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!session ? (
        <LoginScreen onAuthenticated={handleAuthenticated} />
      ) : profileCompleted ? (
        <AuthenticatedScreen />
      ) : (
        <ProfileSetupScreen
          accessToken={session.accessToken}
          profile={session.profile}
          onComplete={() => setProfileCompleted(true)}
        />
      )}
    </SafeAreaView>
  );
};

const theme = defaultTheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background.primary,
  },
});

export default App;
