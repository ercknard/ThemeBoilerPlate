'use client';

import Head from 'next/head';
import { Box, CardContent, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { THEME_SETS } from '@/theme/theme';
import { useThemeContext } from '@/contexts/themeContext';
import {
  AppCard,
  AppDivider,
  AppPaper,
  AppButton,
  AppChip
} from '@/theme/components/CustomComponents';
import {
  ColorScaleSection,
  ColorUsageCard
} from '@/theme/components/ShowcaseComponents';
import { colorGroups } from '@/utils/showcase-data';

export default function ColorsSection() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();
  const colorScale = theme.colorScale;
  const secondaryScale = theme.secondaryScale;
  const grayScale = theme.grayScale;
  const backgroundScale = theme.backgroundScale;

  return (
    <>
      <Head>
        <title>
          BoilerPlate | Colors | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>

        <meta
          name="description"
          content="A flexible MUI theme system with dynamic color scales, semantic surfaces, typography, and responsive components."
        />
      </Head>
      <Stack
        spacing={{ xs: 6, md: 8 }}
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
        {/* PAGE INTRO                                                        */}
        {/* ================================================================ */}

        <Box id="colors">
          <Stack spacing={2}>
            <Stack>
              <Typography
                variant="overlineCustom"
                sx={{
                  color: colorScale[9],
                  fontWeight: 700,
                  letterSpacing: '0.12em'
                }}
              >
                Colors
              </Typography>
              <Typography variant="sectionTitle">Color Relationship</Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                A semantic color system built around hierarchy, contrast, and
                consistent visual roles. The system combines primary accents,
                supporting colors, neutrals, and application surfaces.
              </Typography>
            </Stack>

            {/* -------------------------------------------------------------- */}
            {/* 60 / 30 / 10 VISUAL SYSTEM                                    */}
            {/* -------------------------------------------------------------- */}

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
          </Stack>
        </Box>

        {/* ================================================================ */}
        {/* COLOR SCALES                                                      */}
        {/* ================================================================ */}

        <Box id="colors-scales">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Color Scales
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                Each scale contains tonal steps that can be selected according
                to contrast, emphasis, surface depth, and semantic purpose.
              </Typography>
            </Box>

            <Stack spacing={4}>
              {/* PRIMARY */}

              <ColorScaleSection
                title="Primary / Color Scale"
                description="The primary accent used for important actions, active states, links, selected elements, emphasis, and key interaction."
                scale={colorScale}
                colorName="Primary"
                semanticGroups={colorGroups}
              />

              {/* SECONDARY */}

              <ColorScaleSection
                title="Secondary Scale"
                description="The supporting color scale used for panels, cards, connections, borders, secondary actions, and decorative structures."
                scale={secondaryScale}
                colorName="Secondary"
                semanticGroups={colorGroups}
              />

              {/* GRAY */}

              <ColorScaleSection
                title="Gray / Neutral Scale"
                description="The neutral utility scale used for text hierarchy, disabled states, borders, dividers, inactive controls, and supporting interface elements."
                scale={grayScale}
                colorName="Gray"
                semanticGroups={colorGroups}
              />

              {/* BACKGROUND */}

              <ColorScaleSection
                title="Background Scale"
                description="The surface scale used for application backgrounds, cards, dialogs, menus, recessed areas, and layered interface surfaces."
                scale={backgroundScale}
                colorName="Background"
                semanticGroups={colorGroups}
              />
            </Stack>
          </Stack>
        </Box>

        {/* ================================================================ */}
        {/* HOW TO USE                                                        */}
        {/* ================================================================ */}

        <Box id="colors-how-to-use-colors">
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="overlineCustom"
                sx={{
                  display: 'block',
                  mb: 1,
                  color: colorScale[9]
                }}
              >
                COLOR USAGE
              </Typography>

              <Typography variant="sectionTitle" gutterBottom>
                How to Add Colors
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                Access the generated scales from the MUI theme instead of
                hard-coding color values. This keeps components consistent and
                makes global theme changes easier to maintain.
              </Typography>
            </Box>

            <Stack spacing={3}>
              {/* PRIMARY */}

              <ColorUsageCard
                title="Primary / Color"
                description={
                  <>
                    Use <code>colorScale</code> for important actions, active
                    states, links, selected elements, and visual emphasis.
                  </>
                }
                code={`import { useTheme } from '@mui/material/styles';

const theme = useTheme();

const colorScale = theme.colorScale;

<AppButton
  sx={{
    backgroundColor: colorScale[9],
    color: colorScale.contrast,
    '&:hover': {
      backgroundColor: colorScale[10]
    }
  }}
>
  Primary action
</AppButton>`}
                background={colorScale[2]}
                textColor={colorScale[12]}
                scale={colorScale}
                steps={[3, 5, 7, 9, 10, 11, 12]}
              />

              {/* SECONDARY */}

              <ColorUsageCard
                title="Secondary / Supporting"
                description={
                  <>
                    Use <code>secondaryScale</code> for supporting surfaces,
                    panels, borders, connections, decorative elements, and
                    secondary actions.
                  </>
                }
                code={`const secondaryScale = theme.secondaryScale;

<Box
  sx={{
    backgroundColor: secondaryScale[3],
    color: grayScale[11],
    borderColor: secondaryScale[7]
  }}
>
  Supporting content
</Box>

<AppButton
  variant="outlined"
  sx={{
    borderColor: secondaryScale[7],
    color: secondaryScale[11]
  }}
>
  Secondary action
</AppButton>`}
                background={secondaryScale[2]}
                textColor={secondaryScale[12]}
                scale={secondaryScale}
                steps={[3, 5, 7, 9, 10, 11, 12]}
              />

              {/* GRAY */}

              <ColorUsageCard
                title="Gray / Neutral"
                description={
                  <>
                    Use <code>grayScale</code> for neutral surfaces, text,
                    dividers, borders, disabled states, and inactive controls.
                  </>
                }
                code={`const grayScale = theme.grayScale;

<Typography
  sx={{
    color: grayScale[12]
  }}
>
  Primary text
</Typography>

<AppButton
  disabled
  sx={{
    color: grayScale[8],
    backgroundColor: grayScale[3]
  }}
>
  Disabled
</AppButton>`}
                background={grayScale[3]}
                textColor={grayScale[12]}
                scale={grayScale}
                steps={[2, 3, 6, 7, 9, 11, 12]}
              />

              {/* BACKGROUND */}

              <ColorUsageCard
                title="Background / Surface"
                description={
                  <>
                    Use <code>backgroundScale</code> for the dominant
                    application background, cards, dialogs, menus, and layered
                    surfaces.
                  </>
                }
                code={`const backgroundScale = theme.backgroundScale;

<Box
  sx={{
    backgroundColor: backgroundScale[5]
  }}
>
  Application background
</Box>

<AppPaper
  sx={{
    backgroundColor: backgroundScale[2]
  }}
>
  Surface
</AppPaper>`}
                background={backgroundScale[3]}
                textColor={backgroundScale[12]}
                scale={backgroundScale}
                steps={[1, 2, 3, 4, 6, 8]}
              />
            </Stack>
          </Stack>
        </Box>

        {/* ================================================================ */}
        {/* SEMANTIC QUICK REFERENCE                                         */}
        {/* ================================================================ */}

        <Box id="colors-quick-reference">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Semantic Quick Reference
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                A quick guide for choosing the correct scale when building new
                components.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(4, minmax(0, 1fr))'
                },
                gap: 2
              }}
            >
              {[
                {
                  scale: 'backgroundScale',
                  percentage: '60%',
                  role: 'Background',
                  usage: 'Application backgrounds and dominant surfaces',
                  color: backgroundScale[4],
                  textColor: backgroundScale[12]
                },
                {
                  scale: 'secondaryScale',
                  percentage: '30%',
                  role: 'Secondary',
                  usage:
                    'Supporting panels, borders, structures, and connections',
                  color: secondaryScale[5],
                  textColor: secondaryScale[12]
                },
                {
                  scale: 'colorScale',
                  percentage: '10%',
                  role: 'Primary',
                  usage: 'Important actions, active states, and emphasis',
                  color: colorScale[9],
                  textColor: colorScale.contrast
                },
                {
                  scale: 'grayScale',
                  percentage: 'Neutral',
                  role: 'Gray',
                  usage:
                    'Text, disabled states, borders, dividers, and utility UI',
                  color: grayScale[7],
                  textColor: grayScale[12]
                }
              ].map((item) => (
                <AppPaper
                  key={item.scale}
                  variant="outlined"
                  sx={{
                    overflow: 'hidden',
                    height: '100%',
                    borderColor: secondaryScale[6]
                  }}
                >
                  <Box
                    sx={{
                      height: 8,
                      backgroundColor: item.color
                    }}
                  />

                  <Stack
                    spacing={2}
                    sx={{
                      p: 2.5
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      spacing={2}
                    >
                      <Typography
                        variant="code"
                        sx={{
                          color: grayScale[11]
                        }}
                      >
                        {item.percentage}
                      </Typography>

                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          flexShrink: 0,
                          borderRadius: 1.5,
                          backgroundColor: item.color,
                          border: `1px solid ${secondaryScale[6]}`
                        }}
                      />
                    </Stack>

                    <Box>
                      <Typography
                        variant="medium"
                        sx={{
                          display: 'block',
                          fontWeight: 700
                        }}
                      >
                        {item.role}
                      </Typography>

                      <Typography
                        variant="small"
                        sx={{
                          display: 'block',
                          mt: 0.75,
                          color: grayScale[11],
                          lineHeight: 1.6
                        }}
                      >
                        {item.usage}
                      </Typography>
                    </Box>

                    <AppDivider />

                    <Typography
                      variant="code"
                      sx={{
                        color: grayScale[10],
                        wordBreak: 'break-word'
                      }}
                    >
                      {item.scale}
                    </Typography>
                  </Stack>
                </AppPaper>
              ))}
            </Box>
          </Stack>
        </Box>

        {/* ================================================================ */}
        {/* COLOR USAGE                                                       */}
        {/* ================================================================ */}

        <Box id="colors-color-usage">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Color Usage
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                Examples of how the semantic color hierarchy translates into
                real interface components.
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
              <Stack spacing={4}>
                {/* ========================================================== */}
                {/* SURFACE HIERARCHY                                           */}
                {/* ========================================================== */}

                <Box>
                  <Typography
                    variant="label"
                    sx={{
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    Surface Hierarchy
                  </Typography>

                  <Stack spacing={1.5}>
                    {/* Background */}

                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        backgroundColor: backgroundScale[5],
                        border: `1px solid ${secondaryScale[6]}`
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mb: 0.5,
                          color: grayScale[11]
                        }}
                      >
                        BACKGROUND
                      </Typography>

                      <Typography variant="body1">
                        Dominant application surface
                      </Typography>
                    </Box>

                    {/* Secondary */}

                    <Box
                      sx={{
                        ml: {
                          xs: 1,
                          sm: 3
                        },
                        p: 2.5,
                        borderRadius: 2,
                        backgroundColor: secondaryScale[3],
                        border: `1px solid ${secondaryScale[7]}`
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mb: 0.5,
                          color: secondaryScale[11]
                        }}
                      >
                        SECONDARY
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: secondaryScale[12]
                        }}
                      >
                        Supporting surface
                      </Typography>
                    </Box>

                    {/* Gray */}

                    <Box
                      sx={{
                        ml: {
                          xs: 2,
                          sm: 6
                        },
                        p: 2.5,
                        borderRadius: 2,
                        backgroundColor: grayScale[3],
                        border: `1px solid ${grayScale[6]}`
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mb: 0.5,
                          color: grayScale[11]
                        }}
                      >
                        NEUTRAL
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: grayScale[12]
                        }}
                      >
                        Utility surface
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <AppDivider />

                {/* ========================================================== */}
                {/* INTERACTIVE                                                 */}
                {/* ========================================================== */}

                <Box>
                  <Typography
                    variant="label"
                    sx={{
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    Interactive States
                  </Typography>

                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row'
                    }}
                    spacing={2}
                    sx={{
                      alignItems: {
                        xs: 'stretch',
                        sm: 'center'
                      }
                    }}
                  >
                    <AppButton variant="contained" color="primary">
                      Primary
                    </AppButton>

                    <AppButton variant="outlined" color="secondary">
                      Secondary
                    </AppButton>

                    <AppButton
                      variant="text"
                      sx={{
                        color: grayScale[11],
                        '&:hover': {
                          backgroundColor: grayScale[3]
                        }
                      }}
                    >
                      Neutral
                    </AppButton>
                  </Stack>
                </Box>

                <AppDivider />

                {/* ========================================================== */}
                {/* CONNECTIONS                                                 */}
                {/* ========================================================== */}

                <Box>
                  <Typography
                    variant="label"
                    sx={{
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    Connections & Relationships
                  </Typography>

                  <Box
                    sx={{
                      position: 'relative',
                      minHeight: 100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: {
                        xs: 1,
                        sm: 4
                      },
                      borderRadius: 2,
                      backgroundColor: backgroundScale[5],
                      border: `1px solid ${secondaryScale[6]}`,
                      overflow: 'hidden'
                    }}
                  >
                    {/* Connection */}

                    <Box
                      aria-hidden
                      sx={{
                        position: 'absolute',
                        left: '12%',
                        right: '12%',
                        top: '50%',
                        height: 2,
                        transform: 'translateY(-50%)',
                        backgroundColor: secondaryScale[7]
                      }}
                    />

                    <Stack
                      direction="row"
                      sx={{
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        zIndex: 1
                      }}
                    >
                      {/* Secondary node */}

                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          flexShrink: 0,
                          borderRadius: '50%',
                          backgroundColor: secondaryScale[9],
                          boxShadow: `0 0 0 5px ${secondaryScale[3]}`
                        }}
                      />

                      {/* Relationship */}

                      <Box
                        sx={{
                          mx: 2,
                          px: {
                            xs: 1.5,
                            sm: 2.5
                          },
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: secondaryScale[3],
                          border: `1px solid ${secondaryScale[7]}`,
                          boxShadow: `0 4px 16px ${secondaryScale[2]}`
                        }}
                      >
                        <Typography
                          variant="small"
                          sx={{
                            color: secondaryScale[12],
                            fontWeight: 700,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Supporting connection
                        </Typography>
                      </Box>

                      {/* Primary node */}

                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          flexShrink: 0,
                          borderRadius: '50%',
                          backgroundColor: colorScale[9],
                          boxShadow: `0 0 0 5px ${colorScale[3]}`
                        }}
                      />
                    </Stack>
                  </Box>
                </Box>

                <AppDivider />

                {/* ========================================================== */}
                {/* COMPONENTS                                                  */}
                {/* ========================================================== */}

                <Box>
                  <Typography
                    variant="label"
                    sx={{
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    Component States
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      flexWrap: 'wrap',
                      rowGap: 1
                    }}
                  >
                    <AppChip
                      label="Neutral"
                      sx={{
                        backgroundColor: grayScale[3],
                        color: grayScale[11],
                        border: `1px solid ${grayScale[6]}`
                      }}
                    />

                    <AppChip
                      label="Secondary"
                      sx={{
                        backgroundColor: secondaryScale[3],
                        color: secondaryScale[12],
                        border: `1px solid ${secondaryScale[6]}`
                      }}
                    />

                    <AppChip
                      label="Active"
                      sx={{
                        backgroundColor: colorScale[5],
                        color: colorScale[12],
                        border: `1px solid ${colorScale[7]}`
                      }}
                    />

                    <AppChip
                      label="Primary"
                      sx={{
                        backgroundColor: colorScale[9],
                        color: colorScale.contrast
                      }}
                    />
                  </Stack>
                </Box>
              </Stack>
            </AppPaper>
          </Stack>
        </Box>

        {/* ================================================================ */}
        {/* TEXT COLORS                                                       */}
        {/* ================================================================ */}

        <Box id="colors-text-colors">
          <Stack spacing={3}>
            <Box>
              <Typography variant="sectionTitle" gutterBottom>
                Text Colors
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: grayScale[11]
                }}
              >
                Text colors use the neutral, secondary, and primary scales to
                establish clear hierarchy, supporting content, accent emphasis,
                and muted states.
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
                <Stack>
                  <Typography variant="h5">Text Hierarchy</Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: grayScale[11]
                    }}
                  >
                    Recommended text tokens for different levels of emphasis.
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  {/* Primary text */}

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: backgroundScale[3],
                      border: `1px solid ${secondaryScale[6]}`
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: grayScale[12]
                      }}
                    >
                      Primary text — Main application content
                    </Typography>

                    <Typography
                      variant="code"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: grayScale[10]
                      }}
                    >
                      grayScale[12]
                    </Typography>
                  </Box>

                  {/* Supporting text */}

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: backgroundScale[3],
                      border: `1px solid ${secondaryScale[6]}`
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: grayScale[11]
                      }}
                    >
                      Supporting text — Secondary application content
                    </Typography>

                    <Typography
                      variant="code"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: grayScale[10]
                      }}
                    >
                      grayScale[11]
                    </Typography>
                  </Box>

                  {/* Secondary text */}

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: secondaryScale[2],
                      border: `1px solid ${secondaryScale[6]}`
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: secondaryScale[11]
                      }}
                    >
                      Secondary text — Supporting secondary content
                    </Typography>

                    <Typography
                      variant="code"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: secondaryScale[10]
                      }}
                    >
                      secondaryScale[11]
                    </Typography>
                  </Box>

                  {/* Primary accent */}

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: colorScale[2],
                      border: `1px solid ${colorScale[6]}`
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: colorScale[12]
                      }}
                    >
                      Primary accent — Emphasis, links, and important
                      information
                    </Typography>

                    <Typography
                      variant="code"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: colorScale[11]
                      }}
                    >
                      colorScale[12]
                    </Typography>
                  </Box>

                  {/* Accent supporting */}

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: colorScale[2],
                      border: `1px solid ${colorScale[5]}`
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: colorScale[11]
                      }}
                    >
                      Accent supporting — Lower-emphasis primary content
                    </Typography>

                    <Typography
                      variant="code"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: colorScale[10]
                      }}
                    >
                      colorScale[11]
                    </Typography>
                  </Box>

                  {/* Muted */}

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: grayScale[2],
                      border: `1px solid ${grayScale[6]}`
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: grayScale[9]
                      }}
                    >
                      Muted text — Disabled, inactive, or low-priority content
                    </Typography>

                    <Typography
                      variant="code"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: grayScale[10]
                      }}
                    >
                      grayScale[9]
                    </Typography>
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
