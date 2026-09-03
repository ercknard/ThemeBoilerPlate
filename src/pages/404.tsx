import { Box, Typography } from '@mui/material';

export default function Custom404() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '6rem',
          fontWeight: 'bold'
        }}
      >
        404
      </Typography>

      <Typography variant="h6" color="text.secondary">
        Page not found
      </Typography>
    </Box>
  );
}
