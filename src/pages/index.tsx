import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography
} from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';

import ThemeToggle from '@/theme/ThemeToggle';

const GITHUB_URL = 'https://github.com/ercknard/ThemeBoilerPlate';

export default function Home() {
  return (
    <>
      <Head>
        <title>BoilerPlate</title>
        <meta name="description" content="BoilerPlate" />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          px: { xs: 2, sm: 4 },
          py: { xs: 4, md: 8 }
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mx: 'auto'
          }}
        >
          {/* Theme controls */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mb: 6
            }}
          >
            <ThemeToggle />
          </Box>

          {/* Hero */}
          <Stack spacing={2} sx={{ mb: 6 }}>
            <Typography variant="overlineCustom" color="primary">
              CryptechServices Theme System
            </Typography>

            <Typography variant="display">Theme BoilerPlate</Typography>

            <Typography
              variant="lead"
              color="text.secondary"
              sx={{ maxWidth: 700 }}
            >
              A dynamic theme powered by custom color, gray, and background
              scales.
            </Typography>

            {/* Navigation links */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                pt: 2,
                flexWrap: 'wrap'
              }}
              useFlexGap
            >
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

          <Divider sx={{ mb: 5 }} />

          {/* Theme preview */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {/* Primary */}
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="sectionTitle">Color</Typography>

                  <Typography color="text.secondary">
                    Your custom primary color scale.
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: 'wrap' }}
                    useFlexGap
                  >
                    <Chip label="Primary" color="primary" />

                    <Button variant="contained">Button</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Gray */}
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="sectionTitle">Gray</Typography>

                  <Typography color="text.secondary">
                    Your custom neutral and text scale.
                  </Typography>

                  <Stack spacing={1}>
                    <Typography>Primary text</Typography>

                    <Typography color="text.secondary">
                      Secondary text
                    </Typography>

                    <Typography color="text.disabled">Disabled text</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Background */}
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="sectionTitle">Background</Typography>

                  <Typography color="text.secondary">
                    Your custom background scale.
                  </Typography>

                  <Box
                    sx={{
                      height: 80,
                      borderRadius: 2,
                      bgcolor: 'background.default',
                      border: 1,
                      borderColor: 'divider'
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Color samples */}
          <Box sx={{ mt: 5 }}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Typography variant="sectionTitle">Theme Samples</Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ flexWrap: 'wrap' }}
                    useFlexGap
                  >
                    <Button variant="contained">Contained</Button>

                    <Button variant="outlined">Outlined</Button>

                    <Button variant="text">Text</Button>

                    <Chip label="Primary" color="primary" />
                    <Chip label="Success" color="success" />
                    <Chip label="Warning" color="warning" />
                    <Chip label="Error" color="error" />
                    <Chip label="Info" color="info" />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Footer */}
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
                    color: 'text.secondary'
                  }}
                >
                  CryptechServices Design System
                </Typography>

                <Typography variant="small" color="text.disabled">
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
        </Box>
      </Box>
    </>
  );
}
