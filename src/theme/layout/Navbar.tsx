'use client';

import * as React from 'react';

import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';

import { useThemeContext } from '@/contexts/themeContext';

import { AppButton, AppChip } from '@/theme/components/CustomComponents';

import { THEME_ICONS, THEME_SETS } from '@/theme/theme';
import { usePathname } from 'next/navigation';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const navItems = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Documentation',
    href: '/documentation'
  }
];

export default function Navbar() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();

  const themeIcon = THEME_ICONS[themeSet];
  const activeTheme = THEME_SETS[themeSet];

  const primary = theme.colorScale[9];
  const secondary = theme.secondaryScale[9];

  const background = theme.backgroundScale[1];

  const textPrimary = theme.grayScale[12];
  const textSecondary = theme.grayScale[10];

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const pathname = usePathname();

  const isDocumentationPage = pathname === '/documentation';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        top: 0,
        zIndex: theme.zIndex.appBar,

        background: isDocumentationPage
          ? `${alpha(theme.backgroundScale[5], 1)}`
          : `linear-gradient(
          to bottom,
          ${alpha(theme.colorScale[2], 1)} 0%,
          ${alpha(theme.colorScale[2], 1)} 70%,
          ${alpha(theme.colorScale[2], 1)} 100%
        )`,

        boxShadow: 'none',
        borderBottom: isDocumentationPage
          ? `2px solid ${alpha(secondary, 0.25)}`
          : `2px solid ${alpha(secondary, 0.5)}`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)'
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: {
            xs: 64,
            md: 65
          },

          px: {
            xs: 1,
            md: 3
          },

          gap: 2
        }}
      >
        {/* BRAND */}

        <AppButton
          component="a"
          href="/"
          variant="text"
          color="inherit"
          sx={{
            minWidth: 0,
            p: 0,

            color: textPrimary,

            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
        >
          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                position: 'relative',

                width: {
                  xs: 38,
                  md: 42
                },

                height: {
                  xs: 38,
                  md: 42
                },

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                flexShrink: 0
              }}
            >
              {themeIcon && (
                <Box
                  component="img"
                  src={themeIcon}
                  alt=""
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',

                    filter: `drop-shadow(
                        0 4px 12px ${alpha(primary, 0.25)}
                      )`,

                    transition: 'transform 0.3s ease',

                    '.MuiButton-root:hover &': {
                      transform: 'scale(1.08)'
                    }
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                textAlign: 'left'
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: textPrimary,
                  whiteSpace: 'nowrap'
                }}
              >
                Cryptech Services
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,

                  fontSize: '0.68rem',
                  fontWeight: 600,
                  lineHeight: 1,

                  color: textSecondary,

                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',

                  whiteSpace: 'nowrap'
                }}
              >
                Theme System
              </Typography>
            </Box>
          </Stack>
        </AppButton>

        {/* DESKTOP NAVIGATION */}

        <Stack
          direction="row"
          spacing={3}
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },

            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',

            alignItems: 'center',

            p: 0.5,

            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          {navItems.map((item) => {
            const icon =
              item.href === '/' ? (
                <HomeOutlinedIcon sx={{ fontSize: 18 }} />
              ) : (
                <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
              );

            return (
              <AppButton
                key={item.href}
                component="a"
                href={item.href}
                variant="text"
                color="inherit"
                size="small"
                startIcon={icon}
                sx={{
                  position: 'relative',

                  minHeight: 40,

                  px: 2,

                  borderRadius: 2.25,

                  color: textSecondary,

                  fontWeight: 650,

                  overflow: 'hidden',

                  transition:
                    'color 180ms ease, background-color 180ms ease, transform 180ms ease',

                  '& .MuiButton-startIcon': {
                    position: 'relative',
                    zIndex: 1,
                    transition: 'transform 180ms ease'
                  },

                  '&::before': {
                    content: '""',

                    position: 'absolute',

                    inset: 0,

                    borderRadius: 'inherit',

                    background: `linear-gradient(
              135deg,
              ${alpha(primary, 0.14)},
              ${alpha(secondary, 0.1)}
            )`,

                    opacity: 0,

                    transform: 'scale(0.85)',

                    transition: 'opacity 180ms ease, transform 180ms ease'
                  },

                  '&::after': {
                    content: '""',

                    position: 'absolute',

                    left: '50%',
                    bottom: 3,

                    width: 0,
                    height: 2,

                    borderRadius: 999,

                    background: `linear-gradient(
              90deg,
              ${primary},
              ${secondary}
            )`,

                    transform: 'translateX(-50%)',

                    transition: 'width 220ms ease'
                  },

                  '&:hover': {
                    color: textPrimary,

                    backgroundColor: alpha(primary, 0.07),

                    transform: 'translateY(-1px)',

                    '&::before': {
                      opacity: 1,
                      transform: 'scale(1)'
                    },

                    '&::after': {
                      width: '55%'
                    },

                    '& .MuiButton-startIcon': {
                      transform: 'translateY(-1px) scale(1.08)'
                    }
                  },

                  '&:active': {
                    transform: 'translateY(0) scale(0.97)'
                  }
                }}
              >
                <Box
                  component="span"
                  sx={{
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {item.label}
                </Box>
              </AppButton>
            );
          })}

          {GITHUB_URL && (
            <AppButton
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
              color="inherit"
              size="small"
              startIcon={
                <GitHubIcon
                  sx={{
                    fontSize: 18
                  }}
                />
              }
              sx={{
                position: 'relative',

                minHeight: 40,

                px: 2,

                borderRadius: 2.25,

                color: textSecondary,

                fontWeight: 650,

                overflow: 'hidden',

                transition:
                  'color 180ms ease, background-color 180ms ease, transform 180ms ease',

                '& .MuiButton-startIcon': {
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 180ms ease'
                },

                '&::before': {
                  content: '""',

                  position: 'absolute',

                  inset: 0,

                  borderRadius: 'inherit',

                  background: `linear-gradient(
            135deg,
            ${alpha(secondary, 0.15)},
            ${alpha(primary, 0.08)}
          )`,

                  opacity: 0,

                  transform: 'scale(0.85)',

                  transition: 'opacity 180ms ease, transform 180ms ease'
                },

                '&::after': {
                  content: '""',

                  position: 'absolute',

                  left: '50%',
                  bottom: 3,

                  width: 0,
                  height: 2,

                  borderRadius: 999,

                  background: `linear-gradient(
            90deg,
            ${secondary},
            ${primary}
          )`,

                  transform: 'translateX(-50%)',

                  transition: 'width 220ms ease'
                },

                '&:hover': {
                  color: textPrimary,

                  backgroundColor: alpha(secondary, 0.07),

                  transform: 'translateY(-1px)',

                  '&::before': {
                    opacity: 1,
                    transform: 'scale(1)'
                  },

                  '&::after': {
                    width: '55%'
                  },

                  '& .MuiButton-startIcon': {
                    transform: 'translateY(-1px) rotate(-5deg) scale(1.08)'
                  }
                },

                '&:active': {
                  transform: 'translateY(0) scale(0.97)'
                }
              }}
            >
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  zIndex: 1
                }}
              >
                GitHub
              </Box>
            </AppButton>
          )}
        </Stack>

        {/* RIGHT SIDE */}

        <Box
          sx={{
            flex: 1
          }}
        />

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {/* ACTIVE THEME */}

          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'block'
              }
            }}
          >
            <AppChip
              label={activeTheme?.label ?? themeSet}
              color="secondary"
              size="small"
              sx={{
                height: 28,

                px: 0.5,

                fontSize: '0.72rem',
                fontWeight: 700,

                textTransform: 'capitalize',

                backgroundColor: alpha(secondary, 0.08),

                border: `1px solid ${alpha(secondary, 0.16)}`
              }}
            />
          </Box>

          {/* MOBILE MENU BUTTON */}

          <AppButton
            variant="text"
            color="inherit"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            sx={{
              display: {
                xs: 'flex',
                md: 'none'
              },

              minWidth: 40,
              width: 40,
              height: 40,

              p: 0,

              color: textPrimary,

              borderRadius: 2,

              '&:hover': {
                backgroundColor: alpha(primary, 0.08)
              }
            }}
          >
            {mobileOpen ? (
              <CloseIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </AppButton>
        </Stack>
      </Toolbar>

      {/* MOBILE NAVIGATION */}

      <Box
        sx={{
          display: {
            xs: 'grid',
            md: 'none'
          },

          gridTemplateRows: mobileOpen ? '1fr' : '0fr',

          transition: 'grid-template-rows 0.25s ease'
        }}
      >
        <Box
          sx={{
            minHeight: 0,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              pb: 2,

              pt: 0.5,

              borderTop: `1px solid ${alpha(secondary, 0.12)}`
            }}
          >
            <Stack spacing={0.5}>
              {navItems.map((item) => {
                const icon =
                  item.href === '/' ? (
                    <HomeOutlinedIcon
                      sx={{
                        fontSize: 18
                      }}
                    />
                  ) : (
                    <DescriptionOutlinedIcon
                      sx={{
                        fontSize: 18
                      }}
                    />
                  );

                return (
                  <AppButton
                    key={item.href}
                    component="a"
                    href={item.href}
                    variant="text"
                    color="inherit"
                    startIcon={icon}
                    onClick={() => setMobileOpen(false)}
                    sx={{
                      justifyContent: 'flex-start',

                      minHeight: 46,

                      px: 1.5,

                      borderRadius: 2,

                      color: textSecondary,

                      fontWeight: 600,

                      '& .MuiButton-startIcon': {
                        marginRight: 1,
                        marginLeft: 0
                      },

                      '&:hover': {
                        color: textPrimary,

                        backgroundColor: alpha(primary, 0.07)
                      }
                    }}
                  >
                    {item.label}
                  </AppButton>
                );
              })}

              {GITHUB_URL && (
                <AppButton
                  component="a"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                  color="inherit"
                  startIcon={
                    <GitHubIcon
                      sx={{
                        fontSize: 18
                      }}
                    />
                  }
                  sx={{
                    justifyContent: 'flex-start',

                    minHeight: 46,

                    px: 1.5,

                    borderRadius: 2,

                    color: textSecondary,

                    fontWeight: 600,

                    '& .MuiButton-startIcon': {
                      marginRight: 1,
                      marginLeft: 0
                    },

                    '&:hover': {
                      color: textPrimary,

                      backgroundColor: alpha(primary, 0.07)
                    }
                  }}
                >
                  GitHub
                </AppButton>
              )}

              {/* MOBILE THEME */}

              <Box
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'none'
                  },

                  pt: 1,
                  px: 1
                }}
              >
                <AppChip
                  label={activeTheme?.label ?? themeSet}
                  color="secondary"
                  size="small"
                  sx={{
                    fontWeight: 700,
                    textTransform: 'capitalize'
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
