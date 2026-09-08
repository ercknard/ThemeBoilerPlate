'use client';

import Head from 'next/head';
import React from 'react';

import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useThemeContext } from '@/contexts/themeContext';
import { AppDivider, AppPaper } from '@/theme/components/CustomComponents';
import { THEME_SETS } from '@/theme/theme';
import { alpha } from '@mui/material/styles';

const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1440,
  xxl: 1600,
  xxxl: 1920,
  xxxxl: 2560
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;

const BREAKPOINT_DATA: {
  key: BreakpointKey;
  label: string;
  description: string;
}[] = [
  {
    key: 'xs',
    label: 'Extra Small',
    description: 'Phones and compact mobile layouts.'
  },
  {
    key: 'sm',
    label: 'Small',
    description: 'Large phones and small tablets.'
  },
  {
    key: 'md',
    label: 'Medium',
    description: 'Tablets and compact desktop layouts.'
  },
  {
    key: 'lg',
    label: 'Large',
    description: 'Standard desktop displays.'
  },
  {
    key: 'xl',
    label: 'Extra Large',
    description: 'Large desktop and laptop displays.'
  },
  {
    key: 'xxl',
    label: '2X Large',
    description: 'Wide desktop displays.'
  },
  {
    key: 'xxxl',
    label: '3X Large',
    description: 'Large monitors and high-resolution displays.'
  },
  {
    key: 'xxxxl',
    label: '4X Large',
    description: 'Ultra-wide and very large displays.'
  }
];

const BREAKPOINT_KEYS = Object.keys(BREAKPOINTS) as BreakpointKey[];

function getBreakpointRange(key: BreakpointKey, index: number): string {
  const current = BREAKPOINTS[key];
  const next = BREAKPOINT_KEYS[index + 1];

  if (!next) {
    return `${current}px and above`;
  }

  return `${current}px – ${BREAKPOINTS[next] - 1}px`;
}

export default function BreakpointsSection() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();

  const colorScale = theme.colorScale;
  const grayScale = theme.grayScale;
  const secondaryScale = theme.secondaryScale;

  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isXxl = useMediaQuery(theme.breakpoints.up('xxl'));
  const isXxxl = useMediaQuery(theme.breakpoints.up('xxxl'));
  const isXxxxl = useMediaQuery(theme.breakpoints.up('xxxxl'));

  const activeBreakpoint: BreakpointKey = !isSm
    ? 'xs'
    : !isMd
      ? 'sm'
      : !isLg
        ? 'md'
        : !isXl
          ? 'lg'
          : !isXxl
            ? 'xl'
            : !isXxxl
              ? 'xxl'
              : !isXxxxl
                ? 'xxxl'
                : 'xxxxl';

  const activeIndex = BREAKPOINT_KEYS.indexOf(activeBreakpoint);

  return (
    <>
      <Head>
        <title>
          BoilerPlate | Breakpoints | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>

        <meta
          name="description"
          content="Responsive breakpoint system with mobile, tablet, desktop, wide-screen, and ultra-wide layouts."
        />
      </Head>

      <Stack
        spacing={{ xs: 5, md: 7, xxl: 8 }}
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xxl: 6,
            xxxl: 8
          },
          pt: {
            xs: 0,
            md: 5,
            lg: 4
          },
          pb: {
            xs: 4,
            md: 6
          }
        }}
      >
        <Box id="breakpoints-overview">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography
                variant="overlineCustom"
                sx={{
                  color: colorScale[9],
                  fontWeight: 700,
                  letterSpacing: '0.12em'
                }}
              >
                RESPONSIVE SYSTEM
              </Typography>

              <Typography variant="sectionTitle">Breakpoints</Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: 820,
                  color: grayScale[11]
                }}
              >
                A unified responsive scale for phones, tablets, desktops, wide
                displays, and ultra-wide screens. Use these values consistently
                across layout, spacing, typography, visibility, and component
                sizing.
              </Typography>
            </Stack>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                  lg: 4
                },
                borderColor: secondaryScale[6],
                overflow: 'hidden'
              }}
            >
              <Stack spacing={3}>
                <Stack spacing={0.75}>
                  <Typography variant="h5">Responsive scale</Typography>

                  <Typography
                    variant="small"
                    sx={{
                      color: grayScale[11]
                    }}
                  >
                    Each breakpoint represents the minimum viewport width where
                    the next responsive layout can take effect.
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, minmax(0, 1fr))',
                      sm: 'repeat(4, minmax(0, 1fr))',
                      lg: 'repeat(8, minmax(0, 1fr))'
                    },
                    gap: {
                      xs: 1,
                      sm: 1.5
                    }
                  }}
                >
                  {BREAKPOINT_DATA.map((item, index) => {
                    const active = item.key === activeBreakpoint;

                    return (
                      <Box
                        key={item.key}
                        sx={{
                          position: 'relative',
                          minHeight: {
                            xs: 110,
                            sm: 120
                          },
                          p: {
                            xs: 1.5,
                            sm: 2
                          },
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          border: '1px solid',
                          borderColor: active
                            ? secondaryScale[8]
                            : secondaryScale[5],
                          borderRadius: 2,
                          backgroundColor: active
                            ? secondaryScale[3]
                            : secondaryScale[2],
                          boxShadow: active
                            ? `0 0 0 1px ${secondaryScale[7]}`
                            : 'none',
                          transition:
                            'border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: active ? secondaryScale[11] : grayScale[11],
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                          }}
                        >
                          {item.key}
                        </Typography>

                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: 'monospace',
                              fontWeight: 700
                            }}
                          >
                            {BREAKPOINTS[item.key]}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: grayScale[11]
                            }}
                          >
                            px
                          </Typography>
                        </Box>

                        {active && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              width: 7,
                              height: 7,
                              borderRadius: '50%',
                              bgcolor: secondaryScale[8],
                              boxShadow: `0 0 0 4px ${secondaryScale[3]}`
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Stack>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-current">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Current Breakpoint
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 760
                }}
              >
                Resize the browser window to see which breakpoint is currently
                active. The highlighted breakpoint updates automatically as the
                viewport crosses each threshold.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                  lg: 6
                },
                borderColor: secondaryScale[6]
              }}
            >
              <Stack spacing={4}>
                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row'
                  }}
                  spacing={3}
                  sx={{
                    alignItems: {
                      xs: 'flex-start',
                      sm: 'center'
                    },
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mb: 0.75,
                        color: secondaryScale[11],
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}
                    >
                      Active breakpoint
                    </Typography>

                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: 'monospace',
                        lineHeight: 1,
                        color: secondaryScale[11]
                      }}
                    >
                      {activeBreakpoint}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      px: 2,
                      py: 1.25,
                      borderRadius: 2,
                      bgcolor: secondaryScale[3],
                      border: '1px solid',
                      borderColor: secondaryScale[6]
                    }}
                  >
                    <Typography
                      variant="small"
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700
                      }}
                    >
                      {getBreakpointRange(activeBreakpoint, activeIndex)}
                    </Typography>
                  </Box>
                </Stack>

                <AppDivider />

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, minmax(0, 1fr))',
                      sm: 'repeat(4, minmax(0, 1fr))',
                      lg: 'repeat(8, minmax(0, 1fr))'
                    },
                    gap: 1
                  }}
                >
                  {BREAKPOINT_DATA.map((item) => {
                    const active = item.key === activeBreakpoint;

                    return (
                      <Box
                        key={item.key}
                        sx={{
                          minHeight: 74,
                          p: 1.25,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          border: '1px solid',
                          borderColor: active
                            ? secondaryScale[8]
                            : secondaryScale[5],
                          borderRadius: 1.5,
                          bgcolor: active ? secondaryScale[3] : 'transparent',
                          transition:
                            'border-color 180ms ease, background-color 180ms ease'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: active ? secondaryScale[11] : grayScale[11]
                          }}
                        >
                          {item.key}
                        </Typography>

                        <Typography
                          variant="small"
                          sx={{
                            mt: 0.25,
                            fontFamily: 'monospace',
                            color: grayScale[11]
                          }}
                        >
                          {BREAKPOINTS[item.key]}px
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Stack>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-responsive-grid">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Responsive Grid
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 780
                }}
              >
                Grid density increases as more horizontal space becomes
                available. This pattern is useful for cards, dashboards,
                galleries, and content collections.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4
                },
                borderColor: secondaryScale[6]
              }}
            >
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, minmax(0, 1fr))',
                      md: 'repeat(3, minmax(0, 1fr))',
                      lg: 'repeat(4, minmax(0, 1fr))',
                      xxl: 'repeat(6, minmax(0, 1fr))'
                    },
                    gap: {
                      xs: 1.5,
                      sm: 2,
                      lg: 2.5
                    }
                  }}
                >
                  {Array.from({ length: 12 }).map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        minHeight: {
                          xs: 80,
                          sm: 100,
                          md: 110,
                          lg: 120
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: secondaryScale[6],
                        bgcolor: secondaryScale[2],
                        transition:
                          'transform 180ms ease, border-color 180ms ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          borderColor: secondaryScale[8]
                        }
                      }}
                    >
                      <Typography
                        variant="small"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: secondaryScale[11]
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          mt: 0.5,
                          color: grayScale[11]
                        }}
                      >
                        Grid item
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <AppDivider />

                <Typography
                  variant="small"
                  sx={{
                    color: grayScale[11],
                    fontFamily: 'monospace'
                  }}
                >
                  xs: 1 → sm: 2 → md: 3 → lg: 4 → xxl: 6 columns
                </Typography>
              </Stack>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-responsive-spacing">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Responsive Spacing
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 780
                }}
              >
                Spacing can progressively increase on larger displays, giving
                content more breathing room without wasting space on smaller
                screens.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                  lg: 5,
                  xl: 6,
                  xxl: 7,
                  xxxl: 8,
                  xxxxl: 10
                },
                borderColor: secondaryScale[6]
              }}
            >
              <Box
                sx={{
                  minHeight: {
                    xs: 150,
                    sm: 180,
                    md: 210,
                    lg: 240
                  },
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 5,
                    xl: 6,
                    xxl: 7,
                    xxxl: 8,
                    xxxxl: 10
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  border: '1px dashed',
                  borderColor: secondaryScale[7],
                  borderRadius: 2,
                  bgcolor: secondaryScale[2]
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="h5">Responsive Padding</Typography>

                  <Typography
                    variant="small"
                    sx={{
                      color: grayScale[11],
                      fontFamily: 'monospace'
                    }}
                  >
                    xs: 2 → sm: 3 → md: 4 → lg: 5 → xl: 6 → xxl: 7 → xxxl: 8 →
                    xxxxl: 10
                  </Typography>
                </Stack>
              </Box>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-responsive-typography">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Responsive Typography
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 780
                }}
              >
                Typography can scale independently at each breakpoint while
                preserving the same visual hierarchy and reading experience.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                  lg: 6,
                  xl: 7,
                  xxl: 8
                },
                borderColor: secondaryScale[6],
                overflow: 'hidden'
              }}
            >
              <Stack spacing={2}>
                <Typography
                  variant="caption"
                  sx={{
                    color: secondaryScale[11],
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  Responsive heading
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: {
                      xs: '1.875rem',
                      sm: '2.25rem',
                      md: '2.5rem',
                      lg: '3rem',
                      xxl: '3.5rem',
                      xxxl: '4rem',
                      xxxxl: '4.5rem'
                    },
                    lineHeight: 1.1
                  }}
                >
                  Scales with the viewport
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: {
                      xs: '100%',
                      md: '75%',
                      lg: '65%',
                      xxl: '55%'
                    },
                    color: grayScale[11]
                  }}
                >
                  Combining your custom breakpoint scale with responsive
                  typography keeps headings, paragraphs, and supporting content
                  balanced across different display sizes.
                </Typography>
              </Stack>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-responsive-hero">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Responsive Hero
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 780
                }}
              >
                A live hero component demonstrating how layout, spacing,
                typography, alignment, buttons, and visual proportions can
                change at different breakpoints.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: 0,
                overflow: 'hidden',
                borderColor: secondaryScale[6]
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  minHeight: {
                    xs: 440,
                    sm: 480,
                    md: 520,
                    lg: 560,
                    xl: 600,
                    xxl: 640,
                    xxxl: 700,
                    xxxxl: 760
                  },
                  display: 'flex',
                  alignItems: {
                    xs: 'flex-end',
                    md: 'center'
                  },
                  overflow: 'hidden',
                  bgcolor: secondaryScale[2]
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `
              radial-gradient(
                circle at 75% 30%,
                ${alpha(colorScale[9], 0.22)} 0%,
                transparent 35%
              ),
              radial-gradient(
                circle at 20% 80%,
                ${alpha(secondaryScale[9], 0.2)} 0%,
                transparent 40%
              )
            `
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    width: {
                      xs: 180,
                      sm: 240,
                      md: 320,
                      lg: 400,
                      xl: 480,
                      xxl: 560,
                      xxxl: 640,
                      xxxxl: 760
                    },
                    height: {
                      xs: 180,
                      sm: 240,
                      md: 320,
                      lg: 400,
                      xl: 480,
                      xxl: 560,
                      xxxl: 640,
                      xxxxl: 760
                    },
                    right: {
                      xs: -70,
                      sm: -80,
                      md: -60,
                      lg: 0,
                      xxl: 40,
                      xxxl: 80,
                      xxxxl: 120
                    },
                    top: {
                      xs: -30,
                      sm: -40,
                      md: -60,
                      lg: -80,
                      xxl: -100
                    },
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: alpha(colorScale[9], 0.2),
                    boxShadow: `
              0 0 80px ${alpha(colorScale[9], 0.12)},
              inset 0 0 80px ${alpha(secondaryScale[9], 0.08)}
            `,
                    transform: 'rotate(12deg)'
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    width: {
                      xs: 120,
                      sm: 160,
                      md: 220,
                      lg: 280,
                      xl: 340,
                      xxl: 400
                    },
                    height: {
                      xs: 120,
                      sm: 160,
                      md: 220,
                      lg: 280,
                      xl: 340,
                      xxl: 400
                    },
                    right: {
                      xs: 10,
                      sm: 30,
                      md: 80,
                      lg: 140,
                      xxl: 220
                    },
                    top: {
                      xs: 80,
                      sm: 90,
                      md: 110,
                      lg: 130
                    },
                    borderRadius: '50%',
                    border: '1px dashed',
                    borderColor: alpha(secondaryScale[9], 0.35),
                    transform: 'rotate(-18deg)'
                  }}
                />

                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: {
                      xs: '100%',
                      sm: 700,
                      md: 900,
                      lg: 1100,
                      xl: 1250,
                      xxl: 1450,
                      xxxl: 1650,
                      xxxxl: 1850
                    },
                    mx: 'auto',
                    px: {
                      xs: 2.5,
                      sm: 4,
                      md: 6,
                      lg: 8,
                      xl: 10,
                      xxl: 12,
                      xxxl: 14,
                      xxxxl: 16
                    },
                    py: {
                      xs: 4,
                      sm: 5,
                      md: 6,
                      lg: 7,
                      xl: 8,
                      xxl: 10,
                      xxxl: 12,
                      xxxxl: 14
                    }
                  }}
                >
                  <Stack
                    direction={{
                      xs: 'column',
                      md: 'row'
                    }}
                    spacing={{
                      xs: 4,
                      sm: 5,
                      md: 6,
                      lg: 8,
                      xxl: 10
                    }}
                    sx={{
                      alignItems: {
                        xs: 'flex-start',
                        md: 'center'
                      },
                      justifyContent: 'space-between'
                    }}
                  >
                    <Stack
                      spacing={{
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                        lg: 3.5
                      }}
                      sx={{
                        width: {
                          xs: '100%',
                          md: '58%',
                          lg: '55%',
                          xxl: '52%'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          width: 'fit-content',
                          px: {
                            xs: 1.25,
                            md: 1.5
                          },
                          py: 0.75,
                          borderRadius: 999,
                          border: '1px solid',
                          borderColor: alpha(colorScale[9], 0.35),
                          bgcolor: alpha(colorScale[9], 0.08)
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: colorScale[9],
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                          }}
                        >
                          Responsive Design
                        </Typography>
                      </Box>

                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: {
                            xs: '2.25rem',
                            sm: '2.75rem',
                            md: '3.5rem',
                            lg: '4.25rem',
                            xl: '4.75rem',
                            xxl: '5.25rem',
                            xxxl: '5.75rem',
                            xxxxl: '6.5rem'
                          },
                          lineHeight: {
                            xs: 1.08,
                            md: 1.05
                          },
                          letterSpacing: {
                            xs: '-0.025em',
                            lg: '-0.04em'
                          },
                          fontWeight: 800
                        }}
                      >
                        Built for every screen.
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          maxWidth: {
                            xs: '100%',
                            sm: 620,
                            md: 680,
                            lg: 720,
                            xxl: 780
                          },
                          fontSize: {
                            xs: '0.95rem',
                            sm: '1rem',
                            md: '1.05rem',
                            lg: '1.1rem',
                            xxl: '1.2rem'
                          },
                          lineHeight: 1.7,
                          color: grayScale[11]
                        }}
                      >
                        This hero demonstrates how a single component can
                        progressively change its typography, spacing, alignment,
                        width, and visual scale as the viewport grows.
                      </Typography>

                      <Stack
                        direction={{
                          xs: 'column',
                          sm: 'row'
                        }}
                        spacing={{
                          xs: 1.25,
                          sm: 1.5,
                          md: 2
                        }}
                        sx={{
                          width: {
                            xs: '100%',
                            sm: 'auto'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            px: {
                              xs: 2.5,
                              md: 3
                            },
                            py: {
                              xs: 1.25,
                              md: 1.5
                            },
                            width: {
                              xs: '100%',
                              sm: 'auto'
                            },
                            textAlign: 'center',
                            borderRadius: 1.75,
                            bgcolor: colorScale[9],
                            color: colorScale.contrast,
                            fontWeight: 700,
                            fontSize: {
                              xs: '0.85rem',
                              md: '0.95rem'
                            }
                          }}
                        >
                          Get Started
                        </Box>

                        <Box
                          sx={{
                            px: {
                              xs: 2.5,
                              md: 3
                            },
                            py: {
                              xs: 1.25,
                              md: 1.5
                            },
                            width: {
                              xs: '100%',
                              sm: 'auto'
                            },
                            textAlign: 'center',
                            borderRadius: 1.75,
                            border: '1px solid',
                            borderColor: secondaryScale[7],
                            color: secondaryScale[11],
                            fontWeight: 700,
                            fontSize: {
                              xs: '0.85rem',
                              md: '0.95rem'
                            }
                          }}
                        >
                          Explore System
                        </Box>
                      </Stack>
                    </Stack>

                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          sm: 280,
                          md: 320,
                          lg: 380,
                          xl: 420,
                          xxl: 480,
                          xxxl: 540,
                          xxxxl: 620
                        },
                        height: {
                          xs: 180,
                          sm: 220,
                          md: 280,
                          lg: 320,
                          xl: 360,
                          xxl: 420,
                          xxxl: 480,
                          xxxxl: 540
                        },
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: {
                          xs: 3,
                          md: 4,
                          xxl: 5
                        },
                        border: '1px solid',
                        borderColor: alpha(secondaryScale[8], 0.5),
                        bgcolor: alpha(secondaryScale[3], 0.5),
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: `0 24px 80px ${alpha(
                          secondaryScale[10],
                          0.12
                        )}`
                      }}
                    >
                      <Stack
                        spacing={{
                          xs: 1,
                          md: 1.5,
                          lg: 2
                        }}
                        sx={{
                          width: '80%',
                          textAlign: 'center'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: grayScale[11],
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 700
                          }}
                        >
                          Active viewport
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            fontSize: {
                              xs: '2.5rem',
                              sm: '3rem',
                              md: '3.5rem',
                              lg: '4rem',
                              xxl: '4.5rem'
                            },
                            color: secondaryScale[11]
                          }}
                        >
                          {activeBreakpoint}
                        </Typography>

                        <Box
                          sx={{
                            height: 6,
                            width: '100%',
                            borderRadius: 999,
                            bgcolor: secondaryScale[4],
                            overflow: 'hidden'
                          }}
                        >
                          <Box
                            sx={{
                              width: `${((activeIndex + 1) / BREAKPOINT_KEYS.length) * 100}%`,
                              height: '100%',
                              borderRadius: 999,
                              bgcolor: colorScale[9],
                              transition: 'width 300ms ease'
                            }}
                          />
                        </Box>

                        <Typography
                          variant="small"
                          sx={{
                            color: grayScale[11],
                            fontFamily: 'monospace'
                          }}
                        >
                          {BREAKPOINTS[activeBreakpoint]}px+
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-responsive-container">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Responsive Container
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 780
                }}
              >
                Containers can progressively widen while maintaining comfortable
                reading widths and predictable horizontal margins.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4
                },
                borderColor: secondaryScale[6],
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  mx: 'auto',
                  px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 5,
                    xxl: 6
                  },
                  py: {
                    xs: 4,
                    md: 6
                  },
                  borderRadius: 2,
                  bgcolor: secondaryScale[2],
                  border: '1px solid',
                  borderColor: secondaryScale[5]
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: {
                      xs: '100%',
                      sm: 540,
                      md: 720,
                      lg: 960,
                      xl: 1140,
                      xxl: 1320,
                      xxxl: 1600,
                      xxxxl: 1920
                    },
                    mx: 'auto',
                    p: {
                      xs: 2,
                      sm: 3,
                      md: 4
                    },
                    borderRadius: 2,
                    border: '1px dashed',
                    borderColor: secondaryScale[7],
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h6">
                    Responsive content container
                  </Typography>

                  <Typography
                    variant="small"
                    sx={{
                      display: 'block',
                      mt: 1,
                      color: grayScale[11],
                      fontFamily: 'monospace'
                    }}
                  >
                    max-width changes with the viewport
                  </Typography>
                </Box>
              </Box>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-responsive-visibility">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Responsive Visibility
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 780
                }}
              >
                Responsive styles can also control which elements are visible at
                different screen sizes.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4
                },
                borderColor: secondaryScale[6]
              }}
            >
              <Stack spacing={1.5}>
                {BREAKPOINT_DATA.map((item) => (
                  <Box
                    key={item.key}
                    sx={{
                      display: {
                        xs: 'none',
                        [item.key]: 'flex'
                      },
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      p: 2,
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: secondaryScale[5],
                      bgcolor: secondaryScale[2]
                    }}
                  >
                    <Typography
                      variant="small"
                      sx={{
                        fontWeight: 700
                      }}
                    >
                      Visible from {item.key}
                    </Typography>

                    <Typography
                      variant="small"
                      sx={{
                        color: grayScale[11],
                        fontFamily: 'monospace'
                      }}
                    >
                      {BREAKPOINTS[item.key]}px+
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-reference">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Breakpoint Reference
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 780
                }}
              >
                Use these values consistently throughout the application when
                defining responsive styles.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4
                },
                borderColor: secondaryScale[6],
                overflow: 'hidden'
              }}
            >
              <Stack spacing={0}>
                {BREAKPOINT_DATA.map((item, index) => {
                  const active = item.key === activeBreakpoint;

                  return (
                    <React.Fragment key={item.key}>
                      <Box
                        sx={{
                          py: {
                            xs: 2,
                            sm: 2.5
                          },
                          display: 'grid',
                          gridTemplateColumns: {
                            xs: '70px 90px 1fr',
                            sm: '90px 120px 1fr'
                          },
                          gap: {
                            xs: 1.5,
                            sm: 2
                          },
                          alignItems: 'center'
                        }}
                      >
                        <Typography
                          variant="small"
                          sx={{
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            color: active ? secondaryScale[11] : grayScale[11]
                          }}
                        >
                          {item.key}
                        </Typography>

                        <Typography
                          variant="small"
                          sx={{
                            color: active ? secondaryScale[11] : grayScale[11],
                            fontFamily: 'monospace',
                            fontWeight: active ? 700 : 500
                          }}
                        >
                          {BREAKPOINTS[item.key]}px
                        </Typography>

                        <Box
                          sx={{
                            position: 'relative',
                            height: 8,
                            overflow: 'hidden',
                            borderRadius: 999,
                            bgcolor: secondaryScale[3]
                          }}
                        >
                          <Box
                            sx={{
                              width: `${Math.max(
                                3,
                                (BREAKPOINTS[item.key] / BREAKPOINTS.xxxxl) *
                                  100
                              )}%`,
                              height: '100%',
                              borderRadius: 999,
                              bgcolor: active
                                ? secondaryScale[9]
                                : secondaryScale[7],
                              transition: 'width 180ms ease'
                            }}
                          />
                        </Box>
                      </Box>

                      {index < BREAKPOINT_DATA.length - 1 && <AppDivider />}
                    </React.Fragment>
                  );
                })}
              </Stack>
            </AppPaper>
          </Stack>
        </Box>

        <Box id="breakpoints-usage">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Breakpoint Usage
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11],
                  maxWidth: 780
                }}
              >
                Use the breakpoint keys directly inside MUI responsive style
                objects instead of hard-coding media queries.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4
                },
                borderColor: secondaryScale[6]
              }}
            >
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: {
                    xs: 2,
                    sm: 3
                  },
                  overflowX: 'auto',
                  borderRadius: 2,
                  bgcolor: secondaryScale[2],
                  border: '1px solid',
                  borderColor: secondaryScale[5],
                  color: grayScale[11],
                  fontFamily:
                    '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
                  fontSize: {
                    xs: '0.72rem',
                    sm: '0.8rem'
                  },
                  lineHeight: 1.7
                }}
              >
                {`<Box
  sx={{
    px: {
      xs: 2,
      sm: 3,
      md: 4,
      lg: 5,
      xxl: 6
    },

    display: {
      xs: 'block',
      md: 'flex'
    },

    gridTemplateColumns: {
      md: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)',
      xxl: 'repeat(4, 1fr)'
    }
  }}
/>`}
              </Box>
            </AppPaper>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
