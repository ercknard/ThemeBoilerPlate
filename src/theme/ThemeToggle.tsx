'use client';

import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  type SelectChangeEvent
} from '@mui/material';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useThemeContext } from '@/contexts/themeContext';
import { THEME_SETS, type ThemeSetName } from '@/theme/theme';

export default function ThemeToggle() {
  const {
    isDarkMode,
    toggleTheme,
    themeSet,
    setThemeSet,
    customColors,
    setCustomColors
  } = useThemeContext();

  const handleThemeSetChange = (event: SelectChangeEvent) => {
    setThemeSet(event.target.value as ThemeSetName);
  };

  const handleColorChange = (
    key: 'color' | 'secondary' | 'gray' | 'background',
    value: string
  ) => {
    setCustomColors({
      ...customColors,
      [key]: value
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      {/* PRESET THEME */}
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

      {/* CUSTOM COLOR */}
      <Tooltip title="Theme color">
        <TextField
          type="color"
          size="small"
          value={customColors.color}
          onChange={(event) => handleColorChange('color', event.target.value)}
          sx={{
            width: 44,

            '& input': {
              cursor: 'pointer',
              height: 40,
              padding: 0.5
            }
          }}
        />
      </Tooltip>

      {/* CUSTOM GRAY */}
      <Tooltip title="Secondary color">
        <TextField
          type="color"
          size="small"
          value={customColors.secondary}
          onChange={(event) =>
            handleColorChange('secondary', event.target.value)
          }
          sx={{
            width: 44,

            '& input': {
              cursor: 'pointer',
              height: 40,
              padding: 0.5
            }
          }}
        />
      </Tooltip>

      {/* CUSTOM GRAY */}
      <Tooltip title="Gray color">
        <TextField
          type="color"
          size="small"
          value={customColors.gray}
          onChange={(event) => handleColorChange('gray', event.target.value)}
          sx={{
            width: 44,

            '& input': {
              cursor: 'pointer',
              height: 40,
              padding: 0.5
            }
          }}
        />
      </Tooltip>

      {/* CUSTOM BACKGROUND */}
      <Tooltip title="Background color">
        <TextField
          type="color"
          size="small"
          value={customColors.background}
          onChange={(event) =>
            handleColorChange('background', event.target.value)
          }
          sx={{
            width: 44,

            '& input': {
              cursor: 'pointer',
              height: 40,
              padding: 0.5
            }
          }}
        />
      </Tooltip>

      {/* LIGHT / DARK */}
      <IconButton onClick={toggleTheme}>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
}
