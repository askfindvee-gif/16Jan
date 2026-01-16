import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { APP_NAME } from '../../shared/constants';
import { defaultTheme } from '../../shared/theme';

export const WelcomeScreen = () => {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Welcome to {APP_NAME}</Text>
      <Text style={styles.subtitle}>
        This is a clean foundation. Features come next.
      </Text>
    </ScreenContainer>
  );
};

const theme = defaultTheme;

const styles = StyleSheet.create({
  title: {
    color: theme.color.text.primary,
    fontFamily: theme.typography.styles.h3.fontFamily,
    fontSize: theme.typography.styles.h3.fontSize,
    lineHeight: theme.typography.styles.h3.lineHeight,
    fontWeight: theme.typography.styles.h3.fontWeight,
    letterSpacing: theme.typography.styles.h3.letterSpacing,
    marginBottom: theme.spacing.scale.sm,
  },
  subtitle: {
    color: theme.color.text.secondary,
    fontFamily: theme.typography.styles.bodySmall.fontFamily,
    fontSize: theme.typography.styles.bodySmall.fontSize,
    lineHeight: theme.typography.styles.bodySmall.lineHeight,
    fontWeight: theme.typography.styles.bodySmall.fontWeight,
    letterSpacing: theme.typography.styles.bodySmall.letterSpacing,
  },
});
