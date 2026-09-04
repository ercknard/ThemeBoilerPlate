import Head from 'next/head';

import { Box, CardContent, Stack, Typography } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';

import { useTheme } from '@mui/material/styles';

import ThemeToggle from '@/theme/ThemeToggle';

import {
  AppButton,
  AppCard,
  AppChip,
  AppDivider
} from '@/theme/CustomComponents';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? '#';

export default function OverViewTheme() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>BoilerPlate</title>
        <meta name="description" content="CryptechServices Theme System" />
      </Head>

      <Box
        sx={{
          width: '100%',
          color: 'text.primary',
          transition: 'background-color 0.4s ease'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1400,
            mx: 'auto',
            px: {
              xs: 2,
              sm: 3,
              md: 0
            },
            py: {
              xs: 4,
              md: 0
            }
          }}
        >
          {/* ============================================================= */}
          {/* HERO                                                          */}
          {/* ============================================================= */}

          <Stack spacing={0} sx={{ mb: 3 }}>
            <Typography
              variant="overlineCustom"
              sx={{
                color: theme.colorScale[9],
                fontWeight: 700
              }}
            >
              CryptechServices Theme System
            </Typography>

            <Typography variant="title">Theme BoilerPlate</Typography>

            <Typography
              variant="lead"
              sx={{
                color: theme.secondaryScale[11]
              }}
            >
              A dynamic theme powered by custom primary, secondary, gray, and
              background scales.
            </Typography>
          </Stack>

          {/* ============================================================= */}
          {/* 60 / 30 / 10 SYSTEM                                          */}
          {/* ============================================================= */}

          <AppCard
            sx={{
              mb: 5,
              boxShadow: 'none'
            }}
          >
            <CardContent>
              <Stack spacing={3}>
                <Stack>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700
                    }}
                  >
                    Color Relationship
                  </Typography>

                  <Typography
                    variant="small"
                    sx={{
                      mt: 1,
                      color: theme.grayScale[11]
                    }}
                  >
                    The theme follows a 60 / 30 / 10 visual hierarchy.
                  </Typography>
                </Stack>

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
                  {/* ===================================================== */}
                  {/* 60% BACKGROUND                                        */}
                  {/* ===================================================== */}

                  <Stack
                    sx={{
                      minHeight: 120,
                      p: 2.5,
                      borderRadius: 2,
                      backgroundColor: theme.backgroundScale[1],
                      border: `1px solid ${theme.secondaryScale[5]}`
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.backgroundScale[12]
                      }}
                    >
                      60%
                    </Typography>

                    <Typography
                      variant="medium"
                      sx={{
                        mt: 0.5,
                        color: theme.backgroundScale[11]
                      }}
                    >
                      Background
                    </Typography>

                    <Typography
                      variant="small"
                      sx={{
                        mt: 1,
                        color: theme.grayScale[10]
                      }}
                    >
                      Dominant surfaces and page areas.
                    </Typography>
                  </Stack>

                  {/* ===================================================== */}
                  {/* 30% SECONDARY                                         */}
                  {/* ===================================================== */}

                  <Stack
                    sx={{
                      minHeight: 120,
                      p: 2.5,
                      borderRadius: 2,
                      backgroundColor: theme.secondaryScale[3],
                      border: `1px solid ${theme.secondaryScale[7]}`
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.secondaryScale[11]
                      }}
                    >
                      30%
                    </Typography>

                    <Typography
                      variant="medium"
                      sx={{
                        mt: 0.5,
                        color: theme.secondaryScale[11]
                      }}
                    >
                      Secondary
                    </Typography>

                    <Typography
                      variant="small"
                      sx={{
                        mt: 1,
                        color: theme.secondaryScale[10]
                      }}
                    >
                      Supporting structures, panels and connections.
                    </Typography>
                  </Stack>

                  {/* ===================================================== */}
                  {/* 10% PRIMARY                                           */}
                  {/* ===================================================== */}

                  <Stack
                    sx={{
                      minHeight: 120,
                      p: 2.5,
                      borderRadius: 2,
                      backgroundColor: theme.colorScale[3],
                      border: `1px solid ${theme.colorScale[7]}`
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.colorScale[11]
                      }}
                    >
                      10%
                    </Typography>

                    <Typography
                      variant="medium"
                      sx={{
                        mt: 0.5,
                        color: theme.colorScale[11]
                      }}
                    >
                      Primary
                    </Typography>

                    <Typography
                      variant="small"
                      sx={{
                        mt: 1,
                        color: theme.colorScale[10]
                      }}
                    >
                      Important actions and active states.
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </AppCard>

          {/* ============================================================= */}
          {/* THEME PREVIEW                                                 */}
          {/* ============================================================= */}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(4, 1fr)'
              },
              gap: 3
            }}
          >
            {/* ========================================================= */}
            {/* PRIMARY                                                    */}
            {/* ========================================================= */}

            <AppCard
              sx={{
                boxShadow: 'none'
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.colorScale[11]
                    }}
                  >
                    Primary
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.grayScale[11]
                    }}
                  >
                    Your custom primary color scale.
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      flexWrap: 'wrap'
                    }}
                    useFlexGap
                  >
                    <AppChip label="Primary" color="primary" />

                    <AppButton variant="contained" color="primary">
                      Button
                    </AppButton>
                  </Stack>
                </Stack>
              </CardContent>
            </AppCard>

            {/* ========================================================= */}
            {/* SECONDARY                                                  */}
            {/* ========================================================= */}

            <AppCard
              sx={{
                borderColor: theme.secondaryScale[7],
                boxShadow: 'none'
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.colorScale[11]
                    }}
                  >
                    Secondary
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.grayScale[11]
                    }}
                  >
                    Supporting colors, panels and visual connections.
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      flexWrap: 'wrap'
                    }}
                    useFlexGap
                  >
                    <AppChip
                      label="Secondary"
                      color="secondary"
                      sx={{
                        backgroundColor: theme.secondaryScale[3],
                        color: theme.secondaryScale[11],
                        border: `1px solid ${theme.secondaryScale[6]}`
                      }}
                    />

                    <AppButton variant="outlined" color="secondary">
                      Supporting
                    </AppButton>
                  </Stack>
                </Stack>
              </CardContent>
            </AppCard>

            {/* ========================================================= */}
            {/* GRAY                                                       */}
            {/* ========================================================= */}

            <AppCard
              sx={{
                borderColor: theme.grayScale[6],
                boxShadow: 'none'
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.colorScale[12]
                    }}
                  >
                    Gray
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.grayScale[11]
                    }}
                  >
                    Neutral, disabled and utility states.
                  </Typography>

                  <Stack spacing={1}>
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

                    <AppButton disabled variant="outlined">
                      Disabled
                    </AppButton>
                  </Stack>
                </Stack>
              </CardContent>
            </AppCard>

            {/* ========================================================= */}
            {/* BACKGROUND                                                 */}
            {/* ========================================================= */}

            <AppCard
              sx={{
                boxShadow: 'none'
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.colorScale[12]
                    }}
                  >
                    Background
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.grayScale[11]
                    }}
                  >
                    Your custom background scale.
                  </Typography>

                  <Box
                    sx={{
                      height: 80,
                      borderRadius: 2,
                      backgroundColor: theme.backgroundScale[1],
                      border: `1px solid ${theme.secondaryScale[7]}`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Connection line */}

                    <Box
                      sx={{
                        position: 'absolute',
                        left: '15%',
                        right: '15%',
                        top: '50%',
                        height: 1,
                        backgroundColor: theme.secondaryScale[7]
                      }}
                    />

                    {/* Connection node */}

                    <Box
                      sx={{
                        position: 'absolute',
                        left: '15%',
                        top: '50%',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.secondaryScale[9],
                        transform: 'translate(-50%, -50%)'
                      }}
                    />

                    {/* Primary node */}

                    <Box
                      sx={{
                        position: 'absolute',
                        right: '15%',
                        top: '50%',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.colorScale[9],
                        transform: 'translate(50%, -50%)'
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </AppCard>
          </Box>

          {/* ============================================================= */}
          {/* COLOR SAMPLES                                                 */}
          {/* ============================================================= */}

          <Box sx={{ mt: 5 }}>
            <AppCard
              sx={{
                boxShadow: 'none'
              }}
            >
              <CardContent>
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: theme.colorScale[11]
                      }}
                    >
                      Theme Samples
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        color: theme.grayScale[11]
                      }}
                    >
                      Primary handles emphasis, secondary supports the
                      interface, and gray remains neutral.
                    </Typography>
                  </Box>

                  {/* =================================================== */}
                  {/* ACTIONS                                               */}
                  {/* =================================================== */}

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      flexWrap: 'wrap'
                    }}
                    useFlexGap
                  >
                    {/* Primary */}

                    <AppButton variant="contained" color="primary">
                      Contained
                    </AppButton>

                    {/* Secondary */}

                    <AppButton variant="outlined" color="secondary">
                      Secondary
                    </AppButton>

                    {/* Neutral */}

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

                    {/* Disabled */}

                    <AppButton variant="outlined" disabled>
                      Disabled
                    </AppButton>
                  </Stack>

                  <AppDivider />

                  {/* =================================================== */}
                  {/* CHIPS                                                 */}
                  {/* =================================================== */}

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      flexWrap: 'wrap'
                    }}
                    useFlexGap
                  >
                    <AppChip label="Primary" color="primary" />

                    <AppChip label="Secondary" color="secondary" />

                    <AppChip label="Neutral" color="default" />

                    <AppChip label="Success" color="success" />

                    <AppChip label="Warning" color="warning" />

                    <AppChip label="Error" color="error" />

                    <AppChip label="Info" color="info" />
                  </Stack>
                </Stack>
              </CardContent>
            </AppCard>
          </Box>
        </Box>
      </Box>
    </>
  );
}
