import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { signInWithGoogle } from '../../data/auth/googleSignIn';
import type { AuthTokens, GoogleProfile } from '../../data/auth/types';
import { APP_NAME, APP_TAGLINE } from '../../shared/constants';
import { defaultTheme } from '../../shared/theme';
import { ScreenContainer } from '../components/ScreenContainer';

type AuthState = 'idle' | 'loading' | 'success' | 'error';

type LoginScreenProps = {
  onAuthenticated: (tokens: AuthTokens, profile: GoogleProfile) => void;
};

const theme = defaultTheme;

export const LoginScreen = ({ onAuthenticated }: LoginScreenProps) => {
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const isLoading = authState === 'loading';
  const isDisabled = authState === 'loading' || authState === 'success';

  const handleGooglePress = async () => {
    if (isLoading) {
      return;
    }

    setAuthState('loading');
    setErrorMessage(null);
    setStatusMessage('Signing in with Google...');

    try {
      const result = await signInWithGoogle();

      if (result.status === 'cancelled') {
        setAuthState('idle');
        setStatusMessage('Sign-in cancelled.');
        return;
      }

      setAuthState('success');
      setStatusMessage('Signed in. Redirecting...');
      onAuthenticated(result.tokens, result.profile);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Google sign-in failed.';
      setAuthState('error');
      setStatusMessage(null);
      setErrorMessage(message);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.tagline}>{APP_TAGLINE}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          accessibilityState={{ disabled: isDisabled, busy: isLoading }}
          disabled={isDisabled}
          onPress={handleGooglePress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={({ pressed }) => [
            styles.button,
            pressed && !isDisabled && styles.buttonPressed,
            isDisabled && styles.buttonDisabled,
            isFocused && !isDisabled && styles.buttonFocused,
          ]}
        >
          <View style={styles.buttonContent}>
            {isLoading ? (
              <ActivityIndicator
                size={theme.icon.size.action}
                color={theme.button.primary.text}
                style={styles.activity}
              />
            ) : null}
            <Text
              style={[
                styles.buttonLabel,
                isDisabled && styles.buttonLabelDisabled,
              ]}
            >
              Continue with Google
            </Text>
          </View>
        </Pressable>
        {statusMessage ? (
          <Text
            style={[
              styles.statusText,
              authState === 'success' && styles.statusSuccess,
            ]}
          >
            {statusMessage}
          </Text>
        ) : null}
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  header: {
    marginBottom: theme.spacing.section.spacious,
  },
  actions: {},
  title: {
    color: theme.color.text.primary,
    fontFamily: theme.typography.styles.h1.fontFamily,
    fontSize: theme.typography.styles.h1.fontSize,
    lineHeight: theme.typography.styles.h1.lineHeight,
    fontWeight: theme.typography.styles.h1.fontWeight,
    letterSpacing: theme.typography.styles.h1.letterSpacing,
  },
  tagline: {
    marginTop: theme.spacing.scale.sm,
    color: theme.color.text.secondary,
    fontFamily: theme.typography.styles.bodySmall.fontFamily,
    fontSize: theme.typography.styles.bodySmall.fontSize,
    lineHeight: theme.typography.styles.bodySmall.lineHeight,
    fontWeight: theme.typography.styles.bodySmall.fontWeight,
    letterSpacing: theme.typography.styles.bodySmall.letterSpacing,
  },
  button: {
    minHeight: theme.button.minHeight,
    paddingHorizontal: theme.button.paddingHorizontal,
    paddingVertical: theme.button.paddingVertical,
    borderRadius: theme.button.radius,
    borderWidth: theme.border.width.thin,
    borderColor: theme.button.primary.border,
    backgroundColor: theme.button.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.scale.md,
  },
  buttonPressed: {
    backgroundColor: theme.button.primary.pressed.background,
  },
  buttonDisabled: {
    backgroundColor: theme.button.primary.disabled.background,
    borderColor: theme.button.primary.disabled.border,
  },
  buttonFocused: {
    borderColor: theme.button.focus.ringColor,
    borderWidth: theme.button.focus.ringWidth,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {
    color: theme.button.primary.text,
    fontFamily: theme.typography.styles.bodyStrong.fontFamily,
    fontSize: theme.typography.styles.bodyStrong.fontSize,
    lineHeight: theme.typography.styles.bodyStrong.lineHeight,
    fontWeight: theme.typography.styles.bodyStrong.fontWeight,
    letterSpacing: theme.typography.styles.bodyStrong.letterSpacing,
  },
  buttonLabelDisabled: {
    color: theme.button.primary.disabled.text,
  },
  activity: {
    marginRight: theme.spacing.scale.sm,
  },
  statusText: {
    marginTop: theme.spacing.scale.sm,
    color: theme.color.text.muted,
    fontFamily: theme.typography.styles.helper.fontFamily,
    fontSize: theme.typography.styles.helper.fontSize,
    lineHeight: theme.typography.styles.helper.lineHeight,
    fontWeight: theme.typography.styles.helper.fontWeight,
    letterSpacing: theme.typography.styles.helper.letterSpacing,
  },
  statusSuccess: {
    color: theme.color.status.success,
  },
  errorContainer: {
    marginTop: theme.spacing.scale.md,
    paddingHorizontal: theme.spacing.scale.md,
    paddingVertical: theme.spacing.scale.sm,
    borderRadius: theme.radius.md,
    borderWidth: theme.border.width.hairline,
    borderColor: theme.color.danger.border,
    backgroundColor: theme.color.danger.surface,
  },
  errorText: {
    color: theme.color.danger.text,
    fontFamily: theme.typography.styles.helper.fontFamily,
    fontSize: theme.typography.styles.helper.fontSize,
    lineHeight: theme.typography.styles.helper.lineHeight,
    fontWeight: theme.typography.styles.helper.fontWeight,
    letterSpacing: theme.typography.styles.helper.letterSpacing,
  },
});
