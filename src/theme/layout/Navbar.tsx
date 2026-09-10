'use client';

import * as React from 'react';

import {
  AppBar,
  Box,
  Container,
  Divider,
  Menu,
  MenuItem,
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
import PaletteIcon from '@mui/icons-material/Palette';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import { useThemeContext } from '@/contexts/themeContext';

import { AppButton, AppChip } from '@/theme/components/CustomComponents';

import { THEME_ICONS, THEME_SETS } from '@/theme/theme';
import { usePathname } from 'next/navigation';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const navItems = [
  {
    label: 'Playground',
    href: '/playground'
  },
  {
    label: 'Themes',
    href: '/sets'
  },
  {
    label: 'Documentation',
    href: '/documentation'
  }
];

type ThemeKey = keyof typeof THEME_SETS;

type ThemeItem = {
  label: string;
  category: string;
  color: string;
  secondary: string;
  gray: string;
  background: string;
  icon?: string;
};

const THEME_CATEGORY_LABELS: Record<string, string> = {
  classic: 'Classic',
  mythology: 'Mythology',
  minecraft: 'Minecraft',
  cosmic: 'Cosmic',
  premium: 'Premium',
  elements: 'Elements'
};

export default function Navbar() {
  const theme = useTheme();

  const { themeSet, setThemeSet } = useThemeContext();

  const themeIcon = THEME_ICONS[themeSet];
  const activeTheme = THEME_SETS[themeSet];

  const primary = theme.colorScale[9];
  const secondary = theme.secondaryScale[9];

  const textPrimary = theme.grayScale[12];
  const textSecondary = theme.grayScale[10];

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const pathname = usePathname();

  const isDocumentationPage = pathname === '/';

  const themeItems = Object.entries(THEME_SETS).filter(
    ([key]) => key !== 'custom'
  ) as [Exclude<ThemeKey, 'custom'>, ThemeItem][];

  const themeCategories = Array.from(
    new Set(themeItems.map(([, item]) => item.category))
  );

  const handleThemeChange = (key: Exclude<ThemeKey, 'custom'>) => {
    setThemeSet(key);
    setThemeMenuAnchor(null);
    setMobileOpen(false);
  };

  const getNavIcon = (href: string) => {
    switch (href) {
      case '/playground':
        return <SmartDisplayIcon sx={{ fontSize: 18 }} />;

      case '/sets':
        return <FormatPaintIcon sx={{ fontSize: 18 }} />;

      case '/documentation':
        return <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />;

      default:
        return <HomeOutlinedIcon sx={{ fontSize: 18 }} />;
    }
  };

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
          : 'unset'
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
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: 'center'
            }}
          >
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

        <Stack
          direction="row"
          spacing={2}
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

            const icon = getNavIcon(item.href);

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

        <Box
          sx={{
            flex: 1
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'block'
              }
            }}
          >
            <AppButton
              variant="text"
              color="inherit"
              size="small"
              startIcon={
                <PaletteIcon
                  sx={{
                    fontSize: 17
                  }}
                />
              }
              endIcon={
                <KeyboardArrowDownRoundedIcon
                  sx={{
                    fontSize: 18
                  }}
                />
              }
              onClick={(event) => {
                setThemeMenuAnchor(event.currentTarget);
              }}
              aria-haspopup="menu"
              aria-expanded={Boolean(themeMenuAnchor)}
              sx={{
                minHeight: 36,

                px: 1.25,

                borderRadius: 1,

                color: textPrimary,

                fontWeight: 700,

                backgroundColor: alpha(secondary, 0.25),

                border: `1px solid ${alpha(primary, 0.12)}`,

                '&:hover': {
                  backgroundColor: alpha(primary, 0.1),

                  borderColor: alpha(primary, 0.2)
                },

                '& .MuiButton-startIcon': {
                  color: primary
                },

                '& .MuiButton-endIcon': {
                  color: textSecondary,

                  transition: 'transform 180ms ease'
                }
              }}
            >
              {activeTheme?.label ?? themeSet}
            </AppButton>
          </Box>

          <Menu
            anchorEl={themeMenuAnchor}
            open={Boolean(themeMenuAnchor)}
            onClose={() => setThemeMenuAnchor(null)}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  mt: 1,

                  width: 310,

                  maxHeight: 'min(70vh, 620px)',

                  overflow: 'hidden',

                  borderRadius: 2.5,

                  backgroundColor: theme.backgroundScale[3],

                  border: `1px solid ${alpha(theme.secondaryScale[6], 0.8)}`,

                  boxShadow: `
          0 20px 60px ${alpha(theme.grayScale[1], 0.2)}
        `
                }
              }
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,

                background: `linear-gradient(
                  135deg,
                  ${alpha(primary, 0.08)},
                  ${alpha(secondary, 0.05)}
                )`,

                borderBottom: `1px solid ${alpha(theme.secondaryScale[6], 0.6)}`
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: textPrimary
                }}
              >
                Theme Sets
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: 10,
                  color: textSecondary
                }}
              >
                Choose a theme for the entire design system.
              </Typography>
            </Box>

            <Box
              sx={{
                maxHeight: 520,
                overflowY: 'auto',

                scrollbarWidth: 'none',
                msOverflowStyle: 'none',

                '&::-webkit-scrollbar': {
                  display: 'none'
                },

                py: 0.75
              }}
            >
              {themeCategories.map((category, categoryIndex) => {
                const categoryItems = themeItems.filter(
                  ([, item]) => item.category === category
                );

                return (
                  <Box key={category}>
                    {categoryIndex > 0 && (
                      <Divider
                        sx={{
                          my: 0.75,

                          borderColor: alpha(theme.secondaryScale[6], 0.5)
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        px: 2,
                        pt: 0.75,
                        pb: 0.5,

                        fontSize: 9,
                        fontWeight: 800,

                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',

                        color: theme.grayScale[8]
                      }}
                    >
                      {THEME_CATEGORY_LABELS[category] ?? category}
                    </Typography>

                    {categoryItems.map(([key, item]) => {
                      const isActive = themeSet === key;
                      const icon = THEME_ICONS[key];

                      return (
                        <MenuItem
                          key={key}
                          selected={isActive}
                          onClick={() => handleThemeChange(key)}
                          sx={{
                            minHeight: 48,

                            mx: 0.75,
                            px: 1.25,

                            gap: 1.25,

                            borderRadius: 1.5,

                            color: textPrimary,

                            '&.Mui-selected': {
                              backgroundColor: alpha(item.color, 0.09)
                            },

                            '&.Mui-selected:hover': {
                              backgroundColor: alpha(item.color, 0.13)
                            },

                            '&:hover': {
                              backgroundColor: alpha(item.color, 0.06)
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 30,
                              height: 30,

                              flexShrink: 0,

                              display: 'grid',
                              placeItems: 'center',

                              borderRadius: 1.5,

                              backgroundColor: alpha(item.color, 0.08),

                              border: `1px solid ${alpha(item.color, 0.16)}`
                            }}
                          >
                            {icon ? (
                              <Box
                                component="img"
                                src={icon}
                                alt=""
                                sx={{
                                  width: 22,
                                  height: 22,
                                  objectFit: 'contain'
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: 9,
                                  height: 9,

                                  borderRadius: '50%',

                                  backgroundColor: item.color
                                }}
                              />
                            )}
                          </Box>

                          <Box
                            sx={{
                              flex: 1,
                              minWidth: 0
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontWeight: isActive ? 800 : 650,

                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {item.label}
                            </Typography>

                            <Typography
                              sx={{
                                mt: 0.15,

                                fontSize: 9,

                                color: textSecondary,

                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {THEME_CATEGORY_LABELS[item.category] ??
                                item.category}
                            </Typography>
                          </Box>

                          {isActive && (
                            <CheckRoundedIcon
                              sx={{
                                flexShrink: 0,

                                fontSize: 18,

                                color: item.color
                              }}
                            />
                          )}
                        </MenuItem>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Menu>

          {/* <Box
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
          </Box> */}

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

      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none'
          }
        }}
      >
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

        <Box>
          <Portal>
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

            <Box
              sx={{
                position: 'fixed',

                top: 0,
                right: 0,

                width: {
                  xs: 'min(88vw, 360px)',
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

                    const icon = getNavIcon(item.href);

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

                <Divider
                  sx={{
                    my: 2,

                    borderColor: alpha(theme.secondaryScale[6], 0.6)
                  }}
                />

                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                      alignItems: 'center',
                      px: 0.5
                    }}
                  >
                    <PaletteIcon
                      sx={{
                        fontSize: 17,
                        color: primary
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 800,

                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',

                        color: textSecondary
                      }}
                    >
                      Theme Sets
                    </Typography>
                  </Stack>

                  {themeCategories.map((category) => {
                    const categoryItems = themeItems.filter(
                      ([, item]) => item.category === category
                    );

                    return (
                      <Box key={category}>
                        <Typography
                          sx={{
                            px: 0.75,
                            pt: 0.75,
                            pb: 0.5,

                            fontSize: 9,
                            fontWeight: 800,

                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',

                            color: theme.grayScale[8]
                          }}
                        >
                          {THEME_CATEGORY_LABELS[category] ?? category}
                        </Typography>

                        <Stack spacing={0.25}>
                          {categoryItems.map(([key, item]) => {
                            const isActive = themeSet === key;
                            const icon = THEME_ICONS[key];

                            return (
                              <AppButton
                                key={key}
                                variant="text"
                                color="inherit"
                                onClick={() => handleThemeChange(key)}
                                sx={{
                                  width: '100%',

                                  minHeight: 46,

                                  px: 1,

                                  justifyContent: 'flex-start',

                                  borderRadius: 1.5,

                                  color: isActive ? textPrimary : textSecondary,

                                  backgroundColor: isActive
                                    ? alpha(item.color, 0.08)
                                    : 'transparent',

                                  border: '1px solid',
                                  borderColor: isActive
                                    ? alpha(item.color, 0.16)
                                    : 'transparent',

                                  '&:hover': {
                                    color: textPrimary,

                                    backgroundColor: alpha(item.color, 0.06)
                                  }
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 28,
                                    height: 28,

                                    mr: 1,

                                    flexShrink: 0,

                                    display: 'grid',
                                    placeItems: 'center',

                                    borderRadius: 1.25,

                                    backgroundColor: alpha(item.color, 0.08),

                                    border: `1px solid ${alpha(
                                      item.color,
                                      0.15
                                    )}`
                                  }}
                                >
                                  {icon ? (
                                    <Box
                                      component="img"
                                      src={icon}
                                      alt=""
                                      sx={{
                                        width: 21,
                                        height: 21,
                                        objectFit: 'contain'
                                      }}
                                    />
                                  ) : (
                                    <Box
                                      sx={{
                                        width: 8,
                                        height: 8,

                                        borderRadius: '50%',

                                        backgroundColor: item.color
                                      }}
                                    />
                                  )}
                                </Box>

                                <Box
                                  sx={{
                                    flex: 1,
                                    minWidth: 0,

                                    textAlign: 'left'
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: 11.5,
                                      lineHeight: 1.2,

                                      fontWeight: isActive ? 800 : 600,

                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {item.label}
                                  </Typography>
                                </Box>

                                {isActive && (
                                  <CheckRoundedIcon
                                    sx={{
                                      fontSize: 17,

                                      flexShrink: 0,

                                      color: item.color
                                    }}
                                  />
                                )}
                              </AppButton>
                            );
                          })}
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>

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
