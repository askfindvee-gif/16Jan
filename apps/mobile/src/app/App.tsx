import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { configureGoogleSignIn } from '../data/auth/googleSignIn';
import type { AuthTokens } from '../data/auth/types';
import { AuthenticatedScreen } from '../presentation/screens/AuthenticatedScreen';
import { LoginScreen } from '../presentation/screens/LoginScreen';
import { defaultTheme } from '../shared/theme';

const App = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleAuthenticated = (tokens: AuthTokens) => {
    setAccessToken(tokens.accessToken);
  };

  return (
    <SafeAreaView style={styles.container}>
      {accessToken ? (
        <AuthenticatedScreen />
      ) : (
        <LoginScreen onAuthenticated={handleAuthenticated} />
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
