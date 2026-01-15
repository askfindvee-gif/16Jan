// Design tokens derived from the current login screen mock.
// Keep these values as the single source of truth for UI styling.

export const colors = {
  background: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#4A4A4A',
  textMuted: '#757575',
  textOnDark: '#FFFFFF',
  borderStrong: '#000000',
  buttonPrimary: '#000000',
};

export const typography = {
  titlePrimary: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700' as const,
    letterSpacing: -1.5,
  },
  titleSecondary: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700' as const,
  },
  bodyPrimary: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500' as const,
  },
  labelUpper: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700' as const,
    letterSpacing: 2,
  },
  inputText: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400' as const,
  },
  footerUpper: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500' as const,
    letterSpacing: 2,
  },
};

export const spacing = {
  layoutHorizontal: 32,
  topPadding: 60,
  logoToTitle: 48,
  titleToTagline: 32,
  taglineToInput: 80,
  footerBottom: 40,
  buttonSidePadding: 16,
};

export const sizing = {
  logoBox: 64,
  buttonHeight: 72,
  iconBox: 40,
  inputUnderline: 1.5,
};

export const radii = {
  none: 0,
};
