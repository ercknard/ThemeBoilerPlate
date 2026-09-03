import Head from 'next/head';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import ThemeToggle from '@/theme/ThemeToggle';

const colorItems = [
  { name: 'Primary', color: 'primary.main' },
  { name: 'Secondary', color: 'secondary.main' },
  { name: 'Success', color: 'success.main' },
  { name: 'Warning', color: 'warning.main' },
  { name: 'Error', color: 'error.main' },
  { name: 'Info', color: 'info.main' }
] as const;

const customTypography = [
  {
    variant: 'display' as const,
    description: 'Large hero and landing-page text',
    text: 'Display Typography'
  },
  {
    variant: 'title' as const,
    description: 'Main page titles',
    text: 'Title Typography'
  },
  {
    variant: 'sectionTitle' as const,
    description: 'Section headings',
    text: 'Section Title Typography'
  },
  {
    variant: 'lead' as const,
    description: 'Introductory paragraphs',
    text: 'Lead Typography'
  },
  {
    variant: 'large' as const,
    description: 'Larger body text',
    text: 'Large Typography'
  },
  {
    variant: 'medium' as const,
    description: 'Default content text',
    text: 'Medium Typography'
  },
  {
    variant: 'small' as const,
    description: 'Secondary content',
    text: 'Small Typography'
  },
  {
    variant: 'label' as const,
    description: 'Form labels and UI labels',
    text: 'Label Typography'
  },
  {
    variant: 'overlineCustom' as const,
    description: 'Small uppercase category text',
    text: 'Overline Typography'
  },
  {
    variant: 'code' as const,
    description: 'Code and technical values',
    text: 'const value = "CryptechServices";'
  }
];

export default function TypographyShowcase() {
  return (
    <>
      <Head>
        <title>Typography & Colors</title>
        <meta
          name="description"
          content="Typography and color system showcase"
        />
      </Head>

      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
        <ThemeToggle />
      </Box>

      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          py: {
            xs: 4,
            sm: 6,
            md: 8,
            lg: 10
          }
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={{ xs: 5, md: 8 }}>
            {/* Header */}
            <Stack>
              <Typography variant="overlineCustom" color="primary">
                Design System
              </Typography>

              <Typography
                variant="display"
                sx={{
                  mt: 1
                }}
              >
                Typography & Colors
              </Typography>

              <Typography
                variant="lead"
                color="text.secondary"
                sx={{
                  maxWidth: 800,
                  mt: 2
                }}
              >
                A complete showcase of the typography variants, colors, spacing,
                and responsive behavior used throughout the application.
              </Typography>
            </Stack>

            <Divider />

            {/* Standard Typography */}
            <Box>
              <Typography variant="title" gutterBottom>
                Standard Typography
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                MUI's standard typography variants with responsive clamp sizing.
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack spacing={3}>
                  <Typography variant="h1">Heading 1</Typography>

                  <Typography variant="h2">Heading 2</Typography>

                  <Typography variant="h3">Heading 3</Typography>

                  <Typography variant="h4">Heading 4</Typography>

                  <Typography variant="h5">Heading 5</Typography>

                  <Typography variant="h6">Heading 6</Typography>

                  <Divider />

                  <Typography variant="subtitle1">
                    Subtitle 1 — Supporting text for headings and sections.
                  </Typography>

                  <Typography variant="subtitle2">
                    Subtitle 2 — Smaller supporting text.
                  </Typography>

                  <Typography variant="body1">
                    Body 1 — This is the primary body text used for normal
                    application content. It has a relaxed line height for
                    comfortable reading.
                  </Typography>

                  <Typography variant="body2">
                    Body 2 — Smaller body text for secondary information.
                  </Typography>

                  <Typography variant="button">Button Typography</Typography>

                  <Typography variant="caption">
                    Caption — Small supporting information.
                  </Typography>

                  <Typography variant="overline">OVERLINE</Typography>
                </Stack>
              </Paper>
            </Box>

            {/* Custom Typography */}
            <Box>
              <Typography variant="title" gutterBottom>
                Custom Typography
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                The 10 custom typography variants defined in the theme.
              </Typography>

              <Stack spacing={2}>
                {customTypography.map((item) => (
                  <Paper
                    key={item.variant}
                    variant="outlined"
                    sx={{
                      p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                      }
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mb: 1
                      }}
                    >
                      {item.variant}
                    </Typography>

                    <Typography variant={item.variant}>{item.text}</Typography>

                    <Typography
                      variant="small"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {item.description}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>

            {/* Colors */}
            <Box>
              <Typography variant="title" gutterBottom>
                Colors
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Theme colors available throughout the application.
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(6, 1fr)'
                  },
                  gap: 2
                }}
              >
                {colorItems.map((item) => (
                  <Paper
                    key={item.name}
                    variant="outlined"
                    sx={{
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        height: {
                          xs: 100,
                          md: 140
                        },
                        bgcolor: item.color
                      }}
                    />

                    <Box sx={{ p: 2 }}>
                      <Typography variant="label">{item.name}</Typography>

                      <Typography
                        variant="small"
                        color="text.secondary"
                        sx={{
                          display: 'block',
                          mt: 0.5
                        }}
                      >
                        {item.color}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>

            {/* Text Colors */}
            <Box>
              <Typography variant="title" gutterBottom>
                Text Colors
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack spacing={3}>
                  <Typography variant="h5">Primary Text</Typography>

                  <Typography variant="body1" color="text.primary">
                    text.primary — Main application content.
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    text.secondary — Supporting and less prominent content.
                  </Typography>

                  <Typography variant="body1" color="primary">
                    primary — Primary brand color.
                  </Typography>

                  <Typography variant="body1" color="secondary">
                    secondary — Secondary brand color.
                  </Typography>

                  <Typography variant="body1" color="success.main">
                    success.main — Successful actions and states.
                  </Typography>

                  <Typography variant="body1" color="warning.main">
                    warning.main — Warnings and attention states.
                  </Typography>

                  <Typography variant="body1" color="error.main">
                    error.main — Errors and destructive actions.
                  </Typography>

                  <Typography variant="body1" color="info.main">
                    info.main — Informational states.
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            {/* Components */}
            <Box>
              <Typography variant="title" gutterBottom>
                Components
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  }
                }}
              >
                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row'
                  }}
                  spacing={2}
                  sx={{
                    alignItems: {
                      xs: 'stretch',
                      sm: 'center'
                    }
                  }}
                >
                  <Button variant="contained">Primary</Button>

                  <Button variant="outlined">Secondary</Button>

                  <Button variant="text">Text Button</Button>

                  <Chip label="Primary" color="primary" />

                  <Chip label="Success" color="success" />

                  <Chip label="Warning" color="warning" />

                  <Chip label="Error" color="error" />
                </Stack>
              </Paper>
            </Box>

            {/* Responsive Showcase */}
            <Box>
              <Typography variant="title" gutterBottom>
                Responsive Typography
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                These headings use CSS clamp(), so they scale smoothly between
                mobile and large desktop screens.
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 6,
                    xl: 8
                  }
                }}
              >
                <Typography variant="display">Resize the window</Typography>

                <Typography
                  variant="lead"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  The typography automatically scales between its minimum and
                  maximum sizes without requiring additional breakpoints.
                </Typography>
              </Paper>
            </Box>

            {/* Footer */}
            <Divider />

            <Box>
              <Typography
                variant="small"
                sx={{
                  color: 'text.secondary',
                  align: 'center',
                  display: 'block'
                }}
              >
                CryptechServices Design System
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
