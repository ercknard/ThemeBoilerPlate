import Head from 'next/head';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';

import ThemeToggle from '@/theme/ThemeToggle';
import { semanticColors } from '@/theme/theme';

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
            {/* COMPONENT SHOWCASE                                            */}
            {/* ============================================================ */}

            <Box>
              <Typography variant="title" gutterBottom>
                Component Showcase
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4,
                  maxWidth: 850
                }}
              >
                Additional interface examples showing how the color scales,
                typography, surfaces, borders, states, and semantic colors work
                together in real components.
              </Typography>

              <Stack spacing={4}>
                {/* ========================================================== */}
                {/* ALERTS                                                       */}
                {/* ========================================================== */}

                <ShowcaseCard
                  title="Alerts"
                  description="Feedback messages using the semantic color system."
                >
                  <Stack spacing={2}>
                    <Alert
                      icon={<InfoOutlinedIcon />}
                      severity="info"
                      sx={{
                        border: '1px solid',
                        borderColor: colorScale[6]
                      }}
                    >
                      Your account has been successfully updated.
                    </Alert>

                    <Alert
                      icon={<CheckCircleOutlineOutlinedIcon />}
                      severity="success"
                      sx={{
                        border: '1px solid',
                        borderColor: semanticColors.success
                      }}
                    >
                      Changes were saved successfully.
                    </Alert>

                    <Alert
                      icon={<WarningAmberOutlinedIcon />}
                      severity="warning"
                      sx={{
                        border: '1px solid',
                        borderColor: semanticColors.warning
                      }}
                    >
                      Your subscription will expire soon.
                    </Alert>

                    <Alert
                      icon={<ErrorOutlineOutlinedIcon />}
                      severity="error"
                      sx={{
                        border: '1px solid',
                        borderColor: semanticColors.error
                      }}
                    >
                      Something went wrong. Please try again.
                    </Alert>
                  </Stack>
                </ShowcaseCard>

                {/* ========================================================== */}
                {/* BADGES                                                       */}
                {/* ========================================================== */}

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
                    <Badge badgeContent={4} color="primary">
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="small">Notifications</Typography>
                      </Paper>
                    </Badge>

                    <Badge variant="dot" color="success">
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="small">Online</Typography>
                      </Paper>
                    </Badge>

                    <StatusDot color={semanticColors.success} label="Online" />

                    <StatusDot color={semanticColors.warning} label="Away" />

                    <StatusDot color={semanticColors.error} label="Offline" />
                  </Stack>
                </ShowcaseCard>

                {/* ========================================================== */}
                {/* PROGRESS                                                      */}
                {/* ========================================================== */}

                <ShowcaseCard
                  title="Progress"
                  description="Progress indicators using the primary scale."
                >
                  <Stack spacing={3}>
                    <Box>
                      <Stack
                        direction="row"
                        sx={{ mb: 1, justifyContent: 'space-between' }}
                      >
                        <Typography variant="small">Uploading files</Typography>

                        <Typography variant="small" color="text.secondary">
                          72%
                        </Typography>
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={72}
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          backgroundColor: colorScale[3],
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: colorScale[9],
                            borderRadius: 999
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Stack
                        direction="row"
                        sx={{ mb: 1, justifyContent: 'space-between' }}
                      >
                        <Typography variant="small">Storage</Typography>

                        <Typography variant="small" color="text.secondary">
                          42%
                        </Typography>
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={42}
                        sx={{
                          height: 8,
                          borderRadius: 999,
                          backgroundColor: grayScale[4],
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: colorScale[8],
                            borderRadius: 999
                          }
                        }}
                      />
                    </Box>

                    <Stack
                      direction="row"
                      spacing={4}
                      sx={{ alignItems: 'center' }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={25}
                        size={48}
                        thickness={5}
                        sx={{
                          color: colorScale[9]
                        }}
                      />

                      <CircularProgress
                        variant="determinate"
                        value={65}
                        size={48}
                        thickness={5}
                        sx={{
                          color: colorScale[10]
                        }}
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

                {/* ========================================================== */}
                {/* TABS                                                         */}
                {/* ========================================================== */}

                <ShowcaseCard
                  title="Navigation"
                  description="Tabs and segmented controls."
                >
                  <Tabs
                    value={1}
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      minHeight: 44
                    }}
                  >
                    <Tab
                      label="Overview"
                      sx={{
                        minHeight: 44
                      }}
                    />

                    <Tab
                      label="Activity"
                      sx={{
                        minHeight: 44
                      }}
                    />

                    <Tab
                      label="Settings"
                      sx={{
                        minHeight: 44
                      }}
                    />

                    <Tab
                      label="Members"
                      sx={{
                        minHeight: 44
                      }}
                    />
                  </Tabs>

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

                {/* ========================================================== */}
                {/* FILE / UPLOAD CARD                                           */}
                {/* ========================================================== */}

                <ShowcaseCard
                  title="Upload"
                  description="Drag-and-drop style surface with action states."
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      minHeight: 220,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderStyle: 'dashed',
                      borderWidth: 2,
                      borderColor: colorScale[6],
                      backgroundColor: backgroundScale[2],
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
                          backgroundColor: colorScale[3],
                          color: colorScale[9]
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
                          color="text.secondary"
                          sx={{
                            display: 'block',
                            mt: 0.5
                          }}
                        >
                          Drag and drop files here or browse your computer.
                        </Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        startIcon={<CloudUploadOutlinedIcon />}
                      >
                        Choose files
                      </Button>
                    </Stack>
                  </Paper>
                </ShowcaseCard>

                {/* ========================================================== */}
                {/* MEDIA CARD GRID                                               */}
                {/* ========================================================== */}

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

                {/* ========================================================== */}
                {/* TABLE                                                         */}
                {/* ========================================================== */}

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
                              <Chip
                                size="small"
                                label={row.status}
                                sx={{
                                  backgroundColor:
                                    row.status === 'Active'
                                      ? colorScale[3]
                                      : row.status === 'Review'
                                        ? '#FEF3C7'
                                        : grayScale[3],
                                  color:
                                    row.status === 'Active'
                                      ? colorScale[11]
                                      : row.status === 'Review'
                                        ? '#92400E'
                                        : grayScale[11]
                                }}
                              />
                            </TableCell>

                            <TableCell sx={{ minWidth: 160 }}>
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                  alignItems: 'center'
                                }}
                              >
                                <LinearProgress
                                  variant="determinate"
                                  value={row.progress}
                                  sx={{
                                    flex: 1,
                                    height: 6,
                                    borderRadius: 999,
                                    backgroundColor: grayScale[4],
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: colorScale[9],
                                      borderRadius: 999
                                    }
                                  }}
                                />

                                <Typography
                                  variant="small"
                                  color="text.secondary"
                                >
                                  {row.progress}%
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="right">
                              <Typography
                                variant="small"
                                color="text.secondary"
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

                {/* ========================================================== */}
                {/* CONTROLS                                                      */}
                {/* ========================================================== */}

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
                        sx={{ alignItems: 'center' }}
                      >
                        <Switch defaultChecked />

                        <Typography variant="small">Notifications</Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: 'center' }}
                      >
                        <Switch />

                        <Typography variant="small">Auto-save</Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: 'center' }}
                      >
                        <Checkbox defaultChecked={true} />

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

                {/* ========================================================== */}
                {/* STATISTICS                                                    */}
                {/* ========================================================== */}

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

                {/* ========================================================== */}
                {/* BUTTON STATES                                                 */}
                {/* ========================================================== */}

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
                      <Button variant="contained">Primary</Button>

                      <Button variant="outlined">Secondary</Button>

                      <Button variant="text">Ghost</Button>

                      <Button variant="contained" color="error">
                        Delete
                      </Button>

                      <Button variant="contained" disabled>
                        Disabled
                      </Button>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Play">
                        <IconButton
                          sx={{
                            backgroundColor: colorScale[9],
                            color: colorScale.contrast,
                            '&:hover': {
                              backgroundColor: colorScale[10]
                            }
                          }}
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Pause">
                        <IconButton>
                          <PauseIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="More">
                        <IconButton>
                          <MoreHorizIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </ShowcaseCard>
              </Stack>
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
  return (
    <Paper
      variant="outlined"
      sx={{
        overflow: 'hidden'
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
          color="text.secondary"
          sx={{
            display: 'block',
            mt: 0.5
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
          }
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

/* ========================================================================== */
/* STATUS DOT                                                                 */
/* ========================================================================== */

function StatusDot({ color, label }: { color: string; label: string }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderColor: 'primary.main'
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
            backgroundColor: 'primary.main',
            color: 'primary.contrastText'
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
            color="text.secondary"
            sx={{
              display: 'block',
              mt: 0.75,
              lineHeight: 1.5
            }}
          >
            {description}
          </Typography>
        </Box>

        <Button
          variant="text"
          sx={{
            alignSelf: 'flex-start',
            px: 0
          }}
        >
          {action} →
        </Button>
      </Stack>
    </Paper>
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
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 2
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
          <Typography variant="small" color="text.secondary">
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
              backgroundColor: 'primary.light',
              color: 'primary.main'
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
    </Paper>
  );
}
