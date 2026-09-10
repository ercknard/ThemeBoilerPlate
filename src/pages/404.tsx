'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const theme = useTheme();
  const router = useRouter();

  const colorScale = theme.colorScale ?? [];
  const secondaryScale = theme.secondaryScale ?? [];
  const grayScale = theme.grayScale ?? [];
  const backgroundScale = theme.backgroundScale ?? [];

  const primary = colorScale[9] ?? theme.palette.primary.main;
  const secondary = secondaryScale[9] ?? theme.palette.secondary.main;
  const background = backgroundScale[5] ?? theme.palette.background.default;
  const gray = grayScale[9] ?? theme.palette.divider;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 8,
        background: `
          radial-gradient(
            circle at 50% 45%,
            ${alpha(primary, 0.14)} 0%,
            ${alpha(primary, 0.05)} 25%,
            transparent 55%
          ),
          ${background}
        `
      }}
    >
      {/* Background grid */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(
              ${alpha(gray, 0.12)} 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              ${alpha(gray, 0.12)} 1px,
              transparent 1px
            )
          `,
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(circle at center, black 0%, transparent 72%)'
        }}
      />

      {/* Outer glow */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          width: { xs: 280, md: 520 },
          height: { xs: 280, md: 520 },
          borderRadius: '50%',
          border: `1px solid ${alpha(primary, 0.14)}`,
          boxShadow: `
            0 0 80px ${alpha(primary, 0.08)},
            inset 0 0 80px ${alpha(primary, 0.05)}
          `,
          pointerEvents: 'none'
        }}
      />

      {/* Inner orbit */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          width: { xs: 190, md: 340 },
          height: { xs: 190, md: 340 },
          borderRadius: '50%',
          border: `1px dashed ${alpha(secondary, 0.18)}`,
          transform: 'rotate(18deg)',
          pointerEvents: 'none'
        }}
      />

      {/* Accent points */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '28%',
          left: '25%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: primary,
          boxShadow: `0 0 18px ${alpha(primary, 0.8)}`
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          right: '25%',
          bottom: '30%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: secondary,
          boxShadow: `0 0 14px ${alpha(secondary, 0.8)}`
        }}
      />

      {/* Main content */}
      <Stack
        spacing={3}
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          maxWidth: 720
        }}
      >
        {/* Error label */}
        <Typography
          component="span"
          sx={{
            px: 1.5,
            py: 0.6,
            borderRadius: 99,
            border: `1px solid ${alpha(primary, 0.25)}`,
            backgroundColor: alpha(primary, 0.06),
            color: primary,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase'
          }}
        >
          Error 404
        </Typography>

        {/* 404 */}
        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: 'clamp(7rem, 32vw, 10rem)',
              sm: 'clamp(9rem, 25vw, 13rem)',
              md: '13rem'
            },
            lineHeight: 0.78,
            fontWeight: 900,
            letterSpacing: '-0.08em',
            color: 'transparent',
            WebkitTextStroke: {
              xs: `1px ${alpha(primary, 0.7)}`,
              md: `2px ${alpha(primary, 0.7)}`
            },
            backgroundImage: `
              linear-gradient(
                180deg,
                ${primary} 0%,
                ${alpha(primary, 0.3)} 65%,
                transparent 100%
              )
            `,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            textShadow: `0 0 70px ${alpha(primary, 0.12)}`
          }}
        >
          404
        </Typography>

        {/* Message */}
        <Stack spacing={1}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.025em'
            }}
          >
            Page not found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 500,
              mx: 'auto',
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            The page you're looking for doesn't exist, has moved, or is no
            longer available.
          </Typography>
        </Stack>

        {/* Actions */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{ pt: 1 }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeOutlinedIcon />}
            onClick={() => router.push('/')}
            sx={{
              minWidth: 150,
              borderRadius: 2.5,
              px: 3,
              fontWeight: 700,
              boxShadow: `0 10px 30px ${alpha(primary, 0.18)}`
            }}
          >
            Back home
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => router.back()}
            sx={{
              minWidth: 150,
              borderRadius: 2.5,
              px: 3,
              fontWeight: 700
            }}
          >
            Go back
          </Button>
        </Stack>
      </Stack>

      {/* Footer */}
      <Typography
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 24,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: 'text.disabled',
          opacity: 0.5,
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}
      >
        Lost in the system
      </Typography>
    </Box>
  );
}
