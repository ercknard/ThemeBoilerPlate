import Head from 'next/head';
import type { ReactNode } from 'react';

import { Box, CardContent, Divider, Stack, Typography } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LayersIcon from '@mui/icons-material/Layers';
import TuneIcon from '@mui/icons-material/Tune';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import type { RadixScaleStep } from '@/theme/theme';

import { useTheme } from '@mui/material/styles';

import ThemeToggle from '@/theme/ThemeToggle';

import {
  AppButton,
  AppCard,
  AppChip,
  AppDivider
} from '@/theme/CustomComponents';

/* ========================================================================== */
/* CONSTANTS                                                                  */
/* ========================================================================== */

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? '#';

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

type ScaleItem = {
  value: RadixScaleStep;
  label: string;
};

type Principle = {
  icon: ReactNode;
  title: string;
  description: string;
};

/* ========================================================================== */
/* DATA                                                                       */
/* ========================================================================== */

const PRINCIPLES: Principle[] = [
  {
    icon: <PaletteIcon />,
    title: 'Color Relationships',
    description:
      'Colors are organized into predictable scales so surfaces, content, actions, and states remain visually connected.'
  },
  {
    icon: <LayersIcon />,
    title: 'Visual Hierarchy',
    description:
      'The interface uses a 60 / 30 / 10 distribution to establish clear priority between background, supporting surfaces, and emphasis.'
  },
  {
    icon: <TuneIcon />,
    title: 'Composable',
    description:
      'Theme tokens are designed to be reused across components instead of relying on isolated hard-coded values.'
  },
  {
    icon: <AutoAwesomeIcon />,
    title: 'Adaptive',
    description:
      'The same semantic system adapts naturally between light and dark modes while preserving contrast and hierarchy.'
  }
];

const PRIMARY_SCALE: ScaleItem[] = [
  {
    value: 3,
    label: 'Subtle backgrounds'
  },
  {
    value: 5,
    label: 'Borders'
  },
  {
    value: 7,
    label: 'Interactive'
  },
  {
    value: 9,
    label: 'Accent'
  },
  {
    value: 11,
    label: 'Primary content'
  },
  {
    value: 12,
    label: 'Maximum contrast'
  }
];

const SECONDARY_SCALE: ScaleItem[] = [
  {
    value: 3,
    label: 'Supporting surfaces'
  },
  {
    value: 5,
    label: 'Supporting borders'
  },
  {
    value: 7,
    label: 'Interactive borders'
  },
  {
    value: 9,
    label: 'Secondary emphasis'
  },
  {
    value: 11,
    label: 'Secondary content'
  },
  {
    value: 12,
    label: 'Maximum contrast'
  }
];

const GRAY_SCALE: ScaleItem[] = [
  {
    value: 3,
    label: 'Subtle surface'
  },
  {
    value: 6,
    label: 'Border'
  },
  {
    value: 9,
    label: 'Muted content'
  },
  {
    value: 10,
    label: 'Secondary content'
  },
  {
    value: 11,
    label: 'Primary content'
  },
  {
    value: 12,
    label: 'Maximum contrast'
  }
];

/* ========================================================================== */
/* SCALE PREVIEW                                                              */
/* ========================================================================== */

function ScalePreview({
  items,
  getBackground,
  getForeground
}: {
  items: ScaleItem[];
  getBackground: (value: RadixScaleStep) => string;
  getForeground: (value: RadixScaleStep) => string;
}) {
  return (
    <Stack
      sx={{
        gap: 1
      }}
    >
      {items.map((item) => {
        const background = getBackground(item.value);
        const foreground = getForeground(item.value);

        return (
          <Box
            key={item.value}
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '42px 1fr',
                sm: '52px 1fr'
              },
              gap: 1,
              alignItems: 'stretch'
            }}
          >
            {/* SCALE NUMBER */}

            <Box
              sx={{
                minHeight: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1.5,
                backgroundColor: background,
                color: foreground,
                fontSize: 12,
                fontWeight: 700
              }}
            >
              {item.value}
            </Box>

            {/* SCALE LABEL */}

            <Box
              sx={{
                minHeight: 38,
                px: 1.5,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1.5,
                backgroundColor: background,
                color: foreground,
                border: `1px solid ${background}`,
                overflow: 'hidden'
              }}
            >
              <Typography
                variant="small"
                sx={{
                  color: 'inherit',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {item.label}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

/* ========================================================================== */
/* PAGE                                                                       */
/* ========================================================================== */

export default function OverViewTheme() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>BoilerPlate | Theme System</title>

        <meta
          name="description"
          content="Theme system and design token overview."
        />
      </Head>

      <Box
        sx={{
          width: '100%',
          color: 'text.primary',
          pb: {
            xs: 6,
            md: 10
          }
        }}
      >
        {/* ================================================================== */}
        {/* HERO                                                               */}
        {/* ================================================================== */}

        <Box
          sx={{
            width: '100%',
            mx: 'auto',
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
          <AppCard
            sx={{
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'none',

              background: `
                radial-gradient(
                  circle at 85% 10%,
                  ${theme.colorScale[3]},
                  transparent 35%
                ),
                radial-gradient(
                  circle at 10% 100%,
                  ${theme.secondaryScale[3]},
                  transparent 35%
                ),
                ${theme.backgroundScale[1]}
              `
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                  lg: 6
                },

                '&:last-child': {
                  pb: {
                    xs: 3,
                    sm: 4,
                    md: 5,
                    lg: 6
                  }
                }
              }}
            >
              <Stack
                sx={{
                  flexDirection: {
                    xs: 'column',
                    md: 'row'
                  },
                  gap: 4,
                  justifyContent: 'space-between',
                  alignItems: {
                    xs: 'flex-start',
                    md: 'center'
                  }
                }}
              >
                {/* HERO CONTENT */}

                <Stack
                  sx={{
                    gap: 2
                  }}
                >
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      gap: 1,
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    <AppChip
                      icon={<PaletteIcon />}
                      label="DESIGN SYSTEM"
                      color="primary"
                    />

                    <AppChip
                      label={theme.palette.mode.toUpperCase()}
                      color="default"
                    />
                  </Stack>

                  <Typography
                    variant="sectionTitle"
                    sx={{
                      fontSize: {
                        xs: '2rem',
                        sm: '2.5rem',
                        md: '3rem'
                      },
                      lineHeight: 1.05,
                      fontWeight: 800
                    }}
                  >
                    Theme System
                  </Typography>

                  <Typography
                    variant="large"
                    sx={{
                      color: theme.grayScale[11],
                      lineHeight: 1.6
                    }}
                  >
                    A scalable visual foundation built from semantic color
                    relationships, reusable design tokens, and predictable
                    component behavior.
                  </Typography>

                  <Stack
                    sx={{
                      flexDirection: 'row',
                      gap: 1.5,
                      flexWrap: 'wrap',
                      pt: 1
                    }}
                  >
                    <AppButton
                      variant="contained"
                      color="primary"
                      startIcon={<PaletteIcon />}
                    >
                      Explore Theme
                    </AppButton>

                    <AppButton
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Source
                    </AppButton>
                  </Stack>
                </Stack>

                {/* HERO ICON */}

                <Box
                  sx={{
                    width: {
                      xs: '100%',
                      md: 180
                    },
                    display: 'flex',
                    justifyContent: {
                      xs: 'flex-start',
                      md: 'center'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',

                      background: `
                        radial-gradient(
                          circle,
                          ${theme.colorScale[7]},
                          ${theme.secondaryScale[5]}
                        )
                      `,

                      border: `1px solid ${theme.colorScale[7]}`,

                      boxShadow: `
                        0 0 50px ${theme.colorScale[5]}
                      `
                    }}
                  >
                    <PaletteIcon
                      sx={{
                        fontSize: 56,
                        color: theme.colorScale[11]
                      }}
                    />
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </AppCard>
        </Box>

        {/* ================================================================== */}
        {/* MAIN CONTENT                                                       */}
        {/* ================================================================== */}

        <Box
          sx={{
            width: '100%',
            mx: 'auto',
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
          <Stack
            sx={{
              gap: {
                xs: 3,
                md: 5
              }
            }}
          >
            {/* ================================================================ */}
            {/* DESIGN PRINCIPLES                                                */}
            {/* ================================================================ */}

            <Box>
              <Stack
                sx={{
                  gap: 1,
                  mb: 3
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700
                  }}
                >
                  Design Principles
                </Typography>

                <Typography
                  sx={{
                    color: theme.grayScale[11]
                  }}
                >
                  The rules behind the visual system. These principles keep
                  individual components consistent as the application grows.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)'
                  },

                  gap: 2
                }}
              >
                {PRINCIPLES.map((principle) => (
                  <AppCard
                    key={principle.title}
                    sx={{
                      height: '100%',
                      boxShadow: 'none',

                      transition:
                        'transform 180ms ease, border-color 180ms ease',

                      '&:hover': {
                        transform: 'translateY(-3px)',
                        borderColor: theme.colorScale[7]
                      }
                    }}
                  >
                    <CardContent>
                      <Stack
                        sx={{
                          gap: 2
                        }}
                      >
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 1.5,
                            display: 'grid',
                            placeItems: 'center',
                            backgroundColor: theme.colorScale[3],
                            color: theme.colorScale[11]
                          }}
                        >
                          {principle.icon}
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700
                          }}
                        >
                          {principle.title}
                        </Typography>

                        <Typography
                          variant="small"
                          sx={{
                            color: theme.grayScale[11],
                            lineHeight: 1.6
                          }}
                        >
                          {principle.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </AppCard>
                ))}
              </Box>
            </Box>

            {/* ================================================================ */}
            {/* 60 / 30 / 10                                                     */}
            {/* ================================================================ */}

            <AppCard
              id="overview-color-relationship"
              sx={{
                boxShadow: 'none'
              }}
            >
              <CardContent
                sx={{
                  p: {
                    xs: 2.5,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack
                  sx={{
                    gap: 4
                  }}
                >
                  <Stack
                    sx={{
                      flexDirection: {
                        xs: 'column',
                        md: 'row'
                      },
                      gap: 2,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700
                        }}
                      >
                        Color Relationship
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          color: theme.grayScale[11]
                        }}
                      >
                        The interface follows a 60 / 30 / 10 visual hierarchy to
                        prevent accent colors from overwhelming the interface.
                      </Typography>
                    </Box>

                    <AppChip label="60 / 30 / 10" color="primary" />
                  </Stack>

                  {/* RATIO VISUALIZATION */}

                  <Box
                    sx={{
                      display: 'grid',

                      gridTemplateColumns: {
                        xs: '1fr',
                        md: '6fr 3fr 1fr'
                      },

                      minHeight: {
                        xs: 'auto',
                        md: 130
                      },

                      gap: 1
                    }}
                  >
                    {/* 60% */}

                    <Box
                      sx={{
                        minHeight: 110,
                        p: 3,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: theme.backgroundScale[2],
                        border: `1px solid ${theme.grayScale[6]}`
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: theme.backgroundScale[12]
                        }}
                      >
                        60%
                      </Typography>

                      <Box>
                        <Typography
                          variant="medium"
                          sx={{
                            fontWeight: 700,
                            color: theme.backgroundScale[12]
                          }}
                        >
                          Background
                        </Typography>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 0.5,
                            color: theme.grayScale[10]
                          }}
                        >
                          Dominant surfaces and page areas.
                        </Typography>
                      </Box>
                    </Box>

                    {/* 30% */}

                    <Box
                      sx={{
                        minHeight: 110,
                        p: 3,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: theme.secondaryScale[3],
                        border: `1px solid ${theme.secondaryScale[7]}`
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: theme.secondaryScale[11]
                        }}
                      >
                        30%
                      </Typography>

                      <Box>
                        <Typography
                          variant="medium"
                          sx={{
                            fontWeight: 700,
                            color: theme.secondaryScale[11]
                          }}
                        >
                          Secondary
                        </Typography>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 0.5,
                            color: theme.secondaryScale[10]
                          }}
                        >
                          Supporting surfaces and structure.
                        </Typography>
                      </Box>
                    </Box>

                    {/* 10% */}

                    <Box
                      sx={{
                        minHeight: 110,
                        p: 3,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: theme.colorScale[3],
                        border: `1px solid ${theme.colorScale[7]}`
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: theme.colorScale[11]
                        }}
                      >
                        10%
                      </Typography>

                      <Box>
                        <Typography
                          variant="medium"
                          sx={{
                            fontWeight: 700,
                            color: theme.colorScale[11]
                          }}
                        >
                          Primary
                        </Typography>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 0.5,
                            color: theme.colorScale[10]
                          }}
                        >
                          Actions and active states.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </AppCard>

            {/* ================================================================ */}
            {/* COLOR SCALES                                                     */}
            {/* ================================================================ */}

            <Box id="overview-color-scales">
              <Stack
                sx={{
                  gap: 1,
                  mb: 3
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700
                  }}
                >
                  Color Scales
                </Typography>

                <Typography
                  sx={{
                    color: theme.grayScale[11]
                  }}
                >
                  Each color family provides multiple tonal steps for surfaces,
                  borders, interactions, content, and emphasis.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(2, 1fr)',
                    xl: 'repeat(4, 1fr)'
                  },

                  gap: 2
                }}
              >
                {/* ============================================================ */}
                {/* PRIMARY                                                        */}
                {/* ============================================================ */}

                <AppCard
                  sx={{
                    height: '100%',
                    boxShadow: 'none'
                  }}
                >
                  <CardContent>
                    <Stack
                      sx={{
                        gap: 3
                      }}
                    >
                      <Box>
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            gap: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700
                            }}
                          >
                            Primary
                          </Typography>

                          <AppChip label="10%" color="primary" />
                        </Stack>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 1,
                            color: theme.grayScale[11]
                          }}
                        >
                          Emphasis, actions and active states.
                        </Typography>
                      </Box>

                      <ScalePreview
                        items={PRIMARY_SCALE}
                        getBackground={(value) => theme.colorScale[value]}
                        getForeground={(value) =>
                          value >= 9
                            ? theme.colorScale[1]
                            : theme.colorScale[11]
                        }
                      />

                      <Stack
                        sx={{
                          flexDirection: 'row',
                          gap: 1,
                          flexWrap: 'wrap'
                        }}
                      >
                        <AppChip label="Primary" color="primary" />

                        <AppButton
                          size="small"
                          variant="contained"
                          color="primary"
                        >
                          Action
                        </AppButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </AppCard>

                {/* ============================================================ */}
                {/* SECONDARY                                                      */}
                {/* ============================================================ */}

                <AppCard
                  sx={{
                    height: '100%',
                    boxShadow: 'none',
                    borderColor: theme.secondaryScale[6]
                  }}
                >
                  <CardContent>
                    <Stack
                      sx={{
                        gap: 3
                      }}
                    >
                      <Box>
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            gap: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700
                            }}
                          >
                            Secondary
                          </Typography>

                          <AppChip label="30%" color="secondary" />
                        </Stack>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 1,
                            color: theme.grayScale[11]
                          }}
                        >
                          Supporting structures and visual connections.
                        </Typography>
                      </Box>

                      <ScalePreview
                        items={SECONDARY_SCALE}
                        getBackground={(value) => theme.secondaryScale[value]}
                        getForeground={(value) =>
                          value >= 9
                            ? theme.secondaryScale[1]
                            : theme.secondaryScale[11]
                        }
                      />

                      <Stack
                        sx={{
                          flexDirection: 'row',
                          gap: 1,
                          flexWrap: 'wrap'
                        }}
                      >
                        <AppChip label="Secondary" color="secondary" />

                        <AppButton
                          size="small"
                          variant="outlined"
                          color="secondary"
                        >
                          Supporting
                        </AppButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </AppCard>

                {/* ============================================================ */}
                {/* GRAY                                                           */}
                {/* ============================================================ */}

                <AppCard
                  sx={{
                    height: '100%',
                    boxShadow: 'none',
                    borderColor: theme.grayScale[6]
                  }}
                >
                  <CardContent>
                    <Stack
                      sx={{
                        gap: 3
                      }}
                    >
                      <Box>
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            gap: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700
                            }}
                          >
                            Gray
                          </Typography>

                          <AppChip label="Neutral" color="default" />
                        </Stack>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 1,
                            color: theme.grayScale[11]
                          }}
                        >
                          Neutral surfaces, content and utility states.
                        </Typography>
                      </Box>

                      <ScalePreview
                        items={GRAY_SCALE}
                        getBackground={(value) => theme.grayScale[value]}
                        getForeground={(value) =>
                          value >= 9 ? theme.grayScale[1] : theme.grayScale[12]
                        }
                      />

                      <Stack
                        sx={{
                          gap: 1
                        }}
                      >
                        <Typography
                          sx={{
                            color: theme.grayScale[12]
                          }}
                        >
                          Primary text
                        </Typography>

                        <Typography
                          sx={{
                            color: theme.grayScale[11]
                          }}
                        >
                          Secondary text
                        </Typography>

                        <Typography
                          sx={{
                            color: theme.grayScale[9]
                          }}
                        >
                          Disabled text
                        </Typography>

                        <AppButton size="small" variant="outlined" disabled>
                          Disabled
                        </AppButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </AppCard>

                {/* ============================================================ */}
                {/* BACKGROUND                                                      */}
                {/* ============================================================ */}

                <AppCard
                  sx={{
                    height: '100%',
                    boxShadow: 'none'
                  }}
                >
                  <CardContent>
                    <Stack
                      sx={{
                        gap: 3
                      }}
                    >
                      <Box>
                        <Stack
                          sx={{
                            flexDirection: 'row',
                            gap: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700
                            }}
                          >
                            Background
                          </Typography>

                          <AppChip label="60%" color="default" />
                        </Stack>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 1,
                            color: theme.grayScale[11]
                          }}
                        >
                          The foundation for pages and dominant surfaces.
                        </Typography>
                      </Box>

                      {/* BACKGROUND VISUAL */}

                      <Box
                        sx={{
                          minHeight: 160,
                          borderRadius: 2,
                          overflow: 'hidden',
                          position: 'relative',

                          background: `
                            radial-gradient(
                              circle at 20% 50%,
                              ${theme.secondaryScale[5]},
                              transparent 25%
                            ),
                            radial-gradient(
                              circle at 80% 50%,
                              ${theme.colorScale[5]},
                              transparent 25%
                            ),
                            ${theme.backgroundScale[1]}
                          `,

                          border: `1px solid ${theme.grayScale[6]}`
                        }}
                      >
                        {/* CONNECTION */}

                        <Box
                          sx={{
                            position: 'absolute',
                            left: '18%',
                            right: '18%',
                            top: '50%',
                            height: 1,
                            backgroundColor: theme.grayScale[7]
                          }}
                        />

                        {/* SECONDARY NODE */}

                        <Box
                          sx={{
                            position: 'absolute',
                            left: '18%',
                            top: '50%',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: theme.secondaryScale[9],
                            transform: 'translate(-50%, -50%)',
                            boxShadow: `0 0 20px ${theme.secondaryScale[7]}`
                          }}
                        />

                        {/* CENTER NODE */}

                        <Box
                          sx={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: theme.grayScale[9],
                            transform: 'translate(-50%, -50%)'
                          }}
                        />

                        {/* PRIMARY NODE */}

                        <Box
                          sx={{
                            position: 'absolute',
                            right: '18%',
                            top: '50%',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: theme.colorScale[9],
                            transform: 'translate(50%, -50%)',
                            boxShadow: `0 0 20px ${theme.colorScale[7]}`
                          }}
                        />
                      </Box>

                      <Typography
                        variant="small"
                        sx={{
                          color: theme.grayScale[10]
                        }}
                      >
                        Background → supporting layer → primary emphasis
                      </Typography>
                    </Stack>
                  </CardContent>
                </AppCard>
              </Box>
            </Box>

            {/* ================================================================ */}
            {/* COMPONENT SHOWCASE                                               */}
            {/* ================================================================ */}

            <AppCard
              id="overview-theme-samples"
              sx={{
                boxShadow: 'none'
              }}
            >
              <CardContent
                sx={{
                  p: {
                    xs: 2.5,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack
                  sx={{
                    gap: 4
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700
                      }}
                    >
                      Component Showcase
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: theme.grayScale[11]
                      }}
                    >
                      Real components using the theme tokens. This section
                      demonstrates how the color relationships translate into
                      practical interface elements.
                    </Typography>
                  </Box>

                  {/* BUTTONS */}

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 700
                      }}
                    >
                      Actions
                    </Typography>

                    <Stack
                      sx={{
                        flexDirection: 'row',
                        gap: 1.5,
                        flexWrap: 'wrap'
                      }}
                    >
                      <AppButton variant="contained" color="primary">
                        Primary Action
                      </AppButton>

                      <AppButton variant="outlined" color="primary">
                        Outlined
                      </AppButton>

                      <AppButton variant="contained" color="secondary">
                        Secondary
                      </AppButton>

                      <AppButton variant="outlined" color="secondary">
                        Supporting
                      </AppButton>

                      <AppButton
                        variant="text"
                        sx={{
                          color: theme.grayScale[11],

                          '&:hover': {
                            backgroundColor: theme.grayScale[3]
                          }
                        }}
                      >
                        Neutral
                      </AppButton>

                      <AppButton variant="outlined" disabled>
                        Disabled
                      </AppButton>
                    </Stack>
                  </Box>

                  <AppDivider />

                  {/* CHIPS */}

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 700
                      }}
                    >
                      States & Labels
                    </Typography>

                    <Stack
                      sx={{
                        flexDirection: 'row',
                        gap: 1,
                        flexWrap: 'wrap'
                      }}
                    >
                      <AppChip label="Primary" color="primary" />

                      <AppChip label="Secondary" color="secondary" />

                      <AppChip label="Neutral" color="default" />

                      <AppChip
                        icon={<CheckCircleOutlineOutlinedIcon />}
                        label="Success"
                        color="success"
                      />

                      <AppChip label="Warning" color="warning" />

                      <AppChip label="Error" color="error" />

                      <AppChip label="Info" color="info" />
                    </Stack>
                  </Box>

                  <AppDivider />

                  {/* THEME CONTROL */}

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 700
                      }}
                    >
                      Theme Control
                    </Typography>

                    <Stack
                      sx={{
                        flexDirection: {
                          xs: 'column',
                          sm: 'row'
                        },
                        gap: 2,
                        alignItems: {
                          xs: 'flex-start',
                          sm: 'center'
                        }
                      }}
                    >
                      <ThemeToggle />

                      <Typography
                        variant="small"
                        sx={{
                          color: theme.grayScale[10]
                        }}
                      >
                        Toggle between the available theme modes while
                        preserving the same semantic relationships.
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </AppCard>

            {/* ================================================================ */}
            {/* TOKEN PHILOSOPHY                                                 */}
            {/* ================================================================ */}

            <AppCard
              sx={{
                boxShadow: 'none'
              }}
            >
              <CardContent
                sx={{
                  p: {
                    xs: 2.5,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack
                  sx={{
                    gap: 3
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700
                      }}
                    >
                      Token Philosophy
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: theme.grayScale[11]
                      }}
                    >
                      Components should consume semantic theme tokens instead of
                      depending on arbitrary colors. This keeps the system
                      maintainable and makes global visual changes predictable.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'grid',

                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(3, 1fr)'
                      },

                      gap: 2
                    }}
                  >
                    {/* AVOID */}

                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        backgroundColor: theme.grayScale[2],
                        border: `1px solid ${theme.grayScale[6]}`
                      }}
                    >
                      <Typography
                        variant="small"
                        sx={{
                          color: theme.grayScale[9],
                          fontWeight: 700,
                          letterSpacing: '0.08em'
                        }}
                      >
                        AVOID
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          fontFamily: 'monospace',
                          color: theme.palette.error.main
                        }}
                      >
                        #4967C9
                      </Typography>

                      <Typography
                        variant="small"
                        sx={{
                          display: 'block',
                          mt: 1,
                          color: theme.grayScale[10]
                        }}
                      >
                        Hard-coded component colors.
                      </Typography>
                    </Box>

                    {/* PREFER */}

                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        backgroundColor: theme.colorScale[2],
                        border: `1px solid ${theme.colorScale[6]}`
                      }}
                    >
                      <Typography
                        variant="small"
                        sx={{
                          color: theme.colorScale[10],
                          fontWeight: 700,
                          letterSpacing: '0.08em'
                        }}
                      >
                        PREFER
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          fontFamily: 'monospace',
                          color: theme.colorScale[11]
                        }}
                      >
                        colorScale[9]
                      </Typography>

                      <Typography
                        variant="small"
                        sx={{
                          display: 'block',
                          mt: 1,
                          color: theme.grayScale[10]
                        }}
                      >
                        Reusable scale tokens.
                      </Typography>
                    </Box>

                    {/* RESULT */}

                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        backgroundColor: theme.secondaryScale[2],
                        border: `1px solid ${theme.secondaryScale[6]}`
                      }}
                    >
                      <Typography
                        variant="small"
                        sx={{
                          color: theme.secondaryScale[10],
                          fontWeight: 700,
                          letterSpacing: '0.08em'
                        }}
                      >
                        RESULT
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          fontFamily: 'monospace',
                          color: theme.secondaryScale[11]
                        }}
                      >
                        semantic.theme
                      </Typography>

                      <Typography
                        variant="small"
                        sx={{
                          display: 'block',
                          mt: 1,
                          color: theme.grayScale[10]
                        }}
                      >
                        Consistent and adaptable UI.
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </AppCard>

            {/* ================================================================ */}
            {/* FOOTER                                                           */}
            {/* ================================================================ */}

            <Divider />

            <Stack
              sx={{
                flexDirection: {
                  xs: 'column',
                  sm: 'row'
                },
                gap: 2,
                justifyContent: 'space-between',
                alignItems: {
                  xs: 'flex-start',
                  sm: 'center'
                }
              }}
            >
              <Box>
                <Typography
                  variant="medium"
                  sx={{
                    fontWeight: 700
                  }}
                >
                  Theme System
                </Typography>

                <Typography
                  variant="small"
                  sx={{
                    display: 'block',
                    mt: 0.5,
                    color: theme.grayScale[10]
                  }}
                >
                  A reusable foundation for the application UI.
                </Typography>
              </Box>

              <Stack
                sx={{
                  flexDirection: 'row',
                  gap: 1,
                  alignItems: 'center'
                }}
              >
                <CheckCircleOutlineOutlinedIcon
                  sx={{
                    fontSize: 18,
                    color: theme.palette.success?.main
                  }}
                />

                <Typography
                  variant="small"
                  sx={{
                    color: theme.grayScale[10]
                  }}
                >
                  Theme tokens active
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
