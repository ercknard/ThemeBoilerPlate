import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent
} from '@mui/material';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useThemeContext } from '@/contexts/themeContext';
import { THEME_SETS, type ThemeSetName } from '@/theme/theme';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme, themeSet, setThemeSet } = useThemeContext();

  const handleThemeSetChange = (event: SelectChangeEvent) => {
    setThemeSet(event.target.value as ThemeSetName);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      {/* COLOR SET SWITCHER */}
      <FormControl size="small">
        <Select
          value={themeSet}
          onChange={handleThemeSetChange}
          displayEmpty
          sx={{
            minWidth: 110,
            borderRadius: 2,

            '& .MuiSelect-select': {
              py: 0.75,
              textTransform: 'capitalize'
            }
          }}
        >
          {Object.keys(THEME_SETS).map((key) => (
            <MenuItem
              key={key}
              value={key}
              sx={{
                textTransform: 'capitalize'
              }}
            >
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* LIGHT / DARK */}
      <IconButton onClick={toggleTheme}>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
}
