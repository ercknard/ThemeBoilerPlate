import Head from 'next/head';
import { Box, Typography } from '@mui/material';

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
          justifyContent: 'center'
        }}
      >
        <Typography variant="h3">BoilerPlate</Typography>
      </Box>
    </>
  );
}
