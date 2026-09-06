import { createTheme, type PaletteMode } from '@mui/material/styles';
import localFont from 'next/font/local';
import type { CSSProperties } from 'react';

const inconsolata = localFont({
  src: '../assets/fonts/Audiowide/Inconsolata/Inconsolata-VariableFont_wdth,wght.ttf',
  variable: '--font-incon-mono',
  weight: '100 900'
});

const Numeric = inconsolata.style.fontFamily;

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

export type RadixScaleStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type RadixScale = {
  [key in RadixScaleStep]: string;
} & {
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
    secondaryScale: RadixScale;
    backgroundScale: RadixScale;
    grayScale: RadixScale;
  }

  interface ThemeOptions {
    colorScale: RadixScale;
    secondaryScale: RadixScale;
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
/* RADIX COLOR RELATIONSHIPS                                                 */
/* ========================================================================== */

const DARK_RELATIONSHIPS = [
  { lightness: 0.12, chroma: 0.16 },
  { lightness: 0.15, chroma: 0.19 },
  { lightness: 0.19, chroma: 0.28 },
  { lightness: 0.23, chroma: 0.34 },
  { lightness: 0.27, chroma: 0.4 },
  { lightness: 0.31, chroma: 0.42 },
  { lightness: 0.36, chroma: 0.46 },
  { lightness: 0.42, chroma: 0.52 },

  // 9 = supplied color
  { lightness: 0.55, chroma: 0.72 },

  { lightness: 0.61, chroma: 0.68 },
  { lightness: 0.75, chroma: 0.42 },
  { lightness: 0.94, chroma: 0.1 }
];

const LIGHT_RELATIONSHIPS = [
  { lightness: 0.985, chroma: 0.08 },
  { lightness: 0.965, chroma: 0.12 },
  { lightness: 0.925, chroma: 0.22 },
  { lightness: 0.875, chroma: 0.35 },
  { lightness: 0.815, chroma: 0.48 },
  { lightness: 0.745, chroma: 0.6 },
  { lightness: 0.665, chroma: 0.72 },
  { lightness: 0.575, chroma: 0.82 },

  // 9 = supplied color
  { lightness: 0.543, chroma: 1 },

  { lightness: 0.5, chroma: 0.88 },
  { lightness: 0.42, chroma: 0.72 },
  { lightness: 0.28, chroma: 0.52 }
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
     * Always preserve the user's
     * actual supplied color.
     */
    if (index === 8) {
      return baseColor;
    }

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

    surface: mode === 'dark' ? values[2] : values[1],

    indicator: values[8],

    track: mode === 'dark' ? values[5] : values[4],

    contrast: mode === 'dark' ? values[12] : values[1]
  };
}

/* ========================================================================== */
/* BACKGROUND SCALE — 60%                                                     */
/* ========================================================================== */

/**
 * BACKGROUND
 *
 * This is the 60% visual layer.
 *
 * It should be:
 * - dominant
 * - calm
 * - clearly related to the supplied background color
 * - suitable for large surfaces
 *
 * It does NOT compete with primary or secondary.
 */

export const createBackgroundScale = (
  mode: PaletteMode,
  color: string
): RadixScale => {
  const base = hexToOklch(normalizeHex(color));

  const hue = base.H;

  if (mode === 'dark') {
    return {
      1: oklchToHex(0.09, base.C * 0.1, hue),

      2: oklchToHex(0.12, base.C * 0.14, hue),

      3: oklchToHex(0.16, base.C * 0.18, hue),

      4: oklchToHex(0.2, base.C * 0.22, hue),

      5: oklchToHex(0.24, base.C * 0.26, hue),

      6: oklchToHex(0.29, base.C * 0.3, hue),

      7: oklchToHex(0.35, base.C * 0.36, hue),

      8: oklchToHex(0.42, base.C * 0.44, hue),

      9: oklchToHex(0.5, base.C * 0.55, hue),

      10: oklchToHex(0.58, base.C * 0.5, hue),

      11: oklchToHex(0.76, base.C * 0.38, hue),

      12: oklchToHex(0.93, base.C * 0.22, hue),

      surface: oklchToHex(0.16, base.C * 0.18, hue),

      indicator: oklchToHex(0.5, base.C * 0.55, hue),

      track: oklchToHex(0.29, base.C * 0.3, hue),

      contrast: oklchToHex(0.93, base.C * 0.22, hue)
    };
  }

  return {
    1: oklchToHex(0.985, base.C * 0.1, hue),

    2: oklchToHex(0.965, base.C * 0.14, hue),

    3: oklchToHex(0.935, base.C * 0.18, hue),

    4: oklchToHex(0.9, base.C * 0.22, hue),

    5: oklchToHex(0.85, base.C * 0.26, hue),

    6: oklchToHex(0.78, base.C * 0.3, hue),

    7: oklchToHex(0.7, base.C * 0.36, hue),

    8: oklchToHex(0.61, base.C * 0.44, hue),

    9: oklchToHex(0.52, base.C * 0.55, hue),

    10: oklchToHex(0.44, base.C * 0.5, hue),

    11: oklchToHex(0.34, base.C * 0.38, hue),

    12: oklchToHex(0.22, base.C * 0.22, hue),

    surface: oklchToHex(0.965, base.C * 0.14, hue),

    indicator: oklchToHex(0.52, base.C * 0.55, hue),

    track: oklchToHex(0.85, base.C * 0.26, hue),

    contrast: oklchToHex(0.22, base.C * 0.22, hue)
  };
};

/* ========================================================================== */
/* GRAY SCALE — NEUTRAL / DISABLED                                            */
/* ========================================================================== */

/**
 * GRAY
 *
 * Gray is NOT part of the 60 / 30 / 10 color ratio.
 *
 * It is reserved for:
 * - disabled controls
 * - disabled text
 * - placeholders
 * - muted information
 * - neutral borders
 * - neutral icons
 * - loading/skeleton states
 */

export const createGrayScale = (
  mode: PaletteMode,
  color: string
): RadixScale => {
  const base = hexToOklch(normalizeHex(color));

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
/* SEMANTIC COLORS                                                            */
/* ========================================================================== */

export type SemanticColors = {
  success: string;
  warning: string;
  error: string;
  info: string;
};

export const semanticColors = {
  error: '#E5484D',
  warning: '#F59E0B',
  info: '#0090FF',
  success: '#30A46C'
};

/* ========================================================================== */
/* COLOR SETS                                                                 */
/* ========================================================================== */

/**
 * 60 / 30 / 10
 *
 * color      = 10% Primary
 * secondary  = 30% Secondary
 * background = 60% Background
 * gray       = Neutral / Disabled
 */

export const THEME_SETS = {
  blue: {
    label: 'Blue',
    color: '#4967C9',
    secondary: '#6B7FC7',
    gray: '#1E1E1E',
    background: '#0A0A0A'
  },

  purple: {
    label: 'Purple',
    color: '#8B5CF6',
    secondary: '#9B82E6',
    gray: '#1E1E1E',
    background: '#100B1A'
  },

  coffee: {
    label: 'Coffee',
    color: '#C49A6C',
    secondary: '#8A5A3B',
    gray: '#29211D',
    background: '#120C08'
  },

  green: {
    label: 'Green',
    color: '#30A46C',
    secondary: '#4C9F78',
    gray: '#1E1E1E',
    background: '#07140D'
  },

  olympus: {
    label: 'Olympus',
    color: '#D4AF37',
    secondary: '#8FA9C7',
    gray: '#2A2A2A',
    background: '#0B0D12'
  },

  end: {
    label: 'The End',
    color: '#A78BFA',
    secondary: '#C8C3A6',
    gray: '#242226',
    background: '#08060D'
  },

  ocean: {
    label: 'Ocean World',
    color: '#1597B8',
    secondary: '#4FC3C8',
    gray: '#16343A',
    background: '#04151C'
  },

  desert: {
    label: 'Desert Biome',
    color: '#D9A441',
    secondary: '#E8C477',
    gray: '#4A3A27',
    background: '#1A1208'
  },

  soulSandValley: {
    label: 'Soul Sand Valley',
    color: '#4B82A8',
    secondary: '#7896A5',
    gray: '#29292A',
    background: '#0A0D12'
  },

  crimsonForest: {
    label: 'Crimson Forest',
    color: '#C4364D',
    secondary: '#8E2638',
    gray: '#2B181C',
    background: '#100609'
  },

  warpedForest: {
    label: 'Warped Forest',
    color: '#18B6A4',
    secondary: '#3E7BC2',
    gray: '#17272A',
    background: '#06100F'
  },

  basaltDeltas: {
    label: 'Basalt Deltas',
    color: '#E36A2E',
    secondary: '#777477',
    gray: '#292727',
    background: '#090807'
  },

  // ============================================================
  // GALAXY
  // Deep space + nebula violet + cosmic blue + starlight
  // ============================================================
  galaxy: {
    label: 'Galaxy',
    color: '#7C5CFF',
    secondary: '#38BDF8',
    gray: '#202033',
    background: '#050611'
  },
  // ============================================================
  // MINECRAFT — PALE GARDEN
  // Pale moss + desaturated sage + eerie woodland
  // ============================================================
  paleGarden: {
    label: 'Pale Garden',
    color: '#A8B89A',
    secondary: '#D4DDC8',
    gray: '#30352F',
    background: '#0A0D0A'
  },

  // ============================================================
  // MINECRAFT — DEEP DARK
  // Sculk cyan + deep teal + ancient underground darkness
  // ============================================================
  deepDark: {
    label: 'Deep Dark',
    color: '#087F8C',
    secondary: '#3A7CA5',
    gray: '#182326',
    background: '#03090B'
  }
} as const;

export type ThemeSetName = keyof typeof THEME_SETS;

/* ========================================================================== */
/* CUSTOM THEME COLORS                                                        */
/* ========================================================================== */

export type CustomThemeColors = {
  /** 10% Primary */
  color: string;

  /** 30% Secondary */
  secondary: string;

  /** Neutral / Disabled */
  gray: string;

  /** 60% Background */
  background: string;
};

/* ========================================================================== */
/* CREATE THEME                                                               */
/* ========================================================================== */

export const getThemeFromSet = (
  mode: PaletteMode,
  set: ThemeSetName = 'blue',
  customColors?: CustomThemeColors,
  fontFamily = 'Inter'
) => {
  const colors = customColors ?? THEME_SETS[set] ?? THEME_SETS.blue;

  /* ------------------------------------------------------------------------ */
  /* 10% — PRIMARY                                                           */
  /* ------------------------------------------------------------------------ */

  const colorScale = createRadixScale(colors.color, mode);

  /* ------------------------------------------------------------------------ */
  /* 30% — SECONDARY                                                         */
  /* ------------------------------------------------------------------------ */

  const secondaryScale = createRadixScale(colors.secondary, mode);

  /* ------------------------------------------------------------------------ */
  /* 60% — BACKGROUND                                                        */
  /* ------------------------------------------------------------------------ */

  const backgroundScale = createBackgroundScale(mode, colors.background);

  /* ------------------------------------------------------------------------ */
  /* NEUTRAL / DISABLED                                                       */
  /* ------------------------------------------------------------------------ */

  const grayScale = createGrayScale(mode, colors.gray);

  /* ------------------------------------------------------------------------ */
  /* BACKGROUND                                                               */
  /* ------------------------------------------------------------------------ */

  const backgroundDefault = backgroundScale[1];

  const backgroundPaper = backgroundScale[2];

  /* ------------------------------------------------------------------------ */
  /* THEME                                                                    */
  /* ------------------------------------------------------------------------ */

  return createTheme({
    breakpoints: {
      values: BREAKPOINTS
    },

    colorScale,

    secondaryScale,

    backgroundScale,

    grayScale,

    palette: {
      mode,

      /* ==================================================================== */
      /* PRIMARY — 10%                                                        */
      /* ==================================================================== */

      primary: {
        main: colorScale[9],
        light: colorScale[10],
        dark: colorScale[8],
        contrastText: colorScale.contrast
      },

      /* ==================================================================== */
      /* SECONDARY — 30%                                                      */
      /* ==================================================================== */

      secondary: {
        main: secondaryScale[9],
        light: secondaryScale[10],
        dark: secondaryScale[8],
        contrastText: secondaryScale.contrast
      },

      /* ==================================================================== */
      /* SEMANTIC                                                              */
      /* ==================================================================== */

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

      /* ==================================================================== */
      /* BACKGROUND — 60%                                                     */
      /* ==================================================================== */

      background: {
        default: backgroundDefault,
        paper: backgroundPaper
      },

      /* ==================================================================== */
      /* NEUTRAL / DISABLED                                                    */
      /* ==================================================================== */

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
        `"${fontFamily}"`,
        'Inter',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
      ].join(','),

      fontSize: 14,

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

      button: {
        fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)',
        lineHeight: 1.4,
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: 0
      },

      caption: {
        fontSize: 'clamp(0.7rem, 0.8vw, 0.75rem)',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '0.005em'
      },

      overline: {
        fontSize: 'clamp(0.65rem, 0.7vw, 0.7rem)',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
      },

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
            backgroundColor: colorScale[7],

            color: colorScale[12]
          },

          '::-webkit-scrollbar': {
            width: 8,
            height: 8
          },

          '::-webkit-scrollbar-track': {
            backgroundColor: backgroundScale[2]
          },

          '::-webkit-scrollbar-thumb': {
            backgroundColor: secondaryScale[7],

            borderRadius: 999
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
