// Design tokens derived from the current login screen mock.
// Keep these values as the single source of truth for UI styling.

export const colors = {
  background: '#FFFFFF',
  textPrimary: '#111111',
  textSecondary: '#6B6B6B',
  textMuted: '#9A9A9A',
  textOnDark: '#FFFFFF',
  borderStrong: '#111111',
  borderSubtle: '#D9D9D9',
  buttonPrimary: '#111111',
};

export const typography = {
  displayPrimary: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700' as const,
  },
  displaySecondary: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600' as const,
  },
  headline: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  labelUpper: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
    letterSpacing: 2,
  },
  metaUpper: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500' as const,
    letterSpacing: 2.5,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

export const sizing = {
  logoBox: 48,
  buttonHeight: 56,
  iconBox: 40,
  inputUnderline: 1,
};

export const radii = {
  none: 0,
  sm: 4,
};
