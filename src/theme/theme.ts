'use client';

// Next.js
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

import { createTheme, type PaletteMode } from '@mui/material/styles';

const inconsolata = localFont({
  src: '../assets/fonts/Audiowide/Inconsolata/Inconsolata-VariableFont_wdth,wght.ttf',
  variable: '--font-incon-mono',
  weight: '100 900'
});

const Numeric = inconsolata.style.fontFamily;

declare module '@mui/system' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    xxxl: true;
    xxxxl: true;
  }
}
export const getTheme = (mode: PaletteMode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,

      primary: {
        main: isDark ? '#90CAF9' : '#1976D2',
        light: isDark ? '#BBDEFB' : '#42A5F5',
        dark: isDark ? '#42A5F5' : '#1565C0',
        contrastText: isDark ? '#000000' : '#FFFFFF'
      },

      secondary: {
        main: isDark ? '#CE93D8' : '#9C27B0',
        light: isDark ? '#E1BEE7' : '#BA68C8',
        dark: isDark ? '#AB47BC' : '#7B1FA2',
        contrastText: '#FFFFFF'
      },

      background: {
        default: isDark ? '#121212' : '#FFFFFF',
        paper: isDark ? '#1E1E1E' : '#FFFFFF'
      },

      text: {
        primary: isDark ? '#FFFFFF' : '#1A1A1A',
        secondary: isDark ? '#B0B0B0' : '#666666',
        disabled: isDark ? '#666666' : '#999999'
      },

      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',

      error: {
        main: '#D32F2F'
      },

      warning: {
        main: '#ED6C02'
      },

      info: {
        main: '#0288D1'
      },

      success: {
        main: '#2E7D32'
      }
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1440,
        xxl: 1600,
        xxxl: 1920,
        xxxxl: 2560
      }
    },

    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
      ].join(','),

      fontSize: 14,

      h1: {
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        lineHeight: 1.2,
        fontWeight: 600,
        letterSpacing: '-0.015em'
      },

      h2: {
        fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
        lineHeight: 1.25,
        fontWeight: 600,
        letterSpacing: '-0.01em'
      },

      h3: {
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        lineHeight: 1.3,
        fontWeight: 600
      },

      h4: {
        fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
        lineHeight: 1.35,
        fontWeight: 500
      },

      h5: {
        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
        lineHeight: 1.4,
        fontWeight: 500
      },

      h6: {
        fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
        lineHeight: 1.45,
        fontWeight: 500
      },

      subtitle1: {
        fontSize: 'clamp(0.95rem, 1.2vw, 1rem)',
        lineHeight: 1.6,
        fontWeight: 400
      },

      subtitle2: {
        fontSize: 'clamp(0.8rem, 1vw, 0.875rem)',
        lineHeight: 1.55,
        fontWeight: 500
      },

      body1: {
        fontSize: 'clamp(0.9rem, 1vw, 1rem)',
        lineHeight: 1.7,
        fontWeight: 400
      },

      body2: {
        fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)',
        lineHeight: 1.65,
        fontWeight: 400
      },

      button: {
        fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)',
        lineHeight: 1.5,
        fontWeight: 500,
        textTransform: 'none',
        letterSpacing: 0
      },

      caption: {
        fontSize: 'clamp(0.7rem, 0.8vw, 0.75rem)',
        lineHeight: 1.55,
        fontWeight: 400
      },

      overline: {
        fontSize: 'clamp(0.65rem, 0.7vw, 0.7rem)',
        lineHeight: 1.5,
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      },

      // ─────────────────────────────
      // 10 Custom typography variants
      // ─────────────────────────────

      display: {
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        lineHeight: 1.05,
        fontWeight: 700,
        letterSpacing: '-0.03em'
      },

      title: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        lineHeight: 1.15,
        fontWeight: 600,
        letterSpacing: '-0.02em'
      },

      sectionTitle: {
        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
        lineHeight: 1.25,
        fontWeight: 600
      },

      lead: {
        fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
        lineHeight: 1.7,
        fontWeight: 400
      },

      large: {
        fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
        lineHeight: 1.65,
        fontWeight: 400
      },

      medium: {
        fontSize: 'clamp(0.9rem, 1vw, 1rem)',
        lineHeight: 1.6,
        fontWeight: 400
      },

      small: {
        fontSize: 'clamp(0.75rem, 0.85vw, 0.875rem)',
        lineHeight: 1.55,
        fontWeight: 400
      },

      label: {
        fontSize: 'clamp(0.7rem, 0.8vw, 0.8rem)',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0.02em'
      },

      overlineCustom: {
        fontSize: 'clamp(0.65rem, 0.7vw, 0.75rem)',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
      },

      code: {
        fontFamily: 'monospace',
        fontSize: 'clamp(0.75rem, 0.85vw, 0.875rem)',
        lineHeight: 1.6,
        fontWeight: 400
      }
    },

    shape: {
      borderRadius: 8
    },

    spacing: 8,

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: 'smooth'
          },

          body: {
            margin: 0,
            minHeight: '100vh'
          },

          '*': {
            boxSizing: 'border-box'
          }
        }
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true
        },

        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600
          }
        }
      },

      MuiTextField: {
        defaultProps: {
          variant: 'outlined'
        }
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12
          }
        }
      }
    }
  });
};
