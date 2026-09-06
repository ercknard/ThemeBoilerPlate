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

import {
  getThemeFromSet,
  THEME_SETS,
  type ThemeSetName,
  type CustomThemeColors
} from '@/theme/theme';

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

export type CustomColors = CustomThemeColors;

type ThemeContextType = {
  mode: PaletteMode;
  isDarkMode: boolean;

  themeSet: ThemeSetName;
  setThemeSet: (themeSet: ThemeSetName) => void;

  customColors: CustomColors;
  setCustomColors: (
    colors: CustomColors | ((previous: CustomColors) => CustomColors)
  ) => void;

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
/* URL HELPERS                                                                */
/* ========================================================================== */

function isValidThemeSet(value: string | null): value is ThemeSetName {
  return (
    value !== null && Object.prototype.hasOwnProperty.call(THEME_SETS, value)
  );
}

function getThemeSetFromUrl(): ThemeSetName | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme');

  return isValidThemeSet(theme) ? theme : null;
}

function updateThemeSetUrl(themeSet: ThemeSetName): void {
  if (typeof window === 'undefined') {
    return;
  }

  const url = new URL(window.location.href);

  url.searchParams.set('theme', themeSet);

  window.history.replaceState(
    window.history.state,
    '',
    `${url.pathname}${url.search}${url.hash}`
  );
}

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
  color: '#4967C9',
  secondary: '#6B7FC7',
  gray: '#1E1E1E',
  background: '#0A0A0A'
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
/* THEME HELPERS                                                              */
/* ========================================================================== */

function getPresetColors(themeSet: ThemeSetName): CustomColors {
  /*
   * `custom` intentionally does not contain colors.
   *
   * Custom colors are stored separately in `customColors`.
   */
  if (themeSet === 'custom') {
    return DEFAULT_CUSTOM_COLORS;
  }

  const preset = THEME_SETS[themeSet];

  return {
    color: preset.color,
    secondary: preset.secondary,
    gray: preset.gray,
    background: preset.background
  };
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
  /* ======================================================================== */
  /* THEME STATE                                                              */
  /* ======================================================================== */

  const [mode, setModeState] = useState<PaletteMode>('light');

  const [themeSet, setThemeSetState] =
    useState<ThemeSetName>(DEFAULT_THEME_SET);

  /*
   * IMPORTANT:
   *
   * These colors belong to the Custom theme only.
   *
   * They are NOT changed when selecting another preset.
   */
  const [customColors, setCustomColorsState] = useState<CustomColors>(
    DEFAULT_CUSTOM_COLORS
  );

  /* ======================================================================== */
  /* FONT STATE                                                               */
  /* ======================================================================== */

  const [fontUrl, setFontUrlState] = useState<string>('');

  const [fontFamily, setFontFamilyState] =
    useState<string>(DEFAULT_FONT_FAMILY);

  /* ======================================================================== */
  /* HYDRATION                                                                */
  /* ======================================================================== */

  const [initialized, setInitialized] = useState(false);

  /* ======================================================================== */
  /* LOAD SAVED SETTINGS                                                      */
  /* ======================================================================== */

  useEffect(() => {
    /* ---------------------------------------------------------------------- */
    /* COLOR MODE                                                             */
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
    /* THEME SET                                                              */
    /* ---------------------------------------------------------------------- */

    const urlThemeSet = getThemeSetFromUrl();

    if (urlThemeSet) {
      /*
       * URL takes priority over localStorage.
       */
      setThemeSetState(urlThemeSet);

      localStorage.setItem(THEME_SET_STORAGE_KEY, urlThemeSet);
    } else {
      const savedThemeSet = localStorage.getItem(THEME_SET_STORAGE_KEY);

      if (savedThemeSet && isValidThemeSet(savedThemeSet)) {
        setThemeSetState(savedThemeSet as ThemeSetName);

        /*
         * No theme was supplied in the URL,
         * so synchronize the saved theme into it.
         */
        updateThemeSetUrl(savedThemeSet as ThemeSetName);
      } else {
        /*
         * No URL theme and no saved theme.
         * Use the default theme and add it to the URL.
         */
        setThemeSetState(DEFAULT_THEME_SET);

        localStorage.setItem(THEME_SET_STORAGE_KEY, DEFAULT_THEME_SET);

        updateThemeSetUrl(DEFAULT_THEME_SET);
      }
    }

    /* ---------------------------------------------------------------------- */
    /* CUSTOM COLORS                                                          */
    /* ---------------------------------------------------------------------- */

    const savedCustomColors = localStorage.getItem(CUSTOM_COLORS_STORAGE_KEY);

    if (savedCustomColors) {
      try {
        const parsedColors = JSON.parse(savedCustomColors);

        if (isValidCustomColors(parsedColors)) {
          setCustomColorsState(parsedColors);
        }
      } catch {
        /*
         * Ignore invalid saved colors.
         */
      }
    }

    /* ---------------------------------------------------------------------- */
    /* GOOGLE FONT                                                            */
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
    /* INITIALIZED                                                            */
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
  /* THEME SET                                                                */
  /* ======================================================================== */

  const setThemeSet = useCallback((newThemeSet: ThemeSetName) => {
    /*
     * Update React state.
     */
    setThemeSetState(newThemeSet);

    /*
     * Persist the selected theme.
     */
    localStorage.setItem(THEME_SET_STORAGE_KEY, newThemeSet);

    /*
     * Keep the URL synchronized.
     *
     * Example:
     * ?theme=blue
     * ?theme=olympus
     * ?theme=custom
     */
    updateThemeSetUrl(newThemeSet);
  }, []);

  /* ======================================================================== */
  /* CUSTOM COLORS                                                             */
  /* ======================================================================== */

  const setCustomColors = useCallback(
    (value: CustomColors | ((previous: CustomColors) => CustomColors)) => {
      setCustomColorsState((previous) => {
        const next = typeof value === 'function' ? value(previous) : value;

        if (!isValidCustomColors(next)) {
          return previous;
        }

        localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(next));

        return next;
      });

      setThemeSetState('custom');

      localStorage.setItem(THEME_SET_STORAGE_KEY, 'custom');
    },
    []
  );

  /* ======================================================================== */
  /* FONT                                                                      */
  /* ======================================================================== */

  const setFont = useCallback((url: string) => {
    const trimmedUrl = url.trim();

    /* -------------------------------------------------------------------- */
    /* EMPTY = RESET                                                        */
    /* -------------------------------------------------------------------- */

    if (!trimmedUrl) {
      unloadGoogleFont();

      setFontUrlState('');
      setFontFamilyState(DEFAULT_FONT_FAMILY);

      localStorage.removeItem(FONT_URL_STORAGE_KEY);

      localStorage.removeItem(FONT_FAMILY_STORAGE_KEY);

      return;
    }

    /* -------------------------------------------------------------------- */
    /* VALIDATE URL                                                         */
    /* -------------------------------------------------------------------- */

    if (!isGoogleFontUrl(trimmedUrl)) {
      return;
    }

    /* -------------------------------------------------------------------- */
    /* EXTRACT FAMILY                                                       */
    /* -------------------------------------------------------------------- */

    const family = getFontFamilyFromUrl(trimmedUrl);

    if (!family) {
      return;
    }

    /* -------------------------------------------------------------------- */
    /* LOAD FONT                                                             */
    /* -------------------------------------------------------------------- */

    loadGoogleFont(trimmedUrl);

    /* -------------------------------------------------------------------- */
    /* UPDATE STATE                                                          */
    /* -------------------------------------------------------------------- */

    setFontUrlState(trimmedUrl);
    setFontFamilyState(family);

    /* -------------------------------------------------------------------- */
    /* PERSIST                                                               */
    /* -------------------------------------------------------------------- */

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

  const theme = useMemo(() => {
    /*
     * Only pass customColors when Custom is active.
     *
     * Presets use their own colors from THEME_SETS.
     */
    const activeCustomColors = themeSet === 'custom' ? customColors : undefined;

    return getThemeFromSet(mode, themeSet, activeCustomColors, fontFamily);
  }, [mode, themeSet, customColors, fontFamily]);

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
