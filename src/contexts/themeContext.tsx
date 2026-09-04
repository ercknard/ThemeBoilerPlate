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

/* ========================================================================== */
/* DEFAULTS                                                                   */
/* ========================================================================== */

const DEFAULT_THEME_SET: ThemeSetName = 'blue';

const DEFAULT_CUSTOM_COLORS: CustomColors = {
  color: THEME_SETS[DEFAULT_THEME_SET].color,
  gray: THEME_SETS[DEFAULT_THEME_SET].gray,
  background: THEME_SETS[DEFAULT_THEME_SET].background
};

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
    isValidHexColor(colors.gray) &&
    isValidHexColor(colors.background)
  );
}

/* ========================================================================== */
/* PROVIDER                                                                   */
/* ========================================================================== */

export function ThemeProvider({ children }: ThemeProviderProps) {
  /*
   * Keep the initial state identical between server and client.
   *
   * localStorage is loaded only after hydration.
   */
  const [mode, setModeState] = useState<PaletteMode>('light');

  const [themeSet, setThemeSetState] =
    useState<ThemeSetName>(DEFAULT_THEME_SET);

  const [customColors, setCustomColorsState] = useState<CustomColors>(
    DEFAULT_CUSTOM_COLORS
  );

  /*
   * Prevent the application from rendering with the default theme
   * before saved settings have been restored.
   */
  const [initialized, setInitialized] = useState(false);

  /* ------------------------------------------------------------------------ */
  /* Load saved settings                                                      */
  /* ------------------------------------------------------------------------ */

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
        // Ignore invalid saved color data.
      }
    }

    /*
     * Settings are now restored.
     */
    setInitialized(true);
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Set mode                                                                 */
  /* ------------------------------------------------------------------------ */

  const setMode = useCallback((newMode: PaletteMode) => {
    setModeState(newMode);

    localStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Toggle mode                                                              */
  /* ------------------------------------------------------------------------ */

  const toggleTheme = useCallback(() => {
    setModeState((currentMode) => {
      const newMode = currentMode === 'light' ? 'dark' : 'light';

      localStorage.setItem(STORAGE_KEY, newMode);

      return newMode;
    });
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Set color theme                                                          */
  /* ------------------------------------------------------------------------ */

  const setThemeSet = useCallback((newThemeSet: ThemeSetName) => {
    setThemeSetState(newThemeSet);

    localStorage.setItem(THEME_SET_STORAGE_KEY, newThemeSet);

    const preset = THEME_SETS[newThemeSet];

    const colors: CustomColors = {
      color: preset.color,
      gray: preset.gray,
      background: preset.background
    };

    setCustomColorsState(colors);

    localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(colors));
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Set custom colors                                                        */
  /* ------------------------------------------------------------------------ */

  const setCustomColors = useCallback((colors: CustomColors) => {
    if (!isValidCustomColors(colors)) {
      return;
    }

    setCustomColorsState(colors);

    localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(colors));
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Generate MUI theme                                                       */
  /* ------------------------------------------------------------------------ */

  const theme = useMemo(
    () =>
      getThemeFromSet(mode, themeSet, {
        color: customColors.color,
        gray: customColors.gray,
        background: customColors.background
      }),
    [
      mode,
      themeSet,
      customColors.color,
      customColors.gray,
      customColors.background
    ]
  );

  /* ------------------------------------------------------------------------ */
  /* Context value                                                            */
  /* ------------------------------------------------------------------------ */

  const contextValue = useMemo(
    () => ({
      mode,
      isDarkMode: mode === 'dark',

      themeSet,
      setThemeSet,

      customColors,
      setCustomColors,

      toggleTheme,
      setMode
    }),
    [
      mode,
      themeSet,
      setThemeSet,
      customColors,
      setCustomColors,
      toggleTheme,
      setMode
    ]
  );

  /* ------------------------------------------------------------------------ */
  /* Prevent default-theme flash                                              */
  /* ------------------------------------------------------------------------ */

  if (!initialized) {
    return (
      <ThemeContext.Provider value={contextValue}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
        </MuiThemeProvider>
      </ThemeContext.Provider>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Provider                                                                 */
  /* ------------------------------------------------------------------------ */

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
