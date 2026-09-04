import Head from 'next/head';
import Image from 'next/image';
import { Box, Button, Stack, Typography } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2
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
              src="/static/images/favicon.png"
              alt="BoilerPlate"
              fill
              priority
              style={{
                objectFit: 'contain'
              }}
            />
          </Box>

          <Stack spacing={2} sx={{ mb: 3 }}>
            {/* Title */}
            <Typography variant="overlineCustom" color="primary">
              CryptechServices Theme System
            </Typography>
            <Typography variant="h3">THEME BOILERPLATE</Typography>
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
