import Head from 'next/head';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ThemeToggle from '@/theme/ThemeToggle';

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

type ColorStep = {
  step: number;
  title: string;
  description: string;
};

type ColorScale = Record<number, string> & {
  surface?: string;
  indicator?: string;
  track?: string;
  contrast?: string;
};

/* ========================================================================== */
/* CUSTOM TYPOGRAPHY                                                          */
/* ========================================================================== */

const customTypography = [
  {
    variant: 'display' as const,
    description: 'Large hero and landing-page text',
    text: 'Display Typography'
  },
  {
    variant: 'title' as const,
    description: 'Main page titles',
    text: 'Title Typography'
  },
  {
    variant: 'sectionTitle' as const,
    description: 'Section headings',
    text: 'Section Title Typography'
  },
  {
    variant: 'lead' as const,
    description: 'Introductory paragraphs',
    text: 'Lead Typography'
  },
  {
    variant: 'large' as const,
    description: 'Larger body text',
    text: 'Large Typography'
  },
  {
    variant: 'medium' as const,
    description: 'Default content text',
    text: 'Medium Typography'
  },
  {
    variant: 'small' as const,
    description: 'Secondary content',
    text: 'Small Typography'
  },
  {
    variant: 'label' as const,
    description: 'Form labels and UI labels',
    text: 'Label Typography'
  },
  {
    variant: 'overlineCustom' as const,
    description: 'Small uppercase category text',
    text: 'Overline Typography'
  },
  {
    variant: 'code' as const,
    description: 'Code and technical values',
    text: 'const value = "CryptechServices";'
  }
];

/* ========================================================================== */
/* COLOR GROUPS                                                               */
/* ========================================================================== */

const colorGroups: {
  title: string;
  description: string;
  steps: ColorStep[];
}[] = [
  {
    title: 'Backgrounds',
    description: 'App and subtle backgrounds',
    steps: [
      {
        step: 1,
        title: 'App background',
        description: 'The main application background'
      },
      {
        step: 2,
        title: 'Subtle background',
        description: 'Secondary and recessed backgrounds'
      }
    ]
  },
  {
    title: 'Interactive components',
    description: 'UI elements and interaction states',
    steps: [
      {
        step: 3,
        title: 'UI element background',
        description: 'Background for interactive elements'
      },
      {
        step: 4,
        title: 'Hovered UI element',
        description: 'Hover state for interactive elements'
      },
      {
        step: 5,
        title: 'Selected / active',
        description: 'Selected, active, or pressed state'
      }
    ]
  },
  {
    title: 'Borders and separators',
    description: 'Borders, dividers, and focus states',
    steps: [
      {
        step: 6,
        title: 'Subtle border',
        description: 'Low-contrast borders and separators'
      },
      {
        step: 7,
        title: 'Default border',
        description: 'Standard component borders'
      },
      {
        step: 8,
        title: 'Strong border',
        description: 'Hovered and emphasized borders'
      }
    ]
  },
  {
    title: 'Solid colors',
    description: 'High-emphasis solid colors',
    steps: [
      {
        step: 9,
        title: 'Solid background',
        description: 'Primary solid color'
      },
      {
        step: 10,
        title: 'Hovered solid',
        description: 'Hovered solid color'
      }
    ]
  },
  {
    title: 'Accessible text',
    description: 'Text colors with accessible contrast',
    steps: [
      {
        step: 11,
        title: 'Low-contrast text',
        description: 'Secondary and supporting text'
      },
      {
        step: 12,
        title: 'High-contrast text',
        description: 'Primary readable text'
      }
    ]
  }
];

/* ========================================================================== */
/* PAGE                                                                       */
/* ========================================================================== */

export default function TypographyShowcase() {
  const theme = useTheme();

  const colorScale = theme.colorScale as ColorScale;
  const grayScale = theme.grayScale as ColorScale;
  const backgroundScale = theme.backgroundScale as ColorScale;

  return (
    <>
      <Head>
        <title>Typography & Colors</title>

        <meta
          name="description"
          content="Typography and color system showcase"
        />
      </Head>

      {/* ================================================================== */}
      {/* THEME TOGGLE                                                        */}
      {/* ================================================================== */}

      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999
        }}
      >
        <ThemeToggle />
      </Box>

      {/* ================================================================== */}
      {/* PAGE                                                                */}
      {/* ================================================================== */}

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          py: {
            xs: 4,
            sm: 6,
            md: 8,
            lg: 10
          }
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={{ xs: 5, md: 8 }}>
            {/* ============================================================ */}
            {/* HEADER                                                        */}
            {/* ============================================================ */}

            <Stack>
              <Typography variant="overlineCustom" color="primary">
                Design System
              </Typography>

              <Typography
                variant="display"
                sx={{
                  mt: 1
                }}
              >
                Typography & Colors
              </Typography>

              <Typography
                variant="lead"
                color="text.secondary"
                sx={{
                  maxWidth: 800,
                  mt: 2
                }}
              >
                A complete showcase of the typography variants, semantic color
                scales, spacing, components, and responsive behavior used
                throughout the application.
              </Typography>
            </Stack>

            <Divider />

            {/* ============================================================ */}
            {/* STANDARD TYPOGRAPHY                                           */}
            {/* ============================================================ */}

            <Box>
              <Typography variant="title" gutterBottom>
                Standard Typography
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4
                }}
              >
                MUI&apos;s standard typography variants with responsive clamp
                sizing.
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack spacing={3}>
                  <Typography variant="h1">Heading 1</Typography>

                  <Typography variant="h2">Heading 2</Typography>

                  <Typography variant="h3">Heading 3</Typography>

                  <Typography variant="h4">Heading 4</Typography>

                  <Typography variant="h5">Heading 5</Typography>

                  <Typography variant="h6">Heading 6</Typography>

                  <Divider />

                  <Typography variant="subtitle1">
                    Subtitle 1 — Supporting text for headings and sections.
                  </Typography>

                  <Typography variant="subtitle2">
                    Subtitle 2 — Smaller supporting text.
                  </Typography>

                  <Typography variant="body1">
                    Body 1 — This is the primary body text used for normal
                    application content. It has a relaxed line height for
                    comfortable reading.
                  </Typography>

                  <Typography variant="body2">
                    Body 2 — Smaller body text for secondary information.
                  </Typography>

                  <Typography variant="button">Button Typography</Typography>

                  <Typography variant="caption">
                    Caption — Small supporting information.
                  </Typography>

                  <Typography variant="overline">OVERLINE</Typography>
                </Stack>
              </Paper>
            </Box>

            {/* ============================================================ */}
            {/* CUSTOM TYPOGRAPHY                                             */}
            {/* ============================================================ */}

            <Box>
              <Typography variant="title" gutterBottom>
                Custom Typography
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4
                }}
              >
                The 10 custom typography variants defined in the theme.
              </Typography>

              <Stack spacing={2}>
                {customTypography.map((item) => (
                  <Paper
                    key={item.variant}
                    variant="outlined"
                    sx={{
                      p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                      }
                    }}
                  >
                    <Stack>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: 'block',
                          mb: 1
                        }}
                      >
                        {item.variant}
                      </Typography>

                      <Typography variant={item.variant}>
                        {item.text}
                      </Typography>

                      <Typography
                        variant="small"
                        color="text.secondary"
                        sx={{
                          mt: 1
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>

            {/* ============================================================ */}
            {/* COLORS                                                         */}
            {/* ============================================================ */}

            <Box>
              <Typography variant="title" gutterBottom>
                Colors
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4,
                  maxWidth: 850
                }}
              >
                Complete color system showing the primary accent, neutral gray,
                and application background scales. Each scale follows the same
                12-step semantic structure.
              </Typography>

              <Stack spacing={4}>
                {/* ====================================================== */}
                {/* PRIMARY COLOR SCALE                                     */}
                {/* ====================================================== */}

                <ColorScaleSection
                  title="Color Scale"
                  description="Primary accent color used for interactive elements, buttons, links, states, and emphasis."
                  scale={colorScale}
                  colorName="Primary"
                  semanticGroups={colorGroups}
                />

                {/* ====================================================== */}
                {/* GRAY SCALE                                              */}
                {/* ====================================================== */}

                <ColorScaleSection
                  title="Gray Scale"
                  description="Neutral gray scale used for text, borders, dividers, disabled states, and supporting UI."
                  scale={grayScale}
                  colorName="Gray"
                  semanticGroups={colorGroups}
                />

                {/* ====================================================== */}
                {/* BACKGROUND SCALE                                        */}
                {/* ====================================================== */}

                <ColorScaleSection
                  title="Background Scale"
                  description="Background-specific scale used for application surfaces, cards, dialogs, menus, and recessed areas."
                  scale={backgroundScale}
                  colorName="Background"
                  semanticGroups={colorGroups}
                />
              </Stack>
            </Box>

            {/* ============================================================ */}
            {/* COLOR USAGE EXAMPLES                                         */}
            {/* ============================================================ */}

            <Box>
              <Typography variant="title" gutterBottom>
                Color Usage
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4
                }}
              >
                Examples of how the semantic scale can be used in actual
                components.
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack spacing={4}>
                  {/* ================================================== */}
                  {/* BACKGROUND                                          */}
                  {/* ================================================== */}

                  <Box>
                    <Typography
                      variant="label"
                      sx={{
                        display: 'block',
                        mb: 1
                      }}
                    >
                      Background
                    </Typography>

                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: colorScale[2],
                        border: `1px solid ${grayScale[6]}`
                      }}
                    >
                      <Typography variant="body1">
                        Subtle background using primary color step 2.
                      </Typography>
                    </Box>
                  </Box>

                  {/* ================================================== */}
                  {/* GRAY BACKGROUND                                     */}
                  {/* ================================================== */}

                  <Box>
                    <Typography
                      variant="label"
                      sx={{
                        display: 'block',
                        mb: 1
                      }}
                    >
                      Gray Surface
                    </Typography>

                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: grayScale[3],
                        border: `1px solid ${grayScale[6]}`
                      }}
                    >
                      <Typography variant="body1">
                        Neutral surface using gray step 3.
                      </Typography>
                    </Box>
                  </Box>

                  {/* ================================================== */}
                  {/* BACKGROUND SCALE                                    */}
                  {/* ================================================== */}

                  <Box>
                    <Typography
                      variant="label"
                      sx={{
                        display: 'block',
                        mb: 1
                      }}
                    >
                      Application Surface
                    </Typography>

                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: backgroundScale[2],
                        border: `1px solid ${grayScale[6]}`
                      }}
                    >
                      <Typography variant="body1">
                        Application surface using background step 2.
                      </Typography>
                    </Box>
                  </Box>

                  {/* ================================================== */}
                  {/* INTERACTIVE                                         */}
                  {/* ================================================== */}

                  <Box>
                    <Typography
                      variant="label"
                      sx={{
                        display: 'block',
                        mb: 1
                      }}
                    >
                      Interactive
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: colorScale[9],
                          color: colorScale[12],
                          '&:hover': {
                            backgroundColor: colorScale[10]
                          }
                        }}
                      >
                        Solid Button
                      </Button>

                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: grayScale[7],
                          color: colorScale[11],
                          '&:hover': {
                            borderColor: colorScale[8],
                            backgroundColor: colorScale[3]
                          }
                        }}
                      >
                        Outlined Button
                      </Button>

                      <Button
                        variant="text"
                        sx={{
                          color: colorScale[11],
                          '&:hover': {
                            backgroundColor: colorScale[3]
                          }
                        }}
                      >
                        Text Button
                      </Button>
                    </Box>
                  </Box>

                  {/* ================================================== */}
                  {/* CHIPS                                               */}
                  {/* ================================================== */}

                  <Box>
                    <Typography
                      variant="label"
                      sx={{
                        display: 'block',
                        mb: 1
                      }}
                    >
                      Components
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        flexWrap: 'wrap'
                      }}
                    >
                      <Chip
                        label="Default"
                        sx={{
                          backgroundColor: grayScale[3],
                          color: grayScale[11],
                          border: `1px solid ${grayScale[6]}`
                        }}
                      />

                      <Chip
                        label="Active"
                        sx={{
                          backgroundColor: colorScale[5],
                          color: colorScale[12],
                          border: `1px solid ${colorScale[7]}`
                        }}
                      />

                      <Chip
                        label="Solid"
                        sx={{
                          backgroundColor: colorScale[9],
                          color: colorScale[12],
                          '&:hover': {
                            backgroundColor: colorScale[10]
                          }
                        }}
                      />
                    </Stack>
                  </Box>

                  {/* ================================================== */}
                  {/* TEXT                                                */}
                  {/* ================================================== */}

                  <Box>
                    <Typography
                      variant="label"
                      sx={{
                        display: 'block',
                        mb: 2
                      }}
                    >
                      Accessible Text
                    </Typography>

                    <Stack spacing={1}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: colorScale[12]
                        }}
                      >
                        Step 12 — High contrast text for important content.
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: colorScale[11]
                        }}
                      >
                        Step 11 — Lower contrast text for supporting content.
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: grayScale[11]
                        }}
                      >
                        Gray 11 — Neutral supporting text.
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: grayScale[12]
                        }}
                      >
                        Gray 12 — Neutral high contrast text.
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Box>

            {/* ============================================================ */}
            {/* TEXT COLORS                                                   */}
            {/* ============================================================ */}

            <Box>
              <Typography variant="title" gutterBottom>
                Text Colors
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack spacing={3}>
                  <Typography variant="h5">Primary Text</Typography>

                  <Typography variant="body1" color="text.primary">
                    text.primary — Main application content.
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    text.secondary — Supporting and less prominent content.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: colorScale[12]
                    }}
                  >
                    colorScale.12 — High contrast accent text.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: colorScale[11]
                    }}
                  >
                    colorScale.11 — Lower contrast accent text.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: grayScale[12]
                    }}
                  >
                    grayScale.12 — High contrast neutral text.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: grayScale[11]
                    }}
                  >
                    grayScale.11 — Lower contrast neutral text.
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            {/* ============================================================ */}
            {/* RESPONSIVE SHOWCASE                                           */}
            {/* ============================================================ */}

            <Box>
              <Typography variant="title" gutterBottom>
                Responsive Typography
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4
                }}
              >
                These headings use CSS clamp(), so they scale smoothly between
                mobile and large desktop screens.
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 6,
                    xl: 8
                  }
                }}
              >
                <Stack>
                  <Typography variant="display">Resize the window</Typography>

                  <Typography variant="lead" color="text.secondary">
                    The typography automatically scales between its minimum and
                    maximum sizes without requiring additional breakpoints.
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            {/* ============================================================ */}
            {/* FOOTER                                                        */}
            {/* ============================================================ */}

            <Divider />

            <Box>
              <Typography
                variant="small"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  display: 'block'
                }}
              >
                CryptechServices Design System
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

/* ========================================================================== */
/* COLOR SCALE SECTION                                                        */
/* ========================================================================== */

function ColorScaleSection({
  title,
  description,
  scale,
  colorName,
  semanticGroups
}: {
  title: string;
  description: string;
  scale: ColorScale;
  colorName: string;
  semanticGroups: {
    title: string;
    description: string;
    steps: ColorStep[];
  }[];
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        overflow: 'hidden'
      }}
    >
      {/* ================================================================== */}
      {/* HEADER                                                              */}
      {/* ================================================================== */}

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h4">{title}</Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </Box>

      {/* ================================================================== */}
      {/* FULL 1–12 SCALE                                                     */}
      {/* ================================================================== */}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(3, 1fr)',
            sm: 'repeat(4, 1fr)',
            md: 'repeat(6, 1fr)',
            lg: 'repeat(12, 1fr)'
          }
        }}
      >
        {Array.from(
          {
            length: 12
          },
          (_, index) => index + 1
        ).map((step) => {
          const color = scale[step];

          return <ColorScaleItem key={step} step={step} color={color} />;
        })}
      </Box>

      <Divider />

      {/* ================================================================== */}
      {/* SEMANTIC GROUPS                                                     */}
      {/* ================================================================== */}

      {semanticGroups.map((group, groupIndex) => (
        <Box key={group.title}>
          {groupIndex > 0 && <Divider />}

          <Box
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4
              },
              pb: {
                xs: 2,
                sm: 2,
                md: 3
              }
            }}
          >
            <Typography variant="h5">{group.title}</Typography>

            <Typography
              variant="small"
              color="text.secondary"
              sx={{
                mt: 0.5,
                display: 'block'
              }}
            >
              {group.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs:
                  group.steps.length === 2
                    ? 'repeat(2, 1fr)'
                    : 'repeat(3, 1fr)',
                sm: `repeat(${group.steps.length}, 1fr)`
              }
            }}
          >
            {group.steps.map((item) => {
              const color = scale[item.step];

              return (
                <ColorScaleItem
                  key={item.step}
                  step={item.step}
                  title={item.title}
                  description={item.description}
                  color={color}
                  large
                />
              );
            })}
          </Box>
        </Box>
      ))}

      {/* ================================================================== */}
      {/* SEMANTIC TOKENS                                                     */}
      {/* ================================================================== */}

      <Divider />

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Typography variant="h5">Semantic Tokens</Typography>

        <Typography
          variant="small"
          color="text.secondary"
          sx={{
            mt: 0.5,
            mb: 3,
            display: 'block'
          }}
        >
          Additional semantic aliases generated from the{' '}
          {colorName.toLowerCase()} scale.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(4, 1fr)'
            },
            gap: 2
          }}
        >
          {[
            {
              name: 'surface',
              color: scale.surface
            },
            {
              name: 'indicator',
              color: scale.indicator
            },
            {
              name: 'track',
              color: scale.track
            },
            {
              name: 'contrast',
              color: scale.contrast
            }
          ].map((item) => (
            <Box
              key={item.name}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  height: 90,
                  backgroundColor: item.color,
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 1.5
                }}
              >
                <Typography
                  sx={{
                    color:
                      item.color && isLightColor(item.color) ? '#000' : '#fff',
                    fontWeight: 700
                  }}
                >
                  {item.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.5
                }}
              >
                <Typography
                  variant="code"
                  color="text.secondary"
                  sx={{
                    wordBreak: 'break-all'
                  }}
                >
                  {item.color}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

/* ========================================================================== */
/* COLOR SCALE ITEM                                                           */
/* ========================================================================== */

function ColorScaleItem({
  step,
  color,
  title,
  description,
  large = false
}: {
  step: number;
  color: string;
  title?: string;
  description?: string;
  large?: boolean;
}) {
  const useLightText = !isLightColor(color);

  return (
    <Box
      sx={{
        minWidth: 0,
        borderRight: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      {/* ================================================================== */}
      {/* COLOR                                                               */}
      {/* ================================================================== */}

      <Box
        sx={{
          height: large
            ? {
                xs: 130,
                sm: 160,
                md: 190
              }
            : {
                xs: 80,
                sm: 100,
                md: 120
              },
          backgroundColor: color,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          p: {
            xs: 1.5,
            sm: 2
          }
        }}
      >
        <Typography
          sx={{
            color: useLightText ? '#fff' : '#000',
            fontSize: {
              xs: large ? '1.5rem' : '1rem',
              sm: large ? '2rem' : '1.25rem'
            },
            fontWeight: 700
          }}
        >
          {step}
        </Typography>
      </Box>

      {/* ================================================================== */}
      {/* INFORMATION                                                         */}
      {/* ================================================================== */}

      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2
          },
          minHeight: large ? 120 : 75,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography
          variant="label"
          sx={{
            display: 'block'
          }}
        >
          {title ?? `Step ${step}`}
        </Typography>

        {description && (
          <Typography
            variant="small"
            color="text.secondary"
            sx={{
              display: 'block',
              mt: 0.5,
              lineHeight: 1.4
            }}
          >
            {description}
          </Typography>
        )}

        <Typography
          variant="code"
          color="text.secondary"
          sx={{
            display: 'block',
            mt: 1,
            fontSize: {
              xs: '0.6rem',
              sm: '0.7rem'
            },
            wordBreak: 'break-all'
          }}
        >
          {color}
        </Typography>
      </Box>
    </Box>
  );
}

/* ========================================================================== */
/* COLOR CONTRAST                                                             */
/* ========================================================================== */

function isLightColor(color: string): boolean {
  if (!color) {
    return false;
  }

  const hex = color.replace('#', '');

  if (hex.length !== 6) {
    return false;
  }

  const r = parseInt(hex.slice(0, 2), 16);

  const g = parseInt(hex.slice(2, 4), 16);

  const b = parseInt(hex.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.55;
}
