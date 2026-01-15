import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WelcomeScreen } from '../presentation/screens/WelcomeScreen';
import { configureGoogleSignIn } from '../data/auth/googleSignIn';

const App = () => {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* App entry point: swap this for navigation later. */}
      <WelcomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
