'use client';

import { useState } from 'react';

import {
  Box,
  FormControl,
  IconButton,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  type SelectChangeEvent
} from '@mui/material';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { alpha, useTheme } from '@mui/material/styles';

import { useThemeContext } from '@/contexts/themeContext';
import { THEME_SETS, THEME_ICONS, type ThemeSetName } from '@/theme/theme';
import { AppTextField } from '@/theme/components/CustomComponents';

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
  const theme = useTheme();
  const [fontInput, setFontInput] = useState(fontUrl);

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

  /*
   * Sort themes:
   *
   * 1. Category alphabetically
   * 2. Theme label alphabetically
   *
   * Example:
   *
   * CLASSIC
   *   Blue
   *   Coffee
   *   Green
   *   Purple
   *
   * COSMIC
   *   Galaxy
   *
   * LUXURY
   *   Luxury Emerald
   *   Luxury Ruby
   *   Luxury Sapphire
   */
  const CATEGORY_ORDER = [
    'custom',
    'classic',
    'minecraft',
    'cosmic',
    'luxury',
    'mythology'
  ] as const;

  const themesWithCustom = {
    ...THEME_SETS,

    custom: {
      label: THEME_SETS.custom.label,
      category: THEME_SETS.custom.category,

      color: customColors.color,
      secondary: customColors.secondary,
      gray: customColors.gray,
      background: customColors.background
    }
  };

  const activeTheme = themesWithCustom[themeSet] ?? themesWithCustom.blue;

  const sortedThemes = Object.entries(themesWithCustom).sort(([, a], [, b]) => {
    const categoryA = CATEGORY_ORDER.indexOf(
      a.category as (typeof CATEGORY_ORDER)[number]
    );

    const categoryB = CATEGORY_ORDER.indexOf(
      b.category as (typeof CATEGORY_ORDER)[number]
    );

    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }

    return a.label.localeCompare(b.label);
  });

  const handleThemeSetChange = (event: SelectChangeEvent<ThemeSetName>) => {
    const nextTheme = event.target.value as ThemeSetName;

    setThemeSet(nextTheme);
  };

  const handleColorChange = (
    key: 'color' | 'secondary' | 'gray' | 'background',
    value: string
  ) => {
    setCustomColors((previous) => ({
      ...previous,
      [key]: value
    }));

    setThemeSet('custom');
  };

  return (
    <Stack spacing={2} direction={{ xs: 'column' }}>
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
            minWidth: 190
          }}
        >
          <Select
            value={themeSet}
            onChange={handleThemeSetChange}
            fullWidth
            displayEmpty
            MenuProps={{
              sx: {
                zIndex: 9999,

                '& .MuiPaper-root': {
                  mt: 1,
                  p: 1.5,

                  width: 340,
                  maxWidth: 'calc(100vw - 32px)',

                  maxHeight: 560,

                  overflowY: 'auto',
                  overflowX: 'hidden',

                  // Firefox
                  scrollbarWidth: 'none',

                  // Chrome / Edge / Safari
                  '&::-webkit-scrollbar': {
                    width: 0,
                    height: 0,
                    display: 'none'
                  },

                  borderRadius: 2.5,

                  backgroundColor: theme.palette.background.paper,
                  border: '1px solid',
                  borderColor: alpha(
                    activeTheme.color,
                    isDarkMode ? 0.35 : 0.18
                  ),
                  boxShadow: isDarkMode
                    ? ` 0 24px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px ${alpha(activeTheme.color, 0.06)}, 0 0 40px ${alpha(activeTheme.color, 0.08)} `
                    : ` 0 16px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px ${alpha(activeTheme.color, 0.04)} `,
                  '& .MuiList-root': { py: 0.75, px: 0.25 }
                }
              }
            }}
            renderValue={(value) => {
              const preset =
                themesWithCustom[value as ThemeSetName] ??
                themesWithCustom.blue;

              const icon = THEME_ICONS[value as ThemeSetName];

              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,

                    width: '100%',
                    minWidth: 0
                  }}
                >
                  {/* Theme preview */}
                  <Box
                    sx={{
                      position: 'relative',

                      width: 30,
                      height: 30,

                      flexShrink: 0,

                      borderRadius: 1.5,

                      overflow: 'hidden',

                      background: `
              linear-gradient(
                135deg,
                ${preset.color} 0%,
                ${preset.color} 48%,
                ${preset.secondary} 48%,
                ${preset.secondary} 100%
              )
            `,

                      border: '1px solid',
                      borderColor: `${preset.color}80`,

                      boxShadow: `
              0 0 0 1px ${preset.background},
              0 0 14px ${preset.color}35
            `
                    }}
                  >
                    {icon && (
                      <Box
                        component="img"
                        src={icon}
                        alt=""
                        sx={{
                          position: 'absolute',

                          inset: 4,

                          width: 'calc(100% - 8px)',
                          height: 'calc(100% - 8px)',

                          objectFit: 'contain',

                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.5))'
                        }}
                      />
                    )}
                  </Box>

                  {/* Theme name */}
                  <Box
                    sx={{
                      minWidth: 0,
                      flex: 1
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'block',

                        fontSize: '0.875rem',
                        fontWeight: 700,

                        lineHeight: 1.2,

                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {preset.label}
                    </Box>
                  </Box>

                  {/* Mini color indicators */}
                  <Stack
                    direction="row"
                    spacing={0.4}
                    sx={{
                      flexShrink: 0
                    }}
                  >
                    {[preset.color, preset.secondary].map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 7,
                          height: 7,

                          borderRadius: '50%',

                          backgroundColor: color,

                          boxShadow: `0 0 8px ${color}60`
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              );
            }}
            sx={{
              minWidth: 220,

              borderRadius: 2.5,

              background: isDarkMode
                ? `
        linear-gradient(
          135deg,
          ${alpha(activeTheme.secondary, 0.75)},
          ${alpha(activeTheme.color, 0.15)}
        )
      `
                : `
        linear-gradient(
          135deg,
          ${alpha(activeTheme.color, 0.75)},
          ${alpha(activeTheme.secondary, 0.15)}
        )
      `,

              borderColor: alpha(activeTheme.color, isDarkMode ? 0.45 : 0.25),

              transition:
                'border-color 180ms ease, box-shadow 180ms ease, background 180ms ease',

              '&:hover': {
                borderColor: activeTheme.color,

                boxShadow: isDarkMode
                  ? `
          0 0 0 1px ${alpha(activeTheme.color, 0.12)},
          0 0 22px ${alpha(activeTheme.color, 0.12)}
        `
                  : `
          0 3px 14px ${alpha(activeTheme.color, 0.12)}
        `
              },

              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: activeTheme.color
              },

              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(activeTheme.color, isDarkMode ? 0.5 : 0.3)
              },

              '& .MuiSelect-select': {
                py: 1,
                px: 1.5,

                display: 'flex',
                alignItems: 'center'
              },

              '& .MuiSvgIcon-root': {
                color: activeTheme.color
              }
            }}
          >
            {sortedThemes.flatMap(([key, preset], index) => {
              const themeKey = key as ThemeSetName;

              const previousCategory =
                index > 0 ? sortedThemes[index - 1][1].category : null;

              const showCategory =
                index === 0 || previousCategory !== preset.category;

              const icon = THEME_ICONS[themeKey];

              const items: React.ReactNode[] = [];

              /*
               * Category header
               */
              if (showCategory) {
                items.push(
                  <ListSubheader
                    key={`${key}-category`}
                    sx={{
                      position: 'static !important',
                      px: 1.25,
                      pt: index === 0 ? 0.5 : 1.5,
                      pb: 0.75,
                      backgroundColor: 'transparent',
                      color: 'text.secondary',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      lineHeight: 1.4
                    }}
                  >
                    {' '}
                    {preset.category}{' '}
                  </ListSubheader>
                );
              }

              /*
               * Theme item
               */
              items.push(
                <MenuItem
                  key={key}
                  value={themeKey}
                  sx={{
                    position: 'relative',

                    minHeight: 58,

                    display: 'flex',
                    alignItems: 'center',

                    gap: 1.25,

                    mx: 0.25,
                    my: 0.35,

                    px: 1,

                    overflow: 'hidden',

                    borderRadius: 2,

                    color: 'text.primary',

                    background: `
            linear-gradient(
              135deg,
              ${preset.secondary}12,
              ${preset.color}06
            )
          `,

                    border: '1px solid transparent',

                    transition:
                      'transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease',

                    /*
                     * Left active indicator
                     */
                    '&::before': {
                      content: '""',

                      position: 'absolute',

                      left: 0,
                      top: 7,
                      bottom: 7,

                      width: 3,

                      borderRadius: '0 4px 4px 0',

                      background: preset.color,

                      opacity: 0,

                      transform: 'scaleY(0.5)',

                      transition: 'opacity 160ms ease, transform 160ms ease'
                    },

                    /*
                     * Decorative glow
                     */
                    '&::after': {
                      content: '""',

                      position: 'absolute',

                      width: 90,
                      height: 90,

                      right: -45,
                      top: -45,

                      borderRadius: '50%',

                      background: `
              radial-gradient(
                circle,
                ${preset.color}20,
                transparent 70%
              )
            `,

                      opacity: 0,

                      pointerEvents: 'none',

                      transition: 'opacity 180ms ease'
                    },

                    '&:hover': {
                      transform: 'translateX(3px)',

                      background: `
              linear-gradient(
                135deg,
                ${preset.secondary}20,
                ${preset.color}12
              )
            `,

                      borderColor: `${preset.color}35`,

                      boxShadow: `
              0 6px 20px rgba(0,0,0,.18),
              0 0 20px ${preset.color}0D
            `,

                      '&::before': {
                        opacity: 1,
                        transform: 'scaleY(1)'
                      },

                      '&::after': {
                        opacity: 1
                      }
                    },

                    /*
                     * Selected theme
                     */
                    '&.Mui-selected': {
                      background: `
              linear-gradient(
                135deg,
                ${preset.secondary}28,
                ${preset.color}18
              )
            `,

                      borderColor: `${preset.color}55`,

                      boxShadow: `
              inset 0 0 20px ${preset.color}08,
              0 4px 18px rgba(0,0,0,.16),
              0 0 20px ${preset.color}10
            `,

                      '&::before': {
                        opacity: 1,
                        transform: 'scaleY(1)'
                      },

                      '&::after': {
                        opacity: 1
                      }
                    },

                    /*
                     * Selected + hover
                     */
                    '&.Mui-selected:hover': {
                      background: `
              linear-gradient(
                135deg,
                ${preset.secondary}35,
                ${preset.color}22
              )
            `
                    }
                  }}
                >
                  {/* Theme icon / preview */}
                  <Box
                    sx={{
                      position: 'relative',

                      width: 38,
                      height: 38,

                      flexShrink: 0,

                      display: 'grid',
                      placeItems: 'center',

                      borderRadius: 1.75,

                      overflow: 'hidden',

                      background: `
              linear-gradient(
                145deg,
                ${preset.color}20,
                ${preset.secondary}15
              )
            `,

                      border: '1px solid',
                      borderColor: `${preset.color}35`,

                      boxShadow: `
              inset 0 1px 0 rgba(255,255,255,.05),
              0 4px 12px ${preset.color}12
            `
                    }}
                  >
                    {/* Color glow */}
                    <Box
                      sx={{
                        position: 'absolute',

                        width: 22,
                        height: 22,

                        borderRadius: '50%',

                        background: `
                radial-gradient(
                  circle,
                  ${preset.color},
                  ${preset.secondary}
                )
              `,

                        opacity: 0.85,

                        filter: 'blur(5px)'
                      }}
                    />

                    {icon ? (
                      <Box
                        component="img"
                        src={icon}
                        alt=""
                        sx={{
                          position: 'relative',

                          zIndex: 1,

                          width: 27,
                          height: 27,

                          objectFit: 'contain',

                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.6))'
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          position: 'relative',

                          zIndex: 1,

                          width: 17,
                          height: 17,

                          borderRadius: '50%',

                          background: `
                  linear-gradient(
                    135deg,
                    ${preset.color},
                    ${preset.secondary}
                  )
                `,

                          boxShadow: `
                  0 0 12px ${preset.color}70
                `
                        }}
                      />
                    )}
                  </Box>

                  {/* Theme information */}
                  <Box
                    sx={{
                      position: 'relative',

                      zIndex: 1,

                      flex: 1,
                      minWidth: 0
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'block',

                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',

                        fontSize: '0.85rem',
                        fontWeight: 700,

                        color: 'text.primary'
                      }}
                    >
                      {preset.label}
                    </Box>

                    <Box
                      component="span"
                      sx={{
                        display: 'block',

                        mt: 0.25,

                        fontSize: '0.64rem',
                        fontWeight: 500,

                        color: 'text.secondary',

                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {preset.category}
                    </Box>
                  </Box>

                  {/* Theme palette */}
                  <Stack
                    direction="row"
                    spacing={0.45}
                    sx={{
                      position: 'relative',

                      zIndex: 1,

                      flexShrink: 0
                    }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,

                        borderRadius: '50%',

                        backgroundColor: preset.color,

                        boxShadow: `0 0 8px ${preset.color}70`
                      }}
                    />

                    <Box
                      sx={{
                        width: 9,
                        height: 9,

                        borderRadius: '50%',

                        backgroundColor: preset.secondary,

                        boxShadow: `0 0 8px ${preset.secondary}50`
                      }}
                    />
                  </Stack>
                </MenuItem>
              );

              return items;
            })}
          </Select>
        </FormControl>

        <Stack
          direction={{ xs: 'row' }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap'
          }}
        >
          {/* ================================================================== */}
          {/* PRIMARY                                                            */}
          {/* ================================================================== */}

          <Tooltip title="Primary color">
            <TextField
              type="color"
              size="small"
              value={activeTheme.color}
              onChange={(event) =>
                handleColorChange('color', event.target.value)
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
          {/* SECONDARY                                                          */}
          {/* ================================================================== */}

          <Tooltip title="Secondary color">
            <TextField
              type="color"
              size="small"
              value={activeTheme.secondary}
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
              value={activeTheme.gray}
              onChange={(event) =>
                handleColorChange('gray', event.target.value)
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
          {/* BACKGROUND                                                         */}
          {/* ================================================================== */}

          <Tooltip title="Background color">
            <TextField
              type="color"
              size="small"
              value={activeTheme.background}
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
            <IconButton
              onClick={toggleTheme}
              sx={{
                borderRadius: 1.5,
                transition: 'all 180ms ease',

                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}14`,
                  color: theme.palette.primary.main
                }
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
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
              sx={{
                width: 36,
                height: 36,

                borderRadius: 1.5,

                fontSize: '1.25rem',
                lineHeight: 1,

                color: 'text.secondary',

                '&:hover': {
                  color: 'error.main',
                  backgroundColor: 'error.main',
                  background: 'rgba(211, 47, 47, 0.08)'
                }
              }}
            >
              ×
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Stack>
  );
}
