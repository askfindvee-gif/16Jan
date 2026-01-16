import { Platform } from 'react-native';
import { designTokens, ThemeMode } from './designTokens';

const defaultMode = designTokens.modes.default as ThemeMode;

const resolveByMode = <T extends Record<ThemeMode, string>>(
  value: T,
  mode: ThemeMode,
) => value[mode];

export const createTheme = (mode: ThemeMode = defaultMode) => {
  const color = designTokens.color.modes[mode];
  const platformKey =
    Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'web';
  const fontFamilies = designTokens.typography.fontFamily;
  const resolveFontFamily = (
    family: keyof typeof designTokens.typography.fontFamily,
  ) => fontFamilies[family][platformKey] ?? fontFamilies[family].default;
  const resolveStyleFontFamily = (
    style: (typeof designTokens.typography.styles)[keyof typeof designTokens.typography.styles],
  ) => ({
    ...style,
    fontFamily: resolveFontFamily(
      style.fontFamily as keyof typeof designTokens.typography.fontFamily,
    ),
  });

  return {
    mode,
    color,
    typography: {
      ...designTokens.typography,
      fontFamily: {
        system: resolveFontFamily('system'),
        display: resolveFontFamily('display'),
        mono: resolveFontFamily('mono'),
      },
      styles: {
        h1: resolveStyleFontFamily(designTokens.typography.styles.h1),
        h2: resolveStyleFontFamily(designTokens.typography.styles.h2),
        h3: resolveStyleFontFamily(designTokens.typography.styles.h3),
        h4: resolveStyleFontFamily(designTokens.typography.styles.h4),
        body: resolveStyleFontFamily(designTokens.typography.styles.body),
        bodyStrong: resolveStyleFontFamily(designTokens.typography.styles.bodyStrong),
        bodySmall: resolveStyleFontFamily(designTokens.typography.styles.bodySmall),
        caption: resolveStyleFontFamily(designTokens.typography.styles.caption),
        helper: resolveStyleFontFamily(designTokens.typography.styles.helper),
        overline: resolveStyleFontFamily(designTokens.typography.styles.overline),
      },
    },
    spacing: designTokens.spacing,
    radius: designTokens.radius,
    border: designTokens.border,
    elevation: designTokens.elevation,
    icon: designTokens.icon,
    button: {
      minHeight: designTokens.button.minHeight,
      paddingHorizontal: designTokens.button.paddingHorizontal,
      paddingVertical: designTokens.button.paddingVertical,
      radius: designTokens.button.radius,
      primary: {
        background: resolveByMode(designTokens.button.primary.background, mode),
        text: resolveByMode(designTokens.button.primary.text, mode),
        border: resolveByMode(designTokens.button.primary.border, mode),
        pressed: {
          background: resolveByMode(
            designTokens.button.primary.pressed.background,
            mode,
          ),
          text: resolveByMode(designTokens.button.primary.pressed.text, mode),
        },
        disabled: {
          background: resolveByMode(
            designTokens.button.primary.disabled.background,
            mode,
          ),
          text: resolveByMode(designTokens.button.primary.disabled.text, mode),
          border: resolveByMode(
            designTokens.button.primary.disabled.border,
            mode,
          ),
        },
      },
      danger: {
        background: resolveByMode(designTokens.button.danger.background, mode),
        text: resolveByMode(designTokens.button.danger.text, mode),
        pressed: {
          background: resolveByMode(
            designTokens.button.danger.pressed.background,
            mode,
          ),
          text: resolveByMode(designTokens.button.danger.pressed.text, mode),
        },
        disabled: {
          background: resolveByMode(
            designTokens.button.danger.disabled.background,
            mode,
          ),
          text: resolveByMode(designTokens.button.danger.disabled.text, mode),
        },
      },
      sos: {
        background: resolveByMode(designTokens.button.sos.background, mode),
        text: resolveByMode(designTokens.button.sos.text, mode),
        glow: resolveByMode(designTokens.button.sos.glow, mode),
        pressed: {
          background: resolveByMode(
            designTokens.button.sos.pressed.background,
            mode,
          ),
          text: resolveByMode(designTokens.button.sos.pressed.text, mode),
        },
        pressAndHold: {
          background: resolveByMode(
            designTokens.button.sos.pressAndHold.background,
            mode,
          ),
          text: resolveByMode(
            designTokens.button.sos.pressAndHold.text,
            mode,
          ),
          glow: resolveByMode(
            designTokens.button.sos.pressAndHold.glow,
            mode,
          ),
        },
        disabled: {
          background: resolveByMode(
            designTokens.button.sos.disabled.background,
            mode,
          ),
          text: resolveByMode(designTokens.button.sos.disabled.text, mode),
        },
      },
      focus: {
        ringColor: resolveByMode(designTokens.button.focus.ringColor, mode),
        ringWidth: designTokens.button.focus.ringWidth,
        ringOffset: designTokens.button.focus.ringOffset,
      },
    },
    input: {
      height: designTokens.input.height,
      paddingHorizontal: designTokens.input.paddingHorizontal,
      paddingVertical: designTokens.input.paddingVertical,
      radius: designTokens.input.radius,
      borderWidth: designTokens.input.borderWidth,
      background: resolveByMode(designTokens.input.background, mode),
      text: resolveByMode(designTokens.input.text, mode),
      placeholder: resolveByMode(designTokens.input.placeholder, mode),
      border: resolveByMode(designTokens.input.border, mode),
      focus: {
        border: resolveByMode(designTokens.input.focus.border, mode),
      },
      error: {
        border: resolveByMode(designTokens.input.error.border, mode),
        text: resolveByMode(designTokens.input.error.text, mode),
      },
      disabled: {
        background: resolveByMode(designTokens.input.disabled.background, mode),
        text: resolveByMode(designTokens.input.disabled.text, mode),
        border: resolveByMode(designTokens.input.disabled.border, mode),
      },
    },
    navigation: {
      bottom: {
        height: designTokens.navigation.bottom.height,
        background: resolveByMode(
          designTokens.navigation.bottom.background,
          mode,
        ),
        activeIcon: resolveByMode(
          designTokens.navigation.bottom.activeIcon,
          mode,
        ),
        inactiveIcon: resolveByMode(
          designTokens.navigation.bottom.inactiveIcon,
          mode,
        ),
        labelText: resolveByMode(
          designTokens.navigation.bottom.labelText,
          mode,
        ),
        divider: resolveByMode(designTokens.navigation.bottom.divider, mode),
      },
    },
    motion: designTokens.motion,
  } as const;
};

export type Theme = ReturnType<typeof createTheme>;

export const defaultTheme = createTheme();
