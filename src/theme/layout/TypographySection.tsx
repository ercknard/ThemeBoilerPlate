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
            lg: 8
          },
          pt: {
            xs: 4,
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
                    description: 'Primary page-level heading.'
                  },
                  {
                    variant: 'h2' as const,
                    label: 'Heading 2',
                    description: 'Major section heading.'
                  },
                  {
                    variant: 'h3' as const,
                    label: 'Heading 3',
                    description: 'Secondary section heading.'
                  },
                  {
                    variant: 'h4' as const,
                    label: 'Heading 4',
                    description: 'Content group heading.'
                  },
                  {
                    variant: 'h5' as const,
                    label: 'Heading 5',
                    description: 'Smaller content heading.'
                  },
                  {
                    variant: 'h6' as const,
                    label: 'Heading 6',
                    description: 'Compact heading.'
                  }
                ].map((item, index) => (
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
                          md: '140px 1fr'
                        },
                        gap: {
                          xs: 1,
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

                    {index < 5 && <AppDivider />}
                  </React.Fragment>
                ))}

                <AppDivider sx={{ my: 2 }} />

                {/* ---------------------------------------------------------- */}
                {/* BODY / SUPPORTING TYPES                                    */}
                {/* ---------------------------------------------------------- */}

                <Stack spacing={3}>
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
                      subtitle1
                    </Typography>

                    <Typography variant="subtitle1">
                      Supporting text for headings and sections.
                    </Typography>
                  </Box>

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
                      subtitle2
                    </Typography>

                    <Typography variant="subtitle2">
                      Smaller supporting text for secondary content.
                    </Typography>
                  </Box>

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
                      body1
                    </Typography>

                    <Typography variant="body1">
                      This is the primary body text used for normal application
                      content. It uses a comfortable line height for longer
                      reading and general interface content.
                    </Typography>
                  </Box>

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
                      body2
                    </Typography>

                    <Typography variant="body2">
                      Smaller body text for secondary information, descriptions,
                      metadata, and supporting UI content.
                    </Typography>
                  </Box>

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
                      button
                    </Typography>

                    <Typography variant="button">BUTTON TYPOGRAPHY</Typography>
                  </Box>

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
                      caption
                    </Typography>

                    <Typography variant="caption">
                      Small supporting information and metadata.
                    </Typography>
                  </Box>

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
                      overline
                    </Typography>

                    <Typography variant="overline">OVERLINE LABEL</Typography>
                  </Box>
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
                    {/* Variant metadata */}

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        minWidth: 0,
                        alignItems: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          flexShrink: 0,
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
                        {item.variant}
                      </Typography>
                    </Stack>

                    {/* Preview */}

                    <Box
                      sx={{
                        minHeight: 90,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant={item.variant}>
                        {item.text}
                      </Typography>
                    </Box>

                    <AppDivider />

                    {/* Description */}

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
