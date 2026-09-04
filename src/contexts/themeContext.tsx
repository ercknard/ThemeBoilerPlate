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

type ThemeContextType = {
  mode: PaletteMode;
  isDarkMode: boolean;

  themeSet: ThemeSetName;
  setThemeSet: (themeSet: ThemeSetName) => void;

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

/* ========================================================================== */
/* PROVIDER                                                                   */
/* ========================================================================== */

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<PaletteMode>('light');

  const [themeSet, setThemeSetState] = useState<ThemeSetName>('blue');

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
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Generate MUI theme                                                       */
  /* ------------------------------------------------------------------------ */

  const theme = useMemo(
    () => getThemeFromSet(mode, themeSet),
    [mode, themeSet]
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

      toggleTheme,
      setMode
    }),
    [mode, themeSet, setThemeSet, toggleTheme, setMode]
  );

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
