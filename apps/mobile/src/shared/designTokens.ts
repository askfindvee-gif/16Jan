// Derived from `/design-tokens.jsonc`.
// Do not edit manually; update the JSONC source instead.
export const designTokens = {
  meta: {
    name: 'Rapid Response Team',
    tokenSet: 'global',
    version: '1.0.0',
    lastUpdated: '2026-01-16',
    description: 'Production-grade design tokens for Android, iOS, and Web.',
  },
  modes: {
    default: 'dark',
    supported: ['dark', 'light'],
  },
  platforms: {
    supported: ['android', 'ios', 'web'],
  },
  color: {
    modes: {
      dark: {
        background: {
          primary: '#0B0B0C',
          secondary: '#111317',
          elevated: '#161A1F',
        },
        surface: {
          default: '#14171B',
          raised: '#1A1E24',
          inverse: '#FFFFFF',
        },
        overlay: {
          scrim: 'rgba(0, 0, 0, 0.6)',
          modal: 'rgba(12, 12, 13, 0.92)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C7CBD1',
          muted: '#9AA0A6',
          disabled: '#6B7076',
          inverse: '#0B0B0C',
        },
        icon: {
          primary: '#FFFFFF',
          secondary: '#C7CBD1',
          muted: '#9AA0A6',
          disabled: '#6B7076',
        },
        border: {
          subtle: '#22262C',
          default: '#2C3036',
          strong: '#3A3F47',
          focus: '#7AA2FF',
        },
        divider: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          default: 'rgba(255, 255, 255, 0.12)',
        },
        status: {
          success: '#1F9D61',
          successSurface: 'rgba(31, 157, 97, 0.16)',
          warning: '#D97706',
          warningSurface: 'rgba(217, 119, 6, 0.16)',
          neutral: '#6B7280',
          neutralSurface: 'rgba(107, 114, 128, 0.16)',
        },
        danger: {
          base: '#FF453A',
          surface: 'rgba(255, 69, 58, 0.18)',
          text: '#FFD5D2',
          border: '#FF6B63',
        },
        critical: {
          base: '#FF3B30',
          surface: 'rgba(255, 59, 48, 0.22)',
          text: '#FFE0DD',
          border: '#FF6B63',
        },
        sos: {
          base: '#FF3B30',
          pressed: '#D92C22',
          hold: '#B3201A',
          disabled: '#6A1E1A',
          glow: 'rgba(255, 59, 48, 0.6)',
          text: '#FFFFFF',
        },
      },
      light: {
        background: {
          primary: '#F7F7F8',
          secondary: '#FFFFFF',
          elevated: '#FFFFFF',
        },
        surface: {
          default: '#FFFFFF',
          raised: '#F2F4F7',
          inverse: '#0B0B0C',
        },
        overlay: {
          scrim: 'rgba(0, 0, 0, 0.45)',
          modal: 'rgba(255, 255, 255, 0.96)',
        },
        text: {
          primary: '#0B0B0C',
          secondary: '#4B5563',
          muted: '#6B7280',
          disabled: '#9CA3AF',
          inverse: '#FFFFFF',
        },
        icon: {
          primary: '#0B0B0C',
          secondary: '#4B5563',
          muted: '#6B7280',
          disabled: '#9CA3AF',
        },
        border: {
          subtle: '#E5E7EB',
          default: '#D1D5DB',
          strong: '#9CA3AF',
          focus: '#3B82F6',
        },
        divider: {
          subtle: 'rgba(0, 0, 0, 0.08)',
          default: 'rgba(0, 0, 0, 0.12)',
        },
        status: {
          success: '#168A56',
          successSurface: 'rgba(22, 138, 86, 0.12)',
          warning: '#B45309',
          warningSurface: 'rgba(180, 83, 9, 0.12)',
          neutral: '#6B7280',
          neutralSurface: 'rgba(107, 114, 128, 0.12)',
        },
        danger: {
          base: '#DC2626',
          surface: 'rgba(220, 38, 38, 0.14)',
          text: '#7F1D1D',
          border: '#EF4444',
        },
        critical: {
          base: '#DC2626',
          surface: 'rgba(220, 38, 38, 0.18)',
          text: '#7F1D1D',
          border: '#EF4444',
        },
        sos: {
          base: '#DC2626',
          pressed: '#B91C1C',
          hold: '#991B1B',
          disabled: '#7F1D1D',
          glow: 'rgba(220, 38, 38, 0.55)',
          text: '#FFFFFF',
        },
      },
    },
  },
  typography: {
    fontFamily: {
      system: {
        default:
          'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        ios: 'SF Pro Text',
        android: 'Roboto',
        web: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      },
      display: {
        default:
          'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        ios: 'SF Pro Display',
        android: 'Roboto',
        web: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      },
      mono: {
        default:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
        ios: 'SF Mono',
        android: 'Roboto Mono',
        web: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
      },
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 28,
      '4xl': 32,
      '5xl': 40,
      '6xl': 48,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 26,
      xl: 28,
      '2xl': 32,
      '3xl': 36,
      '4xl': 40,
      '5xl': 48,
      '6xl': 56,
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      wider: 1,
      widest: 2,
    },
    styles: {
      h1: {
        fontFamily: 'display',
        fontSize: 40,
        lineHeight: 48,
        fontWeight: '700',
        letterSpacing: -0.5,
      },
      h2: {
        fontFamily: 'display',
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '700',
        letterSpacing: -0.3,
      },
      h3: {
        fontFamily: 'system',
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
        letterSpacing: -0.2,
      },
      h4: {
        fontFamily: 'system',
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        letterSpacing: -0.1,
      },
      body: {
        fontFamily: 'system',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        letterSpacing: 0,
      },
      bodyStrong: {
        fontFamily: 'system',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        letterSpacing: 0,
      },
      bodySmall: {
        fontFamily: 'system',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        letterSpacing: 0,
      },
      caption: {
        fontFamily: 'system',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        letterSpacing: 0.2,
      },
      helper: {
        fontFamily: 'system',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        letterSpacing: 0.2,
      },
      overline: {
        fontFamily: 'system',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 2,
        textTransform: 'uppercase',
      },
    },
    scaling: {
      allowFontScaling: true,
      minFontSizeMultiplier: 1,
      maxFontSizeMultiplier: 1.35,
    },
  },
  spacing: {
    scale: {
      '0': 0,
      '2xs': 2,
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      '2xl': 24,
      '3xl': 32,
      '4xl': 40,
      '5xl': 48,
      '6xl': 64,
      '7xl': 80,
    },
    screen: {
      horizontal: 20,
      vertical: 24,
    },
    verticalRhythm: 24,
    section: {
      compact: 16,
      regular: 24,
      spacious: 32,
    },
    safeArea: {
      topMin: 8,
      bottomMin: 12,
    },
  },
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 999,
    button: 10,
    input: 8,
    card: 12,
    container: 16,
  },
  border: {
    width: {
      hairline: 1,
      thin: 1.5,
      regular: 2,
    },
  },
  elevation: {
    card: {
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.85)',
        shadowOffsetX: 0,
        shadowOffsetY: 6,
        shadowRadius: 12,
        shadowOpacity: 0.35,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.35)',
      },
    },
    floating: {
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        shadowRadius: 20,
        shadowOpacity: 0.4,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)',
      },
    },
    modal: {
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.95)',
        shadowOffsetX: 0,
        shadowOffsetY: 16,
        shadowRadius: 28,
        shadowOpacity: 0.45,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 16px 28px rgba(0, 0, 0, 0.45)',
      },
    },
    sosGlow: {
      ios: {
        shadowColor: 'rgba(255, 59, 48, 0.65)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowRadius: 24,
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 8,
        shadowColor: 'rgba(255, 59, 48, 0.65)',
      },
      web: {
        boxShadow: '0px 0px 24px rgba(255, 59, 48, 0.65)',
      },
    },
  },
  icon: {
    size: {
      nav: 24,
      action: 20,
      status: 16,
      large: 32,
      xl: 40,
    },
    strokeWidth: {
      default: 2,
      bold: 2.5,
    },
    strokeStyle: {
      lineCap: 'round',
      lineJoin: 'round',
    },
  },
  button: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 14,
    radius: 10,
    primary: {
      background: {
        dark: '#1C1F25',
        light: '#111827',
      },
      text: {
        dark: '#FFFFFF',
        light: '#FFFFFF',
      },
      border: {
        dark: '#2E3238',
        light: '#111827',
      },
      pressed: {
        background: {
          dark: '#242830',
          light: '#0F172A',
        },
        text: {
          dark: '#FFFFFF',
          light: '#FFFFFF',
        },
      },
      disabled: {
        background: {
          dark: '#1A1C1E',
          light: '#E5E7EB',
        },
        text: {
          dark: '#6B7076',
          light: '#9CA3AF',
        },
        border: {
          dark: '#1F2226',
          light: '#E5E7EB',
        },
      },
    },
    danger: {
      background: {
        dark: '#FF453A',
        light: '#DC2626',
      },
      text: {
        dark: '#FFFFFF',
        light: '#FFFFFF',
      },
      pressed: {
        background: {
          dark: '#D92C22',
          light: '#B91C1C',
        },
        text: {
          dark: '#FFFFFF',
          light: '#FFFFFF',
        },
      },
      disabled: {
        background: {
          dark: '#5A1E1A',
          light: '#F3B1B1',
        },
        text: {
          dark: '#B8B9BB',
          light: '#7F1D1D',
        },
      },
    },
    sos: {
      background: {
        dark: '#FF3B30',
        light: '#DC2626',
      },
      text: {
        dark: '#FFFFFF',
        light: '#FFFFFF',
      },
      glow: {
        dark: 'rgba(255, 59, 48, 0.6)',
        light: 'rgba(220, 38, 38, 0.55)',
      },
      pressed: {
        background: {
          dark: '#D92C22',
          light: '#B91C1C',
        },
        text: {
          dark: '#FFFFFF',
          light: '#FFFFFF',
        },
      },
      pressAndHold: {
        background: {
          dark: '#B3201A',
          light: '#991B1B',
        },
        text: {
          dark: '#FFFFFF',
          light: '#FFFFFF',
        },
        glow: {
          dark: 'rgba(255, 59, 48, 0.75)',
          light: 'rgba(220, 38, 38, 0.7)',
        },
      },
      disabled: {
        background: {
          dark: '#6A1E1A',
          light: '#7F1D1D',
        },
        text: {
          dark: '#B8B9BB',
          light: '#F1D5D5',
        },
      },
    },
    focus: {
      ringColor: {
        dark: '#7AA2FF',
        light: '#3B82F6',
      },
      ringWidth: 2,
      ringOffset: 2,
    },
  },
  input: {
    height: 52,
    paddingHorizontal: 16,
    paddingVertical: 12,
    radius: 8,
    borderWidth: 1,
    background: {
      dark: '#14161A',
      light: '#FFFFFF',
    },
    text: {
      dark: '#FFFFFF',
      light: '#0B0B0C',
    },
    placeholder: {
      dark: '#8A9097',
      light: '#9CA3AF',
    },
    border: {
      dark: '#2C3036',
      light: '#D1D5DB',
    },
    focus: {
      border: {
        dark: '#7AA2FF',
        light: '#3B82F6',
      },
    },
    error: {
      border: {
        dark: '#FF453A',
        light: '#DC2626',
      },
      text: {
        dark: '#FFD5D2',
        light: '#7F1D1D',
      },
    },
    disabled: {
      background: {
        dark: '#111315',
        light: '#F3F4F6',
      },
      text: {
        dark: '#6B7076',
        light: '#9CA3AF',
      },
      border: {
        dark: '#1F2226',
        light: '#E5E7EB',
      },
    },
  },
  navigation: {
    bottom: {
      height: 64,
      background: {
        dark: '#0F1114',
        light: '#FFFFFF',
      },
      activeIcon: {
        dark: '#FFFFFF',
        light: '#0B0B0C',
      },
      inactiveIcon: {
        dark: '#9AA0A6',
        light: '#6B7280',
      },
      labelText: {
        dark: '#C7CBD1',
        light: '#4B5563',
      },
      divider: {
        dark: 'rgba(255, 255, 255, 0.08)',
        light: 'rgba(0, 0, 0, 0.08)',
      },
    },
  },
  motion: {
    duration: {
      instant: 0,
      fast: 120,
      medium: 200,
      slow: 320,
      xslow: 480,
    },
    easing: {
      standard: 'easeInOut',
      enter: 'easeOut',
      exit: 'easeIn',
      linear: 'linear',
    },
    pulse: {
      duration: 1200,
      easing: 'easeInOut',
      scaleMin: 1,
      scaleMax: 1.06,
      opacityMin: 0.6,
      opacityMax: 1,
    },
    pressAndHold: {
      minimumHoldMs: 900,
      progressTickMs: 50,
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
export type ThemeMode = (typeof designTokens)['modes']['supported'][number];
