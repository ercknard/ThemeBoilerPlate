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

import { getTheme } from '@/theme/theme';

type ThemeContextType = {
  mode: PaletteMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setMode: (mode: PaletteMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = 'theme-mode';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<PaletteMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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

    setMounted(true);
  }, []);

  const setMode = useCallback((newMode: PaletteMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      isDarkMode: mode === 'dark',
      toggleTheme,
      setMode
    }),
    [mode, toggleTheme, setMode]
  );

  /*
   * Prevent hydration mismatch caused by reading localStorage
   * during the initial render.
   */
  if (!mounted) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
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

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used inside ThemeProvider');
  }

  return context;
}
