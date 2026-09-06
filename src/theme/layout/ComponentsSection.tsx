'use client';

import Head from 'next/head';
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { semanticColors, THEME_SETS } from '@/theme/theme';
import {
  AppAlert,
  AppChip,
  AppBadge,
  AppButton,
  AppCheckbox,
  AppCircularProgress,
  AppDivider,
  AppIconButton,
  AppLinearProgress,
  AppPaper,
  AppSwitch,
  AppTab,
  AppTabs,
  AppTooltip
} from '@/theme/components/CustomComponents';
import {
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  AutoAwesomeIcon,
  CheckCircleOutlineOutlinedIcon,
  CloudUploadOutlinedIcon,
  DownloadOutlinedIcon,
  ErrorOutlineOutlinedIcon,
  InfoOutlinedIcon,
  MoreHorizIcon,
  PauseIcon,
  PeopleIcon,
  PlayArrowIcon,
  WarningAmberOutlinedIcon
} from '@/theme/components/ShowcaseComponents';
import {
  SampleCard,
  ShowcaseCard,
  StatCard,
  StatusDot
} from '@/theme/components/ShowcaseComponents';
import { useThemeContext } from '@/contexts/themeContext';

export default function ComponentsSection() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();
  const colorScale = theme.colorScale;
  const secondaryScale = theme.secondaryScale;
  const grayScale = theme.grayScale;
  const backgroundScale = theme.backgroundScale;

  return (
    <>
      <Head>
        <title>
          BoilerPlate | Components | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>

        <meta
          name="description"
          content="A flexible MUI theme system with dynamic color scales, semantic surfaces, typography, and responsive components."
        />
      </Head>
      <Stack
        spacing={{ xs: 5, md: 8 }}
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
            lg: 8
          },
          pt: {
            xs: 4,
            md: 6,
            lg: 5
          }
        }}
      >
        {/* ================================================================ */}
        {/* PAGE HEADER                                                      */}
        {/* ================================================================ */}

        <Box>
          <Stack>
            <Typography
              variant="overlineCustom"
              sx={{
                color: colorScale[9],
                fontWeight: 700,
                letterSpacing: '0.12em'
              }}
            >
              COMPONENTS
            </Typography>

            <Typography variant="sectionTitle">Component Showcase</Typography>

            <Typography
              variant="body1"
              sx={{
                color: grayScale[11],
                maxWidth: 820,
                lineHeight: 1.8
              }}
            >
              A practical collection of interface components demonstrating how
              typography, color scales, surfaces, borders, spacing, states, and
              semantic colors work together across the design system.
            </Typography>
          </Stack>
        </Box>

        {/* ================================================================ */}
        {/* COMPONENT OVERVIEW                                                */}
        {/* ================================================================ */}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 2
          }}
        >
          {[
            {
              label: 'Feedback',
              value: 'Alerts & Status',
              description: 'Semantic messaging and state indicators.',
              color: semanticColors.success
            },
            {
              label: 'Navigation',
              value: 'Tabs & Controls',
              description: 'Navigation and preference interactions.',
              color: colorScale[9]
            },
            {
              label: 'Data',
              value: 'Tables & Stats',
              description: 'Structured information and metrics.',
              color: secondaryScale[9]
            },
            {
              label: 'Actions',
              value: 'Buttons & Inputs',
              description: 'Interactive controls and actions.',
              color: semanticColors.warning
            }
          ].map((item) => (
            <AppPaper
              key={item.value}
              variant="outlined"
              sx={{
                p: 2.5,
                borderColor: secondaryScale[6],
                backgroundColor: backgroundScale[3],
                transition: 'transform 180ms ease, border-color 180ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: item.color
                }
              }}
            >
              <Stack spacing={1}>
                <Typography
                  variant="overlineCustom"
                  sx={{
                    color: item.color,
                    fontWeight: 700
                  }}
                >
                  {item.label}
                </Typography>

                <Typography
                  variant="medium"
                  sx={{
                    fontWeight: 700
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  variant="small"
                  sx={{
                    color: grayScale[11],
                    lineHeight: 1.6
                  }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </AppPaper>
          ))}
        </Box>

        {/* ================================================================ */}
        {/* COMPONENT SECTIONS                                                */}
        {/* ================================================================ */}

        <Stack spacing={{ xs: 5, md: 6 }}>
          {/* ============================================================ */}
          {/* ALERTS                                                       */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Alerts"
            description="Feedback messages using semantic color states."
          >
            <Stack spacing={2} id="components-alerts">
              <AppAlert
                icon={<InfoOutlinedIcon />}
                severity="info"
                sx={{
                  border: '1px solid',
                  borderColor: secondaryScale[6]
                }}
              >
                Your account has been successfully updated.
              </AppAlert>

              <AppAlert
                icon={<CheckCircleOutlineOutlinedIcon />}
                severity="success"
                sx={{
                  border: '1px solid',
                  borderColor: semanticColors.success
                }}
              >
                Changes were saved successfully.
              </AppAlert>

              <AppAlert
                icon={<WarningAmberOutlinedIcon />}
                severity="warning"
                sx={{
                  border: '1px solid',
                  borderColor: semanticColors.warning
                }}
              >
                Your subscription will expire soon.
              </AppAlert>

              <AppAlert
                icon={<ErrorOutlineOutlinedIcon />}
                severity="error"
                sx={{
                  border: '1px solid',
                  borderColor: semanticColors.error
                }}
              >
                Something went wrong. Please try again.
              </AppAlert>
            </Stack>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* STATUS                                                        */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Badges & Status"
            description="Compact indicators for notifications, availability, and system state."
          >
            <Stack
              id="components-status"
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={3}
              sx={{
                alignItems: {
                  xs: 'stretch',
                  sm: 'center'
                },
                flexWrap: 'wrap'
              }}
              useFlexGap
            >
              <AppBadge badgeContent={4} color="primary">
                <AppPaper
                  variant="outlined"
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: secondaryScale[6]
                  }}
                >
                  <Typography variant="small">Notifications</Typography>
                </AppPaper>
              </AppBadge>

              <AppBadge variant="dot" color="success">
                <AppPaper
                  variant="outlined"
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: secondaryScale[6]
                  }}
                >
                  <Typography variant="small">Online</Typography>
                </AppPaper>
              </AppBadge>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
                useFlexGap
              >
                <StatusDot color={semanticColors.success} label="Online" />

                <StatusDot color={semanticColors.warning} label="Away" />

                <StatusDot color={semanticColors.error} label="Offline" />
              </Stack>
            </Stack>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* PROGRESS                                                      */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Progress"
            description="Progress indicators communicate completion, loading, and capacity."
          >
            <Stack spacing={4} id="components-progress">
              <Box>
                <Stack
                  direction="row"
                  sx={{
                    mb: 1.25,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="small">Uploading files</Typography>

                  <Typography
                    variant="small"
                    sx={{
                      color: colorScale[11],
                      fontWeight: 700
                    }}
                  >
                    72%
                  </Typography>
                </Stack>

                <AppLinearProgress
                  variant="determinate"
                  value={72}
                  sx={{
                    height: 8,
                    borderRadius: 999
                  }}
                />
              </Box>

              <Box>
                <Stack
                  direction="row"
                  sx={{
                    mb: 1.25,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="small">Storage</Typography>

                  <Typography
                    variant="small"
                    sx={{
                      color: secondaryScale[11],
                      fontWeight: 700
                    }}
                  >
                    42%
                  </Typography>
                </Stack>

                <AppLinearProgress
                  variant="determinate"
                  value={42}
                  color="secondary"
                  sx={{
                    height: 8,
                    borderRadius: 999
                  }}
                />
              </Box>

              <AppDivider />

              <Stack
                direction="row"
                spacing={4}
                sx={{
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
                useFlexGap
              >
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  <AppCircularProgress
                    variant="determinate"
                    value={25}
                    size={52}
                    thickness={5}
                  />

                  <Typography variant="small">25%</Typography>
                </Stack>

                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  <AppCircularProgress
                    variant="determinate"
                    value={65}
                    size={52}
                    thickness={5}
                    color="secondary"
                  />

                  <Typography variant="small">65%</Typography>
                </Stack>

                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  <CircularProgress
                    variant="determinate"
                    value={90}
                    size={52}
                    thickness={5}
                    sx={{
                      color: semanticColors.success
                    }}
                  />

                  <Typography variant="small">90%</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* NAVIGATION                                                    */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Navigation"
            description="Tabs and segmented controls for switching between related views."
          >
            <Stack spacing={3} id="components-navigation">
              <Box
                sx={{
                  overflowX: 'auto',
                  '&::-webkit-scrollbar': {
                    height: 4
                  }
                }}
              >
                <AppTabs
                  value={1}
                  sx={{
                    minWidth: 'max-content',
                    borderBottom: '1px solid',
                    borderColor: secondaryScale[6]
                  }}
                >
                  <AppTab label="Overview" />
                  <AppTab label="Activity" />
                  <AppTab label="Settings" />
                  <AppTab label="Members" />
                </AppTabs>
              </Box>

              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                spacing={1}
              >
                <ToggleButtonGroup
                  exclusive
                  value="week"
                  size="small"
                  sx={{
                    width: {
                      xs: '100%',
                      sm: 'auto'
                    }
                  }}
                >
                  <ToggleButton value="day">Day</ToggleButton>
                  <ToggleButton value="week">Week</ToggleButton>
                  <ToggleButton value="month">Month</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* UPLOAD                                                        */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Upload"
            description="A focused upload surface for drag-and-drop and browse actions."
          >
            <AppPaper
              variant="outlined"
              sx={{
                minHeight: {
                  xs: 240,
                  md: 280
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderStyle: 'dashed',
                borderWidth: 2,
                borderColor: secondaryScale[7],
                borderRadius: 3,
                backgroundColor: backgroundScale[3],
                transition:
                  'border-color 180ms ease, background-color 180ms ease',
                '&:hover': {
                  borderColor: colorScale[9],
                  backgroundColor: secondaryScale[2]
                }
              }}
            >
              <Stack
                id="components-upload"
                spacing={2.5}
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  px: 3
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: secondaryScale[3],
                    color: secondaryScale[11],
                    border: `1px solid ${secondaryScale[6]}`
                  }}
                >
                  <CloudUploadOutlinedIcon />
                </Box>

                <Box>
                  <Typography
                    variant="medium"
                    sx={{
                      fontWeight: 700
                    }}
                  >
                    Upload your files
                  </Typography>

                  <Typography
                    variant="small"
                    sx={{
                      display: 'block',
                      mt: 0.75,
                      color: grayScale[11],
                      maxWidth: 420
                    }}
                  >
                    Drag and drop files here or browse your computer.
                  </Typography>
                </Box>

                <AppButton
                  variant="outlined"
                  startIcon={<CloudUploadOutlinedIcon />}
                  color="secondary"
                >
                  Choose files
                </AppButton>
              </Stack>
            </AppPaper>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* CARDS                                                         */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Cards"
            description="Reusable content surfaces with hierarchy, actions, and interaction states."
          >
            <Box
              id="components-cards"
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)'
                },
                gap: 2
              }}
            >
              <SampleCard
                icon={<PlayArrowIcon />}
                title="Getting started"
                description="Learn the basics and set up your workspace."
                action="Start"
              />

              <SampleCard
                icon={<DownloadOutlinedIcon />}
                title="Resources"
                description="Download templates, assets, and documentation."
                action="Browse"
              />

              <SampleCard
                icon={<AutoAwesomeIcon />}
                title="Explore"
                description="Discover new features available in the platform."
                action="Explore"
              />
            </Box>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* DATA TABLE                                                    */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Data Table"
            description="Structured information with status, progress, and timestamps."
          >
            <TableContainer
              id="components-data-table"
              sx={{
                overflowX: 'auto',
                border: `1px solid ${secondaryScale[6]}`,
                borderRadius: 2
              }}
            >
              <Table
                sx={{
                  minWidth: 680
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell align="right">Updated</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {[
                    {
                      name: 'Arcana78',
                      status: 'Active',
                      progress: 86,
                      updated: '2 min ago'
                    },
                    {
                      name: 'Design System',
                      status: 'Active',
                      progress: 64,
                      updated: '12 min ago'
                    },
                    {
                      name: 'Website',
                      status: 'Review',
                      progress: 42,
                      updated: '1 hour ago'
                    },
                    {
                      name: 'Mobile App',
                      status: 'Draft',
                      progress: 18,
                      updated: '3 hours ago'
                    }
                  ].map((row) => (
                    <TableRow
                      key={row.name}
                      hover
                      sx={{
                        '&:last-child td': {
                          borderBottom: 0
                        }
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="small"
                          sx={{
                            fontWeight: 700
                          }}
                        >
                          {row.name}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <AppChip
                          size="small"
                          label={row.status}
                          color={
                            row.status === 'Active'
                              ? 'primary'
                              : row.status === 'Review'
                                ? 'secondary'
                                : 'default'
                          }
                        />
                      </TableCell>

                      <TableCell
                        sx={{
                          minWidth: 180
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          sx={{
                            alignItems: 'center'
                          }}
                        >
                          <AppLinearProgress
                            variant="determinate"
                            value={row.progress}
                            sx={{
                              flex: 1,
                              height: 6,
                              borderRadius: 999
                            }}
                          />

                          <Typography
                            variant="small"
                            sx={{
                              minWidth: 38,
                              color: grayScale[11],
                              textAlign: 'right'
                            }}
                          >
                            {row.progress}%
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="right">
                        <Typography
                          variant="small"
                          sx={{
                            color: grayScale[11],
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {row.updated}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* CONTROLS                                                      */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Controls"
            description="Inputs and preference controls for adjusting application behavior."
          >
            <Stack spacing={4} id="components-controls">
              <Box>
                <Typography
                  variant="label"
                  sx={{
                    display: 'block',
                    mb: 1
                  }}
                >
                  Volume
                </Typography>

                <Slider
                  defaultValue={65}
                  valueLabelDisplay="auto"
                  sx={{
                    color: colorScale[9]
                  }}
                />
              </Box>

              <AppDivider />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(3, 1fr)'
                  },
                  gap: 2
                }}
              >
                <AppPaper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor: secondaryScale[6]
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <AppSwitch defaultChecked />

                    <Box>
                      <Typography
                        variant="small"
                        sx={{
                          fontWeight: 700
                        }}
                      >
                        Notifications
                      </Typography>

                      <Typography
                        variant="small"
                        sx={{
                          display: 'block',
                          mt: 0.25,
                          color: grayScale[11]
                        }}
                      >
                        Receive updates
                      </Typography>
                    </Box>
                  </Stack>
                </AppPaper>

                <AppPaper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor: secondaryScale[6]
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <AppSwitch />

                    <Box>
                      <Typography
                        variant="small"
                        sx={{
                          fontWeight: 700
                        }}
                      >
                        Auto-save
                      </Typography>

                      <Typography
                        variant="small"
                        sx={{
                          display: 'block',
                          mt: 0.25,
                          color: grayScale[11]
                        }}
                      >
                        Save changes automatically
                      </Typography>
                    </Box>
                  </Stack>
                </AppPaper>

                <AppPaper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor: secondaryScale[6]
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <AppCheckbox defaultChecked />

                    <Box>
                      <Typography
                        variant="small"
                        sx={{
                          fontWeight: 700
                        }}
                      >
                        Remember me
                      </Typography>

                      <Typography
                        variant="small"
                        sx={{
                          display: 'block',
                          mt: 0.25,
                          color: grayScale[11]
                        }}
                      >
                        Keep preferences saved
                      </Typography>
                    </Box>
                  </Stack>
                </AppPaper>
              </Box>

              <Box>
                <Typography
                  variant="label"
                  sx={{
                    display: 'block',
                    mb: 1
                  }}
                >
                  Rating
                </Typography>

                <Rating
                  defaultValue={4}
                  sx={{
                    color: colorScale[9]
                  }}
                />
              </Box>
            </Stack>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* STATISTICS                                                    */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Statistics"
            description="Dashboard-style metrics showing value, change, and semantic context."
          >
            <Box
              id="components-statistics"
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)'
                },
                gap: 2
              }}
            >
              <StatCard
                title="Total users"
                value="24,892"
                change="+12.4%"
                positive
                icon={<PeopleIcon />}
              />

              <StatCard
                title="Revenue"
                value="$84,920"
                change="+8.2%"
                positive
                icon={<ArrowUpwardIcon />}
              />

              <StatCard
                title="Bounce rate"
                value="24.8%"
                change="-4.6%"
                positive
                icon={<ArrowDownwardIcon />}
              />

              <StatCard
                title="Pending"
                value="128"
                change="+18"
                icon={<WarningAmberOutlinedIcon />}
              />
            </Box>
          </ShowcaseCard>

          {/* ============================================================ */}
          {/* BUTTON STATES                                                 */}
          {/* ============================================================ */}

          <ShowcaseCard
            title="Button States"
            description="Primary, secondary, neutral, destructive, disabled, and icon actions."
          >
            <Stack spacing={3} id="components-button-states">
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: 'wrap'
                }}
                useFlexGap
              >
                <AppButton variant="contained">Primary</AppButton>

                <AppButton variant="outlined" color="secondary">
                  Secondary
                </AppButton>

                <AppButton
                  variant="text"
                  sx={{
                    color: grayScale[11],
                    '&:hover': {
                      backgroundColor: grayScale[3]
                    }
                  }}
                >
                  Ghost
                </AppButton>

                <AppButton variant="contained" color="error">
                  Delete
                </AppButton>

                <AppButton variant="contained" disabled>
                  Disabled
                </AppButton>
              </Stack>

              <AppDivider />

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
                useFlexGap
              >
                <AppTooltip title="Play">
                  <AppIconButton
                    sx={{
                      backgroundColor: colorScale[9],
                      color: colorScale.contrast,
                      '&:hover': {
                        backgroundColor: colorScale[10]
                      }
                    }}
                  >
                    <PlayArrowIcon />
                  </AppIconButton>
                </AppTooltip>

                <AppTooltip title="Pause">
                  <AppIconButton
                    sx={{
                      color: grayScale[11],
                      border: `1px solid ${secondaryScale[6]}`,
                      '&:hover': {
                        backgroundColor: secondaryScale[3]
                      }
                    }}
                  >
                    <PauseIcon />
                  </AppIconButton>
                </AppTooltip>

                <AppTooltip title="More">
                  <AppIconButton
                    sx={{
                      color: grayScale[11],
                      '&:hover': {
                        backgroundColor: grayScale[3]
                      }
                    }}
                  >
                    <MoreHorizIcon />
                  </AppIconButton>
                </AppTooltip>
              </Stack>
            </Stack>
          </ShowcaseCard>
        </Stack>

        {/* ================================================================ */}
        {/* COMPONENT PRINCIPLES                                             */}
        {/* ================================================================ */}

        <AppPaper
          variant="outlined"
          sx={{
            p: {
              xs: 2.5,
              sm: 3,
              md: 4
            },
            borderColor: secondaryScale[6],
            backgroundColor: backgroundScale[3]
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="overlineCustom"
                sx={{
                  color: secondaryScale[11],
                  fontWeight: 700
                }}
              >
                DESIGN PRINCIPLES
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mt: 0.75
                }}
              >
                Components should feel related
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: grayScale[11],
                maxWidth: 850,
                lineHeight: 1.8
              }}
            >
              Components share the same visual language: consistent spacing,
              semantic colors, typography hierarchy, surface elevation, border
              treatment, and interaction states. This keeps the interface
              predictable while allowing each component to serve a distinct
              purpose.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(3, 1fr)'
                },
                gap: 2
              }}
            >
              {[
                {
                  title: 'Consistent',
                  text: 'Shared tokens and spacing create visual rhythm.'
                },
                {
                  title: 'Semantic',
                  text: 'Color and states communicate meaning, not decoration.'
                },
                {
                  title: 'Composable',
                  text: 'Components can combine without breaking hierarchy.'
                }
              ].map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: secondaryScale[2],
                    border: `1px solid ${secondaryScale[6]}`
                  }}
                >
                  <Typography
                    variant="medium"
                    sx={{
                      fontWeight: 700
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="small"
                    sx={{
                      display: 'block',
                      mt: 0.75,
                      color: grayScale[11],
                      lineHeight: 1.6
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </AppPaper>
      </Stack>
    </>
  );
}
