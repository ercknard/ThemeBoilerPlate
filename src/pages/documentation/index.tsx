'use client';

import Head from 'next/head';
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import { useState } from 'react';

import { useThemeContext } from '@/contexts/themeContext';
import { THEME_SETS, type ThemeSetName } from '@/theme/theme';
import ThemeToggle from '@/theme/ThemeToggle';
import { AppPaper } from '@/theme/components/CustomComponents';
import OverviewSection from '@/theme/layout/OverviewSection';
import TypographySection from '@/theme/layout/TypographySection';
import ColorsSection from '@/theme/layout/ColorsSection';
import ComponentsSection from '@/theme/layout/ComponentsSection';
import ShowcaseSidebar, {
  type MenuKey,
  type ShowcaseTab
} from '@/theme/layout/ShowcaseSidebar';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

export default function TypographyShowcase() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('overview');
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [openMenus, setOpenMenus] = useState<Record<MenuKey, boolean>>({
    overview: false,
    typography: false,
    colors: false,
    components: false
  });

  const { themeSet } = useThemeContext();

  const toggleMenu = (menu: MenuKey) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
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
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  };

  return (
    <>
      <Head>
        <title>
          Typography & Colors | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>
        <meta
          name="description"
          content="Typography and color system showcase"
        />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          background: alpha(theme.backgroundScale[4], 0.75),
          color: 'text.primary'
        }}
      >
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
            sx={{ display: 'flex', alignItems: 'flex-start' }}
          >
            {!isMobile && (
              <Box
                sx={{
                  width: '100%',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1200,
                  height: '100vh',
                  maxHeight: '100vh'
                }}
              >
                <ShowcaseSidebar
                  activeTab={activeTab}
                  openMenus={openMenus}
                  setActiveTab={setActiveTab}
                  toggleMenu={toggleMenu}
                  openMenuAndScroll={openMenuAndScroll}
                  themeSet={themeSet}
                />
              </Box>
            )}
          </Grid>

          <Grid
            size={{ xs: 12, xl: 7.4, xxxxl: 7.15 }}
            sx={{ minHeight: { md: '100vh' }, py: 5 }}
          >
            <Stack spacing={{ xs: 5, md: 3 }}>
              <Stack>
                <Typography
                  variant="overlineCustom"
                  sx={{ color: theme.colorScale[9] }}
                >
                  Design System
                </Typography>
                <Typography variant="title" sx={{ mt: 1 }}>
                  Typography & Colors
                </Typography>
                <Typography
                  variant="large"
                  sx={{ color: theme.grayScale[11], mt: 2, mb: 2 }}
                >
                  A complete showcase of the typography variants, semantic color
                  scales, spacing, components, and responsive behavior used
                  throughout the application.
                </Typography>
                <Divider />
              </Stack>

              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  position: 'sticky',
                  top: 0,
                  zIndex: 100,
                  py: 1.5
                }}
              >
                {/* Keep the mobile tabs in the page shell; navigation content is shared with the desktop sidebar. */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ width: '100%', overflowX: 'auto' }}
                >
                  {(
                    [
                      'overview',
                      'typography',
                      'colors',
                      'components'
                    ] as ShowcaseTab[]
                  ).map((tab) => (
                    <Button
                      key={tab}
                      size="small"
                      variant={activeTab === tab ? 'contained' : 'text'}
                      onClick={() => setActiveTab(tab)}
                      sx={{ flexShrink: 0 }}
                    >
                      {tab[0].toUpperCase() + tab.slice(1)}
                    </Button>
                  ))}
                </Stack>
              </Box>

              {activeTab === 'overview' && <OverviewSection />}
              {activeTab === 'typography' && <TypographySection />}
              {activeTab === 'colors' && <ColorsSection />}
              {activeTab === 'components' && <ComponentsSection />}

              <Box sx={{ mt: '3rem' }}>
                <Divider />
                <Box
                  sx={{ mt: '3rem', display: 'flex', justifyContent: 'center' }}
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
                      sx={{ color: theme.grayScale[11] }}
                    >
                      CryptechServices Design System
                    </Typography>
                    <Typography
                      variant="small"
                      sx={{ color: theme.grayScale[8] }}
                    >
                      •
                    </Typography>
                    <Button
                      component="a"
                      href="/documentation"
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
            size={{ xs: 12, xl: 2.1, xxxxl: 2.35 }}
            sx={{ minHeight: { md: '100vh' }, paddingRight: 2.5 }}
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
                borderRadius: 2,
                border: `1px solid ${theme.secondaryScale[7]}`,
                backgroundColor: alpha(theme.backgroundScale[5], 0.75),
                boxSizing: 'border-box',
                boxShadow: `1px 0 0 ${alpha(theme.secondaryScale[6], 0.35)}`,
                transition:
                  'background-color 180ms ease, border-color 180ms ease',
                '&:hover': { borderColor: theme.secondaryScale[8] }
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
