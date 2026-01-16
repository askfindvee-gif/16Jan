import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { defaultTheme } from '../../shared/theme';

type ScreenContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const ScreenContainer = ({ children, style }: ScreenContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const theme = defaultTheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen.horizontal,
    paddingVertical: theme.spacing.screen.vertical,
    backgroundColor: theme.color.background.primary,
  },
});
