'use client';

import * as React from 'react';

import Head from 'next/head';

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
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

type CopyColorHandler = (value: unknown) => void;

type PresetEntry = [ThemeSetName, (typeof THEME_SETS)[ThemeSetName]];

/* ========================================================================== */
/* CONSTANTS                                                                  */
/* ========================================================================== */

const CATEGORY_ORDER = [
  'classic',
  'elements',
  'mythology',
  'minecraft',
  'cosmic',
  'custom'
] as const;

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/;

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function safeColor(value: unknown, fallback = '#808080'): string {
  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return fallback;
  }

  const normalized = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;

  return HEX_COLOR_PATTERN.test(normalized) ? normalized : fallback;
}

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
/* COPY COLOR                                                                 */
/* ========================================================================== */

async function copyColor(value: unknown): Promise<string | null> {
  const color = safeColor(value);

  if (typeof window === 'undefined') {
    return null;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(color);

      return color;
    }

    const textarea = document.createElement('textarea');

    textarea.value = color;

    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const copied = document.execCommand('copy');

    textarea.remove();

    return copied ? color : null;
  } catch {
    return null;
  }
}

/* ========================================================================== */
/* COLOR COPY FEEDBACK                                                        */
/* ========================================================================== */

const ColorCopyFeedback = React.memo(function ColorCopyFeedback({
  color
}: {
  color: string | null;
}) {
  const theme = useTheme();

  if (!color) {
    return null;
  }

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        position: 'fixed',
        left: '50%',
        bottom: {
          xs: 16,
          sm: 24
        },
        zIndex: theme.zIndex.snackbar,
        transform: 'translateX(-50%)',
        px: 1.75,
        py: 1,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: theme.grayScale[12],
        color: theme.backgroundScale[1],
        boxShadow: `0 10px 30px ${theme.grayScale[7]}`,
        pointerEvents: 'none',
        whiteSpace: 'nowrap'
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: 16,
          height: 16,
          flexShrink: 0,
          borderRadius: '50%',
          backgroundColor: color,
          border: `1px solid ${theme.grayScale[6]}`
        }}
      />

      <Typography
        variant="small"
        sx={{
          fontWeight: 700
        }}
      >
        {color} copied
      </Typography>
    </Box>
  );
});

/* ========================================================================== */
/* COLOR SWATCH                                                               */
/* ========================================================================== */

const ColorSwatch = React.memo(function ColorSwatch({
  value,
  label,
  large = false,
  onCopy
}: {
  value: unknown;
  label: string;
  large?: boolean;
  onCopy: CopyColorHandler;
}) {
  const color = safeColor(value);
  const textColor = getContrastColor(color);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      onCopy(color);
    }
  };

  return (
    <Box
      role="button"
      tabIndex={0}
      title={`Click to copy ${color}`}
      aria-label={`Copy ${label} color ${color}`}
      onClick={() => onCopy(color)}
      onKeyDown={handleKeyDown}
      sx={{
        position: 'relative',
        flex: 1,
        minWidth: 0,
        height: large ? 76 : 48,
        backgroundColor: color,
        border: '1px solid',
        borderColor: alpha('#FFFFFF', 0.08),
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        cursor: 'copy',
        willChange: 'transform',

        '&:hover': {
          transform: 'translateY(-2px)',
          zIndex: 2,
          boxShadow: `0 6px 20px ${alpha(color, 0.35)}`
        },

        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: textColor,
          outlineOffset: 2
        },

        '&:active': {
          transform: 'translateY(0)'
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
  );
});

/* ========================================================================== */
/* COLOR SCALE                                                                */
/* ========================================================================== */

const ColorScale = React.memo(function ColorScale({
  title,
  scale,
  suppliedColor,
  onCopy
}: {
  title: string;
  scale: Record<number, string>;
  suppliedColor?: string;
  onCopy: CopyColorHandler;
}) {
  const values = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const step = index + 1;

      return {
        step,
        value: safeColor(scale?.[step]),
        contrastColor: getContrastColor(scale?.[step])
      };
    });
  }, [scale]);

  const normalizedSuppliedColor = React.useMemo(
    () => (suppliedColor ? safeColor(suppliedColor).toUpperCase() : null),
    [suppliedColor]
  );

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
        {values.map(({ step, value, contrastColor }) => {
          const isSupplied =
            normalizedSuppliedColor !== null &&
            normalizedSuppliedColor === value.toUpperCase();

          return (
            <Box
              key={step}
              role="button"
              tabIndex={0}
              title={`Click to copy ${value}`}
              aria-label={`Copy step ${step} color ${value}`}
              onClick={() => onCopy(value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();

                  onCopy(value);
                }
              }}
              sx={{
                position: 'relative',
                flex: 1,
                height: 54,
                backgroundColor: value,
                borderRight: step !== 12 ? '1px solid' : undefined,
                borderColor: alpha('#FFFFFF', 0.08),
                cursor: 'copy',
                transition: 'transform 150ms ease, filter 150ms ease',
                zIndex: isSupplied ? 2 : 1,
                willChange: 'transform',

                '&:hover': {
                  transform: 'scaleY(1.08)',
                  filter: 'brightness(1.08)',
                  zIndex: 3
                },

                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: contrastColor,
                  outlineOffset: -2,
                  zIndex: 4
                },

                '&:active': {
                  transform: 'scaleY(1.02)'
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
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary'
          }}
        >
          Subtle
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary'
          }}
        >
          Strong
        </Typography>
      </Stack>
    </Stack>
  );
});

/* ========================================================================== */
/* COLOR CHIP                                                                  */
/* ========================================================================== */

const ColorChip = React.memo(function ColorChip({
  label,
  value,
  onCopy
}: {
  label: string;
  value: string;
  onCopy: CopyColorHandler;
}) {
  return (
    <Chip
      size="small"
      variant="outlined"
      clickable
      title={`Click to copy ${value}`}
      onClick={() => onCopy(value)}
      label={`${label} ${value}`}
      sx={{
        fontFamily: 'monospace',
        fontSize: '0.65rem',
        cursor: 'copy'
      }}
    />
  );
});

/* ========================================================================== */
/* PRESET CARD                                                                */
/* ========================================================================== */

const PresetCard = React.memo(function PresetCard({
  name,
  preset,
  mode,
  themeSet,
  onApply,
  onCopy
}: {
  name: ThemeSetName;
  preset: ThemePreset;
  mode: 'light' | 'dark';
  themeSet: ThemeSetName;
  onApply: (name: ThemeSetName) => void;
  onCopy: CopyColorHandler;
}) {
  const theme = useTheme();

  const colors = React.useMemo(
    () => getPresetColors(name, preset),
    [name, preset]
  );

  const { color, secondary, background, gray } = colors;

  const isActive = themeSet === name;

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
          borderColor: isActive
            ? theme.colorScale[8]
            : alpha(theme.secondaryScale[7], 0.9),
          backgroundColor: alpha(theme.backgroundScale[3], 0.65),
          transition:
            'border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',

          ...(isActive && {
            boxShadow: `0 0 0 1px ${alpha(theme.colorScale[8], 0.35)}`
          }),

          '&:hover': {
            borderColor: theme.colorScale[8],
            transform: 'translateY(-2px)'
          }
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

            <Box
              sx={{
                minWidth: 0,
                flex: 1
              }}
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
                label={isActive ? 'Applied' : 'Custom'}
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
              <ColorSwatch
                value={color}
                label="Primary"
                large
                onCopy={onCopy}
              />

              <ColorSwatch
                value={secondary}
                label="Secondary"
                large
                onCopy={onCopy}
              />

              <ColorSwatch
                value={background}
                label="Background"
                large
                onCopy={onCopy}
              />

              <ColorSwatch value={gray} label="Gray" large onCopy={onCopy} />
            </Stack>
          </Stack>

          <Button
            fullWidth
            variant={isActive ? 'contained' : 'outlined'}
            disabled={isActive}
            onClick={() => onApply(name)}
            sx={{
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 700
            }}
          >
            {isActive ? 'Applied' : 'Apply theme'}
          </Button>
        </Stack>
      </Paper>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* GENERATED SCALES                                                       */
  /* ---------------------------------------------------------------------- */

  const colorScale = React.useMemo(
    () => createRadixScale(color, mode),
    [color, mode]
  );

  const secondaryScale = React.useMemo(
    () => createRadixScale(secondary, mode),
    [secondary, mode]
  );

  const backgroundScale = React.useMemo(
    () => createBackgroundScale(mode, background),
    [mode, background]
  );

  const grayScale = React.useMemo(
    () => createGrayScale(mode, gray),
    [mode, gray]
  );

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
        zIndex: 10,
        border: '1px solid',
        borderColor: isActive
          ? theme.colorScale[8]
          : alpha(theme.secondaryScale[7], 0.9),
        backgroundColor: colorScale[4],
        transition:
          'border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',

        ...(isActive && {
          boxShadow: `0 0 0 1px ${alpha(theme.colorScale[8], 0.35)}`
        }),

        '&:hover': {
          borderColor: alpha(theme.colorScale[8], 0.75),
          transform: 'translateY(-2px)',
          boxShadow: `0 14px 40px ${alpha(theme.backgroundScale[1], 0.35)}`
        }
      }}
    >
      {/* HEADER */}

      <Stack spacing={0}>
        <Stack
          direction="row"
          sx={{
            height: 8
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
        </Stack>

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
                label={isActive ? 'Applied' : getCategoryLabel(preset.category)}
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

      {/* COLOR COMPOSITION */}

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

          <Stack
            direction="row"
            sx={{
              width: '100%',
              height: 34,
              overflow: 'hidden',
              borderRadius: 1.5
            }}
          >
            <Box
              role="button"
              tabIndex={0}
              title={`Click to copy ${color}`}
              aria-label={`Copy primary color ${color}`}
              onClick={() => onCopy(color)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();

                  onCopy(color);
                }
              }}
              sx={{
                width: '10%',
                minWidth: 36,
                backgroundColor: color,
                cursor: 'copy',
                transition: 'filter 150ms ease, transform 150ms ease',

                '&:hover': {
                  filter: 'brightness(1.08)',
                  transform: 'scaleY(1.08)'
                },

                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: getContrastColor(color),
                  outlineOffset: -2,
                  zIndex: 2
                }
              }}
            />

            <Box
              role="button"
              tabIndex={0}
              title={`Click to copy ${secondary}`}
              aria-label={`Copy secondary color ${secondary}`}
              onClick={() => onCopy(secondary)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();

                  onCopy(secondary);
                }
              }}
              sx={{
                width: '30%',
                backgroundColor: secondary,
                cursor: 'copy',
                transition: 'filter 150ms ease, transform 150ms ease',

                '&:hover': {
                  filter: 'brightness(1.08)',
                  transform: 'scaleY(1.08)'
                },

                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: getContrastColor(secondary),
                  outlineOffset: -2,
                  zIndex: 2
                }
              }}
            />

            <Box
              role="button"
              tabIndex={0}
              title={`Click to copy ${background}`}
              aria-label={`Copy background color ${background}`}
              onClick={() => onCopy(background)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();

                  onCopy(background);
                }
              }}
              sx={{
                width: '60%',
                backgroundColor: background,
                cursor: 'copy',
                transition: 'filter 150ms ease, transform 150ms ease',

                '&:hover': {
                  filter: 'brightness(1.08)',
                  transform: 'scaleY(1.08)'
                },

                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: getContrastColor(background),
                  outlineOffset: -2,
                  zIndex: 2
                }
              }}
            />
          </Stack>

          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              gap: 1
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary'
              }}
            >
              10% Primary
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary'
              }}
            >
              30% Secondary
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary'
              }}
            >
              60% Background
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* BASE COLORS */}

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
              <ColorSwatch
                value={color}
                label="Primary"
                large
                onCopy={onCopy}
              />

              <ColorSwatch
                value={secondary}
                label="Secondary"
                large
                onCopy={onCopy}
              />

              <ColorSwatch
                value={background}
                label="Background"
                large
                onCopy={onCopy}
              />

              <ColorSwatch value={gray} label="Gray" large onCopy={onCopy} />
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
            <ColorChip label="Primary" value={color} onCopy={onCopy} />

            <ColorChip label="Secondary" value={secondary} onCopy={onCopy} />

            <ColorChip label="Background" value={background} onCopy={onCopy} />

            <ColorChip label="Gray" value={gray} onCopy={onCopy} />
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* PRIMARY SCALE */}

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
          onCopy={onCopy}
        />
      </Box>

      <Divider />

      {/* SECONDARY SCALE */}

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
          onCopy={onCopy}
        />
      </Box>

      <Divider />

      {/* BACKGROUND SCALE */}

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
          onCopy={onCopy}
        />
      </Box>

      <Divider />

      {/* GRAY SCALE */}

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
          onCopy={onCopy}
        />
      </Box>

      <Divider />

      {/* SPECIAL TOKENS */}

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
                  <Box
                    role="button"
                    tabIndex={0}
                    title={`Click to copy ${token.value}`}
                    aria-label={`Copy ${token.label} color ${token.value}`}
                    onClick={() => onCopy(token.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();

                        onCopy(token.value);
                      }
                    }}
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
                      cursor: 'copy',
                      transition: 'transform 150ms ease, box-shadow 150ms ease',
                      willChange: 'transform',

                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 18px ${alpha(token.value, 0.3)}`
                      },

                      '&:focus-visible': {
                        outline: '2px solid',
                        outlineColor: contrast,
                        outlineOffset: 2
                      }
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
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Box>

      {/* APPLY THEME */}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          px: 2.5,
          py: 2,
          alignItems: {
            xs: 'stretch',
            sm: 'center'
          },
          justifyContent: 'space-between',
          bgcolor: alpha(secondaryScale[1], 0.55),
          borderTop: '1px solid',
          borderColor: alpha(theme.secondaryScale[6], 0.5),
          borderRadius: '0 0 8px 8px'
        }}
      >
        <Stack
          spacing={0.25}
          sx={{
            minWidth: 0
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: theme.grayScale[9],
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 700
            }}
          >
            Theme preset
          </Typography>

          <Typography
            variant="small"
            sx={{
              color: theme.grayScale[11],
              fontFamily: 'monospace',
              fontWeight: 600
            }}
          >
            {isActive ? 'Currently active' : `Use ${preset.label}`}
          </Typography>
        </Stack>

        <Button
          variant={isActive ? 'contained' : 'contained'}
          disabled={isActive}
          onClick={() => onApply(name)}
          sx={{
            minWidth: {
              xs: '100%',
              sm: 150
            },
            minHeight: 42,
            px: 2.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 700,
            backgroundColor: alpha(colorScale[8], 0.25),
            letterSpacing: '-0.01em',
            boxShadow: isActive
              ? `0 4px 14px ${alpha(colorScale[8], 0.25)}`
              : 'none',
            borderColor: alpha(colorScale[7], 0.7),

            '&:hover': {
              borderColor: colorScale[8],
              backgroundColor: alpha(colorScale[8], 0.08)
            },

            '&.Mui-disabled': {
              opacity: 1,
              color: getContrastColor(colorScale[9]),
              backgroundColor: colorScale[9],
              borderColor: colorScale[9]
            }
          }}
        >
          {isActive ? '✓ Applied' : 'Apply Theme'}
        </Button>
      </Stack>
    </Paper>
  );
});

/* ========================================================================== */
/* MAIN COMPONENT                                                             */
/* ========================================================================== */

export default function ColorPresetsSection() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const copyTimerRef = React.useRef<number | null>(null);

  const { themeSet, setThemeSet } = useThemeContext();

  const handleCopyColor = React.useCallback(async (value: unknown) => {
    const color = await copyColor(value);

    if (!color) {
      return;
    }

    setCopiedColor(color);

    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }

    copyTimerRef.current = window.setTimeout(() => {
      setCopiedColor(null);
    }, 1600);
  }, []);

  const handleApplyTheme = React.useCallback(
    (name: ThemeSetName) => {
      setThemeSet(name);
    },
    [setThemeSet]
  );

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const entries = React.useMemo(
    () => Object.entries(THEME_SETS) as PresetEntry[],
    []
  );

  const grouped = React.useMemo(() => {
    return entries.reduce<Record<string, PresetEntry[]>>((groups, entry) => {
      const category = entry[1].category ?? 'custom';

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(entry);

      return groups;
    }, {});
  }, [entries]);

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

      <Stack
        id="color-presets"
        spacing={{
          xs: 5,
          md: 8
        }}
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xxl: 8
          },
          pt: {
            xs: 0,
            md: 6,
            lg: 5
          }
        }}
      >
        {/* INTRO */}

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

        {/* CATEGORY GROUPS */}

        <Stack spacing={7}>
          {CATEGORY_ORDER.map((category) => {
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
                      height: 1,
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
                      <PresetCard
                        name={name}
                        preset={preset}
                        mode={mode}
                        themeSet={themeSet}
                        onApply={handleApplyTheme}
                        onCopy={handleCopyColor}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Stack>
      </Stack>

      <ColorCopyFeedback color={copiedColor} />
    </>
  );
}
