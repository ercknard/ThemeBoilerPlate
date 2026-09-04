// src/theme/theme.ts

import { createTheme, type PaletteMode } from '@mui/material/styles';

import type { CSSProperties } from 'react';

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

export type RadixScale = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;

  surface: string;
  indicator: string;
  track: string;
  contrast: string;
};

export type NeutralScale = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
};

/* ========================================================================== */
/* MUI TYPE AUGMENTATION                                                      */
/* ========================================================================== */

declare module '@mui/material/styles' {
  interface Theme {
    colorScale: RadixScale;
    backgroundScale: RadixScale;
    grayScale: RadixScale;
  }

  interface ThemeOptions {
    colorScale: RadixScale;
    backgroundScale: RadixScale;
    grayScale: RadixScale;
  }

  interface TypographyVariants {
    display: CSSProperties;
    title: CSSProperties;
    sectionTitle: CSSProperties;
    lead: CSSProperties;
    large: CSSProperties;
    medium: CSSProperties;
    small: CSSProperties;
    label: CSSProperties;
    overlineCustom: CSSProperties;
    code: CSSProperties;
  }

  interface TypographyVariantsOptions {
    display?: CSSProperties;
    title?: CSSProperties;
    sectionTitle?: CSSProperties;
    lead?: CSSProperties;
    large?: CSSProperties;
    medium?: CSSProperties;
    small?: CSSProperties;
    label?: CSSProperties;
    overlineCustom?: CSSProperties;
    code?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true;
    title: true;
    sectionTitle: true;
    lead: true;
    large: true;
    medium: true;
    small: true;
    label: true;
    overlineCustom: true;
    code: true;
  }
}

/* ========================================================================== */
/* BREAKPOINTS                                                                */
/* ========================================================================== */

const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1440,
  xxl: 1600,
  xxxl: 1920,
  xxxxl: 2560
};

/* ========================================================================== */
/* HEX                                                                        */
/* ========================================================================== */

function normalizeHex(hex: string): string {
  let value = hex.trim().replace(/^#/, '');

  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => `${char}${char}`)
      .join('');
  }

  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    return '#4967C9';
  }

  return `#${value.toUpperCase()}`;
}

/* ========================================================================== */
/* RGB                                                                        */
/* ========================================================================== */

function hexToRgb(hex: string) {
  const value = normalizeHex(hex).slice(1);

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

/* ========================================================================== */
/* SRGB                                                                       */
/* ========================================================================== */

function srgbToLinear(value: number): number {
  const v = value / 255;

  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb(value: number): number {
  const v = Math.max(0, Math.min(1, value));

  return v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

/* ========================================================================== */
/* RGB -> OKLAB                                                               */
/* ========================================================================== */

function rgbToOklab(hex: string) {
  const { r, g, b } = hexToRgb(hex);

  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);

  const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;

  const m = 0.2119034982 * R + 0.6806995453 * G + 0.1073969566 * B;

  const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;

  const lRoot = Math.cbrt(Math.max(0, l));
  const mRoot = Math.cbrt(Math.max(0, m));
  const sRoot = Math.cbrt(Math.max(0, s));

  const L = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot;

  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot;

  const bValue =
    0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot;

  return {
    L,
    a,
    b: bValue
  };
}

/* ========================================================================== */
/* OKLAB -> OKLCH                                                             */
/* ========================================================================== */

function oklabToOklch(L: number, a: number, b: number) {
  const C = Math.sqrt(a * a + b * b);

  let H = (Math.atan2(b, a) * 180) / Math.PI;

  if (H < 0) {
    H += 360;
  }

  return {
    L,
    C,
    H
  };
}

/* ========================================================================== */
/* HEX -> OKLCH                                                               */
/* ========================================================================== */

function hexToOklch(hex: string) {
  const lab = rgbToOklab(hex);

  return oklabToOklch(lab.L, lab.a, lab.b);
}

/* ========================================================================== */
/* OKLCH -> OKLAB                                                             */
/* ========================================================================== */

function oklchToOklab(L: number, C: number, H: number) {
  const radians = (H * Math.PI) / 180;

  return {
    L,
    a: C * Math.cos(radians),
    b: C * Math.sin(radians)
  };
}

/* ========================================================================== */
/* OKLAB -> RGB                                                               */
/* ========================================================================== */

function oklabToRgb(L: number, a: number, b: number) {
  const l = L + 0.3963377774 * a + 0.2158037573 * b;

  const m = L - 0.1055613458 * a - 0.0638541728 * b;

  const s = L - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l * l * l;
  const m3 = m * m * m;
  const s3 = s * s * s;

  const R = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;

  const G = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;

  const B = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  return {
    r: linearToSrgb(R),
    g: linearToSrgb(G),
    b: linearToSrgb(B)
  };
}

/* ========================================================================== */
/* OKLCH -> HEX                                                               */
/* ========================================================================== */

/**
 * Converts OKLCH to sRGB while reducing chroma when the requested color
 * falls outside the sRGB gamut.
 */
function oklchToHex(L: number, C: number, H: number): string {
  let chroma = C;

  for (let i = 0; i < 40; i++) {
    const lab = oklchToOklab(L, chroma, H);

    const rgb = oklabToRgb(lab.L, lab.a, lab.b);

    const rawR = rgb.r;
    const rawG = rgb.g;
    const rawB = rgb.b;

    const inGamut =
      rawR >= 0 &&
      rawR <= 1 &&
      rawG >= 0 &&
      rawG <= 1 &&
      rawB >= 0 &&
      rawB <= 1;

    if (inGamut) {
      const r = Math.round(rawR * 255);
      const g = Math.round(rawG * 255);
      const b = Math.round(rawB * 255);

      return (
        '#' +
        [r, g, b]
          .map((value) => value.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase()
      );
    }

    chroma *= 0.95;
  }

  const lab = oklchToOklab(L, 0, H);

  const rgb = oklabToRgb(lab.L, lab.a, lab.b);

  return (
    '#' +
    [rgb.r, rgb.g, rgb.b]
      .map((value) =>
        Math.round(value * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
      .toUpperCase()
  );
}

/* ========================================================================== */
/* RADIX CUSTOM PALETTE RELATIONSHIPS                                         */
/* ========================================================================== */

/*
 * These values define the RELATIONSHIP between the 12 steps.
 *
 * They are based on the visual structure of the Radix Custom Colors palette:
 *
 * 1  Background
 * 2  Background
 *
 * 3  Interactive
 * 4  Interactive
 * 5  Interactive
 *
 * 6  Border
 * 7  Border
 * 8  Border
 *
 * 9  Solid
 * 10 Solid
 *
 * 11 Accessible text
 * 12 Accessible text
 *
 * The important difference from your old code:
 *
 * We don't do:
 *
 *   mix(color, white, ...)
 *   mix(color, black, ...)
 *
 * Instead, every step gets its own perceptual Lightness and Chroma.
 */

/* -------------------------------------------------------------------------- */
/* DARK                                                                       */
/* -------------------------------------------------------------------------- */

const DARK_RELATIONSHIPS = [
  // 1
  {
    lightness: 0.178,
    chroma: 0.127
  },

  // 2
  {
    lightness: 0.207,
    chroma: 0.159
  },

  // 3
  {
    lightness: 0.272,
    chroma: 0.37
  },

  // 4
  {
    lightness: 0.317,
    chroma: 0.507
  },

  // 5
  {
    lightness: 0.361,
    chroma: 0.56
  },

  // 6
  {
    lightness: 0.402,
    chroma: 0.581
  },

  // 7
  {
    lightness: 0.451,
    chroma: 0.631
  },

  // 8
  {
    lightness: 0.504,
    chroma: 0.728
  },

  // 9
  {
    lightness: 0.543,
    chroma: 1
  },

  // 10
  {
    lightness: 0.497,
    chroma: 0.72
  },

  // 11
  {
    lightness: 0.777,
    chroma: 0.663
  },

  // 12
  {
    lightness: 0.913,
    chroma: 0.221
  }
];

/* -------------------------------------------------------------------------- */
/* LIGHT                                                                      */
/* -------------------------------------------------------------------------- */

const LIGHT_RELATIONSHIPS = [
  // 1
  {
    lightness: 0.985,
    chroma: 0.08
  },

  // 2
  {
    lightness: 0.965,
    chroma: 0.12
  },

  // 3
  {
    lightness: 0.925,
    chroma: 0.22
  },

  // 4
  {
    lightness: 0.875,
    chroma: 0.35
  },

  // 5
  {
    lightness: 0.815,
    chroma: 0.48
  },

  // 6
  {
    lightness: 0.745,
    chroma: 0.6
  },

  // 7
  {
    lightness: 0.665,
    chroma: 0.72
  },

  // 8
  {
    lightness: 0.575,
    chroma: 0.82
  },

  // 9
  {
    lightness: 0.543,
    chroma: 1
  },

  // 10
  {
    lightness: 0.5,
    chroma: 0.88
  },

  // 11
  {
    lightness: 0.42,
    chroma: 0.72
  },

  // 12
  {
    lightness: 0.28,
    chroma: 0.52
  }
];

/* ========================================================================== */
/* CREATE RADIX COLOR SCALE                                                   */
/* ========================================================================== */

export function createRadixScale(color: string, mode: PaletteMode): RadixScale {
  const baseColor = normalizeHex(color);

  const base = hexToOklch(baseColor);

  const relationships =
    mode === 'dark' ? DARK_RELATIONSHIPS : LIGHT_RELATIONSHIPS;

  const values = relationships.map((relationship, index) => {
    /*
     * STEP 9
     *
     * Never alter the user's supplied color.
     *
     * This is what makes:
     *
     *   getTheme('dark', '#4967C9')
     *
     * have #4967C9 as step 9.
     */
    if (index === 8) {
      return baseColor;
    }

    /*
     * Chroma is proportional to the supplied color.
     *
     * This keeps the relationships consistent when changing the base
     * color.
     */
    const targetChroma = base.C * relationship.chroma;

    return oklchToHex(relationship.lightness, targetChroma, base.H);
  });

  return {
    1: values[0],
    2: values[1],
    3: values[2],
    4: values[3],
    5: values[4],
    6: values[5],
    7: values[6],
    8: values[7],
    9: values[8],
    10: values[9],
    11: values[10],
    12: values[11],

    /*
     * Semantic aliases
     */
    surface: mode === 'dark' ? values[2] : values[1],

    indicator: values[8],

    track: mode === 'dark' ? values[5] : values[4],

    contrast: mode === 'dark' ? values[12] : values[1]
  };
}

/* ========================================================================== */
/* NEUTRAL SCALE                                                              */
/* ========================================================================== */

export const createNeutralScale = (
  mode: PaletteMode,
  color: string
): NeutralScale => {
  const base = hexToOklch(normalizeHex(color));

  const hue = base.H;

  if (mode === 'dark') {
    return {
      1: oklchToHex(0.178, Math.min(base.C * 0.08, 0.015), hue),
      2: oklchToHex(0.207, Math.min(base.C * 0.1, 0.018), hue),
      3: oklchToHex(0.272, Math.min(base.C * 0.11, 0.022), hue),
      4: oklchToHex(0.317, Math.min(base.C * 0.12, 0.026), hue),
      5: oklchToHex(0.361, Math.min(base.C * 0.13, 0.03), hue),
      6: oklchToHex(0.402, Math.min(base.C * 0.14, 0.034), hue),
      7: oklchToHex(0.451, Math.min(base.C * 0.15, 0.038), hue),
      8: oklchToHex(0.504, Math.min(base.C * 0.16, 0.042), hue),
      9: oklchToHex(0.59, Math.min(base.C * 0.17, 0.045), hue),
      10: oklchToHex(0.66, Math.min(base.C * 0.18, 0.048), hue),
      11: oklchToHex(0.76, Math.min(base.C * 0.19, 0.052), hue),
      12: oklchToHex(0.93, Math.min(base.C * 0.2, 0.055), hue)
    };
  }

  return {
    1: oklchToHex(0.985, Math.min(base.C * 0.08, 0.012), hue),
    2: oklchToHex(0.965, Math.min(base.C * 0.09, 0.014), hue),
    3: oklchToHex(0.925, Math.min(base.C * 0.1, 0.016), hue),
    4: oklchToHex(0.875, Math.min(base.C * 0.11, 0.018), hue),
    5: oklchToHex(0.815, Math.min(base.C * 0.12, 0.02), hue),
    6: oklchToHex(0.745, Math.min(base.C * 0.13, 0.022), hue),
    7: oklchToHex(0.665, Math.min(base.C * 0.14, 0.024), hue),
    8: oklchToHex(0.575, Math.min(base.C * 0.15, 0.026), hue),
    9: oklchToHex(0.5, Math.min(base.C * 0.16, 0.028), hue),
    10: oklchToHex(0.42, Math.min(base.C * 0.17, 0.03), hue),
    11: oklchToHex(0.34, Math.min(base.C * 0.18, 0.032), hue),
    12: oklchToHex(0.25, Math.min(base.C * 0.19, 0.034), hue)
  };
};

/* ========================================================================== */
/* SEMANTIC COLORS                                                            */
/* ========================================================================== */

export const semanticColors = {
  error: '#E5484D',
  warning: '#F59E0B',
  info: '#0090FF',
  success: '#30A46C'
};

export const createBackgroundScale = (
  mode: PaletteMode,
  color: string
): RadixScale => {
  const base = hexToOklch(normalizeHex(color));

  const hue = base.H;

  if (mode === 'dark') {
    return {
      1: oklchToHex(0.12, base.C * 0.08, hue),
      2: oklchToHex(0.16, base.C * 0.1, hue),
      3: oklchToHex(0.2, base.C * 0.12, hue),
      4: oklchToHex(0.24, base.C * 0.14, hue),
      5: oklchToHex(0.28, base.C * 0.16, hue),
      6: oklchToHex(0.33, base.C * 0.18, hue),
      7: oklchToHex(0.39, base.C * 0.2, hue),
      8: oklchToHex(0.46, base.C * 0.22, hue),
      9: oklchToHex(0.53, base.C * 0.24, hue),
      10: oklchToHex(0.6, base.C * 0.22, hue),
      11: oklchToHex(0.78, base.C * 0.18, hue),
      12: oklchToHex(0.93, base.C * 0.12, hue),

      surface: oklchToHex(0.2, base.C * 0.12, hue),
      indicator: oklchToHex(0.53, base.C * 0.24, hue),
      track: oklchToHex(0.33, base.C * 0.18, hue),
      contrast: oklchToHex(0.93, base.C * 0.12, hue)
    };
  }

  return {
    1: oklchToHex(0.99, base.C * 0.08, hue),
    2: oklchToHex(0.97, base.C * 0.1, hue),
    3: oklchToHex(0.94, base.C * 0.12, hue),
    4: oklchToHex(0.9, base.C * 0.14, hue),
    5: oklchToHex(0.85, base.C * 0.16, hue),
    6: oklchToHex(0.78, base.C * 0.18, hue),
    7: oklchToHex(0.7, base.C * 0.2, hue),
    8: oklchToHex(0.61, base.C * 0.22, hue),
    9: oklchToHex(0.52, base.C * 0.24, hue),
    10: oklchToHex(0.44, base.C * 0.22, hue),
    11: oklchToHex(0.34, base.C * 0.18, hue),
    12: oklchToHex(0.22, base.C * 0.12, hue),

    surface: oklchToHex(0.97, base.C * 0.1, hue),
    indicator: oklchToHex(0.52, base.C * 0.24, hue),
    track: oklchToHex(0.85, base.C * 0.16, hue),
    contrast: oklchToHex(0.22, base.C * 0.12, hue)
  };
};

export const createGrayScale = (
  mode: PaletteMode,
  color: string
): RadixScale => {
  const base = hexToOklch(normalizeHex(color));

  /*
   * Gray keeps only a tiny amount of the accent hue.
   *
   * This gives you the Radix "Gray" feeling while preventing
   * gray surfaces from looking completely disconnected from
   * the selected accent.
   */
  const hue = base.H;

  if (mode === 'dark') {
    return {
      1: oklchToHex(0.12, 0.005, hue),
      2: oklchToHex(0.16, 0.006, hue),
      3: oklchToHex(0.21, 0.007, hue),
      4: oklchToHex(0.25, 0.008, hue),
      5: oklchToHex(0.3, 0.009, hue),
      6: oklchToHex(0.35, 0.01, hue),
      7: oklchToHex(0.41, 0.011, hue),
      8: oklchToHex(0.48, 0.012, hue),
      9: oklchToHex(0.56, 0.013, hue),
      10: oklchToHex(0.63, 0.014, hue),
      11: oklchToHex(0.76, 0.015, hue),
      12: oklchToHex(0.93, 0.016, hue),

      surface: oklchToHex(0.21, 0.007, hue),
      indicator: oklchToHex(0.56, 0.013, hue),
      track: oklchToHex(0.35, 0.01, hue),
      contrast: oklchToHex(0.93, 0.016, hue)
    };
  }

  return {
    1: oklchToHex(0.99, 0.005, hue),
    2: oklchToHex(0.97, 0.006, hue),
    3: oklchToHex(0.94, 0.007, hue),
    4: oklchToHex(0.9, 0.008, hue),
    5: oklchToHex(0.85, 0.009, hue),
    6: oklchToHex(0.78, 0.01, hue),
    7: oklchToHex(0.7, 0.011, hue),
    8: oklchToHex(0.61, 0.012, hue),
    9: oklchToHex(0.52, 0.013, hue),
    10: oklchToHex(0.44, 0.014, hue),
    11: oklchToHex(0.34, 0.015, hue),
    12: oklchToHex(0.22, 0.016, hue),

    surface: oklchToHex(0.94, 0.007, hue),
    indicator: oklchToHex(0.52, 0.013, hue),
    track: oklchToHex(0.78, 0.01, hue),
    contrast: oklchToHex(0.22, 0.016, hue)
  };
};

/* ========================================================================== */
/* THEME                                                                      */
/* ========================================================================== */

/* ========================================================================== */
/* COLOR SETS                                                                 */
/* ========================================================================== */

export const THEME_SETS = {
  blue: {
    color: '#4967C9',
    gray: '#707070',
    background: '#0A0A0A'
  },

  purple: {
    color: '#8B5CF6',
    gray: '#707070',
    background: '#100B1A'
  },

  gold: {
    color: '#F2C94C',
    gray: '#707070',
    background: '#171205'
  },

  green: {
    color: '#30A46C',
    gray: '#707070',
    background: '#07140D'
  }
} as const;

export type ThemeSetName = keyof typeof THEME_SETS;

export const getThemeFromSet = (
  mode: PaletteMode,
  set: ThemeSetName = 'blue'
) => {
  const colors = THEME_SETS[set] ?? THEME_SETS.blue;

  const colorScale = createRadixScale(colors.color, mode);

  const backgroundScale = createBackgroundScale(mode, colors.background);

  const grayScale = createGrayScale(mode, colors.gray);

  const isDark = mode === 'dark';

  /* ------------------------------------------------------------------------ */
  /* Background                                                               */
  /* ------------------------------------------------------------------------ */

  const backgroundDefault = backgroundScale[1];

  const backgroundPaper = backgroundScale[2];

  /* ------------------------------------------------------------------------ */
  /* Create MUI theme                                                         */
  /* ------------------------------------------------------------------------ */

  return createTheme({
    breakpoints: {
      values: BREAKPOINTS
    },

    colorScale,
    backgroundScale,
    grayScale,

    palette: {
      mode,

      primary: {
        main: colorScale[9],

        light: colorScale[10],

        dark: colorScale[8],

        contrastText: colorScale.contrast
      },

      /*
       * Secondary intentionally uses the SAME custom scale.
       *
       * You said you don't want separate:
       *
       * primary
       * secondary
       * success
       * warning
       * error
       * info
       *
       * color systems.
       */
      secondary: {
        main: colorScale[9],

        light: colorScale[10],

        dark: colorScale[8],

        contrastText: colorScale.contrast
      },

      error: {
        main: semanticColors.error
      },

      warning: {
        main: semanticColors.warning
      },

      info: {
        main: semanticColors.info
      },

      success: {
        main: semanticColors.success
      },

      background: {
        default: backgroundDefault,

        paper: backgroundPaper
      },

      text: {
        primary: grayScale[12],
        secondary: grayScale[11],
        disabled: grayScale[9]
      },

      divider: grayScale[6]
    },

    /* ====================================================================== */
    /* TYPOGRAPHY                                                             */
    /* ====================================================================== */

    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
      ].join(','),

      fontSize: 14,

      /* ====================================================================== */
      /* HEADINGS                                                               */
      /* ====================================================================== */

      h1: {
        fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
        lineHeight: 1.15,
        fontWeight: 700,
        letterSpacing: '-0.025em'
      },

      h2: {
        fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: '-0.02em'
      },

      h3: {
        fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
        lineHeight: 1.25,
        fontWeight: 650,
        letterSpacing: '-0.015em'
      },

      h4: {
        fontSize: 'clamp(1.375rem, 2.5vw, 2rem)',
        lineHeight: 1.3,
        fontWeight: 600,
        letterSpacing: '-0.01em'
      },

      h5: {
        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
        lineHeight: 1.35,
        fontWeight: 600,
        letterSpacing: '-0.005em'
      },

      h6: {
        fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: 0
      },

      /* ====================================================================== */
      /* SUBTITLES                                                              */
      /* ====================================================================== */

      subtitle1: {
        fontSize: 'clamp(0.95rem, 1.2vw, 1rem)',
        lineHeight: 1.55,
        fontWeight: 500,
        letterSpacing: 0
      },

      subtitle2: {
        fontSize: 'clamp(0.825rem, 1vw, 0.875rem)',
        lineHeight: 1.5,
        fontWeight: 500,
        letterSpacing: '0.005em'
      },

      /* ====================================================================== */
      /* BODY                                                                   */
      /* ====================================================================== */

      body1: {
        fontSize: 'clamp(0.9rem, 1vw, 1rem)',
        lineHeight: 1.65,
        fontWeight: 400,
        letterSpacing: 0
      },

      body2: {
        fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)',
        lineHeight: 1.6,
        fontWeight: 400,
        letterSpacing: 0
      },

      /* ====================================================================== */
      /* BUTTON                                                                 */
      /* ====================================================================== */

      button: {
        fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)',
        lineHeight: 1.4,
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: 0
      },

      /* ====================================================================== */
      /* CAPTION                                                                */
      /* ====================================================================== */

      caption: {
        fontSize: 'clamp(0.7rem, 0.8vw, 0.75rem)',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '0.005em'
      },

      /* ====================================================================== */
      /* OVERLINE                                                               */
      /* ====================================================================== */

      overline: {
        fontSize: 'clamp(0.65rem, 0.7vw, 0.7rem)',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
      },

      /* ====================================================================== */
      /* CUSTOM TYPOGRAPHY                                                      */
      /* ====================================================================== */

      display: {
        fontSize: 'clamp(2.75rem, 6vw, 5rem)',
        lineHeight: 1.05,
        fontWeight: 700,
        letterSpacing: '-0.035em'
      },

      title: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        lineHeight: 1.12,
        fontWeight: 700,
        letterSpacing: '-0.025em'
      },

      sectionTitle: {
        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
        lineHeight: 1.25,
        fontWeight: 650,
        letterSpacing: '-0.015em'
      },

      lead: {
        fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
        lineHeight: 1.65,
        fontWeight: 400,
        letterSpacing: '-0.005em'
      },

      large: {
        fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
        lineHeight: 1.6,
        fontWeight: 400,
        letterSpacing: 0
      },

      medium: {
        fontSize: 'clamp(0.9rem, 1vw, 1rem)',
        lineHeight: 1.55,
        fontWeight: 400,
        letterSpacing: 0
      },

      small: {
        fontSize: 'clamp(0.75rem, 0.85vw, 0.875rem)',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '0.005em'
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
        fontWeight: 400,
        letterSpacing: 0
      }
    },

    /* ====================================================================== */
    /* SHAPE                                                                  */
    /* ====================================================================== */

    shape: {
      borderRadius: 8
    },

    /* ====================================================================== */
    /* COMPONENTS                                                             */
    /* ====================================================================== */

    components: {
      /* -------------------------------------------------------------------- */
      /* CSS BASELINE                                                         */
      /* -------------------------------------------------------------------- */

      MuiCssBaseline: {
        styleOverrides: {
          html: {
            backgroundColor: backgroundScale[1]
          },

          body: {
            margin: 0,
            backgroundColor: backgroundScale[1],
            color: grayScale[12]
          },

          '*': {
            boxSizing: 'border-box'
          },

          '::selection': {
            backgroundColor: colorScale[9],

            color: colorScale.contrast
          },

          '::-webkit-scrollbar': {
            width: 8,
            height: 8
          },

          '::-webkit-scrollbar-track': {
            backgroundColor: grayScale[2]
          },

          '::-webkit-scrollbar-thumb': {
            backgroundColor: grayScale[7],
            borderRadius: 999
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* BUTTON                                                               */
      /* -------------------------------------------------------------------- */

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,

            textTransform: 'none',

            fontWeight: 700,

            boxShadow: 'none',

            '&:hover': {
              boxShadow: 'none'
            },

            // ─────────────────────────────────────────────
            // Contained Primary
            // ─────────────────────────────────────────────
            '&.MuiButton-containedPrimary': {
              backgroundColor: colorScale[9],

              color: colorScale.contrast,

              '&:hover': {
                backgroundColor: colorScale[10]
              },

              '&:active': {
                backgroundColor: colorScale[8]
              }
            },

            // ─────────────────────────────────────────────
            // Outlined Primary
            // ─────────────────────────────────────────────
            '&.MuiButton-outlinedPrimary': {
              borderColor: colorScale[7],

              color: colorScale[11],

              '&:hover': {
                borderColor: colorScale[8],

                backgroundColor: colorScale[3]
              }
            },

            // ─────────────────────────────────────────────
            // Text Primary
            // ─────────────────────────────────────────────
            '&.MuiButton-textPrimary': {
              color: colorScale[11],

              '&:hover': {
                backgroundColor: colorScale[3]
              }
            }
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* ICON BUTTON                                                           */
      /* -------------------------------------------------------------------- */

      MuiIconButton: {
        styleOverrides: {
          root: {
            color: colorScale[11],

            '&:hover': {
              backgroundColor: colorScale[3]
            }
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* CARD                                                                 */
      /* -------------------------------------------------------------------- */

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundScale[2],
            border: `1px solid ${grayScale[6]}`,
            boxShadow: 'none'
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* PAPER                                                                */
      /* -------------------------------------------------------------------- */

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* OUTLINED INPUT                                                       */
      /* -------------------------------------------------------------------- */

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: grayScale[6]
            },

            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: grayScale[7]
            },

            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colorScale[8],
              borderWidth: 1
            }
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* INPUT LABEL                                                          */
      /* -------------------------------------------------------------------- */

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: grayScale[11],

            '&.Mui-focused': {
              color: colorScale[11]
            }
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* CHIP                                                                 */
      /* -------------------------------------------------------------------- */

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999
          },

          colorPrimary: {
            backgroundColor: colorScale[3],

            color: colorScale[11]
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* TOOLTIP                                                              */
      /* -------------------------------------------------------------------- */

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: grayScale[12],
            color: grayScale[1],
            borderRadius: 6,
            fontSize: '0.75rem'
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* DIVIDER                                                              */
      /* -------------------------------------------------------------------- */

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: grayScale[6]
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* CHECKBOX                                                             */
      /* -------------------------------------------------------------------- */

      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: colorScale[8],

            '&.Mui-checked': {
              color: colorScale[9]
            }
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* RADIO                                                                */
      /* -------------------------------------------------------------------- */

      MuiRadio: {
        styleOverrides: {
          root: {
            color: colorScale[8],

            '&.Mui-checked': {
              color: colorScale[9]
            }
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* SWITCH                                                               */
      /* -------------------------------------------------------------------- */

      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            '&.Mui-checked': {
              color: colorScale[9],

              '& + .MuiSwitch-track': {
                backgroundColor: colorScale[9],

                opacity: 1
              }
            }
          },

          track: {
            backgroundColor: colorScale[6],

            opacity: 1
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* LINEAR PROGRESS                                                      */
      /* -------------------------------------------------------------------- */

      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: colorScale.track,

            borderRadius: 999
          },

          bar: {
            backgroundColor: colorScale.indicator,

            borderRadius: 999
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* CIRCULAR PROGRESS                                                    */
      /* -------------------------------------------------------------------- */

      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: colorScale[9]
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* TABS                                                                 */
      /* -------------------------------------------------------------------- */

      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: colorScale[9]
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* TAB                                                                  */
      /* -------------------------------------------------------------------- */

      MuiTab: {
        styleOverrides: {
          root: {
            color: grayScale[11],

            textTransform: 'none',

            fontWeight: 700,

            '&.Mui-selected': {
              color: colorScale[11]
            }
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* DIALOG                                                               */
      /* -------------------------------------------------------------------- */

      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: backgroundScale[2],
            border: `1px solid ${grayScale[6]}`,

            backgroundImage: 'none'
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* MENU                                                                 */
      /* -------------------------------------------------------------------- */

      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: backgroundScale[2],
            border: `1px solid ${grayScale[6]}`,

            backgroundImage: 'none'
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* MENU ITEM                                                            */
      /* -------------------------------------------------------------------- */

      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 6,

            '&:hover': {
              backgroundColor: colorScale[3]
            },

            '&.Mui-selected': {
              backgroundColor: colorScale[4],

              '&:hover': {
                backgroundColor: colorScale[5]
              }
            }
          }
        }
      },

      /* -------------------------------------------------------------------- */
      /* SNACKBAR                                                             */
      /* -------------------------------------------------------------------- */

      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            backgroundColor: grayScale[12],
            color: grayScale[1]
          }
        }
      }
    }
  });
};

/* ========================================================================== */
/* DEFAULT THEME                                                             */
/* ========================================================================== */

export const theme = getThemeFromSet('dark', 'blue');

export default theme;
