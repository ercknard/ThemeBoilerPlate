'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import type { PaletteMode } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { getThemeFromSet, THEME_SETS, type ThemeSetName } from '@/theme/theme';

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

export type CustomColors = {
  color: string;
  secondary: string;
  gray: string;
  background: string;
};

type ThemeContextType = {
  mode: PaletteMode;
  isDarkMode: boolean;

  themeSet: ThemeSetName;
  setThemeSet: (themeSet: ThemeSetName) => void;

  customColors: CustomColors;
  setCustomColors: (colors: CustomColors) => void;

  /* Font */
  fontUrl: string;
  fontFamily: string;
  setFont: (url: string) => void;
  resetFont: () => void;

  toggleTheme: () => void;
  setMode: (mode: PaletteMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

/* ========================================================================== */
/* STORAGE                                                                    */
/* ========================================================================== */

const STORAGE_KEY = 'theme-mode';
const THEME_SET_STORAGE_KEY = 'theme-set';
const CUSTOM_COLORS_STORAGE_KEY = 'theme-custom-colors';

const FONT_URL_STORAGE_KEY = 'theme-font-url';
const FONT_FAMILY_STORAGE_KEY = 'theme-font-family';

/* ========================================================================== */
/* DEFAULTS                                                                   */
/* ========================================================================== */

const DEFAULT_THEME_SET: ThemeSetName = 'blue';

const DEFAULT_CUSTOM_COLORS: CustomColors = {
  color: THEME_SETS[DEFAULT_THEME_SET].color,
  secondary: THEME_SETS[DEFAULT_THEME_SET].secondary,
  gray: THEME_SETS[DEFAULT_THEME_SET].gray,
  background: THEME_SETS[DEFAULT_THEME_SET].background
};

const DEFAULT_FONT_FAMILY = 'Inter';

/* ========================================================================== */
/* VALIDATION                                                                 */
/* ========================================================================== */

function isValidHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value);
}

function isValidCustomColors(value: unknown): value is CustomColors {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const colors = value as Partial<CustomColors>;

  return (
    isValidHexColor(colors.color) &&
    isValidHexColor(colors.secondary) &&
    isValidHexColor(colors.gray) &&
    isValidHexColor(colors.background)
  );
}

/* ========================================================================== */
/* GOOGLE FONT HELPERS                                                        */
/* ========================================================================== */

function isGoogleFontUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);

    return (
      parsedUrl.protocol === 'https:' &&
      (parsedUrl.hostname === 'fonts.googleapis.com' ||
        parsedUrl.hostname === 'fonts.googleapis.com.')
    );
  } catch {
    return false;
  }
}

function getFontFamilyFromUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname !== 'fonts.googleapis.com' &&
      parsedUrl.hostname !== 'fonts.googleapis.com.'
    ) {
      return null;
    }

    const family = parsedUrl.searchParams.get('family');

    if (!family) {
      return null;
    }

    /*
     * Example:
     *
     * family=Roboto:wght@400;500;700
     *
     * -> Roboto
     */
    const firstFamily = family
      .split('&')[0]
      .split(':')[0]
      .replace(/\+/g, ' ')
      .trim();

    return firstFamily || null;
  } catch {
    return null;
  }
}

function loadGoogleFont(url: string): void {
  const existing = document.getElementById('theme-google-font');

  if (existing) {
    existing.remove();
  }

  if (!url) {
    return;
  }

  const link = document.createElement('link');

  link.id = 'theme-google-font';
  link.rel = 'stylesheet';
  link.href = url;

  document.head.appendChild(link);
}

function unloadGoogleFont(): void {
  const existing = document.getElementById('theme-google-font');

  if (existing) {
    existing.remove();
  }
}

/* ========================================================================== */
/* PROVIDER                                                                   */
/* ========================================================================== */

export function ThemeProvider({ children }: ThemeProviderProps) {
  /* ------------------------------------------------------------------------ */
  /* Theme state                                                              */
  /* ------------------------------------------------------------------------ */

  const [mode, setModeState] = useState<PaletteMode>('light');

  const [themeSet, setThemeSetState] =
    useState<ThemeSetName>(DEFAULT_THEME_SET);

  const [customColors, setCustomColorsState] = useState<CustomColors>(
    DEFAULT_CUSTOM_COLORS
  );

  /* ------------------------------------------------------------------------ */
  /* Font state                                                               */
  /* ------------------------------------------------------------------------ */

  const [fontUrl, setFontUrlState] = useState<string>('');

  const [fontFamily, setFontFamilyState] =
    useState<string>(DEFAULT_FONT_FAMILY);

  /* ------------------------------------------------------------------------ */
  /* Hydration                                                               */
  /* ------------------------------------------------------------------------ */

  const [initialized, setInitialized] = useState(false);

  /* ======================================================================== */
  /* LOAD SAVED SETTINGS                                                      */
  /* ======================================================================== */

  useEffect(() => {
    /* ---------------------------------------------------------------------- */
    /* Color mode                                                             */
    /* ---------------------------------------------------------------------- */

    const savedMode = localStorage.getItem(STORAGE_KEY);

    if (savedMode === 'light' || savedMode === 'dark') {
      setModeState(savedMode);
    } else {
      const systemMode = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      setModeState(systemMode);
    }

    /* ---------------------------------------------------------------------- */
    /* Theme set                                                              */
    /* ---------------------------------------------------------------------- */

    const savedThemeSet = localStorage.getItem(THEME_SET_STORAGE_KEY);

    if (
      savedThemeSet &&
      Object.prototype.hasOwnProperty.call(THEME_SETS, savedThemeSet)
    ) {
      setThemeSetState(savedThemeSet as ThemeSetName);
    }

    /* ---------------------------------------------------------------------- */
    /* Custom colors                                                          */
    /* ---------------------------------------------------------------------- */

    const savedCustomColors = localStorage.getItem(CUSTOM_COLORS_STORAGE_KEY);

    if (savedCustomColors) {
      try {
        const parsedColors = JSON.parse(savedCustomColors);

        if (isValidCustomColors(parsedColors)) {
          setCustomColorsState(parsedColors);
        }
      } catch {
        // Ignore invalid saved colors.
      }
    }

    /* ---------------------------------------------------------------------- */
    /* Google font                                                             */
    /* ---------------------------------------------------------------------- */

    const savedFontUrl = localStorage.getItem(FONT_URL_STORAGE_KEY);

    const savedFontFamily = localStorage.getItem(FONT_FAMILY_STORAGE_KEY);

    if (savedFontUrl && savedFontFamily && isGoogleFontUrl(savedFontUrl)) {
      setFontUrlState(savedFontUrl);
      setFontFamilyState(savedFontFamily);

      loadGoogleFont(savedFontUrl);
    } else {
      /*
       * Clean up invalid old font settings.
       */
      localStorage.removeItem(FONT_URL_STORAGE_KEY);
      localStorage.removeItem(FONT_FAMILY_STORAGE_KEY);
    }

    /* ---------------------------------------------------------------------- */
    /* Initialized                                                            */
    /* ---------------------------------------------------------------------- */

    setInitialized(true);
  }, []);

  /* ======================================================================== */
  /* MODE                                                                     */
  /* ======================================================================== */

  const setMode = useCallback((newMode: PaletteMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setModeState((currentMode) => {
      const newMode = currentMode === 'light' ? 'dark' : 'light';

      localStorage.setItem(STORAGE_KEY, newMode);

      return newMode;
    });
  }, []);

  /* ======================================================================== */
  /* THEME SET                                                                 */
  /* ======================================================================== */

  const setThemeSet = useCallback((newThemeSet: ThemeSetName) => {
    setThemeSetState(newThemeSet);

    localStorage.setItem(THEME_SET_STORAGE_KEY, newThemeSet);

    const preset = THEME_SETS[newThemeSet];

    const colors: CustomColors = {
      color: preset.color,
      secondary: preset.secondary,
      gray: preset.gray,
      background: preset.background
    };

    setCustomColorsState(colors);

    localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(colors));
  }, []);

  /* ======================================================================== */
  /* CUSTOM COLORS                                                             */
  /* ======================================================================== */

  const setCustomColors = useCallback((colors: CustomColors) => {
    if (!isValidCustomColors(colors)) {
      return;
    }

    setCustomColorsState(colors);

    localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(colors));
  }, []);

  /* ======================================================================== */
  /* FONT                                                                      */
  /* ======================================================================== */

  const setFont = useCallback((url: string) => {
    const trimmedUrl = url.trim();

    /* Empty = reset */
    if (!trimmedUrl) {
      unloadGoogleFont();

      setFontUrlState('');
      setFontFamilyState(DEFAULT_FONT_FAMILY);

      localStorage.removeItem(FONT_URL_STORAGE_KEY);

      localStorage.removeItem(FONT_FAMILY_STORAGE_KEY);

      return;
    }

    /* Validate URL */
    if (!isGoogleFontUrl(trimmedUrl)) {
      return;
    }

    /* Extract family */
    const family = getFontFamilyFromUrl(trimmedUrl);

    if (!family) {
      return;
    }

    /* Load font */
    loadGoogleFont(trimmedUrl);

    /* Update state */
    setFontUrlState(trimmedUrl);
    setFontFamilyState(family);

    /* Persist */
    localStorage.setItem(FONT_URL_STORAGE_KEY, trimmedUrl);

    localStorage.setItem(FONT_FAMILY_STORAGE_KEY, family);
  }, []);

  /* ======================================================================== */
  /* RESET FONT                                                                */
  /* ======================================================================== */

  const resetFont = useCallback(() => {
    unloadGoogleFont();

    setFontUrlState('');
    setFontFamilyState(DEFAULT_FONT_FAMILY);

    localStorage.removeItem(FONT_URL_STORAGE_KEY);

    localStorage.removeItem(FONT_FAMILY_STORAGE_KEY);
  }, []);

  /* ======================================================================== */
  /* MUI THEME                                                                 */
  /* ======================================================================== */

  const theme = useMemo(
    () =>
      getThemeFromSet(
        mode,
        themeSet,
        {
          color: customColors.color,
          gray: customColors.gray,
          secondary: customColors.secondary,
          background: customColors.background
        },
        fontFamily
      ),
    [
      mode,
      themeSet,
      customColors.color,
      customColors.gray,
      customColors.secondary,
      customColors.background,
      fontFamily
    ]
  );

  /* ======================================================================== */
  /* CONTEXT                                                                  */
  /* ======================================================================== */

  const contextValue = useMemo(
    () => ({
      mode,
      isDarkMode: mode === 'dark',

      themeSet,
      setThemeSet,

      customColors,
      setCustomColors,

      fontUrl,
      fontFamily,
      setFont,
      resetFont,

      toggleTheme,
      setMode
    }),
    [
      mode,
      themeSet,
      setThemeSet,
      customColors,
      setCustomColors,
      fontUrl,
      fontFamily,
      setFont,
      resetFont,
      toggleTheme,
      setMode
    ]
  );

  /* ======================================================================== */
  /* PROVIDER                                                                  */
  /* ======================================================================== */

  if (!initialized) {
    return (
      <ThemeContext.Provider value={contextValue}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
        </MuiThemeProvider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

/* ========================================================================== */
/* HOOK                                                                       */
/* ========================================================================== */

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used inside ThemeProvider');
  }

  return context;
}
