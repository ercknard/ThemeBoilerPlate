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
import Portal from '@mui/material/Portal';

import { alpha, useTheme } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';

import { useThemeContext } from '@/contexts/themeContext';

import { AppButton, AppChip } from '@/theme/components/CustomComponents';

import { THEME_ICONS, THEME_SETS } from '@/theme/theme';
import { usePathname } from 'next/navigation';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const navItems = [
  {
    label: 'Playground',
    href: '/playground'
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

  const isDocumentationPage = pathname === '/';

  return (
    <AppBar
      position={!isDocumentationPage ? 'sticky' : 'absolute'}
      elevation={0}
      color="transparent"
      sx={{
        top: 0,
        zIndex: theme.zIndex.appBar,

        background: !isDocumentationPage
          ? {
              xs: alpha(theme.backgroundScale[3], 1),
              md: alpha(theme.backgroundScale[5], 1)
            }
          : `linear-gradient(
        to bottom,
        ${alpha(theme.colorScale[2], 0)} 0%,
        ${alpha(theme.colorScale[2], 0)} 70%,
        ${alpha(theme.colorScale[2], 0)} 100%
      )`,

        boxShadow: 'none',
        borderBottom: !isDocumentationPage
          ? `2px solid ${alpha(secondary, 0.25)}`
          : `unset`
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
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            const icon =
              item.href === '/' ? (
                <HomeOutlinedIcon sx={{ fontSize: 18 }} />
              ) : item.href === '/playground' ? (
                <SmartDisplayIcon sx={{ fontSize: 18 }} />
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

                  borderRadius: 1,

                  color: isActive ? textPrimary : textSecondary,

                  fontWeight: isActive ? 700 : 650,

                  overflow: 'hidden',

                  background: isActive
                    ? `linear-gradient(
        135deg,
        ${alpha(primary, 0.16)},
        ${alpha(secondary, 0.12)}
      )`
                    : 'transparent',

                  boxShadow: isActive
                    ? `inset 0 0 0 1px ${alpha(primary, 0.12)}`
                    : 'none',

                  transition:
                    'color 180ms ease, background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',

                  '& .MuiButton-startIcon': {
                    position: 'relative',
                    zIndex: 1,

                    color: isActive ? primary : 'inherit',

                    transition: 'transform 180ms ease, color 180ms ease'
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

                    opacity: isActive ? 1 : 0,

                    transform: isActive ? 'scale(1)' : 'scale(0.85)',

                    transition: 'opacity 180ms ease, transform 180ms ease'
                  },

                  '&::after': {
                    content: '""',

                    position: 'absolute',

                    left: '50%',
                    bottom: 3,

                    width: isActive ? '55%' : 0,
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

                    boxShadow: `inset 0 0 0 1px ${alpha(primary, 0.1)}`,

                    '&::before': {
                      opacity: 1,
                      transform: 'scale(1)'
                    },

                    '&::after': {
                      width: '55%'
                    },

                    '& .MuiButton-startIcon': {
                      color: primary,
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

                borderRadius: 1,

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

              borderRadius: 1,

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
            xs: 'block',
            md: 'none'
          }
        }}
      >
        {/* Backdrop */}
        <Box
          onClick={() => setMobileOpen(false)}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: theme.zIndex.drawer - 1,

            backgroundColor: alpha('#000', 0.5),

            opacity: mobileOpen ? 1 : 0,
            visibility: mobileOpen ? 'visible' : 'hidden',

            transition: 'opacity 0.25s ease, visibility 0.25s ease'
          }}
        />

        {/* Drawer */}
        <Box
          sx={{
            display: {
              xs: 'block',
              md: 'none'
            }
          }}
        >
          <Portal>
            {/* Backdrop */}
            <Box
              onClick={() => setMobileOpen(false)}
              sx={{
                position: 'fixed',
                inset: 0,

                zIndex: 9998,

                backgroundColor: alpha('#000', 0.5),

                opacity: mobileOpen ? 1 : 0,

                visibility: mobileOpen ? 'visible' : 'hidden',

                pointerEvents: mobileOpen ? 'auto' : 'none',

                transition: 'opacity 0.25s ease, visibility 0.25s ease'
              }}
            />

            {/* Right Drawer */}
            <Box
              sx={{
                position: 'fixed',

                top: 0,
                right: 0,

                width: {
                  xs: 'min(82vw, 320px)',
                  sm: 320
                },

                height: '100dvh',

                zIndex: 9999,

                display: 'flex',
                flexDirection: 'column',

                overflow: 'hidden',

                backgroundColor: theme.backgroundScale[4],

                borderLeft: `1px solid ${alpha(secondary, 0.2)}`,

                boxShadow: `-12px 0 40px ${alpha('#000', 0.35)}`,

                transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',

                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  flexShrink: 0,

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  minHeight: 72,

                  px: 2,

                  borderBottom: `1px solid ${alpha(secondary, 0.12)}`
                }}
              >
                {/* Logo + Branding */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,

                    minWidth: 0
                  }}
                >
                  <Box
                    component="img"
                    src={themeIcon}
                    alt="Cryptech Services"
                    sx={{
                      width: 36,
                      height: 36,

                      objectFit: 'contain',

                      flexShrink: 0
                    }}
                  />

                  <Box
                    sx={{
                      minWidth: 0,

                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        color: textPrimary,

                        fontSize: 15,
                        lineHeight: 1.2,

                        fontWeight: 700,

                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Cryptech Services
                    </Box>

                    <Box
                      component="span"
                      sx={{
                        mt: 0.25,

                        color: textSecondary,

                        fontSize: 11,
                        lineHeight: 1.2,

                        fontWeight: 500,

                        letterSpacing: '0.08em'
                      }}
                    >
                      THEME SYSTEM
                    </Box>
                  </Box>
                </Box>

                {/* Close */}
                <AppButton
                  variant="text"
                  color="inherit"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                  sx={{
                    minWidth: 40,
                    width: 40,
                    height: 40,

                    p: 0,

                    flexShrink: 0,

                    borderRadius: 1,

                    color: textSecondary,

                    '&:hover': {
                      color: textPrimary,
                      backgroundColor: alpha(primary, 0.07)
                    }
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: 21
                    }}
                  />
                </AppButton>
              </Box>

              {/* Navigation */}
              <Box
                sx={{
                  flex: 1,

                  minHeight: 0,

                  overflowY: 'auto',

                  px: 1.5,
                  py: 2
                }}
              >
                <Stack spacing={0.5}>
                  {navItems.map((item) => {
                    const isActive =
                      item.href === '/'
                        ? pathname === '/'
                        : pathname === item.href ||
                          pathname.startsWith(`${item.href}/`);

                    const icon =
                      item.href === '/' ? (
                        <HomeOutlinedIcon sx={{ fontSize: 18 }} />
                      ) : item.href === '/playground' ? (
                        <SmartDisplayIcon sx={{ fontSize: 18 }} />
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
                        startIcon={icon}
                        onClick={() => setMobileOpen(false)}
                        sx={{
                          position: 'relative',

                          justifyContent: 'flex-start',

                          width: '100%',
                          minHeight: 48,

                          px: 1.5,

                          borderRadius: 1,

                          color: isActive ? textPrimary : textSecondary,

                          fontWeight: isActive ? 700 : 600,

                          background: isActive
                            ? `linear-gradient(
        135deg,
        ${alpha(primary, 0.14)},
        ${alpha(secondary, 0.1)}
      )`
                            : 'transparent',

                          boxShadow: isActive
                            ? `inset 0 0 0 1px ${alpha(primary, 0.12)}`
                            : 'none',

                          '& .MuiButton-startIcon': {
                            marginRight: 1.25,
                            marginLeft: 0,

                            color: isActive ? primary : 'inherit'
                          },

                          '&:hover': {
                            color: textPrimary,

                            backgroundColor: alpha(primary, 0.07),

                            '& .MuiButton-startIcon': {
                              color: primary
                            }
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
                            fontSize: 19
                          }}
                        />
                      }
                      sx={{
                        justifyContent: 'flex-start',

                        width: '100%',
                        minHeight: 48,

                        px: 1.5,

                        borderRadius: 1,

                        color: textSecondary,

                        fontWeight: 600,

                        '& .MuiButton-startIcon': {
                          marginRight: 1.25,
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
                </Stack>
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  flexShrink: 0,

                  p: 2,

                  borderTop: `1px solid ${alpha(secondary, 0.12)}`
                }}
              >
                <AppChip
                  label={activeTheme?.label ?? themeSet}
                  color="secondary"
                  size="small"
                  sx={{
                    width: '100%',
                    height: 36,

                    fontWeight: 700,

                    textTransform: 'capitalize'
                  }}
                />
              </Box>
            </Box>
          </Portal>
        </Box>
      </Box>
    </AppBar>
  );
}
