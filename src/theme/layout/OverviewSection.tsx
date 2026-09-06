'use client';

import { Stack } from '@mui/material';
import OverviewTheme from '@/theme/layout/OverviewTheme';

export default function OverviewSection() {
  return (
    <Stack spacing={{ xs: 5, md: 8 }}>
      <OverviewTheme />
    </Stack>
  );
}
