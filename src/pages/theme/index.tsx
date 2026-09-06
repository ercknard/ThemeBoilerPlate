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
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Grid,
  CardContent
} from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '@/contexts/themeContext';
import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';

import OverviewTheme from '@/theme/OverviewTheme';
import ThemeToggle from '@/theme/ThemeToggle';
import { semanticColors } from '@/theme/theme';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
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
import React from 'react';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const colorScale = theme.colorScale as ColorScale;
  const secondaryScale = theme.secondaryScale as ColorScale;
  const grayScale = theme.grayScale as ColorScale;
  const backgroundScale = theme.backgroundScale as ColorScale;

  type MenuKey = 'overview' | 'typography' | 'colors' | 'components';

  const [openMenus, setOpenMenus] = useState<Record<MenuKey, boolean>>({
    overview: false,
    typography: false,
    colors: false,
    components: false
  });

  const { themeSet } = useThemeContext();

  const THEME_ICONS = {
    blue: '/static/images/logo-blue.png',
    purple: '/static/images/logo-purple.png',
    coffee: '/static/images/logo-coffee.png',
    green: '/static/images/logo-green.png'
  } as const;

  const themeIcon = THEME_ICONS[themeSet];

  const toggleMenu = (menu: MenuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const openMenuAndScroll = (menu: ShowcaseTab, sectionId: string) => {
    setActiveTab(menu);

    setOpenMenus({
      overview: false,
      typography: false,
      colors: false,
      components: false,
      [menu]: true
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      });
    });
  };
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
      {/* PAGE                                                               */}
      {/* ================================================================== */}

      <Box
        sx={{
          minHeight: '100vh',
          background: `${alpha(theme.backgroundScale[3], 1)}`,
          color: 'text.primary'
        }}
      >
        {/* <Box
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
    ${alpha(theme.backgroundScale[5], 1)},
    ${alpha(theme.colorScale[3], 1)} 55%, ${alpha(theme.colorScale[3], 0)} 75%
  )
`,
            color: 'text.primary'
          }}
        /> */}

        <Grid
          container
          columns={12}
          spacing={4}
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            minHeight: '100vh',
            alignItems: 'stretch'
          }}
        >
          <Grid
            size={{ xs: 12, md: 2.5 }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            {!isMobile && (
              <Box
                component="aside"
                sx={{
                  width: '100%',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1200,
                  height: '100vh',
                  maxHeight: '100vh'
                }}
              >
                <AppPaper
                  variant="outlined"
                  sx={{
                    height: '100%',
                    p: 1.25,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: 0,
                    borderRight: `2px solid ${secondaryScale[7]}`,
                    backgroundColor: alpha(backgroundScale[4], 1)
                  }}
                >
                  <Stack
                    spacing={1.5}
                    direction={'row'}
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      pb: 1,
                      alignItems: 'center',
                      textAlign: 'center',
                      borderBottom: `2px solid ${secondaryScale[7]}`
                    }}
                  >
                    {/* ============================================================ */}
                    {/* LOGO                                                         */}
                    {/* ============================================================ */}

                    <Box
                      component={Link}
                      href="/"
                      sx={{
                        width: 60,
                        height: 60,
                        position: 'relative',
                        display: 'block',
                        cursor: 'pointer',
                        textDecoration: 'none',

                        transition: 'filter 0.2s ease',

                        '&:hover': {
                          filter: 'brightness(1.15)'
                        }
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

                    {/* ============================================================ */}
                    {/* BRAND                                                        */}
                    {/* ============================================================ */}

                    <Stack
                      sx={{
                        py: 1.75,
                        mb: 1,
                        alignItems: 'flex-start',
                        textAlign: 'left'
                      }}
                    >
                      <Typography
                        variant="overlineCustom"
                        sx={{
                          color: colorScale[9]
                        }}
                      >
                        Design System
                      </Typography>

                      <Typography
                        component={Link}
                        href="/"
                        variant="h6"
                        sx={{
                          mt: 0.5,
                          fontWeight: 800,
                          color: 'inherit',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'opacity 0.2s ease',

                          '&:hover': {
                            opacity: 0.75
                          }
                        }}
                      >
                        THEME BOILERPLATE
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Navigation */}
                  <Typography
                    variant="label"
                    sx={{
                      px: 1.5,
                      pt: 3,
                      pb: 1.25,
                      color: grayScale[11],
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    Navigation
                  </Typography>

                  <List disablePadding sx={{ px: 0.5, pl: 3 }}>
                    {/* ================================================================ */}
                    {/* OVERVIEW                                                         */}
                    {/* ================================================================ */}

                    <ListItemButton
                      selected={activeTab === 'overview'}
                      onClick={() => {
                        setActiveTab('overview');
                        toggleMenu('overview');
                      }}
                      sx={{
                        minHeight: 44,
                        mb: 0.5,
                        px: 1.25,
                        borderRadius: 1.5,

                        '& .MuiListItemIcon-root': {
                          minWidth: 38,
                          color:
                            activeTab === 'overview'
                              ? colorScale[9]
                              : secondaryScale[10]
                        },

                        '&.Mui-selected': {
                          backgroundColor: alpha(colorScale[9], 0.12),
                          border: `1px solid ${alpha(colorScale[9], 0.22)}`
                        },

                        '&:hover': {
                          backgroundColor: alpha(secondaryScale[9], 0.08)
                        }
                      }}
                    >
                      <ListItemIcon>
                        <DashboardOutlinedIcon fontSize="small" />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            variant="small"
                            sx={{
                              fontWeight: activeTab === 'overview' ? 700 : 500
                            }}
                          >
                            Overview
                          </Typography>
                        }
                      />

                      <ExpandMoreIcon
                        fontSize="small"
                        sx={{
                          transform: openMenus.overview
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}
                      />
                    </ListItemButton>

                    {openMenus.overview && (
                      <List
                        disablePadding
                        sx={{
                          ml: 2.25,
                          pl: 1,
                          borderLeft: `1px solid ${alpha(secondaryScale[7], 0.5)}`
                        }}
                      >
                        {[
                          {
                            label: 'Color Relationship',
                            id: 'overview-color-relationship'
                          },
                          {
                            label: 'Color Scales',
                            id: 'overview-color-scales'
                          },
                          {
                            label: 'Theme Samples',
                            id: 'overview-theme-samples'
                          }
                        ].map((item) => (
                          <ListItemButton
                            key={item.id}
                            onClick={() =>
                              openMenuAndScroll('overview', item.id)
                            }
                            sx={{
                              minHeight: 36,
                              px: 1.25,
                              mb: 0.25,
                              borderRadius: 1,

                              '&:hover': {
                                backgroundColor: alpha(secondaryScale[9], 0.08)
                              }
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  variant="small"
                                  sx={{
                                    color: secondaryScale[11]
                                  }}
                                >
                                  {item.label}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    )}

                    {/* ================================================================ */}
                    {/* TYPOGRAPHY                                                       */}
                    {/* ================================================================ */}

                    <ListItemButton
                      selected={activeTab === 'typography'}
                      onClick={() => {
                        setActiveTab('typography');
                        toggleMenu('typography');
                      }}
                      sx={{
                        minHeight: 44,
                        mb: 0.5,
                        px: 1.25,
                        borderRadius: 1.5,

                        '& .MuiListItemIcon-root': {
                          minWidth: 38,
                          color:
                            activeTab === 'typography'
                              ? colorScale[9]
                              : secondaryScale[10]
                        },

                        '&.Mui-selected': {
                          backgroundColor: alpha(colorScale[9], 0.12),
                          border: `1px solid ${alpha(colorScale[9], 0.22)}`
                        },

                        '&:hover': {
                          backgroundColor: alpha(secondaryScale[9], 0.08)
                        }
                      }}
                    >
                      <ListItemIcon>
                        <TextFieldsOutlinedIcon fontSize="small" />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            variant="small"
                            sx={{
                              fontWeight: activeTab === 'typography' ? 700 : 500
                            }}
                          >
                            Typography
                          </Typography>
                        }
                      />

                      <ExpandMoreIcon
                        fontSize="small"
                        sx={{
                          transform: openMenus.typography
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}
                      />
                    </ListItemButton>

                    {openMenus.typography && (
                      <List
                        disablePadding
                        sx={{
                          ml: 2.25,
                          pl: 1,
                          borderLeft: `1px solid ${alpha(secondaryScale[7], 0.5)}`
                        }}
                      >
                        {[
                          {
                            label: 'Standard Typography',
                            id: 'typography-standard-typography'
                          },
                          {
                            label: 'Custom Typography',
                            id: 'typography-custom-typography'
                          },
                          {
                            label: 'How to Add Typography',
                            id: 'typography-how-to-use-typhography'
                          },
                          {
                            label: 'Responsive Typography',
                            id: 'typography-responsive-typography'
                          }
                        ].map((item) => (
                          <ListItemButton
                            key={item.id}
                            onClick={() =>
                              openMenuAndScroll('typography', item.id)
                            }
                            sx={{
                              minHeight: 36,
                              px: 1.25,
                              mb: 0.25,
                              borderRadius: 1,

                              '&:hover': {
                                backgroundColor: alpha(secondaryScale[9], 0.08)
                              }
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 30,
                                color: secondaryScale[10]
                              }}
                            >
                              <FormatSizeOutlinedIcon fontSize="small" />
                            </ListItemIcon>

                            <ListItemText
                              primary={
                                <Typography
                                  variant="small"
                                  sx={{
                                    color: secondaryScale[11]
                                  }}
                                >
                                  {item.label}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    )}

                    {/* ================================================================ */}
                    {/* COLORS                                                            */}
                    {/* ================================================================ */}

                    <ListItemButton
                      selected={activeTab === 'colors'}
                      onClick={() => {
                        setActiveTab('colors');
                        toggleMenu('colors');
                      }}
                      sx={{
                        minHeight: 44,
                        mb: 0.5,
                        px: 1.25,
                        borderRadius: 1.5,

                        '& .MuiListItemIcon-root': {
                          minWidth: 38,
                          color:
                            activeTab === 'colors'
                              ? colorScale[9]
                              : secondaryScale[10]
                        },

                        '&.Mui-selected': {
                          backgroundColor: alpha(colorScale[9], 0.12),
                          border: `1px solid ${alpha(colorScale[9], 0.22)}`
                        },

                        '&:hover': {
                          backgroundColor: alpha(secondaryScale[9], 0.08)
                        }
                      }}
                    >
                      <ListItemIcon>
                        <ColorLensOutlinedIcon fontSize="small" />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            variant="small"
                            sx={[
                              { fontWeight: activeTab === 'colors' ? 700 : 500 }
                            ]}
                          >
                            Colors
                          </Typography>
                        }
                      />

                      <ExpandMoreIcon
                        fontSize="small"
                        sx={{
                          transform: openMenus.colors
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}
                      />
                    </ListItemButton>

                    {openMenus.colors && (
                      <List
                        disablePadding
                        sx={{
                          ml: 2.25,
                          pl: 1,
                          borderLeft: `1px solid ${alpha(secondaryScale[7], 0.5)}`
                        }}
                      >
                        {[
                          {
                            label: 'Colors',
                            id: 'colors'
                          },
                          {
                            label: 'How to Use Colors',
                            id: 'colors-how-to-use-colors'
                          },
                          {
                            label: 'Color Usage',
                            id: 'colors-color-usage'
                          },
                          {
                            label: 'Text Colors',
                            id: 'colors-text-colors'
                          }
                        ].map((item) => (
                          <ListItemButton
                            key={item.id}
                            onClick={() => openMenuAndScroll('colors', item.id)}
                            sx={{
                              minHeight: 36,
                              px: 1.25,
                              mb: 0.25,
                              borderRadius: 1,

                              '&:hover': {
                                backgroundColor: alpha(secondaryScale[9], 0.08)
                              }
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 30,
                                color: secondaryScale[10]
                              }}
                            >
                              <PaletteOutlinedIcon fontSize="small" />
                            </ListItemIcon>

                            <ListItemText
                              primary={
                                <Typography
                                  variant="small"
                                  sx={{
                                    color: secondaryScale[11]
                                  }}
                                >
                                  {item.label}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    )}

                    {/* ================================================================ */}
                    {/* COMPONENTS                                                       */}
                    {/* ================================================================ */}

                    <ListItemButton
                      selected={activeTab === 'components'}
                      onClick={() => {
                        setActiveTab('components');
                        toggleMenu('components');
                      }}
                      sx={{
                        minHeight: 44,
                        mb: 0.5,
                        px: 1.25,
                        borderRadius: 1.5,

                        '& .MuiListItemIcon-root': {
                          minWidth: 38,
                          color:
                            activeTab === 'components'
                              ? colorScale[9]
                              : secondaryScale[10]
                        },

                        '&.Mui-selected': {
                          backgroundColor: alpha(colorScale[9], 0.12),
                          border: `1px solid ${alpha(colorScale[9], 0.22)}`
                        },

                        '&:hover': {
                          backgroundColor: alpha(secondaryScale[9], 0.08)
                        }
                      }}
                    >
                      <ListItemIcon>
                        <WidgetsOutlinedIcon fontSize="small" />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            variant="small"
                            sx={{
                              fontWeight: activeTab === 'components' ? 700 : 500
                            }}
                          >
                            Components
                          </Typography>
                        }
                      />

                      <ExpandMoreIcon
                        fontSize="small"
                        sx={{
                          transform: openMenus.components
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}
                      />
                    </ListItemButton>

                    {openMenus.components && (
                      <List
                        disablePadding
                        sx={{
                          ml: 2.25,
                          pl: 1,
                          borderLeft: `1px solid ${alpha(secondaryScale[7], 0.5)}`
                        }}
                      >
                        {[
                          {
                            label: 'Alerts',
                            id: 'components-alerts'
                          },
                          {
                            label: 'Status',
                            id: 'components-status'
                          },
                          {
                            label: 'Progress',
                            id: 'components-progress'
                          },
                          {
                            label: 'Navigation',
                            id: 'components-navigation'
                          },
                          {
                            label: 'Upload',
                            id: 'components-upload'
                          },
                          {
                            label: 'Cards',
                            id: 'components-cards'
                          },
                          {
                            label: 'Data Table',
                            id: 'components-data-table'
                          },
                          {
                            label: 'Controls',
                            id: 'components-controls'
                          },
                          {
                            label: 'Statistics',
                            id: 'components-statistics'
                          },
                          {
                            label: 'Button States',
                            id: 'components-button-states'
                          }
                        ].map((item) => (
                          <ListItemButton
                            key={item.id}
                            onClick={() =>
                              openMenuAndScroll('components', item.id)
                            }
                            sx={{
                              minHeight: 36,
                              px: 1.25,
                              mb: 0.25,
                              borderRadius: 1,

                              '&:hover': {
                                backgroundColor: alpha(secondaryScale[9], 0.08)
                              }
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 30,
                                color: secondaryScale[10]
                              }}
                            >
                              <GridViewOutlinedIcon fontSize="small" />
                            </ListItemIcon>

                            <ListItemText
                              primary={
                                <Typography
                                  variant="small"
                                  sx={{
                                    color: secondaryScale[11]
                                  }}
                                >
                                  {item.label}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    )}
                  </List>

                  {/* Sidebar footer */}
                  <Box sx={{ mt: 'auto', px: 1.25, pb: 1 }}>
                    <Divider sx={{ mb: 1.5 }} />

                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: grayScale[11],
                        lineHeight: 1.5
                      }}
                    >
                      Cryptech Services
                    </Typography>
                  </Box>
                </AppPaper>
              </Box>
            )}
          </Grid>

          <Grid
            size={{ xs: 12, md: 7.45 }}
            sx={{
              minHeight: { md: '100vh' },
              py: 5
            }}
          >
            <Stack spacing={{ xs: 5, md: 3 }}>
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
                  variant="title"
                  sx={{
                    mt: 1
                  }}
                >
                  Typography & Colors
                </Typography>

                <Typography
                  variant="large"
                  sx={{
                    color: grayScale[11],
                    mt: 2,
                    mb: 2
                  }}
                >
                  A complete showcase of the typography variants, semantic color
                  scales, spacing, components, and responsive behavior used
                  throughout the application.
                </Typography>

                <Divider />

                {/* ========================================================== */}
                {/* SECTION TABS                                                */}
                {/* ========================================================== */}

                <Box
                  sx={{
                    display: { xs: 'flex', md: 'none' },
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
                <Stack
                  spacing={{ xs: 5, md: 8 }}
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
                  {/* STANDARD TYPOGRAPHY                                               */}
                  {/* ================================================================ */}

                  <Box id="typography-standard-typography">
                    <Stack spacing={3}>
                      <Stack>
                        <Typography
                          variant="overlineCustom"
                          sx={{
                            color: colorScale[9],
                            fontWeight: 700,
                            letterSpacing: '0.12em'
                          }}
                        >
                          TYPOGRAPHY
                        </Typography>
                        <Typography variant="sectionTitle">
                          Standard Typography
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: grayScale[11]
                          }}
                        >
                          MUI&apos;s standard typography variants with
                          responsive sizing, consistent line heights, and
                          theme-based font weights.
                        </Typography>
                      </Stack>

                      <AppPaper
                        variant="outlined"
                        sx={{
                          p: {
                            xs: 2,
                            sm: 3,
                            md: 4,
                            lg: 5
                          },
                          borderColor: secondaryScale[6]
                        }}
                      >
                        <Stack spacing={0}>
                          {[
                            {
                              variant: 'h1' as const,
                              label: 'Heading 1',
                              description: 'Primary page-level heading.'
                            },
                            {
                              variant: 'h2' as const,
                              label: 'Heading 2',
                              description: 'Major section heading.'
                            },
                            {
                              variant: 'h3' as const,
                              label: 'Heading 3',
                              description: 'Secondary section heading.'
                            },
                            {
                              variant: 'h4' as const,
                              label: 'Heading 4',
                              description: 'Content group heading.'
                            },
                            {
                              variant: 'h5' as const,
                              label: 'Heading 5',
                              description: 'Smaller content heading.'
                            },
                            {
                              variant: 'h6' as const,
                              label: 'Heading 6',
                              description: 'Compact heading.'
                            }
                          ].map((item, index) => (
                            <React.Fragment key={item.variant}>
                              <Box
                                sx={{
                                  py: {
                                    xs: 2,
                                    sm: 2.5
                                  },
                                  display: 'grid',
                                  gridTemplateColumns: {
                                    xs: '1fr',
                                    md: '140px 1fr'
                                  },
                                  gap: {
                                    xs: 1,
                                    md: 3
                                  },
                                  alignItems: 'center'
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      display: 'block',
                                      color: secondaryScale[11],
                                      fontWeight: 700,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.08em'
                                    }}
                                  >
                                    {item.variant}
                                  </Typography>

                                  <Typography
                                    variant="small"
                                    sx={{
                                      display: {
                                        xs: 'none',
                                        md: 'block'
                                      },
                                      mt: 0.5,
                                      color: grayScale[11]
                                    }}
                                  >
                                    {item.description}
                                  </Typography>
                                </Box>

                                <Typography variant={item.variant}>
                                  {item.label}
                                </Typography>
                              </Box>

                              {index < 5 && <AppDivider />}
                            </React.Fragment>
                          ))}

                          <AppDivider sx={{ my: 2 }} />

                          {/* ---------------------------------------------------------- */}
                          {/* BODY / SUPPORTING TYPES                                    */}
                          {/* ---------------------------------------------------------- */}

                          <Stack spacing={3}>
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.75,
                                  color: secondaryScale[11],
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em'
                                }}
                              >
                                subtitle1
                              </Typography>

                              <Typography variant="subtitle1">
                                Supporting text for headings and sections.
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.75,
                                  color: secondaryScale[11],
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em'
                                }}
                              >
                                subtitle2
                              </Typography>

                              <Typography variant="subtitle2">
                                Smaller supporting text for secondary content.
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.75,
                                  color: secondaryScale[11],
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em'
                                }}
                              >
                                body1
                              </Typography>

                              <Typography variant="body1">
                                This is the primary body text used for normal
                                application content. It uses a comfortable line
                                height for longer reading and general interface
                                content.
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.75,
                                  color: secondaryScale[11],
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em'
                                }}
                              >
                                body2
                              </Typography>

                              <Typography variant="body2">
                                Smaller body text for secondary information,
                                descriptions, metadata, and supporting UI
                                content.
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.75,
                                  color: secondaryScale[11],
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em'
                                }}
                              >
                                button
                              </Typography>

                              <Typography variant="button">
                                BUTTON TYPOGRAPHY
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.75,
                                  color: secondaryScale[11],
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em'
                                }}
                              >
                                caption
                              </Typography>

                              <Typography variant="caption">
                                Small supporting information and metadata.
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.75,
                                  color: secondaryScale[11],
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em'
                                }}
                              >
                                overline
                              </Typography>

                              <Typography variant="overline">
                                OVERLINE LABEL
                              </Typography>
                            </Box>
                          </Stack>
                        </Stack>
                      </AppPaper>
                    </Stack>
                  </Box>

                  {/* ================================================================ */}
                  {/* CUSTOM TYPOGRAPHY                                                 */}
                  {/* ================================================================ */}

                  <Box id="typography-custom-typography">
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="sectionTitle" gutterBottom>
                          Custom Typography
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: grayScale[11]
                          }}
                        >
                          Purpose-built variants defined by the theme for
                          recurring application patterns and specialized
                          interface content.
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, minmax(0, 1fr))'
                          },
                          gap: 2
                        }}
                      >
                        {customTypography.map((item) => (
                          <AppPaper
                            key={item.variant}
                            variant="outlined"
                            sx={{
                              p: {
                                xs: 2.5,
                                sm: 3
                              },
                              height: '100%',
                              borderColor: secondaryScale[6],
                              transition:
                                'border-color 180ms ease, transform 180ms ease',
                              '&:hover': {
                                borderColor: secondaryScale[8],
                                transform: 'translateY(-2px)'
                              }
                            }}
                          >
                            <Stack spacing={2}>
                              {/* Variant metadata */}

                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                  minWidth: 0,
                                  alignItems: 'center'
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    flexShrink: 0,
                                    borderRadius: '50%',
                                    bgcolor: secondaryScale[8]
                                  }}
                                />

                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: secondaryScale[11],
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em'
                                  }}
                                >
                                  {item.variant}
                                </Typography>
                              </Stack>

                              {/* Preview */}

                              <Box
                                sx={{
                                  minHeight: 90,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Typography variant={item.variant}>
                                  {item.text}
                                </Typography>
                              </Box>

                              <AppDivider />

                              {/* Description */}

                              <Typography
                                variant="small"
                                sx={{
                                  color: grayScale[11],
                                  lineHeight: 1.6
                                }}
                              >
                                {item.description}
                              </Typography>
                            </Stack>
                          </AppPaper>
                        ))}
                      </Box>
                    </Stack>
                  </Box>

                  {/* ================================================================ */}
                  {/* USAGE                                                             */}
                  {/* ================================================================ */}

                  <Box id="typography-how-to-use-typography">
                    <TypographyUsageSection />
                  </Box>

                  {/* ================================================================ */}
                  {/* RESPONSIVE TYPOGRAPHY                                             */}
                  {/* ================================================================ */}

                  <Box id="typography-responsive-typography">
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="sectionTitle" gutterBottom>
                          Responsive Typography
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: grayScale[11]
                          }}
                        >
                          Typography uses CSS <code>clamp()</code> to scale
                          smoothly across viewport sizes without requiring
                          breakpoint-specific font sizes.
                        </Typography>
                      </Box>

                      <AppPaper
                        variant="outlined"
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          p: {
                            xs: 3,
                            sm: 4,
                            md: 6,
                            lg: 8,
                            xl: 10
                          },
                          borderColor: secondaryScale[6]
                        }}
                      >
                        {/* Decorative background */}

                        <Box
                          aria-hidden
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            opacity: 0.35,
                            background: `
                radial-gradient(
                  circle at 85% 15%,
                  ${secondaryScale[3]} 0,
                  transparent 32%
                )
              `
                          }}
                        />

                        <Stack
                          spacing={{
                            xs: 2,
                            md: 3
                          }}
                          sx={{
                            position: 'relative'
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: 'center' }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: secondaryScale[8]
                              }}
                            />

                            <Typography
                              variant="caption"
                              sx={{
                                color: secondaryScale[11],
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em'
                              }}
                            >
                              Fluid Type Scale
                            </Typography>
                          </Stack>

                          <Typography variant="display">
                            Resize the window
                          </Typography>

                          <Typography
                            variant="lead"
                            sx={{
                              color: secondaryScale[11]
                            }}
                          >
                            This heading and supporting text automatically scale
                            between their minimum and maximum sizes, creating a
                            smoother reading experience across phones, tablets,
                            laptops, and large displays.
                          </Typography>

                          <AppDivider sx={{ my: 1 }} />

                          <Stack
                            direction={{
                              xs: 'column',
                              sm: 'row'
                            }}
                            spacing={{
                              xs: 1.5,
                              sm: 4
                            }}
                          >
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.5,
                                  color: grayScale[11]
                                }}
                              >
                                Mobile
                              </Typography>

                              <Typography variant="small">
                                Compact scale
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.5,
                                  color: grayScale[11]
                                }}
                              >
                                Tablet
                              </Typography>

                              <Typography variant="small">
                                Intermediate scale
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mb: 0.5,
                                  color: grayScale[11]
                                }}
                              >
                                Desktop
                              </Typography>

                              <Typography variant="small">
                                Expanded scale
                              </Typography>
                            </Box>
                          </Stack>
                        </Stack>
                      </AppPaper>
                    </Stack>
                  </Box>
                </Stack>
              )}

              {/* ============================================================ */}
              {/* COLORS                                                        */}
              {/* ============================================================ */}

              {activeTab === 'colors' && (
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
                        <Typography variant="sectionTitle">
                          Color Relationship
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: grayScale[11]
                          }}
                        >
                          A semantic color system built around hierarchy,
                          contrast, and consistent visual roles. The system
                          combines primary accents, supporting colors, neutrals,
                          and application surfaces.
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
                                  The interface follows a 60 / 30 / 10 visual
                                  hierarchy to prevent accent colors from
                                  overwhelming the interface.
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
                          Each scale contains tonal steps that can be selected
                          according to contrast, emphasis, surface depth, and
                          semantic purpose.
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
                          Access the generated scales from the MUI theme instead
                          of hard-coding color values. This keeps components
                          consistent and makes global theme changes easier to
                          maintain.
                        </Typography>
                      </Box>

                      <Stack spacing={3}>
                        {/* PRIMARY */}

                        <ColorUsageCard
                          title="Primary / Color"
                          description={
                            <>
                              Use <code>colorScale</code> for important actions,
                              active states, links, selected elements, and
                              visual emphasis.
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
                              Use <code>secondaryScale</code> for supporting
                              surfaces, panels, borders, connections, decorative
                              elements, and secondary actions.
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
                              Use <code>grayScale</code> for neutral surfaces,
                              text, dividers, borders, disabled states, and
                              inactive controls.
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
                              application background, cards, dialogs, menus, and
                              layered surfaces.
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
                          A quick guide for choosing the correct scale when
                          building new components.
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
                            usage:
                              'Application backgrounds and dominant surfaces',
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
                            usage:
                              'Important actions, active states, and emphasis',
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
                          Examples of how the semantic color hierarchy
                          translates into real interface components.
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
                          Text colors use the neutral, secondary, and primary
                          scales to establish clear hierarchy, supporting
                          content, accent emphasis, and muted states.
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
                              Recommended text tokens for different levels of
                              emphasis.
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
                                Accent supporting — Lower-emphasis primary
                                content
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
                                Muted text — Disabled, inactive, or low-priority
                                content
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
              )}

              {/* ============================================================ */}
              {/* COMPONENT SHOWCASE                                           */}
              {/* ============================================================ */}

              {activeTab === 'components' && (
                <Stack
                  spacing={{ xs: 5, md: 8 }}
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
                  {/* PAGE HEADER                                                      */}
                  {/* ================================================================ */}

                  <Box>
                    <Stack>
                      <Typography
                        variant="overlineCustom"
                        sx={{
                          color: colorScale[9],
                          fontWeight: 700,
                          letterSpacing: '0.12em'
                        }}
                      >
                        COMPONENTS
                      </Typography>

                      <Typography variant="sectionTitle">
                        Component Showcase
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: grayScale[11],
                          maxWidth: 820,
                          lineHeight: 1.8
                        }}
                      >
                        A practical collection of interface components
                        demonstrating how typography, color scales, surfaces,
                        borders, spacing, states, and semantic colors work
                        together across the design system.
                      </Typography>
                    </Stack>
                  </Box>

                  {/* ================================================================ */}
                  {/* COMPONENT OVERVIEW                                                */}
                  {/* ================================================================ */}

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
                    {[
                      {
                        label: 'Feedback',
                        value: 'Alerts & Status',
                        description: 'Semantic messaging and state indicators.',
                        color: semanticColors.success
                      },
                      {
                        label: 'Navigation',
                        value: 'Tabs & Controls',
                        description: 'Navigation and preference interactions.',
                        color: colorScale[9]
                      },
                      {
                        label: 'Data',
                        value: 'Tables & Stats',
                        description: 'Structured information and metrics.',
                        color: secondaryScale[9]
                      },
                      {
                        label: 'Actions',
                        value: 'Buttons & Inputs',
                        description: 'Interactive controls and actions.',
                        color: semanticColors.warning
                      }
                    ].map((item) => (
                      <AppPaper
                        key={item.value}
                        variant="outlined"
                        sx={{
                          p: 2.5,
                          borderColor: secondaryScale[6],
                          backgroundColor: backgroundScale[3],
                          transition:
                            'transform 180ms ease, border-color 180ms ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            borderColor: item.color
                          }
                        }}
                      >
                        <Stack spacing={1}>
                          <Typography
                            variant="overlineCustom"
                            sx={{
                              color: item.color,
                              fontWeight: 700
                            }}
                          >
                            {item.label}
                          </Typography>

                          <Typography
                            variant="medium"
                            sx={{
                              fontWeight: 700
                            }}
                          >
                            {item.value}
                          </Typography>

                          <Typography
                            variant="small"
                            sx={{
                              color: grayScale[11],
                              lineHeight: 1.6
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Stack>
                      </AppPaper>
                    ))}
                  </Box>

                  {/* ================================================================ */}
                  {/* COMPONENT SECTIONS                                                */}
                  {/* ================================================================ */}

                  <Stack spacing={{ xs: 5, md: 6 }}>
                    {/* ============================================================ */}
                    {/* ALERTS                                                       */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Alerts"
                      description="Feedback messages using semantic color states."
                    >
                      <Stack spacing={2} id="components-alerts">
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

                    {/* ============================================================ */}
                    {/* STATUS                                                        */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Badges & Status"
                      description="Compact indicators for notifications, availability, and system state."
                    >
                      <Stack
                        id="components-status"
                        direction={{
                          xs: 'column',
                          sm: 'row'
                        }}
                        spacing={3}
                        sx={{
                          alignItems: {
                            xs: 'stretch',
                            sm: 'center'
                          },
                          flexWrap: 'wrap'
                        }}
                        useFlexGap
                      >
                        <AppBadge badgeContent={4} color="primary">
                          <AppPaper
                            variant="outlined"
                            sx={{
                              px: 2,
                              py: 1.5,
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
                              px: 2,
                              py: 1.5,
                              borderRadius: 2,
                              borderColor: secondaryScale[6]
                            }}
                          >
                            <Typography variant="small">Online</Typography>
                          </AppPaper>
                        </AppBadge>

                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            alignItems: 'center',
                            flexWrap: 'wrap'
                          }}
                          useFlexGap
                        >
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
                      </Stack>
                    </ShowcaseCard>

                    {/* ============================================================ */}
                    {/* PROGRESS                                                      */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Progress"
                      description="Progress indicators communicate completion, loading, and capacity."
                    >
                      <Stack spacing={4} id="components-progress">
                        <Box>
                          <Stack
                            direction="row"
                            sx={{
                              mb: 1.25,
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="small">
                              Uploading files
                            </Typography>

                            <Typography
                              variant="small"
                              sx={{
                                color: colorScale[11],
                                fontWeight: 700
                              }}
                            >
                              72%
                            </Typography>
                          </Stack>

                          <AppLinearProgress
                            variant="determinate"
                            value={72}
                            sx={{
                              height: 8,
                              borderRadius: 999
                            }}
                          />
                        </Box>

                        <Box>
                          <Stack
                            direction="row"
                            sx={{
                              mb: 1.25,
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="small">Storage</Typography>

                            <Typography
                              variant="small"
                              sx={{
                                color: secondaryScale[11],
                                fontWeight: 700
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
                              height: 8,
                              borderRadius: 999
                            }}
                          />
                        </Box>

                        <AppDivider />

                        <Stack
                          direction="row"
                          spacing={4}
                          sx={{
                            alignItems: 'center',
                            flexWrap: 'wrap'
                          }}
                          useFlexGap
                        >
                          <Stack spacing={1} sx={{ alignItems: 'center' }}>
                            <AppCircularProgress
                              variant="determinate"
                              value={25}
                              size={52}
                              thickness={5}
                            />

                            <Typography variant="small">25%</Typography>
                          </Stack>

                          <Stack spacing={1} sx={{ alignItems: 'center' }}>
                            <AppCircularProgress
                              variant="determinate"
                              value={65}
                              size={52}
                              thickness={5}
                              color="secondary"
                            />

                            <Typography variant="small">65%</Typography>
                          </Stack>

                          <Stack spacing={1} sx={{ alignItems: 'center' }}>
                            <CircularProgress
                              variant="determinate"
                              value={90}
                              size={52}
                              thickness={5}
                              sx={{
                                color: semanticColors.success
                              }}
                            />

                            <Typography variant="small">90%</Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </ShowcaseCard>

                    {/* ============================================================ */}
                    {/* NAVIGATION                                                    */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Navigation"
                      description="Tabs and segmented controls for switching between related views."
                    >
                      <Stack spacing={3} id="components-navigation">
                        <Box
                          sx={{
                            overflowX: 'auto',
                            '&::-webkit-scrollbar': {
                              height: 4
                            }
                          }}
                        >
                          <AppTabs
                            value={1}
                            sx={{
                              minWidth: 'max-content',
                              borderBottom: '1px solid',
                              borderColor: secondaryScale[6]
                            }}
                          >
                            <AppTab label="Overview" />
                            <AppTab label="Activity" />
                            <AppTab label="Settings" />
                            <AppTab label="Members" />
                          </AppTabs>
                        </Box>

                        <Stack
                          direction={{
                            xs: 'column',
                            sm: 'row'
                          }}
                          spacing={1}
                        >
                          <ToggleButtonGroup
                            exclusive
                            value="week"
                            size="small"
                            sx={{
                              width: {
                                xs: '100%',
                                sm: 'auto'
                              }
                            }}
                          >
                            <ToggleButton value="day">Day</ToggleButton>
                            <ToggleButton value="week">Week</ToggleButton>
                            <ToggleButton value="month">Month</ToggleButton>
                          </ToggleButtonGroup>
                        </Stack>
                      </Stack>
                    </ShowcaseCard>

                    {/* ============================================================ */}
                    {/* UPLOAD                                                        */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Upload"
                      description="A focused upload surface for drag-and-drop and browse actions."
                    >
                      <AppPaper
                        variant="outlined"
                        sx={{
                          minHeight: {
                            xs: 240,
                            md: 280
                          },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderStyle: 'dashed',
                          borderWidth: 2,
                          borderColor: secondaryScale[7],
                          borderRadius: 3,
                          backgroundColor: backgroundScale[3],
                          transition:
                            'border-color 180ms ease, background-color 180ms ease',
                          '&:hover': {
                            borderColor: colorScale[9],
                            backgroundColor: secondaryScale[2]
                          }
                        }}
                      >
                        <Stack
                          id="components-upload"
                          spacing={2.5}
                          sx={{
                            textAlign: 'center',
                            alignItems: 'center',
                            px: 3
                          }}
                        >
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 2.5,
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
                                mt: 0.75,
                                color: grayScale[11],
                                maxWidth: 420
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

                    {/* ============================================================ */}
                    {/* CARDS                                                         */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Cards"
                      description="Reusable content surfaces with hierarchy, actions, and interaction states."
                    >
                      <Box
                        id="components-cards"
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

                    {/* ============================================================ */}
                    {/* DATA TABLE                                                    */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Data Table"
                      description="Structured information with status, progress, and timestamps."
                    >
                      <TableContainer
                        id="components-data-table"
                        sx={{
                          overflowX: 'auto',
                          border: `1px solid ${secondaryScale[6]}`,
                          borderRadius: 2
                        }}
                      >
                        <Table
                          sx={{
                            minWidth: 680
                          }}
                        >
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
                              <TableRow
                                key={row.name}
                                hover
                                sx={{
                                  '&:last-child td': {
                                    borderBottom: 0
                                  }
                                }}
                              >
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
                                    minWidth: 180
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{
                                      alignItems: 'center'
                                    }}
                                  >
                                    <AppLinearProgress
                                      variant="determinate"
                                      value={row.progress}
                                      sx={{
                                        flex: 1,
                                        height: 6,
                                        borderRadius: 999
                                      }}
                                    />

                                    <Typography
                                      variant="small"
                                      sx={{
                                        minWidth: 38,
                                        color: grayScale[11],
                                        textAlign: 'right'
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
                                      color: grayScale[11],
                                      whiteSpace: 'nowrap'
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

                    {/* ============================================================ */}
                    {/* CONTROLS                                                      */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Controls"
                      description="Inputs and preference controls for adjusting application behavior."
                    >
                      <Stack spacing={4} id="components-controls">
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

                        <AppDivider />

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
                          <AppPaper
                            variant="outlined"
                            sx={{
                              p: 2,
                              borderColor: secondaryScale[6]
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={1.5}
                              sx={{
                                alignItems: 'center'
                              }}
                            >
                              <AppSwitch defaultChecked />

                              <Box>
                                <Typography
                                  variant="small"
                                  sx={{
                                    fontWeight: 700
                                  }}
                                >
                                  Notifications
                                </Typography>

                                <Typography
                                  variant="small"
                                  sx={{
                                    display: 'block',
                                    mt: 0.25,
                                    color: grayScale[11]
                                  }}
                                >
                                  Receive updates
                                </Typography>
                              </Box>
                            </Stack>
                          </AppPaper>

                          <AppPaper
                            variant="outlined"
                            sx={{
                              p: 2,
                              borderColor: secondaryScale[6]
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={1.5}
                              sx={{
                                alignItems: 'center'
                              }}
                            >
                              <AppSwitch />

                              <Box>
                                <Typography
                                  variant="small"
                                  sx={{
                                    fontWeight: 700
                                  }}
                                >
                                  Auto-save
                                </Typography>

                                <Typography
                                  variant="small"
                                  sx={{
                                    display: 'block',
                                    mt: 0.25,
                                    color: grayScale[11]
                                  }}
                                >
                                  Save changes automatically
                                </Typography>
                              </Box>
                            </Stack>
                          </AppPaper>

                          <AppPaper
                            variant="outlined"
                            sx={{
                              p: 2,
                              borderColor: secondaryScale[6]
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={1.5}
                              sx={{
                                alignItems: 'center'
                              }}
                            >
                              <AppCheckbox defaultChecked />

                              <Box>
                                <Typography
                                  variant="small"
                                  sx={{
                                    fontWeight: 700
                                  }}
                                >
                                  Remember me
                                </Typography>

                                <Typography
                                  variant="small"
                                  sx={{
                                    display: 'block',
                                    mt: 0.25,
                                    color: grayScale[11]
                                  }}
                                >
                                  Keep preferences saved
                                </Typography>
                              </Box>
                            </Stack>
                          </AppPaper>
                        </Box>

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

                    {/* ============================================================ */}
                    {/* STATISTICS                                                    */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Statistics"
                      description="Dashboard-style metrics showing value, change, and semantic context."
                    >
                      <Box
                        id="components-statistics"
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

                    {/* ============================================================ */}
                    {/* BUTTON STATES                                                 */}
                    {/* ============================================================ */}

                    <ShowcaseCard
                      title="Button States"
                      description="Primary, secondary, neutral, destructive, disabled, and icon actions."
                    >
                      <Stack spacing={3} id="components-button-states">
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            flexWrap: 'wrap'
                          }}
                          useFlexGap
                        >
                          <AppButton variant="contained">Primary</AppButton>

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
                            Ghost
                          </AppButton>

                          <AppButton variant="contained" color="error">
                            Delete
                          </AppButton>

                          <AppButton variant="contained" disabled>
                            Disabled
                          </AppButton>
                        </Stack>

                        <AppDivider />

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems: 'center',
                            flexWrap: 'wrap'
                          }}
                          useFlexGap
                        >
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
                                color: grayScale[11],
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

                  {/* ================================================================ */}
                  {/* COMPONENT PRINCIPLES                                             */}
                  {/* ================================================================ */}

                  <AppPaper
                    variant="outlined"
                    sx={{
                      p: {
                        xs: 2.5,
                        sm: 3,
                        md: 4
                      },
                      borderColor: secondaryScale[6],
                      backgroundColor: backgroundScale[3]
                    }}
                  >
                    <Stack spacing={3}>
                      <Box>
                        <Typography
                          variant="overlineCustom"
                          sx={{
                            color: secondaryScale[11],
                            fontWeight: 700
                          }}
                        >
                          DESIGN PRINCIPLES
                        </Typography>

                        <Typography
                          variant="h5"
                          sx={{
                            mt: 0.75
                          }}
                        >
                          Components should feel related
                        </Typography>
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          color: grayScale[11],
                          maxWidth: 850,
                          lineHeight: 1.8
                        }}
                      >
                        Components share the same visual language: consistent
                        spacing, semantic colors, typography hierarchy, surface
                        elevation, border treatment, and interaction states.
                        This keeps the interface predictable while allowing each
                        component to serve a distinct purpose.
                      </Typography>

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
                        {[
                          {
                            title: 'Consistent',
                            text: 'Shared tokens and spacing create visual rhythm.'
                          },
                          {
                            title: 'Semantic',
                            text: 'Color and states communicate meaning, not decoration.'
                          },
                          {
                            title: 'Composable',
                            text: 'Components can combine without breaking hierarchy.'
                          }
                        ].map((item) => (
                          <Box
                            key={item.title}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              backgroundColor: secondaryScale[2],
                              border: `1px solid ${secondaryScale[6]}`
                            }}
                          >
                            <Typography
                              variant="medium"
                              sx={{
                                fontWeight: 700
                              }}
                            >
                              {item.title}
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
                              {item.text}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Stack>
                  </AppPaper>
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
          </Grid>

          <Grid
            size={{ xs: 12, md: 2.05 }}
            sx={{
              minHeight: { md: '100vh' },
              paddingRight: 2.5
            }}
          >
            <Box
              sx={{
                position: { md: 'sticky' },
                top: 24,
                p: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                overflow: 'hidden',
                borderLeft: `2px solid ${secondaryScale[7]}`,
                backgroundColor: alpha(backgroundScale[4], 0.75),
                borderRadius: 2,

                border: `1px solid ${alpha(secondaryScale[7], 0.25)}`,

                boxShadow: `
                              0 10px 40px
                              ${alpha('#000000', 0.16)}
                            `,

                backdropFilter: 'blur(14px)'
              }}
            >
              <ThemeToggle />
            </Box>
          </Grid>
        </Grid>
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
          p: 2,
          pt: 0,
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
              p: 2,
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
        margin: 0.5,
        border: `2px solid ${theme.secondaryScale[6]}`,
        borderRadius: 2,
        backgroundColor: theme.secondaryScale[5]
      }}
    >
      {/* ================================================================== */}
      {/* COLOR                                                               */}
      {/* ================================================================== */}

      <Box
        sx={{
          height: large
            ? {
                xs: 120,
                sm: 120,
                md: 100
              }
            : {
                xs: 80,
                sm: 100,
                md: 100
              },
          backgroundColor: color,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderRadius: 2,
          border: `2px solid ${theme.secondaryScale[6]}`,
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
          minHeight: large ? 100 : 75
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
    <Box>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography
          variant="overlineCustom"
          sx={{
            color: theme.colorScale[9]
          }}
        >
          TYPOGRAPHY USAGE
        </Typography>

        <Typography variant="sectionTitle">How to Add Typography</Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.grayScale[11]
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
