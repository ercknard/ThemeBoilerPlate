'use client';

import { useState } from 'react';

import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  type SelectChangeEvent
} from '@mui/material';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useThemeContext } from '@/contexts/themeContext';
import { THEME_SETS, type ThemeSetName } from '@/theme/theme';
import { AppTextField } from '@/theme/CustomComponents';

export default function ThemeToggle() {
  const {
    isDarkMode,
    toggleTheme,
    themeSet,
    setThemeSet,
    customColors,
    setCustomColors,
    fontUrl,
    setFont,
    resetFont
  } = useThemeContext();

  /*
   * Keep the input separate from the currently applied font.
   *
   * This prevents the Google Font stylesheet from being loaded
   * on every keystroke.
   */
  const [fontInput, setFontInput] = useState(fontUrl);

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

  const applyFont = () => {
    const value = fontInput.trim();

    if (!value) {
      resetFont();
      return;
    }

    setFont(value);
  };

  const handleFontKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }

    if (event.key === 'Escape') {
      setFontInput(fontUrl);
      event.currentTarget.blur();
    }
  };

  const handleResetFont = () => {
    setFontInput('');
    resetFont();
  };

  return (
    <Stack spacing={2}>
      {/* ================================================================== */}
      {/* PRESET THEME                                                       */}
      {/* ================================================================== */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap'
        }}
      >
        <FormControl
          size="small"
          sx={{
            minWidth: 150
          }}
        >
          <Select
            value={themeSet}
            onChange={handleThemeSetChange}
            displayEmpty
            MenuProps={{
              sx: {
                zIndex: 9999
              }
            }}
            sx={{
              borderRadius: 2,

              background: `
      linear-gradient(
        135deg,
        ${THEME_SETS[themeSet].secondary} 0%,
        ${THEME_SETS[themeSet].color}22 100%
      )
    `,

              borderColor: THEME_SETS[themeSet].color,

              '&:hover': {
                borderColor: THEME_SETS[themeSet].color
              },

              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: THEME_SETS[themeSet].color
              },

              '& .MuiSelect-select': {
                py: 1,
                px: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.25
              }
            }}
          >
            {(Object.keys(THEME_SETS) as ThemeSetName[]).map((key) => {
              const preset = THEME_SETS[key];

              return (
                <MenuItem
                  key={key}
                  value={key}
                  sx={{
                    minHeight: 44,
                    gap: 1.25,
                    borderRadius: 1,
                    mx: 0.5,
                    my: 0.25,

                    background: `
            linear-gradient(
              135deg,
              ${preset.secondary} 0%,
              ${preset.color}18 100%
            )
          `,

                    '&:hover': {
                      background: `
              linear-gradient(
                135deg,
                ${preset.secondary} 0%,
                ${preset.color}30 100%
              )
            `
                    },

                    '&.Mui-selected': {
                      background: `
              linear-gradient(
                135deg,
                ${preset.secondary} 0%,
                ${preset.color}35 100%
              )
            `
                    },

                    '&.Mui-selected:hover': {
                      background: `
              linear-gradient(
                135deg,
                ${preset.secondary} 0%,
                ${preset.color}45 100%
              )
            `
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: `linear-gradient(
              135deg,
              ${preset.color} 0%,
              ${preset.color} 50%,
              ${preset.secondary} 50%,
              ${preset.secondary} 100%
            )`,
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: `0 0 0 1px ${preset.background}`
                    }}
                  />

                  {preset.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* ================================================================== */}
        {/* PRIMARY                                                            */}
        {/* ================================================================== */}

        <Tooltip title="Primary color">
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

        {/* ================================================================== */}
        {/* SECONDARY                                                          */}
        {/* ================================================================== */}

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

        {/* ================================================================== */}
        {/* GRAY                                                               */}
        {/* ================================================================== */}

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

        {/* ================================================================== */}
        {/* BACKGROUND                                                         */}
        {/* ================================================================== */}

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

        {/* ================================================================== */}
        {/* LIGHT / DARK                                                       */}
        {/* ================================================================== */}

        <Tooltip title={isDarkMode ? 'Light mode' : 'Dark mode'}>
          <IconButton onClick={toggleTheme}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* ================================================================== */}
      {/* GOOGLE FONT                                                        */}
      {/* ================================================================== */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: {
            xs: '100%',
            sm: '100%'
          }
        }}
      >
        <AppTextField
          size="small"
          fullWidth
          value={fontInput}
          placeholder="Google Font CSS URL"
          onChange={(event) => setFontInput(event.target.value)}
          onBlur={applyFont}
          onKeyDown={handleFontKeyDown}
        />

        {fontInput && (
          <Tooltip title="Reset font">
            <IconButton
              size="small"
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={handleResetFont}
            >
              ×
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Stack>
  );
}
