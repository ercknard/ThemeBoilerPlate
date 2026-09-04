import Head from 'next/head';
import Image from 'next/image';

import { Box, Button, Stack, Typography, Chip } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '@/contexts/themeContext';
import ThemeToggle from '@/theme/ThemeToggle';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

export default function Home() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();

  const THEME_ICONS = {
    blue: '/static/images/logo-blue.png',
    purple: '/static/images/logo-purple.png',
    gold: '/static/images/logo-gold.png',
    green: '/static/images/logo-green.png'
  } as const;

  const themeIcon = THEME_ICONS[themeSet];

  return (
    <>
      <Head>
        <title>BoilerPlate</title>
        <meta name="description" content="CryptechServices Theme System" />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          px: { xs: 2, sm: 3, md: 5 },
          py: { xs: 6, md: 8 },

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          background: `
      radial-gradient(
        circle at top,
        ${theme.colorScale[3]},
        ${theme.colorScale[7]}
      ),
      ${theme.backgroundScale[1]}
    `,

          transition: 'background 0.8s ease-in-out'
        }}
      >
        {/* ================================================================ */}
        {/* HEADER / BRAND                                                  */}
        {/* ================================================================ */}

        <Stack
          spacing={3}
          sx={{
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              width: { xs: 120, sm: 160 },
              height: { xs: 120, sm: 160 },
              position: 'relative'
            }}
          >
            <Image
              src={themeIcon}
              alt={`${themeSet} theme`}
              fill
              priority
              style={{
                objectFit: 'contain'
              }}
            />
          </Box>

          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              mb: 3
            }}
          >
            <Typography variant="overlineCustom" color="primary">
              CryptechServices Theme System
            </Typography>

            <Typography variant="h3">THEME BOILERPLATE</Typography>

            <ThemeToggle />
          </Stack>

          {/* Links */}
          <Stack
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={2}
          >
            <Button
              component="a"
              href="/theme"
              variant="contained"
              startIcon={<PaletteIcon />}
            >
              Theme
            </Button>

            <Button
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>
          </Stack>
        </Stack>

        {/* ================================================================ */}
        {/* SAMPLE HERO                                                     */}
        {/* ================================================================ */}

        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mt: { xs: 7, md: 10 }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',

              minHeight: {
                xs: 460,
                sm: 500,
                md: 540
              },

              display: 'flex',
              alignItems: 'center',

              borderRadius: 4,

              background: `
                linear-gradient(
                  135deg,
                  ${theme.colorScale[5]} 0%,
                  ${theme.backgroundScale[3]} 45%,
                  ${theme.backgroundScale[1]} 100%
                )
              `,

              border: `1px solid ${theme.secondaryScale[6]}`,

              boxShadow: `
                0 24px 80px
                ${theme.colorScale[3]}
              `,

              transition: `
                background 0.8s ease-in-out,
                border-color 0.8s ease-in-out,
                box-shadow 0.8s ease-in-out
              `,

              '&::before': {
                content: '""',
                position: 'absolute',

                width: {
                  xs: 240,
                  sm: 360,
                  md: 500
                },

                height: {
                  xs: 240,
                  sm: 360,
                  md: 500
                },

                borderRadius: '50%',

                top: {
                  xs: -100,
                  md: -180
                },

                right: {
                  xs: -100,
                  md: -160
                },

                background: `
                  radial-gradient(
                    circle,
                    ${theme.colorScale[8]} 0%,
                    ${theme.colorScale[4]} 45%,
                    transparent 72%
                  )
                `,

                opacity: 0.65,

                transition: 'background 0.8s ease-in-out',

                pointerEvents: 'none'
              },

              '&::after': {
                content: '""',
                position: 'absolute',

                width: 280,
                height: 280,

                borderRadius: '50%',

                bottom: -150,
                left: -100,

                background: `
                  radial-gradient(
                    circle,
                    ${theme.secondaryScale[7]} 0%,
                    transparent 70%
                  )
                `,

                opacity: 0.35,

                transition: 'background 0.8s ease-in-out',

                pointerEvents: 'none'
              }
            }}
          >
            {/* Hero Content */}
            <Stack
              spacing={3}
              sx={{
                position: 'relative',
                zIndex: 1,

                width: '100%',
                maxWidth: 720,

                px: {
                  xs: 3,
                  sm: 5,
                  md: 7
                },

                py: {
                  xs: 5,
                  md: 7
                }
              }}
            >
              {/* Badge */}
              <Box>
                <Chip
                  label={`${themeSet.toUpperCase()} THEME`}
                  sx={{
                    backgroundColor: theme.colorScale[3],
                    color: theme.colorScale[11],

                    border: `1px solid ${theme.colorScale[6]}`,

                    fontWeight: 700,

                    transition: `
                      background-color 0.8s ease-in-out,
                      color 0.8s ease-in-out,
                      border-color 0.8s ease-in-out
                    `
                  }}
                />
              </Box>

              {/* Heading */}
              <Typography
                variant="display"
                sx={{
                  maxWidth: 700,

                  color: theme.grayScale[12],

                  transition: 'color 0.8s ease-in-out'
                }}
              >
                Build beautiful interfaces with your theme.
              </Typography>

              {/* Description */}
              <Typography
                variant="lead"
                sx={{
                  maxWidth: 620,

                  color: theme.grayScale[11],

                  transition: 'color 0.8s ease-in-out'
                }}
              >
                A flexible MUI theme system with dynamic color scales,
                typography, surfaces, and semantic colors designed to work
                together.
              </Typography>

              {/* Buttons */}
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
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: theme.colorScale[9],
                    color: theme.colorScale.contrast,

                    px: 3,

                    '&:hover': {
                      backgroundColor: theme.colorScale[10]
                    },

                    transition: `
                      background-color 0.8s ease-in-out,
                      color 0.8s ease-in-out
                    `
                  }}
                >
                  Get Started
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: theme.secondaryScale[7],
                    color: theme.grayScale[12],

                    px: 3,

                    '&:hover': {
                      borderColor: theme.secondaryScale[9],
                      backgroundColor: theme.secondaryScale[3]
                    },

                    transition: `
                      border-color 0.8s ease-in-out,
                      background-color 0.8s ease-in-out,
                      color 0.8s ease-in-out
                    `
                  }}
                >
                  Explore Theme
                </Button>
              </Stack>
            </Stack>

            {/* ============================================================ */}
            {/* Decorative Theme Preview                                     */}
            {/* ============================================================ */}

            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'block'
                },

                position: 'absolute',

                right: '7%',
                top: '50%',

                transform: 'translateY(-50%)',

                width: 300,
                height: 360,

                borderRadius: 4,

                backgroundColor: theme.secondaryScale[2],

                border: `1px solid ${theme.secondaryScale[6]}`,

                boxShadow: `
                  0 20px 60px
                  ${theme.backgroundScale[1]}
                `,

                p: 2,

                transition: `
                  background-color 0.8s ease-in-out,
                  border-color 0.8s ease-in-out,
                  box-shadow 0.8s ease-in-out
                `
              }}
            >
              <Stack spacing={2}>
                {/* Preview Header */}
                <Box
                  sx={{
                    height: 48,
                    borderRadius: 2,

                    backgroundColor: theme.backgroundScale[3],

                    display: 'flex',
                    alignItems: 'center',

                    px: 2,

                    transition: 'background-color 0.8s ease-in-out'
                  }}
                >
                  <Typography
                    variant="label"
                    sx={{
                      color: theme.grayScale[11]
                    }}
                  >
                    Theme Preview
                  </Typography>
                </Box>

                {/* Preview Main */}
                <Box
                  sx={{
                    flex: 1,
                    minHeight: 210,

                    borderRadius: 2,

                    backgroundColor: theme.backgroundScale[1],

                    p: 2,

                    transition: 'background-color 0.8s ease-in-out'
                  }}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        height: 12,
                        width: '65%',
                        borderRadius: 1,

                        backgroundColor: theme.grayScale[8]
                      }}
                    />

                    <Box
                      sx={{
                        height: 8,
                        width: '85%',
                        borderRadius: 1,

                        backgroundColor: theme.grayScale[5]
                      }}
                    />

                    <Box
                      sx={{
                        height: 8,
                        width: '72%',
                        borderRadius: 1,

                        backgroundColor: theme.grayScale[5]
                      }}
                    />

                    <Box
                      sx={{
                        mt: 2,

                        height: 80,

                        borderRadius: 2,

                        background: `
                          linear-gradient(
                            135deg,
                            ${theme.colorScale[5]},
                            ${theme.secondaryScale[6]}
                          )
                        `,

                        transition: 'background 0.8s ease-in-out'
                      }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: theme.colorScale[9],

                        color: theme.colorScale.contrast,

                        '&:hover': {
                          backgroundColor: theme.colorScale[10]
                        },

                        transition: 'background-color 0.8s ease-in-out'
                      }}
                    >
                      Primary Action
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
