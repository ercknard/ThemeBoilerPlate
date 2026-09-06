'use client';

import * as React from 'react';

import {
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import {
  DEFAULT_CUSTOM_COLORS,
  THEME_ICONS,
  THEME_SETS,
  createBackgroundScale,
  createGrayScale,
  createRadixScale,
  type ThemeSetName
} from '@/theme/theme';
import Head from 'next/head';

import { useThemeContext } from '@/contexts/themeContext';

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

type ThemePreset = (typeof THEME_SETS)[ThemeSetName];

type ColorPreset = {
  color: string;
  secondary: string;
  background: string;
  gray: string;
};

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

/**
 * Guarantees that anything passed into color utilities is a valid string.
 * This prevents errors such as:
 *
 *   Cannot read properties of undefined (reading 'replace')
 */
function safeColor(value: unknown, fallback = '#808080'): string {
  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return fallback;
  }

  const normalized = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;

  if (
    /^#[0-9a-fA-F]{6}$/.test(normalized) ||
    /^#[0-9a-fA-F]{3}$/.test(normalized)
  ) {
    return normalized;
  }

  return fallback;
}

/**
 * Returns readable text against a HEX background.
 */
function getContrastColor(value: unknown): string {
  const hex = safeColor(value);

  let normalized = hex.replace('#', '');

  if (normalized.length === 3) {
    normalized = normalized
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (normalized.length !== 6) {
    return '#FFFFFF';
  }

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.58 ? '#111111' : '#FFFFFF';
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case 'classic':
      return 'Classic';

    case 'elements':
      return 'Elements';

    case 'mythology':
      return 'Mythology';

    case 'minecraft':
      return 'Minecraft';

    case 'cosmic':
      return 'Cosmic';

    case 'custom':
      return 'Custom';

    default:
      return category;
  }
}

/**
 * Converts a THEME_SETS entry into guaranteed color values.
 */
function getPresetColors(name: ThemeSetName, preset: ThemePreset): ColorPreset {
  if (name === 'custom' || !('color' in preset)) {
    return {
      color: safeColor(DEFAULT_CUSTOM_COLORS.color),
      secondary: safeColor(DEFAULT_CUSTOM_COLORS.secondary),
      background: safeColor(DEFAULT_CUSTOM_COLORS.background),
      gray: safeColor(DEFAULT_CUSTOM_COLORS.gray)
    };
  }

  return {
    color: safeColor(preset.color),
    secondary: safeColor(preset.secondary),
    background: safeColor(preset.background),
    gray: safeColor(preset.gray)
  };
}

/* ========================================================================== */
/* COLOR SWATCH                                                               */
/* ========================================================================== */

function ColorSwatch({
  value,
  label,
  large = false
}: {
  value: unknown;
  label: string;
  large?: boolean;
}) {
  const color = safeColor(value);
  const textColor = getContrastColor(color);

  return (
    <Tooltip title={`${label}: ${color}`} arrow>
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          minWidth: 0,
          height: large ? 76 : 48,
          backgroundColor: color,
          border: '1px solid',
          borderColor: alpha('#FFFFFF', 0.08),
          transition:
            'transform 160ms ease, filter 160ms ease, box-shadow 160ms ease',
          cursor: 'default',

          '&:hover': {
            transform: 'translateY(-2px)',
            filter: 'brightness(1.08)',
            zIndex: 2,
            boxShadow: `0 6px 20px ${alpha(color, 0.35)}`
          }
        }}
      >
        <Typography
          sx={{
            position: 'absolute',
            left: 8,
            bottom: 6,
            fontFamily: 'monospace',
            fontSize: '0.65rem',
            fontWeight: 600,
            color: textColor,
            opacity: 0.9,
            whiteSpace: 'nowrap'
          }}
        >
          {color}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/* ========================================================================== */
/* COLOR SCALE                                                                */
/* ========================================================================== */

function ColorScale({
  title,
  scale,
  suppliedColor
}: {
  title: string;
  scale: Record<number, string>;
  suppliedColor?: string;
}) {
  return (
    <Stack spacing={1.25}>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="label"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="small"
          sx={{
            color: 'text.secondary',
            fontFamily: 'monospace'
          }}
        >
          1 — 12
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 1.5
        }}
      >
        {Array.from({ length: 12 }, (_, index) => {
          const step = index + 1;

          const value = safeColor(scale?.[step], '#808080');

          const isSupplied =
            Boolean(suppliedColor) &&
            safeColor(suppliedColor).toUpperCase() === value.toUpperCase();

          const contrastColor = getContrastColor(value);

          return (
            <Tooltip key={step} title={`Step ${step}: ${value}`} arrow>
              <Box
                sx={{
                  position: 'relative',
                  flex: 1,
                  height: 54,
                  backgroundColor: value,
                  borderRight: step !== 12 ? '1px solid' : undefined,
                  borderColor: alpha('#FFFFFF', 0.08),
                  cursor: 'default',
                  transition: 'transform 150ms ease, filter 150ms ease',
                  zIndex: isSupplied ? 2 : 1,

                  '&:hover': {
                    transform: 'scaleY(1.08)',
                    filter: 'brightness(1.08)',
                    zIndex: 3
                  },

                  ...(isSupplied && {
                    boxShadow: `inset 0 -3px 0 ${alpha('#FFFFFF', 0.95)}`
                  })
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 7,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'monospace',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: contrastColor,
                    opacity: 0.9
                  }}
                >
                  {step}
                </Typography>
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      <Stack
        direction="row"
        sx={{
          px: 0.25,
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Subtle
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Strong
        </Typography>
      </Stack>
    </Stack>
  );
}

/* ========================================================================== */
/* PRESET CARD                                                                */
/* ========================================================================== */

function PresetCard({
  name,
  preset,
  mode
}: {
  name: ThemeSetName;
  preset: ThemePreset;
  mode: 'light' | 'dark';
}) {
  const theme = useTheme();

  const colors = getPresetColors(name, preset);

  const { color, secondary, background, gray } = colors;

  /* ---------------------------------------------------------------------- */
  /* CUSTOM PRESET                                                          */
  /* ---------------------------------------------------------------------- */

  if (name === 'custom' || !('color' in preset)) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          p: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: alpha(theme.secondaryScale[7], 0.9),
          backgroundColor: alpha(theme.backgroundScale[3], 0.65)
        }}
      >
        <Stack spacing={2.5}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={THEME_ICONS.custom}
              alt=""
              sx={{
                width: 42,
                height: 42,
                objectFit: 'contain',
                flexShrink: 0
              }}
            />

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {preset.label}
              </Typography>

              <Chip
                label="Custom"
                size="small"
                sx={{
                  mt: 0.75,
                  height: 22
                }}
              />
            </Box>
          </Stack>

          <Typography
            variant="small"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            User-defined theme preset. The default custom colors are shown below
            when no custom configuration is supplied.
          </Typography>

          <Divider />

          <Stack spacing={1}>
            <Typography
              variant="label"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Default custom colors
            </Typography>

            <Stack direction="row" spacing={0.75}>
              <ColorSwatch value={color} label="Primary" large />

              <ColorSwatch value={secondary} label="Secondary" large />

              <ColorSwatch value={background} label="Background" large />

              <ColorSwatch value={gray} label="Gray" large />
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* GENERATED SCALES                                                       */
  /* ---------------------------------------------------------------------- */

  const colorScale = createRadixScale(color, mode);

  const secondaryScale = createRadixScale(secondary, mode);

  const backgroundScale = createBackgroundScale(mode, background);

  const grayScale = createGrayScale(mode, gray);

  /* ---------------------------------------------------------------------- */
  /* ICON                                                                    */
  /* ---------------------------------------------------------------------- */

  const iconSrc = THEME_ICONS[name];

  /* ---------------------------------------------------------------------- */
  /* CARD                                                                    */
  /* ---------------------------------------------------------------------- */

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        overflow: 'hidden',
        borderRadius: 2,
        border: '1px solid',
        borderColor: alpha(theme.secondaryScale[7], 0.9),
        backgroundColor: colorScale[4],
        transition:
          'border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',

        '&:hover': {
          borderColor: alpha(theme.colorScale[8], 0.75),
          transform: 'translateY(-2px)',
          boxShadow: `0 14px 40px ${alpha(theme.backgroundScale[1], 0.35)}`
        }
      }}
    >
      {/* ================================================================== */}
      {/* HEADER                                                              */}
      {/* ================================================================== */}

      <Stack spacing={0}>
        <Box
          sx={{
            height: 8,
            display: 'flex'
          }}
        >
          <Box
            sx={{
              width: '10%',
              backgroundColor: color
            }}
          />

          <Box
            sx={{
              width: '30%',
              backgroundColor: secondary
            }}
          />

          <Box
            sx={{
              width: '60%',
              backgroundColor: background
            }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 2.5,
            pb: 2,
            alignItems: 'center'
          }}
        >
          {iconSrc ? (
            <Box
              component="img"
              src={iconSrc}
              alt=""
              sx={{
                width: 42,
                height: 42,
                objectFit: 'contain',
                flexShrink: 0
              }}
            />
          ) : null}

          <Box
            sx={{
              minWidth: 0,
              flex: 1
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
              useFlexGap
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700
                }}
              >
                {preset.label}
              </Typography>

              <Chip
                label={getCategoryLabel(preset.category)}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.65rem',
                  fontWeight: 600
                }}
              />
            </Stack>

            <Typography
              variant="small"
              sx={{
                mt: 0.5,
                display: 'block',
                color: 'text.secondary',
                fontFamily: 'monospace'
              }}
            >
              {name}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider />

      {/* ================================================================== */}
      {/* 60 / 30 / 10                                                       */}
      {/* ================================================================== */}

      <Box
        sx={{
          px: 2.5,
          py: 2
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Color composition
          </Typography>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: 34,
              overflow: 'hidden',
              borderRadius: 1.5
            }}
          >
            <Tooltip title={`Primary · ${color}`} arrow>
              <Box
                sx={{
                  width: '10%',
                  minWidth: 36,
                  backgroundColor: color
                }}
              />
            </Tooltip>

            <Tooltip title={`Secondary · ${secondary}`} arrow>
              <Box
                sx={{
                  width: '30%',
                  backgroundColor: secondary
                }}
              />
            </Tooltip>

            <Tooltip title={`Background · ${background}`} arrow>
              <Box
                sx={{
                  width: '60%',
                  backgroundColor: background
                }}
              />
            </Tooltip>
          </Box>

          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              gap: 1
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              10% Primary
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              30% Secondary
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              60% Background
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* ================================================================== */}
      {/* BASE COLORS                                                         */}
      {/* ================================================================== */}

      <Box
        sx={{
          px: 2.5,
          py: 2.5
        }}
      >
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Typography
              variant="label"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Base colors
            </Typography>

            <Stack
              direction="row"
              spacing={0.75}
              sx={{
                width: '100%'
              }}
            >
              <ColorSwatch value={color} label="Primary" large />

              <ColorSwatch value={secondary} label="Secondary" large />

              <ColorSwatch value={background} label="Background" large />

              <ColorSwatch value={gray} label="Gray" large />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: 'wrap'
            }}
            useFlexGap
          >
            <Chip
              size="small"
              variant="outlined"
              label={`Primary ${color}`}
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.65rem'
              }}
            />

            <Chip
              size="small"
              variant="outlined"
              label={`Secondary ${secondary}`}
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.65rem'
              }}
            />

            <Chip
              size="small"
              variant="outlined"
              label={`Background ${background}`}
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.65rem'
              }}
            />

            <Chip
              size="small"
              variant="outlined"
              label={`Gray ${gray}`}
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.65rem'
              }}
            />
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* ================================================================== */}
      {/* PRIMARY SCALE                                                       */}
      {/* ================================================================== */}

      <Box
        sx={{
          px: 2.5,
          py: 2.5
        }}
      >
        <ColorScale
          title="Primary scale"
          scale={colorScale}
          suppliedColor={color}
        />
      </Box>

      <Divider />

      {/* ================================================================== */}
      {/* SECONDARY SCALE                                                     */}
      {/* ================================================================== */}

      <Box
        sx={{
          px: 2.5,
          py: 2.5
        }}
      >
        <ColorScale
          title="Secondary scale"
          scale={secondaryScale}
          suppliedColor={secondary}
        />
      </Box>

      <Divider />

      {/* ================================================================== */}
      {/* BACKGROUND SCALE                                                    */}
      {/* ================================================================== */}

      <Box
        sx={{
          px: 2.5,
          py: 2.5
        }}
      >
        <ColorScale
          title="Background scale"
          scale={backgroundScale}
          suppliedColor={background}
        />
      </Box>

      <Divider />

      {/* ================================================================== */}
      {/* GRAY SCALE                                                          */}
      {/* ================================================================== */}

      <Box
        sx={{
          px: 2.5,
          py: 2.5
        }}
      >
        <ColorScale
          title="Gray / neutral scale"
          scale={grayScale}
          suppliedColor={gray}
        />
      </Box>

      <Divider />

      {/* ================================================================== */}
      {/* SPECIAL TOKENS                                                      */}
      {/* ================================================================== */}

      <Box sx={{ p: 2.5 }}>
        <Stack spacing={1.5}>
          <Typography
            variant="label"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Semantic tokens
          </Typography>

          <Grid container spacing={1}>
            {[
              {
                label: 'Surface',
                value: safeColor(colorScale.surface)
              },
              {
                label: 'Indicator',
                value: safeColor(colorScale.indicator)
              },
              {
                label: 'Track',
                value: safeColor(colorScale.track)
              },
              {
                label: 'Contrast',
                value: safeColor(colorScale.contrast)
              }
            ].map((token) => {
              const contrast = getContrastColor(token.value);

              return (
                <Grid
                  key={token.label}
                  size={{
                    xs: 6,
                    sm: 3
                  }}
                >
                  <Tooltip title={`${token.label}: ${token.value}`} arrow>
                    <Box
                      sx={{
                        p: 1.25,
                        minHeight: 68,
                        borderRadius: 1.5,
                        backgroundColor: token.value,
                        border: '1px solid',
                        borderColor: alpha('#FFFFFF', 0.08),
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'default'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: contrast
                        }}
                      >
                        {token.label}
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.58rem',
                          color: contrast,
                          opacity: 0.85
                        }}
                      >
                        {token.value}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Box>
    </Paper>
  );
}

/* ========================================================================== */
/* MAIN COMPONENT                                                             */
/* ========================================================================== */

export default function ColorPresetsSection() {
  const theme = useTheme();

  const mode = theme.palette.mode;

  const entries = Object.entries(THEME_SETS) as [
    ThemeSetName,
    (typeof THEME_SETS)[ThemeSetName]
  ][];

  const grouped = entries.reduce<
    Record<string, [ThemeSetName, (typeof THEME_SETS)[ThemeSetName]][]>
  >((groups, entry) => {
    const category = entry[1].category ?? 'custom';

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(entry);

    return groups;
  }, {});

  const { themeSet } = useThemeContext();

  const categoryOrder = [
    'classic',
    'elements',
    'mythology',
    'minecraft',
    'cosmic',
    'custom'
  ];

  return (
    <>
      <Head>
        <title>
          BoilerPlate | Presets | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>

        <meta
          name="description"
          content="A flexible MUI theme system with dynamic color scales, semantic surfaces, typography, and responsive components."
        />
      </Head>
      {/* ================================================================== */}
      {/* INTRO                                                              */}
      {/* ================================================================== */}

      <Stack
        id="color-presets"
        spacing={{ xs: 5, md: 8 }}
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 8
          },
          pt: {
            xs: 4,
            md: 6,
            lg: 5
          }
        }}
      >
        <Box>
          <Stack>
            <Typography
              variant="overlineCustom"
              sx={{
                color: theme.colorScale[9]
              }}
            >
              Presets
            </Typography>

            <Typography variant="sectionTitle">Color Presets</Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 820,
                color: theme.grayScale[11]
              }}
            >
              Every theme preset with its source colors, generated Radix-style
              scales, neutral values, background system, and semantic tokens.
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                pt: 1,
                flexWrap: 'wrap'
              }}
            >
              <Chip size="small" label={`${entries.length} presets`} />

              <Chip size="small" variant="outlined" label={`Mode: ${mode}`} />

              <Chip size="small" variant="outlined" label="60 / 30 / 10" />

              <Chip size="small" variant="outlined" label="4 color systems" />
            </Stack>
          </Stack>
        </Box>

        {/* ================================================================== */}
        {/* CATEGORY GROUPS                                                    */}
        {/* ================================================================== */}

        <Stack spacing={7}>
          {categoryOrder.map((category) => {
            const presets = grouped[category];

            if (!presets?.length) {
              return null;
            }

            return (
              <Box id={`color-presets-${category}`} key={category}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    mb: 2.5,
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700
                    }}
                  >
                    {getCategoryLabel(category)}
                  </Typography>

                  <Box
                    sx={{
                      flex: 1,
                      height: '1px',
                      backgroundColor: theme.grayScale[5]
                    }}
                  />

                  <Typography
                    variant="small"
                    sx={{
                      color: theme.grayScale[9],
                      fontFamily: 'monospace'
                    }}
                  >
                    {presets.length.toString().padStart(2, '0')}
                  </Typography>
                </Stack>

                <Grid container spacing={3}>
                  {presets.map(([name, preset]) => (
                    <Grid
                      key={name}
                      size={{
                        xs: 12,
                        xxxl: 6
                      }}
                    >
                      <PresetCard name={name} preset={preset} mode={mode} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}
