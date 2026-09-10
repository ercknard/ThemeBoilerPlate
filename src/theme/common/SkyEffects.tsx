'use client';

import { memo, useMemo } from 'react';

import { Box, GlobalStyles } from '@mui/material';

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

interface StarsProps {
  color: string;
}

const Stars = memo(({ color }: StarsProps) => {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        top: (i * 37.7) % 100,
        left: (i * 61.3) % 100,
        size: 1 + ((i * 17) % 15) / 10,
        delay: (i * 13) % 3,
        duration: 2 + ((i * 19) % 20) / 10
      })),
    []
  );

  return (
    <>
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: 'absolute',

            top: `${star.top}%`,
            left: `${star.left}%`,

            width: `${star.size}px`,
            height: `${star.size}px`,

            borderRadius: '50%',

            bgcolor: color,

            opacity: 0.9,

            boxShadow: `
              0 0 4px ${color},
              0 0 8px ${color}
            `,

            willChange: 'opacity, transform',

            animation: `
              twinkle
              ${star.duration}s
              ease-in-out
              ${star.delay}s
              infinite
              alternate
            `
          }}
        />
      ))}
    </>
  );
});

Stars.displayName = 'Stars';

interface SkyEffectsProps {
  color?: string;
}

export default function SkyEffects({ color = '#f6c945' }: SkyEffectsProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,

        overflow: 'hidden',

        pointerEvents: 'none',

        zIndex: 0,

        display: {
          xs: 'none',
          md: 'block'
        }
      }}
    >
      <Stars color={color} />

      <GlobalStyles
        styles={{
          '@keyframes twinkle': {
            '0%': {
              opacity: 0.15,
              transform: 'scale(0.8)'
            },

            '50%': {
              opacity: 1,
              transform: 'scale(1.3)'
            },

            '100%': {
              opacity: 0.3,
              transform: 'scale(0.9)'
            }
          }
        }}
      />
    </Box>
  );
}
