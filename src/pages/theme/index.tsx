import Head from 'next/head';
import {
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Alert,
  Badge,
  CircularProgress,
  LinearProgress,
  Rating,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { alpha } from '@mui/material/styles';

import OverviewTheme from '@/theme/OverviewTheme';
import ThemeToggle from '@/theme/ThemeToggle';
import { semanticColors } from '@/theme/theme';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';

import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';

import { Box, Stack, Typography } from '@mui/material';

import {
  AppDivider,
  AppButton,
  AppChip,
  AppPaper,
  AppAlert,
  AppBadge,
  AppCheckbox,
  AppCircularProgress,
  AppIconButton,
  AppLinearProgress,
  AppSwitch,
  AppTab,
  AppTabs,
  AppTooltip,
  AppCard
} from '@/theme/CustomComponents';

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
/* SHOWCASE TABS                                                              */
/* ========================================================================== */

type ShowcaseTab = 'overview' | 'typography' | 'colors' | 'components';

const showcaseTabs: {
  value: ShowcaseTab;
  label: string;
}[] = [
  {
    value: 'overview',
    label: 'Overview'
  },
  {
    value: 'typography',
    label: 'Typography'
  },
  {
    value: 'colors',
    label: 'Colors'
  },
  {
    value: 'components',
    label: 'Components'
  }
];

/* ========================================================================== */
/* PAGE                                                                       */
/* ========================================================================== */

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

export default function TypographyShowcase() {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<ShowcaseTab>('overview');

  const colorScale = theme.colorScale as ColorScale;
  const secondaryScale = theme.secondaryScale as ColorScale;
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
      {/* THEME TOGGLE                                                      */}
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
      {/* PAGE                                                               */}
      {/* ================================================================== */}

      <Box
        sx={{
          minHeight: '100vh',
          background: `${alpha(theme.colorScale[3], 0.65)}`,
          color: 'text.primary',
          py: {
            xs: 4,
            sm: 6,
            md: 8,
            lg: 10
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 0,
            minHeight: '100vh',
            background: `
  radial-gradient(
    circle at top,
    ${alpha(theme.backgroundScale[6], 0.5)},
    ${alpha(theme.colorScale[3], 1)} 55%, ${alpha(theme.colorScale[3], 0)} 75%
  )
`,
            color: 'text.primary',
            py: {
              xs: 4,
              sm: 6,
              md: 8,
              lg: 10
            }
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={{ xs: 5, md: 8 }}>
            {/* ============================================================ */}
            {/* HEADER                                                        */}
            {/* ============================================================ */}

            <Stack>
              <Typography
                variant="overlineCustom"
                sx={{
                  color: colorScale[9]
                }}
              >
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
                sx={{
                  color: secondaryScale[11],
                  maxWidth: 800,
                  mt: 2
                }}
              >
                A complete showcase of the typography variants, semantic color
                scales, spacing, components, and responsive behavior used
                throughout the application.
              </Typography>

              {/* ========================================================== */}
              {/* SECTION TABS                                                */}
              {/* ========================================================== */}

              <Box
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 100,
                  py: 1.5
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={(_, value: ShowcaseTab) => {
                    setActiveTab(value);
                  }}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  sx={{
                    minHeight: 48
                  }}
                >
                  {showcaseTabs.map((tab) => (
                    <Tab
                      key={tab.value}
                      value={tab.value}
                      label={tab.label}
                      sx={{
                        minHeight: 48,
                        px: {
                          xs: 2,
                          sm: 3
                        }
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
            </Stack>

            {/* ============================================================ */}
            {/* OVERVIEW                                                      */}
            {/* ============================================================ */}

            {activeTab === 'overview' && (
              <Stack spacing={{ xs: 5, md: 8 }}>
                <OverviewTheme />
              </Stack>
            )}

            {/* ============================================================ */}
            {/* TYPOGRAPHY                                                    */}
            {/* ============================================================ */}

            {activeTab === 'typography' && (
              <Stack spacing={{ xs: 5, md: 8 }}>
                {/* ======================================================== */}
                {/* STANDARD TYPOGRAPHY                                       */}
                {/* ======================================================== */}

                <Box>
                  <Typography variant="title" gutterBottom>
                    Standard Typography
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: secondaryScale[11],
                      mb: 4
                    }}
                  >
                    MUI&apos;s standard typography variants with responsive
                    clamp sizing.
                  </Typography>

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
                      <Typography variant="h1">Heading 1</Typography>

                      <Typography variant="h2">Heading 2</Typography>

                      <Typography variant="h3">Heading 3</Typography>

                      <Typography variant="h4">Heading 4</Typography>

                      <Typography variant="h5">Heading 5</Typography>

                      <Typography variant="h6">Heading 6</Typography>

                      <AppDivider />

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

                      <Typography variant="button">
                        Button Typography
                      </Typography>

                      <Typography variant="caption">
                        Caption — Small supporting information.
                      </Typography>

                      <Typography variant="overline">OVERLINE</Typography>
                    </Stack>
                  </AppPaper>
                </Box>

                {/* ======================================================== */}
                {/* CUSTOM TYPOGRAPHY                                         */}
                {/* ======================================================== */}

                <Box>
                  <Typography variant="title" gutterBottom>
                    Custom Typography
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: secondaryScale[11],
                      mb: 4
                    }}
                  >
                    The 10 custom typography variants defined in the theme.
                  </Typography>

                  <Stack spacing={2}>
                    {customTypography.map((item) => (
                      <AppPaper
                        key={item.variant}
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
                        <Stack>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              mb: 1,
                              color: secondaryScale[11]
                            }}
                          >
                            {item.variant}
                          </Typography>

                          <Typography variant={item.variant}>
                            {item.text}
                          </Typography>

                          <Typography
                            variant="small"
                            sx={{
                              mt: 1,
                              color: grayScale[11]
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Stack>
                      </AppPaper>
                    ))}
                  </Stack>
                </Box>

                <TypographyUsageSection />

                {/* ======================================================== */}
                {/* RESPONSIVE SHOWCASE                                       */}
                {/* ======================================================== */}

                <Box>
                  <Typography variant="title" gutterBottom>
                    Responsive Typography
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: secondaryScale[11],
                      mb: 4
                    }}
                  >
                    These headings use CSS clamp(), so they scale smoothly
                    between mobile and large desktop screens.
                  </Typography>

                  <AppPaper
                    variant="outlined"
                    sx={{
                      p: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                        lg: 6,
                        xl: 8
                      },
                      borderColor: secondaryScale[6]
                    }}
                  >
                    <Stack>
                      <Typography variant="display">
                        Resize the window
                      </Typography>

                      <Typography
                        variant="lead"
                        sx={{
                          color: secondaryScale[11]
                        }}
                      >
                        The typography automatically scales between its minimum
                        and maximum sizes without requiring additional
                        breakpoints.
                      </Typography>
                    </Stack>
                  </AppPaper>
                </Box>
              </Stack>
            )}

            {/* ============================================================ */}
            {/* COLORS                                                        */}
            {/* ============================================================ */}

            {activeTab === 'colors' && (
              <Stack spacing={{ xs: 5, md: 8 }}>
                <Box>
                  <Typography variant="title" gutterBottom>
                    Colors
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: secondaryScale[11],
                      mb: 4,
                      maxWidth: 850
                    }}
                  >
                    Complete color system showing the primary accent, secondary
                    supporting scale, neutral gray scale, and application
                    background scale. Together they follow a 60 / 30 / 10 visual
                    hierarchy.
                  </Typography>

                  <Stack spacing={4}>
                    {/* ==================================================== */}
                    {/* PRIMARY                                              */}
                    {/* ==================================================== */}

                    <ColorScaleSection
                      title="Primary / Color Scale"
                      description="The primary 10% accent used for important actions, active states, links, emphasis, and key interaction."
                      scale={colorScale}
                      colorName="Primary"
                      semanticGroups={colorGroups}
                    />

                    {/* ==================================================== */}
                    {/* SECONDARY                                            */}
                    {/* ==================================================== */}

                    <ColorScaleSection
                      title="Secondary Scale"
                      description="The supporting 30% color used for panels, cards, connections, supporting controls, decorative structures, and secondary actions."
                      scale={secondaryScale}
                      colorName="Secondary"
                      semanticGroups={colorGroups}
                    />

                    {/* ==================================================== */}
                    {/* GRAY                                                 */}
                    {/* ==================================================== */}

                    <ColorScaleSection
                      title="Gray / Neutral Scale"
                      description="Neutral utility color used for disabled states, neutral text, dividers, borders, inactive controls, and supporting UI."
                      scale={grayScale}
                      colorName="Gray"
                      semanticGroups={colorGroups}
                    />

                    {/* ==================================================== */}
                    {/* BACKGROUND                                           */}
                    {/* ==================================================== */}

                    <ColorScaleSection
                      title="Background Scale"
                      description="The dominant 60% visual field used for application backgrounds, surfaces, cards, dialogs, menus, and recessed areas."
                      scale={backgroundScale}
                      colorName="Background"
                      semanticGroups={colorGroups}
                    />
                  </Stack>
                </Box>

                {/* ======================================================== */}
                {/* HOW TO ADD COLORS                                        */}
                {/* ======================================================== */}

                <Box>
                  <Stack spacing={1} sx={{ mb: 4 }}>
                    <Typography
                      variant="overlineCustom"
                      sx={{
                        color: colorScale[9]
                      }}
                    >
                      COLOR USAGE
                    </Typography>

                    <Typography variant="title" gutterBottom>
                      How to Add Colors
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: secondaryScale[11],
                        maxWidth: 850
                      }}
                    >
                      Use the generated scales directly in your components.
                      Primary handles emphasis, secondary provides supporting
                      structure, background dominates the interface, and gray
                      handles neutral states.
                    </Typography>
                  </Stack>

                  <Stack spacing={3}>
                    {/* ==================================================== */}
                    {/* PRIMARY                                              */}
                    {/* ==================================================== */}

                    <ColorUsageCard
                      title="Primary / Color"
                      description={
                        <>
                          Use <code>colorScale</code> for important actions,
                          active states, links, and emphasis.
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

                    {/* ==================================================== */}
                    {/* SECONDARY                                            */}
                    {/* ==================================================== */}

                    <ColorUsageCard
                      title="Secondary / Supporting"
                      description={
                        <>
                          Use <code>secondaryScale</code> for supporting
                          surfaces, cards, borders, connections, and secondary
                          actions.
                        </>
                      }
                      code={`const secondaryScale = theme.secondaryScale;

<Box
  sx={{
    backgroundColor: secondaryScale[3],
    color: secondaryScale[11],
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

                    {/* ==================================================== */}
                    {/* GRAY                                                 */}
                    {/* ==================================================== */}

                    <ColorUsageCard
                      title="Gray / Neutral"
                      description={
                        <>
                          Use <code>grayScale</code> for neutral surfaces, text,
                          borders, dividers, disabled states, and inactive
                          controls.
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

                    {/* ==================================================== */}
                    {/* BACKGROUND                                           */}
                    {/* ==================================================== */}

                    <ColorUsageCard
                      title="Background / 60%"
                      description={
                        <>
                          Use <code>backgroundScale</code> for the dominant
                          application background and large surfaces.
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

                    {/* ==================================================== */}
                    {/* QUICK REFERENCE                                      */}
                    {/* ==================================================== */}

                    <AppPaper
                      variant="outlined"
                      sx={{
                        overflow: 'hidden',
                        borderColor: secondaryScale[6]
                      }}
                    >
                      <Box
                        sx={{
                          p: {
                            xs: 2,
                            sm: 3,
                            md: 4
                          }
                        }}
                      >
                        <Typography variant="h5">Quick Reference</Typography>

                        <Typography
                          variant="small"
                          sx={{
                            display: 'block',
                            mt: 0.5,
                            mb: 3,
                            color: secondaryScale[11]
                          }}
                        >
                          Recommended semantic role for each scale.
                        </Typography>

                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                              xs: '1fr',
                              sm: 'repeat(2, 1fr)',
                              md: 'repeat(4, 1fr)'
                            },
                            gap: 2
                          }}
                        >
                          {[
                            {
                              scale: 'backgroundScale',
                              percentage: '60%',
                              role: 'Background',
                              usage:
                                'Application background and dominant surfaces',
                              color: backgroundScale[3]
                            },
                            {
                              scale: 'secondaryScale',
                              percentage: '30%',
                              role: 'Secondary',
                              usage:
                                'Supporting panels, borders and connections',
                              color: secondaryScale[5]
                            },
                            {
                              scale: 'colorScale',
                              percentage: '10%',
                              role: 'Primary',
                              usage: 'Important actions and active states',
                              color: colorScale[9]
                            },
                            {
                              scale: 'grayScale',
                              percentage: 'Neutral',
                              role: 'Gray',
                              usage: 'Disabled, neutral and utility states',
                              color: grayScale[7]
                            }
                          ].map((item) => (
                            <Box
                              key={item.scale}
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                border: `1px solid ${secondaryScale[6]}`,
                                backgroundColor: backgroundScale[5]
                              }}
                            >
                              <Box
                                sx={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: 1.5,
                                  mb: 1.5,
                                  backgroundColor: item.color
                                }}
                              />

                              <Typography
                                variant="code"
                                sx={{
                                  display: 'block',
                                  mb: 0.5,
                                  color:
                                    item.scale === 'grayScale'
                                      ? grayScale[11]
                                      : colorScale[11]
                                }}
                              >
                                {item.percentage}
                              </Typography>

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
                                  mt: 0.5,
                                  color: grayScale[11]
                                }}
                              >
                                {item.usage}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </AppPaper>
                  </Stack>
                </Box>

                {/* ======================================================== */}
                {/* COLOR USAGE EXAMPLES                                     */}
                {/* ======================================================== */}

                <Box>
                  <Typography variant="title" gutterBottom>
                    Color Usage
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: secondaryScale[11],
                      mb: 4
                    }}
                  >
                    Examples of how the semantic color hierarchy can be used in
                    actual components.
                  </Typography>

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
                          Background — 60%
                        </Typography>

                        <Box
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: backgroundScale[5],
                            border: `1px solid ${secondaryScale[6]}`
                          }}
                        >
                          <Typography variant="body1">
                            Dominant application surface using the background
                            scale.
                          </Typography>
                        </Box>
                      </Box>

                      {/* ================================================== */}
                      {/* SECONDARY                                           */}
                      {/* ================================================== */}

                      <Box>
                        <Typography
                          variant="label"
                          sx={{
                            display: 'block',
                            mb: 1
                          }}
                        >
                          Secondary — 30%
                        </Typography>

                        <Box
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: secondaryScale[3],
                            border: `1px solid ${secondaryScale[7]}`
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: secondaryScale[11]
                            }}
                          >
                            Supporting surface using the secondary scale.
                          </Typography>
                        </Box>
                      </Box>

                      {/* ================================================== */}
                      {/* GRAY                                                */}
                      {/* ================================================== */}

                      <Box>
                        <Typography
                          variant="label"
                          sx={{
                            display: 'block',
                            mb: 1
                          }}
                        >
                          Gray — Neutral
                        </Typography>

                        <Box
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: grayScale[3],
                            border: `1px solid ${grayScale[6]}`
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: grayScale[12]
                            }}
                          >
                            Neutral surface using gray step 3.
                          </Typography>
                        </Box>
                      </Box>

                      {/* ================================================== */}
                      {/* INTERACTIVE                                          */}
                      {/* ================================================== */}

                      <Box>
                        <Typography
                          variant="label"
                          sx={{
                            display: 'block',
                            mb: 1
                          }}
                        >
                          Interactive — 10%
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2
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
                        </Box>
                      </Box>

                      {/* ================================================== */}
                      {/* CONNECTIONS                                         */}
                      {/* ================================================== */}

                      <Box>
                        <Typography
                          variant="label"
                          sx={{
                            display: 'block',
                            mb: 1
                          }}
                        >
                          Connections — Secondary
                        </Typography>

                        <Box
                          sx={{
                            position: 'relative',
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: backgroundScale[5],
                            border: `1px solid ${secondaryScale[6]}`,
                            overflow: 'hidden'
                          }}
                        >
                          {/* Connection line */}
                          <Box
                            sx={{
                              position: 'absolute',
                              left: '10%',
                              right: '10%',
                              top: '50%',
                              height: 2,
                              transform: 'translateY(-50%)',
                              backgroundColor: secondaryScale[7],
                              zIndex: 0
                            }}
                          />

                          <Stack
                            direction="row"
                            sx={{
                              position: 'relative',
                              justifyContent: 'space-between',
                              alignItems: 'center',
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
                                boxShadow: `0 0 0 4px ${secondaryScale[3]}`
                              }}
                            />

                            {/* Supporting connection */}
                            <Box
                              sx={{
                                mx: 2,
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                backgroundColor: secondaryScale[3],
                                border: `1px solid ${secondaryScale[7]}`,
                                boxShadow: `0 4px 12px ${secondaryScale[2]}`
                              }}
                            >
                              <Typography
                                variant="small"
                                sx={{
                                  color: secondaryScale[11],
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
                                boxShadow: `0 0 0 4px ${colorScale[3]}`
                              }}
                            />
                          </Stack>
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
                              color: secondaryScale[11],
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
                              color: grayScale[12]
                            }}
                          >
                            Gray 12 — High contrast neutral text.
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
                            variant="body1"
                            sx={{
                              color: colorScale[12]
                            }}
                          >
                            Color 12 — High contrast primary text.
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: colorScale[11]
                            }}
                          >
                            Color 11 — Supporting primary text.
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: secondaryScale[11]
                            }}
                          >
                            Secondary 11 — Supporting secondary text.
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </AppPaper>
                </Box>

                {/* ======================================================== */}
                {/* TEXT COLORS                                               */}
                {/* ======================================================== */}

                <Box>
                  <Typography variant="title" gutterBottom>
                    Text Colors
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: secondaryScale[11],
                      mb: 4,
                      maxWidth: 850
                    }}
                  >
                    Text colors use the neutral, secondary, and primary scales
                    to establish clear hierarchy, supporting content, accent
                    emphasis, and muted states.
                  </Typography>

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
                      <Typography variant="h5">
                        Neutral & Accent Text
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: grayScale[12]
                        }}
                      >
                        grayScale.12 — Main neutral application content.
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: grayScale[11]
                        }}
                      >
                        grayScale.11 — Supporting neutral content.
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: secondaryScale[11]
                        }}
                      >
                        secondaryScale.11 — Supporting secondary content.
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: colorScale[12]
                        }}
                      >
                        colorScale.12 — High contrast primary accent text.
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: colorScale[11]
                        }}
                      >
                        colorScale.11 — Lower contrast primary accent text.
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: grayScale[9]
                        }}
                      >
                        grayScale.9 — Disabled / muted text.
                      </Typography>
                    </Stack>
                  </AppPaper>
                </Box>
              </Stack>
            )}

            {/* ============================================================ */}
            {/* COMPONENT SHOWCASE                                           */}
            {/* ============================================================ */}

            {activeTab === 'components' && (
              <Stack spacing={{ xs: 5, md: 8 }}>
                <Box>
                  <Typography variant="title" gutterBottom>
                    Component Showcase
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: secondaryScale[11],
                      mb: 4,
                      maxWidth: 850
                    }}
                  >
                    Additional interface examples showing how the color scales,
                    typography, surfaces, borders, states, and semantic colors
                    work together in real components.
                  </Typography>

                  <Stack spacing={4}>
                    {/* ====================================================== */}
                    {/* ALERTS                                                 */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Alerts"
                      description="Feedback messages using the semantic color system."
                    >
                      <Stack spacing={2}>
                        <AppAlert
                          icon={<InfoOutlinedIcon />}
                          severity="info"
                          sx={{
                            border: '1px solid',
                            borderColor: secondaryScale[6]
                          }}
                        >
                          Your account has been successfully updated.
                        </AppAlert>

                        <AppAlert
                          icon={<CheckCircleOutlineOutlinedIcon />}
                          severity="success"
                          sx={{
                            border: '1px solid',
                            borderColor: semanticColors.success
                          }}
                        >
                          Changes were saved successfully.
                        </AppAlert>

                        <AppAlert
                          icon={<WarningAmberOutlinedIcon />}
                          severity="warning"
                          sx={{
                            border: '1px solid',
                            borderColor: semanticColors.warning
                          }}
                        >
                          Your subscription will expire soon.
                        </AppAlert>

                        <AppAlert
                          icon={<ErrorOutlineOutlinedIcon />}
                          severity="error"
                          sx={{
                            border: '1px solid',
                            borderColor: semanticColors.error
                          }}
                        >
                          Something went wrong. Please try again.
                        </AppAlert>
                      </Stack>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* BADGES                                                 */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Badges & Status"
                      description="Status indicators, notifications, and semantic states."
                    >
                      <Stack
                        direction="row"
                        spacing={4}
                        sx={{
                          alignItems: 'center',
                          flexWrap: 'wrap'
                        }}
                        useFlexGap
                      >
                        <AppBadge badgeContent={4} color="primary">
                          <AppPaper
                            variant="outlined"
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              borderColor: secondaryScale[6]
                            }}
                          >
                            <Typography variant="small">
                              Notifications
                            </Typography>
                          </AppPaper>
                        </AppBadge>

                        <AppBadge variant="dot" color="success">
                          <AppPaper
                            variant="outlined"
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              borderColor: secondaryScale[6]
                            }}
                          >
                            <Typography variant="small">Online</Typography>
                          </AppPaper>
                        </AppBadge>

                        <StatusDot
                          color={semanticColors.success}
                          label="Online"
                        />

                        <StatusDot
                          color={semanticColors.warning}
                          label="Away"
                        />

                        <StatusDot
                          color={semanticColors.error}
                          label="Offline"
                        />
                      </Stack>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* PROGRESS                                               */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Progress"
                      description="Progress indicators using primary emphasis and neutral tracks."
                    >
                      <Stack spacing={3}>
                        <Box>
                          <Stack
                            direction="row"
                            sx={{
                              mb: 1,
                              justifyContent: 'space-between'
                            }}
                          >
                            <Typography variant="small">
                              Uploading files
                            </Typography>

                            <Typography
                              variant="small"
                              sx={{
                                color: grayScale[11]
                              }}
                            >
                              72%
                            </Typography>
                          </Stack>

                          <AppLinearProgress
                            variant="determinate"
                            value={72}
                            sx={{
                              height: 8
                            }}
                          />
                        </Box>

                        <Box>
                          <Stack
                            direction="row"
                            sx={{
                              mb: 1,
                              justifyContent: 'space-between'
                            }}
                          >
                            <Typography variant="small">Storage</Typography>

                            <Typography
                              variant="small"
                              sx={{
                                color: grayScale[11]
                              }}
                            >
                              42%
                            </Typography>
                          </Stack>

                          <AppLinearProgress
                            variant="determinate"
                            value={42}
                            color="secondary"
                            sx={{
                              height: 8
                            }}
                          />
                        </Box>

                        <Stack
                          direction="row"
                          spacing={4}
                          sx={{
                            alignItems: 'center'
                          }}
                        >
                          <AppCircularProgress
                            variant="determinate"
                            value={25}
                            size={48}
                            thickness={5}
                          />

                          <AppCircularProgress
                            variant="determinate"
                            value={65}
                            size={48}
                            thickness={5}
                            color="secondary"
                          />

                          <CircularProgress
                            variant="determinate"
                            value={90}
                            size={48}
                            thickness={5}
                            sx={{
                              color: semanticColors.success
                            }}
                          />
                        </Stack>
                      </Stack>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* TABS                                                   */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Navigation"
                      description="Tabs and segmented controls."
                    >
                      <AppTabs
                        value={1}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor: secondaryScale[6]
                        }}
                      >
                        <AppTab label="Overview" />

                        <AppTab label="Activity" />

                        <AppTab label="Settings" />

                        <AppTab label="Members" />
                      </AppTabs>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          mt: 3
                        }}
                      >
                        <ToggleButtonGroup exclusive value="week" size="small">
                          <ToggleButton value="day">Day</ToggleButton>

                          <ToggleButton value="week">Week</ToggleButton>

                          <ToggleButton value="month">Month</ToggleButton>
                        </ToggleButtonGroup>
                      </Stack>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* UPLOAD                                                 */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Upload"
                      description="Drag-and-drop style surface with action states."
                    >
                      <AppPaper
                        variant="outlined"
                        sx={{
                          minHeight: 220,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderStyle: 'dashed',
                          borderWidth: 2,
                          borderColor: secondaryScale[7],
                          borderRadius: 2
                        }}
                      >
                        <Stack
                          spacing={2}
                          sx={{
                            textAlign: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Box
                            sx={{
                              width: 58,
                              height: 58,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: secondaryScale[3],
                              color: secondaryScale[11],
                              border: `1px solid ${secondaryScale[6]}`
                            }}
                          >
                            <CloudUploadOutlinedIcon />
                          </Box>

                          <Box>
                            <Typography
                              variant="medium"
                              sx={{
                                fontWeight: 700
                              }}
                            >
                              Upload your files
                            </Typography>

                            <Typography
                              variant="small"
                              sx={{
                                display: 'block',
                                mt: 0.5,
                                color: grayScale[11]
                              }}
                            >
                              Drag and drop files here or browse your computer.
                            </Typography>
                          </Box>

                          <AppButton
                            variant="outlined"
                            startIcon={<CloudUploadOutlinedIcon />}
                            color="secondary"
                          >
                            Choose files
                          </AppButton>
                        </Stack>
                      </AppPaper>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* CARDS                                                  */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Cards"
                      description="Different surface levels and interactive card states."
                    >
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)'
                          },
                          gap: 2
                        }}
                      >
                        <SampleCard
                          icon={<PlayArrowIcon />}
                          title="Getting started"
                          description="Learn the basics and set up your workspace."
                          action="Start"
                        />

                        <SampleCard
                          icon={<DownloadOutlinedIcon />}
                          title="Resources"
                          description="Download templates, assets, and documentation."
                          action="Browse"
                        />

                        <SampleCard
                          icon={<AutoAwesomeIcon />}
                          title="Explore"
                          description="Discover new features available in the platform."
                          action="Explore"
                        />
                      </Box>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* TABLE                                                  */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Data Table"
                      description="Dense data presentation with status and actions."
                    >
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Project</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Progress</TableCell>
                              <TableCell align="right">Updated</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {[
                              {
                                name: 'Arcana78',
                                status: 'Active',
                                progress: 86,
                                updated: '2 min ago'
                              },
                              {
                                name: 'Design System',
                                status: 'Active',
                                progress: 64,
                                updated: '12 min ago'
                              },
                              {
                                name: 'Website',
                                status: 'Review',
                                progress: 42,
                                updated: '1 hour ago'
                              },
                              {
                                name: 'Mobile App',
                                status: 'Draft',
                                progress: 18,
                                updated: '3 hours ago'
                              }
                            ].map((row) => (
                              <TableRow key={row.name} hover>
                                <TableCell>
                                  <Typography
                                    variant="small"
                                    sx={{
                                      fontWeight: 700
                                    }}
                                  >
                                    {row.name}
                                  </Typography>
                                </TableCell>

                                <TableCell>
                                  <AppChip
                                    size="small"
                                    label={row.status}
                                    color={
                                      row.status === 'Active'
                                        ? 'primary'
                                        : row.status === 'Review'
                                          ? 'secondary'
                                          : 'default'
                                    }
                                  />
                                </TableCell>

                                <TableCell
                                  sx={{
                                    minWidth: 160
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                      alignItems: 'center'
                                    }}
                                  >
                                    <AppLinearProgress
                                      variant="determinate"
                                      value={row.progress}
                                      sx={{
                                        flex: 1,
                                        height: 6
                                      }}
                                    />

                                    <Typography
                                      variant="small"
                                      sx={{
                                        color: grayScale[11]
                                      }}
                                    >
                                      {row.progress}%
                                    </Typography>
                                  </Stack>
                                </TableCell>

                                <TableCell align="right">
                                  <Typography
                                    variant="small"
                                    sx={{
                                      color: grayScale[11]
                                    }}
                                  >
                                    {row.updated}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* CONTROLS                                               */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Controls"
                      description="Common input and preference controls."
                    >
                      <Stack spacing={4}>
                        <Box>
                          <Typography
                            variant="label"
                            sx={{
                              display: 'block',
                              mb: 1
                            }}
                          >
                            Volume
                          </Typography>

                          <Slider
                            defaultValue={65}
                            valueLabelDisplay="auto"
                            sx={{
                              color: colorScale[9]
                            }}
                          />
                        </Box>

                        <Stack
                          direction={{
                            xs: 'column',
                            sm: 'row'
                          }}
                          spacing={4}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              alignItems: 'center'
                            }}
                          >
                            <AppSwitch defaultChecked />

                            <Typography variant="small">
                              Notifications
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              alignItems: 'center'
                            }}
                          >
                            <AppSwitch />

                            <Typography variant="small">Auto-save</Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              alignItems: 'center'
                            }}
                          >
                            <AppCheckbox defaultChecked />

                            <Typography variant="small">Remember me</Typography>
                          </Stack>
                        </Stack>

                        <Box>
                          <Typography
                            variant="label"
                            sx={{
                              display: 'block',
                              mb: 1
                            }}
                          >
                            Rating
                          </Typography>

                          <Rating
                            defaultValue={4}
                            sx={{
                              color: colorScale[9]
                            }}
                          />
                        </Box>
                      </Stack>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* STATISTICS                                             */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Statistics"
                      description="Dashboard-style metrics using the color relationships."
                    >
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
                        <StatCard
                          title="Total users"
                          value="24,892"
                          change="+12.4%"
                          positive
                          icon={<PeopleIcon />}
                        />

                        <StatCard
                          title="Revenue"
                          value="$84,920"
                          change="+8.2%"
                          positive
                          icon={<ArrowUpwardIcon />}
                        />

                        <StatCard
                          title="Bounce rate"
                          value="24.8%"
                          change="-4.6%"
                          positive
                          icon={<ArrowDownwardIcon />}
                        />

                        <StatCard
                          title="Pending"
                          value="128"
                          change="+18"
                          icon={<WarningAmberOutlinedIcon />}
                        />
                      </Box>
                    </ShowcaseCard>

                    {/* ====================================================== */}
                    {/* BUTTON STATES                                          */}
                    {/* ====================================================== */}

                    <ShowcaseCard
                      title="Button States"
                      description="Primary, secondary, destructive, disabled, and icon actions."
                    >
                      <Stack spacing={3}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            flexWrap: 'wrap'
                          }}
                          useFlexGap
                        >
                          {/* Primary */}
                          <AppButton variant="contained">Primary</AppButton>

                          {/* Secondary */}
                          <AppButton variant="outlined" color="secondary">
                            Secondary
                          </AppButton>

                          {/* Neutral */}
                          <AppButton
                            variant="text"
                            sx={{
                              color: grayScale[11],
                              '&:hover': {
                                backgroundColor: grayScale[3]
                              }
                            }}
                          >
                            Ghost
                          </AppButton>

                          {/* Destructive */}
                          <AppButton variant="contained" color="error">
                            Delete
                          </AppButton>

                          {/* Disabled */}
                          <AppButton variant="contained" disabled>
                            Disabled
                          </AppButton>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                          <AppTooltip title="Play">
                            <AppIconButton
                              sx={{
                                backgroundColor: colorScale[9],
                                color: colorScale.contrast,

                                '&:hover': {
                                  backgroundColor: colorScale[10]
                                }
                              }}
                            >
                              <PlayArrowIcon />
                            </AppIconButton>
                          </AppTooltip>

                          <AppTooltip title="Pause">
                            <AppIconButton
                              sx={{
                                color: secondaryScale[11],
                                border: `1px solid ${secondaryScale[6]}`,

                                '&:hover': {
                                  backgroundColor: secondaryScale[3]
                                }
                              }}
                            >
                              <PauseIcon />
                            </AppIconButton>
                          </AppTooltip>

                          <AppTooltip title="More">
                            <AppIconButton
                              sx={{
                                color: grayScale[11],

                                '&:hover': {
                                  backgroundColor: grayScale[3]
                                }
                              }}
                            >
                              <MoreHorizIcon />
                            </AppIconButton>
                          </AppTooltip>
                        </Stack>
                      </Stack>
                    </ShowcaseCard>
                  </Stack>
                </Box>
              </Stack>
            )}

            {/* ============================================================ */}
            {/* FOOTER                                                        */}
            {/* ============================================================ */}

            <Box sx={{ mt: '3rem' }}>
              <Divider />

              <Box
                sx={{
                  mt: '3rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                  useFlexGap
                >
                  <Typography
                    variant="small"
                    sx={{
                      color: grayScale[11]
                    }}
                  >
                    CryptechServices Design System
                  </Typography>

                  <Typography
                    variant="small"
                    sx={{
                      color: grayScale[8]
                    }}
                  >
                    •
                  </Typography>

                  <Button
                    component="a"
                    href="/theme"
                    size="small"
                    startIcon={<PaletteIcon />}
                  >
                    Theme
                  </Button>

                  <Button
                    component="a"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    startIcon={<GitHubIcon />}
                  >
                    GitHub
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

/* ========================================================================== */
/* COLOR USAGE CARD                                                           */
/* ========================================================================== */

function ColorUsageCard({
  title,
  description,
  code,
  background,
  textColor,
  scale,
  steps
}: {
  title: string;
  description: React.ReactNode;
  code: string;
  background: string;
  textColor: string;
  scale: ColorScale;
  steps: number[];
}) {
  const theme = useTheme();

  return (
    <AppPaper
      variant="outlined"
      sx={{
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h5">{title}</Typography>

          <Typography
            variant="small"
            sx={{
              color: theme.grayScale[11]
            }}
          >
            {description}
          </Typography>
        </Stack>
      </Box>

      <Divider />

      <Box
        sx={{
          backgroundColor: theme.secondaryScale[3],
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2.5,
            borderRadius: 2,
            overflowX: 'auto',
            backgroundColor: background,
            color: textColor,
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            border: `1px solid ${theme.secondaryScale[6]}`
          }}
        >
          {code}
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: 2,
            flexWrap: 'wrap'
          }}
          useFlexGap
        >
          {steps.map((step) => (
            <Chip
              key={step}
              label={`${getScaleName(scale)}[${step}]`}
              sx={{
                backgroundColor: scale[step],
                color: isLightColor(scale[step]) ? '#000' : '#fff'
              }}
            />
          ))}
        </Stack>
      </Box>
    </AppPaper>
  );
}

/* ========================================================================== */
/* SCALE NAME                                                                 */
/* ========================================================================== */

function getScaleName(scale: ColorScale): string {
  /*
   * This is only used for visual documentation labels.
   * The actual scale object is still supplied directly by the caller.
   */
  return scale === undefined ? 'scale' : 'scale';
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
  const theme = useTheme();

  const isPrimary = colorName === 'Primary';
  const isSecondary = colorName === 'Secondary';
  const isGray = colorName === 'Gray';

  const sectionBorder = isSecondary
    ? theme.secondaryScale[7]
    : isGray
      ? theme.grayScale[6]
      : theme.secondaryScale[6];

  return (
    <AppPaper
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
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Typography variant="h5">{title}</Typography>

            <Chip
              size="small"
              label={
                isPrimary
                  ? '10%'
                  : isSecondary
                    ? '30%'
                    : isGray
                      ? 'Neutral'
                      : '60%'
              }
              sx={{
                backgroundColor: isPrimary
                  ? theme.colorScale[3]
                  : isSecondary
                    ? theme.secondaryScale[3]
                    : isGray
                      ? theme.grayScale[3]
                      : theme.backgroundScale[3],

                color: isPrimary
                  ? theme.colorScale[11]
                  : isSecondary
                    ? theme.secondaryScale[11]
                    : isGray
                      ? theme.grayScale[11]
                      : theme.backgroundScale[11]
              }}
            />
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: theme.grayScale[11]
            }}
          >
            {description}
          </Typography>
        </Stack>
      </Box>

      {/* ================================================================== */}
      {/* FULL 1–12 SCALE                                                     */}
      {/* ================================================================== */}

      <Box
        sx={{
          backgroundColor: theme.secondaryScale[3],
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
              sx={{
                mt: 0.5,
                display: 'block',
                color: theme.grayScale[11]
              }}
            >
              {group.description}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: theme.secondaryScale[3],
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
          sx={{
            mt: 0.5,
            mb: 3,
            display: 'block',
            color: theme.grayScale[11]
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
                border: `1px solid ${theme.secondaryScale[6]}`,
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
                  p: 1.5,
                  backgroundColor: theme.backgroundScale[1]
                }}
              >
                <Typography
                  variant="code"
                  sx={{
                    wordBreak: 'break-all',
                    color: theme.grayScale[11]
                  }}
                >
                  {item.color}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </AppPaper>
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
  const theme = useTheme();
  const useLightText = !isLightColor(color);

  return (
    <Box
      sx={{
        minWidth: 0,
        borderRight: `1px solid ${theme.grayScale[6]}`,
        borderBottom: `1px solid ${theme.grayScale[6]}`
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
          minHeight: large ? 120 : 75
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
            sx={{
              display: 'block',
              mt: 0.5,
              lineHeight: 1.4,
              color: theme.grayScale[11]
            }}
          >
            {description}
          </Typography>
        )}

        <Typography
          variant="code"
          sx={{
            display: 'block',
            mt: 1,
            fontSize: {
              xs: '0.6rem',
              sm: '0.7rem'
            },
            wordBreak: 'break-all',
            color: theme.grayScale[11]
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

/* ========================================================================== */
/* SHOWCASE CARD                                                              */
/* ========================================================================== */

function ShowcaseCard({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <AppPaper
      variant="outlined"
      sx={{
        overflow: 'hidden',
        borderColor: theme.secondaryScale[6]
      }}
    >
      <Box
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4
          },
          py: 2.5
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="small"
          sx={{
            display: 'block',
            mt: 0.5,
            color: theme.grayScale[11]
          }}
        >
          {description}
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          },
          backgroundColor: theme.secondaryScale[3]
        }}
      >
        {children}
      </Box>
    </AppPaper>
  );
}

/* ========================================================================== */
/* STATUS DOT                                                                 */
/* ========================================================================== */

function StatusDot({ color, label }: { color: string; label: string }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: 9,
          height: 9,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 0 3px ${color}22`
        }}
      />

      <Typography variant="small">{label}</Typography>
    </Stack>
  );
}

/* ========================================================================== */
/* SAMPLE CARD                                                                */
/* ========================================================================== */

function SampleCard({
  icon,
  title,
  description,
  action
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  const theme = useTheme();

  return (
    <AppCard
      sx={{
        p: 2.5,
        borderRadius: 2,

        borderColor: theme.secondaryScale[6],
        transition: 'all 0.2s ease',

        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderColor: theme.secondaryScale[9]
        }
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.secondaryScale[3],
            color: theme.secondaryScale[11],
            border: `1px solid ${theme.secondaryScale[6]}`
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            variant="medium"
            sx={{
              fontWeight: 700
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="small"
            sx={{
              display: 'block',
              mt: 0.75,
              lineHeight: 1.5,
              color: theme.grayScale[11]
            }}
          >
            {description}
          </Typography>
        </Box>

        <Button
          variant="text"
          sx={{
            alignSelf: 'flex-start',
            px: 0,
            color: theme.colorScale[11]
          }}
        >
          {action} →
        </Button>
      </Stack>
    </AppCard>
  );
}

/* ========================================================================== */
/* STAT CARD                                                                  */
/* ========================================================================== */

function StatCard({
  title,
  value,
  change,
  positive = false,
  icon
}: {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <AppCard
      sx={{
        p: 2.5,
        borderRadius: 2,

        borderColor: theme.secondaryScale[6]
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="small"
            sx={{
              color: theme.grayScale[11]
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.secondaryScale[3],
              color: theme.secondaryScale[11],
              border: `1px solid ${theme.secondaryScale[6]}`
            }}
          >
            {icon}
          </Box>
        </Stack>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="small"
          sx={{
            color: positive ? 'success.main' : 'warning.main'
          }}
        >
          {change} from last month
        </Typography>
      </Stack>
    </AppCard>
  );
}

/* ========================================================================== */
/* HOW TO ADD TYPOGRAPHY                                                      */
/* ========================================================================== */

function TypographyUsageSection() {
  const theme = useTheme();

  const typographySamples = [
    {
      name: 'Display',
      variant: 'display' as const,
      description: 'Large page-level headings and hero titles.',
      code: `<Typography variant="display">
  Your main heading
</Typography>`
    },
    {
      name: 'Title',
      variant: 'title' as const,
      description: 'Primary section or page titles.',
      code: `<Typography variant="title">
  Section title
</Typography>`
    },
    {
      name: 'Section Title',
      variant: 'sectionTitle' as const,
      description: 'Subsection headings inside a page.',
      code: `<Typography variant="sectionTitle">
  Section heading
</Typography>`
    },
    {
      name: 'Lead',
      variant: 'lead' as const,
      description: 'Introductory or supporting text.',
      code: `<Typography variant="lead">
  Supporting description text
</Typography>`
    },
    {
      name: 'Large',
      variant: 'large' as const,
      description: 'Larger body text for important content.',
      code: `<Typography variant="large">
  Large body text
</Typography>`
    },
    {
      name: 'Medium',
      variant: 'medium' as const,
      description: 'Standard emphasized body content.',
      code: `<Typography variant="medium">
  Medium body text
</Typography>`
    },
    {
      name: 'Small',
      variant: 'small' as const,
      description: 'Compact supporting text.',
      code: `<Typography variant="small">
  Small supporting text
</Typography>`
    },
    {
      name: 'Label',
      variant: 'label' as const,
      description: 'Form labels, metadata, and UI labels.',
      code: `<Typography variant="label">
  Label text
</Typography>`
    },
    {
      name: 'Overline',
      variant: 'overlineCustom' as const,
      description: 'Categories, eyebrow text, and small headings.',
      code: `<Typography variant="overlineCustom">
  CATEGORY
</Typography>`
    },
    {
      name: 'Code',
      variant: 'code' as const,
      description: 'Technical values, commands, and code snippets.',
      code: `<Typography variant="code">
  npm install @mui/material
</Typography>`
    }
  ];

  return (
    <Box sx={{ mt: 8 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography
          variant="overlineCustom"
          sx={{
            color: theme.colorScale[9]
          }}
        >
          TYPOGRAPHY USAGE
        </Typography>

        <Typography variant="title">How to Add Typography</Typography>

        <Typography
          variant="lead"
          sx={{
            color: theme.secondaryScale[11],
            maxWidth: 760
          }}
        >
          Use the predefined typography variants directly with MUI&apos;s
          Typography component. The theme handles font size, weight, line
          height, and responsive behavior for you.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {typographySamples.map((sample) => (
          <AppPaper
            key={sample.name}
            variant="outlined"
            sx={{
              borderColor: theme.secondaryScale[6]
            }}
          >
            <Stack>
              {/* Header */}

              <Stack
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                spacing={2}
                sx={{
                  p: {
                    xs: 2,
                    md: 3
                  },
                  justifyContent: 'space-between',
                  alignItems: {
                    xs: 'flex-start',
                    md: 'center'
                  }
                }}
              >
                <Stack>
                  <Typography variant="h5">{sample.name}</Typography>

                  <Typography
                    variant="small"
                    sx={{
                      mt: 0.5,
                      color: theme.grayScale[11]
                    }}
                  >
                    {sample.description}
                  </Typography>
                </Stack>

                <Chip
                  size="small"
                  label={`variant="${sample.variant}"`}
                  sx={{
                    fontFamily: 'monospace',
                    backgroundColor: theme.secondaryScale[3],
                    color: theme.secondaryScale[11],
                    border: `1px solid ${theme.secondaryScale[6]}`
                  }}
                />
              </Stack>

              <Divider />

              {/* Live preview */}

              <Stack
                spacing={2}
                sx={{ p: 3, backgroundColor: theme.secondaryScale[3] }}
              >
                <Box
                  sx={{
                    p: {
                      xs: 2,
                      md: 3
                    },
                    borderRadius: 2,
                    bgcolor: theme.backgroundScale[1],
                    border: `1px solid ${theme.secondaryScale[6]}`
                  }}
                >
                  <Typography variant={sample.variant}>
                    The quick brown fox jumps over the lazy dog.
                  </Typography>
                </Box>

                {/* Code */}

                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 2,
                    overflowX: 'auto',
                    borderRadius: 2,
                    bgcolor: theme.grayScale[2],
                    color: theme.grayScale[12],
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    lineHeight: 1.7,
                    border: `1px solid ${theme.grayScale[6]}`
                  }}
                >
                  <code>{sample.code}</code>
                </Box>
              </Stack>
            </Stack>
          </AppPaper>
        ))}
      </Stack>
    </Box>
  );
}
