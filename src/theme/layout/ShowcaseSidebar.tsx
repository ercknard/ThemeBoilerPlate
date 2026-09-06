'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { AppPaper } from '@/theme/components/CustomComponents';
import { THEME_SETS, THEME_ICONS } from '@/theme/theme';
import type { ThemeSetName } from '@/theme/theme';

export type ShowcaseTab = 'overview' | 'typography' | 'colors' | 'components';

export type MenuKey = ShowcaseTab;

interface Props {
  activeTab: ShowcaseTab;
  openMenus: Record<MenuKey, boolean>;
  setActiveTab: (tab: ShowcaseTab) => void;
  toggleMenu: (menu: MenuKey) => void;
  openMenuAndScroll: (menu: ShowcaseTab, sectionId: string) => void;
  themeSet: ThemeSetName;
}

export default function ShowcaseSidebar({
  activeTab,
  openMenus,
  setActiveTab,
  toggleMenu,
  openMenuAndScroll,
  themeSet
}: Props) {
  const theme = useTheme();

  const colorScale = theme.colorScale;
  const secondaryScale = theme.secondaryScale;
  const grayScale = theme.grayScale;
  const backgroundScale = theme.backgroundScale;

  const themeIcon = THEME_ICONS[themeSet];

  const menuItems = {
    overview: [
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
    ],

    typography: [
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
        id: 'typography-how-to-use-typography'
      },
      {
        label: 'Responsive Typography',
        id: 'typography-responsive-typography'
      }
    ],

    colors: [
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
    ],

    components: [
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
    ]
  };

  const menuIcons = {
    overview: DashboardOutlinedIcon,
    typography: TextFieldsOutlinedIcon,
    colors: ColorLensOutlinedIcon,
    components: WidgetsOutlinedIcon
  };

  const subMenuIcons = {
    overview: null,
    typography: FormatSizeOutlinedIcon,
    colors: PaletteOutlinedIcon,
    components: GridViewOutlinedIcon
  };

  const renderSubMenu = (menu: ShowcaseTab) => {
    if (!openMenus[menu]) {
      return null;
    }

    const items = menuItems[menu];
    const SubIcon = subMenuIcons[menu];

    return (
      <List
        disablePadding
        sx={{
          ml: 2.25,
          pl: 1,
          borderLeft: `1px solid ${alpha(secondaryScale[7], 0.5)}`,
          mb: 0.5
        }}
      >
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => openMenuAndScroll(menu, item.id)}
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
            {SubIcon && (
              <ListItemIcon
                sx={{
                  minWidth: 30,
                  color: secondaryScale[10]
                }}
              >
                <SubIcon fontSize="small" />
              </ListItemIcon>
            )}

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
    );
  };

  const renderMenu = (menu: ShowcaseTab) => {
    const Icon = menuIcons[menu];

    const labels: Record<ShowcaseTab, string> = {
      overview: 'Overview',
      typography: 'Typography',
      colors: 'Colors',
      components: 'Components'
    };

    const isActive = activeTab === menu;

    return (
      <Box key={menu}>
        <ListItemButton
          selected={isActive}
          onClick={() => {
            setActiveTab(menu);
            toggleMenu(menu);
          }}
          sx={{
            minHeight: 44,
            mb: 0.5,
            px: 1.25,
            borderRadius: 1.5,

            '& .MuiListItemIcon-root': {
              minWidth: 38,
              color: isActive ? colorScale[9] : secondaryScale[10]
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
            <Icon fontSize="small" />
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography
                variant="small"
                sx={{
                  fontWeight: isActive ? 700 : 500
                }}
              >
                {labels[menu]}
              </Typography>
            }
          />

          <ExpandMoreIcon
            fontSize="small"
            sx={{
              transform: openMenus[menu] ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
          />
        </ListItemButton>

        {renderSubMenu(menu)}
      </Box>
    );
  };

  return (
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
          p: {
            xs: 1,
            sm: 1.25
          },

          display: 'flex',
          flexDirection: 'column',

          overflow: 'hidden',

          borderRadius: 0,
          borderTop: 0,
          borderBottom: 0,
          borderLeft: 0,

          borderRight: `1px solid ${secondaryScale[7]}`,

          backgroundColor: alpha(backgroundScale[5], 0.75),

          boxSizing: 'border-box',

          boxShadow: `1px 0 0 ${alpha(secondaryScale[6], 0.35)}`,

          transition: 'background-color 180ms ease, border-color 180ms ease',

          '&:hover': {
            borderRightColor: secondaryScale[8]
          }
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            position: 'relative',
            zIndex: 2,
            pb: 1,
            alignItems: 'center',
            textAlign: 'center',
            borderBottom: `2px solid ${secondaryScale[7]}`
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              width: 60,
              height: 60,
              position: 'relative',
              display: 'block',
              flexShrink: 0,

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
              sizes="60px"
              style={{
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* Brand */}
          <Stack
            sx={{
              py: 1.75,
              mb: 1,
              alignItems: 'flex-start',
              textAlign: 'left',
              minWidth: 0
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

                lineHeight: 1.05,

                whiteSpace: 'nowrap',

                overflow: 'hidden',

                textOverflow: 'ellipsis',

                maxWidth: '100%',

                transition: 'opacity 0.2s ease',

                '&:hover': {
                  opacity: 0.75
                }
              }}
            >
              Theme BoilerPlate | {THEME_SETS[themeSet]?.label ?? 'Custom'}
            </Typography>
          </Stack>
        </Stack>

        {/* Navigation label */}
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

        {/* Navigation */}
        <List
          disablePadding
          sx={{
            px: 0.5,
            pl: 3,

            flex: 1,

            minHeight: 0,

            overflowY: 'auto',

            pr: 1.5,

            scrollbarWidth: 'thin',

            scrollbarColor: `${alpha(secondaryScale[9], 0.5)} transparent`,

            '&::-webkit-scrollbar': {
              width: 6
            },

            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },

            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(secondaryScale[9], 0.35),
              borderRadius: 999
            },

            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: alpha(secondaryScale[9], 0.6)
            }
          }}
        >
          {renderMenu('overview')}
          {renderMenu('typography')}
          {renderMenu('colors')}
          {renderMenu('components')}
        </List>

        {/* Footer */}
        <Box
          sx={{
            mt: 'auto',
            px: 1.25,
            pb: 1
          }}
        >
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
  );
}
