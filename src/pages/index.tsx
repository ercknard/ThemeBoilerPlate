import Head from 'next/head';
import Image from 'next/image';
import { Box, Button, Stack, Typography } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '@/contexts/themeContext';
import ThemeToggle from '@/theme/ThemeToggle';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

export default function Home() {
  const theme = useTheme();

  const THEME_ICONS = {
    blue: '/static/images/logo-blue.png',
    purple: '/static/images/logo-purple.png',
    gold: '/static/images/logo-gold.png',
    green: '/static/images/logo-green.png'
  } as const;

  const { themeSet } = useThemeContext();
  const themeIcon = THEME_ICONS[themeSet];

  return (
    <>
      <Head>
        <title>BoilerPlate</title>
        <meta name="description" content="BoilerPlate" />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,

          background: ` radial-gradient( circle at top, ${theme.colorScale[3]}, ${theme.colorScale[7]} ), ${theme.backgroundScale[1]} `
        }}
      >
        <Stack
          spacing={3}
          sx={{
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {/* Image */}
          <Box
            sx={{
              width: { xs: 120, sm: 160 },
              height: { xs: 120, sm: 160 },
              position: 'relative'
            }}
          >
            <Image
              src={themeIcon}
              alt={`${themeSet} theme`}
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </Box>

          <Stack sx={{ mb: 3 }}>
            {/* Title */}
            <Typography variant="overlineCustom" color="primary">
              CryptechServices Theme System
            </Typography>
            <Typography variant="h3">THEME BOILERPLATE</Typography>
            <ThemeToggle />
          </Stack>

          {/* Links */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component="a"
              href="/theme"
              variant="contained"
              startIcon={<PaletteIcon />}
            >
              Theme
            </Button>

            <Button
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
