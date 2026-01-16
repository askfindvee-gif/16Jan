import React from 'react';
import { StyleSheet, View } from 'react-native';

type ScreenContainerProps = {
  children: React.ReactNode;
};

export const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
