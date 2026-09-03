import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useThemeContext } from '@/contexts/themeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme}>
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
