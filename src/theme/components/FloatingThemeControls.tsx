'use client';

import * as React from 'react';

import { Box, Fab, Fade, IconButton, Tooltip } from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import PaletteIcon from '@mui/icons-material/Palette';
import CloseIcon from '@mui/icons-material/Close';

import ThemeToggle from '@/theme/ThemeToggle';

export default function FloatingThemeControls() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 16, sm: 24, xl: 32 },
        bottom: { xs: 16, sm: 24, xl: 32 },
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 1.5
      }}
    >
      {/* Controls */}
      <Fade in={open} unmountOnExit>
        <Box
          sx={{
            width: { xs: 'calc(100vw - 32px)', sm: 510 },
            p: 2,

            borderRadius: 2,
            border: `1px solid ${theme.secondaryScale[7]}`,

            backgroundColor: alpha(theme.backgroundScale[5], 0.9),

            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',

            boxSizing: 'border-box'
          }}
        >
          <ThemeToggle />
        </Box>
      </Fade>

      {/* FAB */}
      <Tooltip title={open ? 'Close theme controls' : 'Theme controls'}>
        <Fab
          size="medium"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close theme controls' : 'Open theme controls'}
          sx={{
            color: theme.secondaryScale[11],
            backgroundColor: theme.secondaryScale[8],

            border: `1px solid ${theme.secondaryScale[9]}`,

            transition:
              'transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease',

            '&:hover': {
              backgroundColor: theme.secondaryScale[9],
              transform: 'translateY(-2px)',
              boxShadow: `
                0 12px 30px ${alpha(theme.secondaryScale[9], 0.4)},
                0 4px 12px ${alpha(theme.secondaryScale[6], 0.3)}
              `
            },

            '&:active': {
              transform: 'scale(0.94)'
            },

            '& .MuiSvgIcon-root': {
              transition: 'transform 200ms ease'
            },

            ...(open && {
              '& .MuiSvgIcon-root': {
                transform: 'rotate(90deg)'
              }
            })
          }}
        >
          {open ? <CloseIcon /> : <PaletteIcon />}
        </Fab>
      </Tooltip>
    </Box>
  );
}
