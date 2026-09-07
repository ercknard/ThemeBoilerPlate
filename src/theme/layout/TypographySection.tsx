'use client';

import Head from 'next/head';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { THEME_SETS } from '@/theme/theme';
import { useThemeContext } from '@/contexts/themeContext';
import { AppDivider, AppPaper } from '@/theme/components/CustomComponents';
import { TypographyUsageSection } from '@/theme/components/ShowcaseComponents';
import { customTypography } from '../../utils/showcase-data';
import React from 'react';

export default function TypographySection() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();
  const colorScale = theme.colorScale;
  const grayScale = theme.grayScale;
  const secondaryScale = theme.secondaryScale;

  return (
    <>
      <Head>
        <title>
          BoilerPlate | Typography | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>

        <meta
          name="description"
          content="A flexible MUI theme system with dynamic color scales, semantic surfaces, typography, and responsive components."
        />
      </Head>
      <Stack
        spacing={{ xs: 5, md: 8 }}
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
        {/* ================================================================ */}
        {/* STANDARD TYPOGRAPHY                                               */}
        {/* ================================================================ */}

        <Box id="typography-standard-typography">
          <Stack spacing={3}>
            <Stack>
              <Typography
                variant="overlineCustom"
                sx={{
                  color: colorScale[9],
                  fontWeight: 700,
                  letterSpacing: '0.12em'
                }}
              >
                TYPOGRAPHY
              </Typography>
              <Typography variant="sectionTitle">
                Standard Typography
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                MUI&apos;s standard typography variants with responsive sizing,
                consistent line heights, and theme-based font weights.
              </Typography>
            </Stack>

            <AppPaper
              variant="outlined"
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                  lg: 5
                },
                borderColor: secondaryScale[6]
              }}
            >
              <Stack spacing={0}>
                {[
                  {
                    variant: 'h1' as const,
                    label: 'Heading 1',
                    description: 'Primary page-level heading.',
                    size: 'clamp(2.25rem, 4vw, 3.5rem)'
                  },
                  {
                    variant: 'h2' as const,
                    label: 'Heading 2',
                    description: 'Major section heading.',
                    size: 'clamp(1.875rem, 3.5vw, 3rem)'
                  },
                  {
                    variant: 'h3' as const,
                    label: 'Heading 3',
                    description: 'Secondary section heading.',
                    size: 'clamp(1.625rem, 3vw, 2.5rem)'
                  },
                  {
                    variant: 'h4' as const,
                    label: 'Heading 4',
                    description: 'Content group heading.',
                    size: 'clamp(1.375rem, 2.5vw, 2rem)'
                  },
                  {
                    variant: 'h5' as const,
                    label: 'Heading 5',
                    description: 'Smaller content heading.',
                    size: 'clamp(1.2rem, 2vw, 1.5rem)'
                  },
                  {
                    variant: 'h6' as const,
                    label: 'Heading 6',
                    description: 'Compact heading.',
                    size: 'clamp(1.05rem, 1.5vw, 1.25rem)'
                  }
                ].map((item, index, items) => (
                  <React.Fragment key={item.variant}>
                    <Box
                      sx={{
                        py: {
                          xs: 2,
                          sm: 2.5
                        },
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: '1fr',
                          md: '180px 1fr'
                        },
                        gap: {
                          xs: 1.5,
                          md: 3
                        },
                        alignItems: 'center'
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            color: secondaryScale[11],
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                          }}
                        >
                          {item.variant}
                        </Typography>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 0.5,
                            color: grayScale[11],
                            fontFamily: 'monospace',
                            fontSize: '0.7rem',
                            wordBreak: 'break-word'
                          }}
                        >
                          {item.size}
                        </Typography>

                        <Typography
                          variant="small"
                          sx={{
                            display: {
                              xs: 'none',
                              md: 'block'
                            },
                            mt: 0.5,
                            color: grayScale[11]
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>

                      <Typography variant={item.variant}>
                        {item.label}
                      </Typography>
                    </Box>

                    {index < items.length - 1 && <AppDivider />}
                  </React.Fragment>
                ))}

                <AppDivider sx={{ my: 2 }} />

                <Stack spacing={3}>
                  {[
                    {
                      variant: 'subtitle1' as const,
                      description: 'Supporting text for headings and sections.',
                      text: 'Supporting text for headings and sections.',
                      size: 'clamp(0.95rem, 1.2vw, 1rem)'
                    },
                    {
                      variant: 'subtitle2' as const,
                      description:
                        'Smaller supporting text for secondary content.',
                      text: 'Smaller supporting text for secondary content.',
                      size: 'clamp(0.825rem, 1vw, 0.875rem)'
                    },
                    {
                      variant: 'body1' as const,
                      description:
                        'Primary body text for normal application content.',
                      text: 'This is the primary body text used for normal application content. It uses a comfortable line height for longer reading and general interface content.',
                      size: 'clamp(0.9rem, 1vw, 1rem)'
                    },
                    {
                      variant: 'body2' as const,
                      description:
                        'Secondary body text, descriptions, metadata, and supporting UI.',
                      text: 'Smaller body text for secondary information, descriptions, metadata, and supporting UI content.',
                      size: 'clamp(0.8rem, 0.9vw, 0.875rem)'
                    },
                    {
                      variant: 'button' as const,
                      description: 'Typography used for interactive buttons.',
                      text: 'BUTTON TYPOGRAPHY',
                      size: 'clamp(0.8rem, 0.9vw, 0.875rem)'
                    },
                    {
                      variant: 'caption' as const,
                      description: 'Small supporting information and metadata.',
                      text: 'Small supporting information and metadata.',
                      size: 'clamp(0.7rem, 0.8vw, 0.75rem)'
                    },
                    {
                      variant: 'overline' as const,
                      description: 'Uppercase labels and category indicators.',
                      text: 'OVERLINE LABEL',
                      size: 'clamp(0.65rem, 0.7vw, 0.7rem)'
                    }
                  ].map((item) => (
                    <Box
                      key={item.variant}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: '1fr',
                          md: '180px 1fr'
                        },
                        gap: {
                          xs: 1.5,
                          md: 3
                        },
                        alignItems: 'start'
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mb: 0.5,
                            color: secondaryScale[11],
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                          }}
                        >
                          {item.variant}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            color: grayScale[11],
                            fontFamily: 'monospace',
                            fontSize: '0.7rem',
                            lineHeight: 1.5,
                            wordBreak: 'break-word'
                          }}
                        >
                          {item.size}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            display: {
                              xs: 'none',
                              md: 'block'
                            },
                            mt: 0.5,
                            color: grayScale[11]
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant={item.variant}>
                          {item.text}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </AppPaper>
          </Stack>
        </Box>

        {/* ================================================================ */}
        {/* CUSTOM TYPOGRAPHY                                                 */}
        {/* ================================================================ */}

        <Box id="typography-custom-typography">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Custom Typography
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                Purpose-built variants defined by the theme for recurring
                application patterns and specialized interface content.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, minmax(0, 1fr))'
                },
                gap: 2
              }}
            >
              {customTypography.map((item) => (
                <AppPaper
                  key={item.variant}
                  variant="outlined"
                  sx={{
                    p: {
                      xs: 2.5,
                      sm: 3
                    },
                    height: '100%',
                    borderColor: secondaryScale[6],
                    transition: 'border-color 180ms ease, transform 180ms ease',
                    '&:hover': {
                      borderColor: secondaryScale[8],
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        minWidth: 0,
                        alignItems: 'flex-start'
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          mt: '.25rem !important',
                          flexShrink: 0,
                          borderRadius: '50%',
                          bgcolor: secondaryScale[8]
                        }}
                      />

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            color: secondaryScale[11],
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                          }}
                        >
                          {item.variant}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mt: 0.5,
                            color: grayScale[11],
                            fontFamily: 'monospace',
                            fontSize: '0.7rem',
                            lineHeight: 1.5,
                            wordBreak: 'break-word'
                          }}
                        >
                          {item.size}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box
                      sx={{
                        minHeight: 90,
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <Typography variant={item.variant}>
                        {item.text}
                      </Typography>
                    </Box>

                    <AppDivider />

                    <Typography
                      variant="small"
                      sx={{
                        color: grayScale[11],
                        lineHeight: 1.6
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Stack>
                </AppPaper>
              ))}
            </Box>
          </Stack>
        </Box>

        {/* ================================================================ */}
        {/* USAGE                                                             */}
        {/* ================================================================ */}

        <Box id="typography-how-to-use-typography">
          <TypographyUsageSection />
        </Box>

        {/* ================================================================ */}
        {/* RESPONSIVE TYPOGRAPHY                                             */}
        {/* ================================================================ */}

        <Box id="typography-responsive-typography">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Responsive Typography
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                Typography uses CSS <code>clamp()</code> to scale smoothly
                across viewport sizes without requiring breakpoint-specific font
                sizes.
              </Typography>
            </Box>

            <AppPaper
              variant="outlined"
              sx={{
                position: 'relative',
                overflow: 'hidden',
                p: {
                  xs: 3,
                  sm: 4,
                  md: 6,
                  lg: 8,
                  xl: 10
                },
                borderColor: secondaryScale[6]
              }}
            >
              {/* Decorative background */}

              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  opacity: 0.35,
                  background: `
                radial-gradient(
                  circle at 85% 15%,
                  ${secondaryScale[3]} 0,
                  transparent 32%
                )
              `
                }}
              />

              <Stack
                spacing={{
                  xs: 2,
                  md: 3
                }}
                sx={{
                  position: 'relative'
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: secondaryScale[8]
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      color: secondaryScale[11],
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    Fluid Type Scale
                  </Typography>
                </Stack>

                <Typography variant="display">Resize the window</Typography>

                <Typography
                  variant="lead"
                  sx={{
                    color: secondaryScale[11]
                  }}
                >
                  This heading and supporting text automatically scale between
                  their minimum and maximum sizes, creating a smoother reading
                  experience across phones, tablets, laptops, and large
                  displays.
                </Typography>

                <AppDivider sx={{ my: 1 }} />

                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row'
                  }}
                  spacing={{
                    xs: 1.5,
                    sm: 4
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mb: 0.5,
                        color: grayScale[11]
                      }}
                    >
                      Mobile
                    </Typography>

                    <Typography variant="small">Compact scale</Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mb: 0.5,
                        color: grayScale[11]
                      }}
                    >
                      Tablet
                    </Typography>

                    <Typography variant="small">Intermediate scale</Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mb: 0.5,
                        color: grayScale[11]
                      }}
                    >
                      Desktop
                    </Typography>

                    <Typography variant="small">Expanded scale</Typography>
                  </Box>
                </Stack>
              </Stack>
            </AppPaper>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
