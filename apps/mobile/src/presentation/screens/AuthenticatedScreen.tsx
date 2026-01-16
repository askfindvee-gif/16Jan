import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from '../../shared/theme';
import { ScreenContainer } from '../components/ScreenContainer';

const theme = defaultTheme;

export const AuthenticatedScreen = () => {
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Signed in</Text>
        <Text style={styles.body}>
          Your session is active. Next step: profile completion.
        </Text>
      </View>
      <Text style={styles.helper}>Access token stored in memory.</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  header: {
    marginBottom: theme.spacing.section.regular,
  },
  title: {
    color: theme.color.text.primary,
    fontFamily: theme.typography.styles.h2.fontFamily,
    fontSize: theme.typography.styles.h2.fontSize,
    lineHeight: theme.typography.styles.h2.lineHeight,
    fontWeight: theme.typography.styles.h2.fontWeight,
    letterSpacing: theme.typography.styles.h2.letterSpacing,
  },
  body: {
    marginTop: theme.spacing.scale.sm,
    color: theme.color.text.secondary,
    fontFamily: theme.typography.styles.body.fontFamily,
    fontSize: theme.typography.styles.body.fontSize,
    lineHeight: theme.typography.styles.body.lineHeight,
    fontWeight: theme.typography.styles.body.fontWeight,
    letterSpacing: theme.typography.styles.body.letterSpacing,
  },
  helper: {
    color: theme.color.text.muted,
    fontFamily: theme.typography.styles.helper.fontFamily,
    fontSize: theme.typography.styles.helper.fontSize,
    lineHeight: theme.typography.styles.helper.lineHeight,
    fontWeight: theme.typography.styles.helper.fontWeight,
    letterSpacing: theme.typography.styles.helper.letterSpacing,
  },
});
