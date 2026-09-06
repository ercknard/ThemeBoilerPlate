import Head from 'next/head';
import Image from 'next/image';

import { Box, Container, Divider, Stack, Typography } from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LayersIcon from '@mui/icons-material/Layers';
import SpeedIcon from '@mui/icons-material/Speed';

import { useThemeContext } from '@/contexts/themeContext';

import ThemeToggle from '@/theme/ThemeToggle';

import { AppButton, AppChip } from '@/theme/CustomComponents';
import SkyEffects from '@/theme/SkyEffects';
import { THEME_SETS, THEME_ICONS, type ThemeSetName } from '@/theme/theme';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const FEATURES = [
  {
    icon: <ColorLensIcon />,
    title: 'Dynamic Color Scales',
    description:
      'Build consistent interfaces from carefully structured color scales that adapt with your active theme.'
  },
  {
    icon: <LayersIcon />,
    title: 'Semantic Surfaces',
    description:
      'Separate backgrounds, surfaces, borders, accents, and content colors for predictable UI composition.'
  },
  {
    icon: <AutoAwesomeIcon />,
    title: 'Theme Switching',
    description:
      'Switch between complete visual systems instantly while components automatically follow the active theme.'
  },
  {
    icon: <SpeedIcon />,
    title: 'MUI Native',
    description:
      'Designed around MUI components, tokens, responsive breakpoints, and the sx styling system.'
  }
];

export default function Home() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();

  const themeIcon = THEME_ICONS[themeSet];

  const primary = theme.colorScale[9];
  const primaryStrong = theme.colorScale[8];

  const secondary = theme.secondaryScale[9];
  const secondaryStrong = theme.secondaryScale[8];

  const background = theme.backgroundScale[1];
  const surface = theme.backgroundScale[3];

  const textPrimary = theme.grayScale[12];
  const textSecondary = theme.grayScale[10];

  return (
    <>
      <Head>
        <title>BoilerPlate | Theme System</title>

        <meta
          name="description"
          content="A flexible MUI theme system with dynamic color scales, semantic surfaces, typography, and responsive components."
        />

        <meta name="theme-color" content={background} />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',

          background: `
            radial-gradient(
              circle at 50% -20%,
              ${alpha(primaryStrong, 0.75)},
              transparent 42%
            ),
            radial-gradient(
              circle at 100% 50%,
              ${alpha(secondaryStrong, 0.35)},
              transparent 38%
            ),
            radial-gradient(
              circle at 0% 50%,
              ${alpha(secondaryStrong, 0.35)},
              transparent 38%
            ),
            ${background}
          `,

          color: textPrimary,

          transition: `
            background 0.8s ease-in-out,
            color 0.8s ease-in-out
          `
        }}
      >
        <SkyEffects color={primary} />

        {/* ============================================================ */}
        {/* BACKGROUND DECORATION                                        */}
        {/* ============================================================ */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',

              width: {
                xs: 300,
                md: 600
              },

              height: {
                xs: 300,
                md: 600
              },

              top: {
                xs: -180,
                md: -300
              },

              left: {
                xs: '50%',
                md: '15%'
              },

              transform: 'translateX(-50%)',

              borderRadius: '50%',

              background: `
                radial-gradient(
                  circle,
                  ${alpha(primary, 0.12)} 0%,
                  transparent 68%
                )
              `
            }}
          />

          <Box
            sx={{
              position: 'absolute',

              width: 500,
              height: 500,

              right: -250,
              bottom: -250,

              borderRadius: '50%',

              background: `
                radial-gradient(
                  circle,
                  ${alpha(secondary, 0.12)} 0%,
                  transparent 70%
                )
              `
            }}
          />
        </Box>

        {/* ============================================================ */}
        {/* MAIN CONTENT                                                 */}
        {/* ============================================================ */}

        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,

            py: {
              xs: 6,
              sm: 8,
              md: 10
            }
          }}
        >
          {/* ========================================================== */}
          {/* HEADER                                                      */}
          {/* ========================================================== */}

          <Stack
            spacing={3}
            sx={{
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            {/* LOGO */}

            <Box
              sx={{
                position: 'relative',

                width: {
                  xs: 110,
                  sm: 140,
                  md: 160
                },

                height: {
                  xs: 110,
                  sm: 140,
                  md: 160
                },

                '@keyframes logoFloat': {
                  '0%': {
                    transform: 'translateY(0) scale(1)'
                  },

                  '50%': {
                    transform: 'translateY(-8px) scale(1.025)'
                  },

                  '100%': {
                    transform: 'translateY(0) scale(1)'
                  }
                },

                '@keyframes logoGlow': {
                  '0%, 100%': {
                    opacity: 0.55
                  },

                  '50%': {
                    opacity: 0.9
                  }
                },

                '&::before': {
                  content: '""',

                  position: 'absolute',
                  inset: '-25%',

                  borderRadius: '50%',

                  background: `
                    radial-gradient(
                      circle,
                      ${alpha(primary, 0.18)},
                      transparent 68%
                    )
                  `,

                  filter: 'blur(18px)',

                  animation: 'logoGlow 4s ease-in-out infinite'
                }
              }}
            >
              <Image
                src={themeIcon}
                alt={`${themeSet} theme`}
                fill
                priority
                sizes="160px"
                style={{
                  objectFit: 'contain',

                  filter: `
                    drop-shadow(0 0 10px ${alpha(primary, 0.7)})
                    drop-shadow(0 0 30px ${alpha(primary, 0.45)})
                    drop-shadow(0 15px 35px ${alpha('#000000', 0.35)})
                  `,

                  animation: 'logoFloat 4s ease-in-out infinite'
                }}
              />
            </Box>

            {/* BRAND */}

            <Stack spacing={1} sx={{ alignItems: 'center' }}>
              <Typography
                variant="overlineCustom"
                sx={{
                  color: primary,
                  fontWeight: 700,
                  letterSpacing: '0.16em'
                }}
              >
                CRYPTECHSERVICES
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,

                  fontSize: {
                    xs: '2rem',
                    sm: '2.75rem',
                    md: '3.5rem'
                  },

                  lineHeight: 1.05,

                  background: `
                    linear-gradient(
                      135deg,
                      ${textPrimary},
                      ${alpha(primary, 0.8)}
                    )
                  `,

                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Theme Boilerplate
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: 650,
                  color: textSecondary,

                  fontSize: {
                    xs: '0.95rem',
                    sm: '1.05rem'
                  }
                }}
              >
                A modern design foundation for creating beautiful, scalable, and
                consistent theme-aware interfaces.
              </Typography>
            </Stack>

            {/* THEME TOGGLE */}

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: alpha(theme.secondaryScale[4], 1),

                border: `1px solid ${alpha(secondary, 0.25)}`,

                boxShadow: `
                  0 10px 40px
                  ${alpha('#000000', 0.16)}
                `,

                backdropFilter: 'blur(14px)'
              }}
            >
              <ThemeToggle />
            </Box>
          </Stack>

          {/* ========================================================== */}
          {/* HERO                                                        */}
          {/* ========================================================== */}

          <Box
            sx={{
              mt: {
                xs: 6,
                md: 9
              },

              position: 'relative',

              borderRadius: {
                xs: 4,
                md: 6
              },

              overflow: 'hidden',

              border: `1px solid ${alpha(secondary, 0.3)}`,

              background: `
                linear-gradient(
                  135deg,
                  ${alpha(surface, 0.92)},
                  ${alpha(theme.secondaryScale[3], 0.78)}
                )
              `,

              boxShadow: `
                0 30px 100px
                ${alpha('#000000', 0.28)},
                0 0 70px
                ${alpha(secondary, 0.1)}
              `,

              backdropFilter: 'blur(18px)',

              transition: `
                border-color 0.8s ease,
                background 0.8s ease,
                box-shadow 0.8s ease
              `,

              '&::before': {
                content: '""',

                position: 'absolute',

                width: 550,
                height: 550,

                top: -300,
                right: -150,

                borderRadius: '50%',

                background: `
                  radial-gradient(
                    circle,
                    ${alpha(primary, 0.25)},
                    transparent 70%
                  )
                `,

                pointerEvents: 'none'
              },

              '&::after': {
                content: '""',

                position: 'absolute',

                width: 450,
                height: 450,

                bottom: -300,
                left: -180,

                borderRadius: '50%',

                background: `
                  radial-gradient(
                    circle,
                    ${alpha(secondary, 0.18)},
                    transparent 70%
                  )
                `,

                pointerEvents: 'none'
              }
            }}
          >
            <Stack
              direction={{
                xs: 'column',
                md: 'row'
              }}
              sx={{
                position: 'relative',
                zIndex: 1,

                minHeight: {
                  xs: 560,
                  md: 600
                }
              }}
            >
              {/* ====================================================== */}
              {/* HERO COPY                                               */}
              {/* ====================================================== */}

              <Stack
                spacing={3}
                sx={{
                  justifyContent: 'center',
                  flex: 1,

                  px: {
                    xs: 3,
                    sm: 5,
                    md: 8
                  },

                  py: {
                    xs: 6,
                    md: 8
                  }
                }}
              >
                <Box>
                  <AppChip
                    label={`${themeSet.toUpperCase()} THEME`}
                    color="secondary"
                  />
                </Box>

                <Typography
                  variant="display"
                  sx={{
                    maxWidth: 700,

                    color: textPrimary,

                    fontSize: {
                      xs: '2.3rem',
                      sm: '3.25rem',
                      md: '4.2rem'
                    },

                    lineHeight: 1.02,

                    fontWeight: 800,

                    letterSpacing: '-0.035em',

                    textShadow: `
                      0 0 50px
                      ${alpha(secondary, 0.22)}
                    `
                  }}
                >
                  Build beautiful interfaces with your theme.
                </Typography>

                <Typography
                  variant="lead"
                  sx={{
                    maxWidth: 620,

                    color: textSecondary,

                    fontSize: {
                      xs: '1rem',
                      md: '1.15rem'
                    },

                    lineHeight: 1.7
                  }}
                >
                  A flexible design system with dynamic color scales,
                  typography, surfaces, semantic colors, and responsive
                  components designed to work together seamlessly.
                </Typography>

                {/* ACTIONS */}

                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row'
                  }}
                  spacing={2}
                  sx={{
                    pt: 1
                  }}
                >
                  <AppButton
                    component="a"
                    href="/theme"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 3.5,

                      minHeight: 48,

                      boxShadow: `
                        0 12px 35px
                        ${alpha(primary, 0.35)}
                      `,

                      '&:hover': {
                        boxShadow: `
                          0 15px 45px
                          ${alpha(primary, 0.48)}
                        `
                      }
                    }}
                  >
                    Explore Theme
                  </AppButton>

                  <AppButton
                    component="a"
                    href={GITHUB_URL || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<GitHubIcon />}
                    sx={{
                      px: 3.5,

                      minHeight: 48,

                      backgroundColor: alpha(secondary, 0.08),

                      '&:hover': {
                        backgroundColor: alpha(secondary, 0.16)
                      }
                    }}
                  >
                    View on GitHub
                  </AppButton>
                </Stack>
              </Stack>

              {/* ====================================================== */}
              {/* VISUAL PREVIEW                                          */}
              {/* ====================================================== */}

              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex'
                  },

                  width: {
                    md: 400,
                    lg: 450
                  },

                  alignItems: 'center',
                  justifyContent: 'center',

                  p: 5
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 330,

                    p: 1.5,

                    borderRadius: 4,

                    backgroundColor: alpha(background, 0.72),

                    border: `1px solid ${alpha(secondary, 0.32)}`,

                    boxShadow: `
                      0 25px 70px
                      ${alpha('#000000', 0.35)}
                    `,

                    transform:
                      'perspective(1000px) rotateY(-7deg) rotateX(3deg)',

                    transition: 'transform 0.5s ease',

                    '&:hover': {
                      transform:
                        'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-6px)'
                    }
                  }}
                >
                  <Stack spacing={1.5}>
                    {/* WINDOW */}

                    <Box
                      sx={{
                        height: 42,

                        px: 1.5,

                        display: 'flex',
                        alignItems: 'center',

                        borderRadius: 2,

                        backgroundColor: alpha(surface, 0.8),

                        border: `1px solid ${alpha(secondary, 0.2)}`
                      }}
                    >
                      <Stack direction="row" spacing={0.7}>
                        {[0, 1, 2].map((item) => (
                          <Box
                            key={item}
                            sx={{
                              width: 7,
                              height: 7,

                              borderRadius: '50%',

                              backgroundColor: alpha(textSecondary, 0.45)
                            }}
                          />
                        ))}
                      </Stack>

                      <Typography
                        variant="caption"
                        sx={{
                          ml: 1.5,
                          color: textSecondary
                        }}
                      >
                        Theme Preview
                      </Typography>
                    </Box>

                    {/* CONTENT */}

                    <Box
                      sx={{
                        p: 2,

                        borderRadius: 2,

                        backgroundColor: alpha(surface, 0.65),

                        border: `1px solid ${alpha(secondary, 0.15)}`
                      }}
                    >
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            width: '62%',
                            height: 14,

                            borderRadius: 1,

                            backgroundColor: alpha(textPrimary, 0.75)
                          }}
                        />

                        <Stack spacing={1}>
                          <Box
                            sx={{
                              width: '90%',
                              height: 7,

                              borderRadius: 1,

                              backgroundColor: alpha(textSecondary, 0.3)
                            }}
                          />

                          <Box
                            sx={{
                              width: '74%',
                              height: 7,

                              borderRadius: 1,

                              backgroundColor: alpha(textSecondary, 0.22)
                            }}
                          />
                        </Stack>

                        {/* COLOR PREVIEW */}

                        <Box
                          sx={{
                            height: 105,

                            borderRadius: 2,

                            background: `
                              linear-gradient(
                                135deg,
                                ${secondary},
                                ${primary}
                              )
                            `,

                            boxShadow: `
                              inset 0 0 30px
                              ${alpha('#ffffff', 0.08)},
                              0 10px 30px
                              ${alpha(primary, 0.2)}
                            `
                          }}
                        />

                        {/* COLOR TOKENS */}

                        <Stack direction="row" spacing={1}>
                          {[primary, secondary, textPrimary, textSecondary].map(
                            (color, index) => (
                              <Box
                                key={index}
                                sx={{
                                  flex: 1,
                                  height: 24,

                                  borderRadius: 1,

                                  backgroundColor: color,

                                  border: `1px solid ${alpha('#ffffff', 0.08)}`
                                }}
                              />
                            )
                          )}
                        </Stack>

                        <AppButton
                          fullWidth
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Primary Action
                        </AppButton>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* ========================================================== */}
          {/* FEATURE INTRO                                               */}
          {/* ========================================================== */}

          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              textAlign: 'center',
              mt: {
                xs: 10,
                md: 14
              }
            }}
          >
            <Typography
              variant="overlineCustom"
              sx={{
                color: secondary,
                fontWeight: 700,
                letterSpacing: '0.14em'
              }}
            >
              DESIGNED FOR BUILDERS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,

                fontSize: {
                  xs: '1.8rem',
                  md: '2.5rem'
                }
              }}
            >
              Everything your theme needs.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 650,
                color: textSecondary
              }}
            >
              A structured foundation that keeps colors, components, typography,
              and surfaces visually consistent across your application.
            </Typography>
          </Stack>

          {/* ========================================================== */}
          {/* FEATURES                                                     */}
          {/* ========================================================== */}

          <Box
            sx={{
              mt: 5,

              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)'
              },

              gap: 2
            }}
          >
            {FEATURES.map((feature) => (
              <Box
                key={feature.title}
                sx={{
                  position: 'relative',

                  p: {
                    xs: 3,
                    md: 3.5
                  },

                  minHeight: 220,

                  borderRadius: 3,

                  backgroundColor: alpha(theme.secondaryScale[4], 1),

                  border: `1px solid ${alpha(secondary, 0.18)}`,

                  backdropFilter: 'blur(14px)',

                  transition: `
                    transform 0.3s ease,
                    border-color 0.3s ease,
                    background-color 0.3s ease,
                    box-shadow 0.3s ease
                  `,

                  '&:hover': {
                    transform: 'translateY(-6px)',

                    backgroundColor: alpha(surface, 0.8),

                    borderColor: alpha(primary, 0.4),

                    boxShadow: `
                      0 18px 50px
                      ${alpha('#000000', 0.2)}
                    `
                  }
                }}
              >
                <Stack spacing={2.5}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderRadius: 2,

                      color: primary,

                      backgroundColor: alpha(primary, 0.1),

                      border: `1px solid ${alpha(primary, 0.18)}`
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: textSecondary,
                      lineHeight: 1.7
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>

          {/* ========================================================== */}
          {/* THEME CTA                                                   */}
          {/* ========================================================== */}

          <Box
            sx={{
              mt: {
                xs: 6,
                md: 8
              },

              p: {
                xs: 3,
                sm: 4,
                md: 5
              },

              borderRadius: 4,

              position: 'relative',
              overflow: 'hidden',

              border: `1px solid ${alpha(primary, 0.25)}`,

              background: `
                linear-gradient(
                  135deg,
                  ${alpha(primary, 0.1)},
                  ${alpha(secondary, 0.1)}
                )
              `,

              '&::before': {
                content: '""',

                position: 'absolute',

                width: 350,
                height: 350,

                top: -250,
                right: -100,

                borderRadius: '50%',

                background: `
                  radial-gradient(
                    circle,
                    ${alpha(primary, 0.18)},
                    transparent 70%
                  )
                `
              }
            }}
          >
            <Stack
              direction={{
                xs: 'column',
                md: 'row'
              }}
              spacing={3}
              sx={{
                alignItems: {
                  xs: 'flex-start',
                  md: 'center'
                },
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 1
              }}
            >
              <Stack spacing={1}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800
                  }}
                >
                  Ready to build?
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: textSecondary,
                    maxWidth: 600
                  }}
                >
                  Explore the complete theme system and see how every token
                  works together.
                </Typography>
              </Stack>

              <AppButton
                component="a"
                href="/theme"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  flexShrink: 0,
                  px: 3
                }}
              >
                Open Theme System
              </AppButton>
            </Stack>
          </Box>

          {/* ========================================================== */}
          {/* FOOTER                                                      */}
          {/* ========================================================== */}

          <Divider
            sx={{
              mt: {
                xs: 8,
                md: 10
              },

              borderColor: alpha(secondary, 0.16)
            }}
          />

          <Stack
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={2}
            sx={{
              alignItems: {
                xs: 'flex-start',
                sm: 'center'
              },
              justifyContent: 'space-between',
              pt: 3
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: textSecondary
              }}
            >
              CryptechServices Theme System
            </Typography>

            <Stack direction="row" spacing={1}>
              <AppButton
                component="a"
                href="/theme"
                variant="text"
                color="primary"
                size="small"
                startIcon={<PaletteIcon />}
              >
                Theme
              </AppButton>

              {GITHUB_URL && (
                <AppButton
                  component="a"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                  color="secondary"
                  size="small"
                  startIcon={<GitHubIcon />}
                >
                  GitHub
                </AppButton>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
