'use client';

import React from 'react';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
export { default as PlayArrowIcon } from '@mui/icons-material/PlayArrow';
export { default as DownloadOutlinedIcon } from '@mui/icons-material/DownloadOutlined';
export { default as AutoAwesomeIcon } from '@mui/icons-material/AutoAwesome';
export { default as ArrowUpwardIcon } from '@mui/icons-material/ArrowUpward';
export { default as ArrowDownwardIcon } from '@mui/icons-material/ArrowDownward';
export { default as PeopleIcon } from '@mui/icons-material/People';
export { default as WarningAmberOutlinedIcon } from '@mui/icons-material/WarningAmberOutlined';
export { default as PauseIcon } from '@mui/icons-material/Pause';
export { default as MoreHorizIcon } from '@mui/icons-material/MoreHoriz';
export { default as CloudUploadOutlinedIcon } from '@mui/icons-material/CloudUploadOutlined';
export { default as InfoOutlinedIcon } from '@mui/icons-material/InfoOutlined';
export { default as CheckCircleOutlineOutlinedIcon } from '@mui/icons-material/CheckCircleOutlineOutlined';
export { default as ErrorOutlineOutlinedIcon } from '@mui/icons-material/ErrorOutlineOutlined';
import {
  AppButton,
  AppChip,
  AppDivider,
  AppPaper,
  AppCard,
  AppTooltip
} from '@/theme/components/CustomComponents';
import { isLightColor, getScaleName } from '@/utils/color';
import type { ColorScale, ColorStep } from '@/utils/showcase-data';

export function ColorUsageCard({
  title,
  description,
  code,
  background,
  textColor,
  scale,
  steps
}: {
  title: string;
  description: React.ReactNode;
  code: string;
  background: string;
  textColor: string;
  scale: ColorScale;
  steps: number[];
}) {
  const theme = useTheme();

  return (
    <AppPaper
      variant="outlined"
      sx={{
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h5">{title}</Typography>

          <Typography
            variant="small"
            sx={{
              color: theme.grayScale[11]
            }}
          >
            {description}
          </Typography>
        </Stack>
      </Box>

      <Divider />

      <Box
        sx={{
          backgroundColor: theme.secondaryScale[3],
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2.5,
            borderRadius: 2,
            overflowX: 'auto',
            backgroundColor: background,
            color: textColor,
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            border: `1px solid ${theme.secondaryScale[6]}`
          }}
        >
          {code}
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: 2,
            flexWrap: 'wrap'
          }}
          useFlexGap
        >
          {steps.map((step) => (
            <Chip
              key={step}
              label={`${getScaleName(scale)}[${step}]`}
              sx={{
                backgroundColor: scale[step],
                color: isLightColor(scale[step]) ? '#000' : '#fff'
              }}
            />
          ))}
        </Stack>
      </Box>
    </AppPaper>
  );
}

/* ========================================================================== */
/* SCALE NAME                                                                 */
/* ========================================================================== */

/* ========================================================================== */
/* COLOR SCALE SECTION                                                        */
/* ========================================================================== */

export function ColorScaleSection({
  title,
  description,
  scale,
  colorName,
  semanticGroups
}: {
  title: string;
  description: string;
  scale: ColorScale;
  colorName: string;
  semanticGroups: {
    title: string;
    description: string;
    steps: ColorStep[];
  }[];
}) {
  const theme = useTheme();

  const isPrimary = colorName === 'Primary';
  const isSecondary = colorName === 'Secondary';
  const isGray = colorName === 'Gray';

  const sectionBorder = isSecondary
    ? theme.secondaryScale[7]
    : isGray
      ? theme.grayScale[6]
      : theme.secondaryScale[6];

  return (
    <AppPaper
      variant="outlined"
      sx={{
        overflow: 'hidden'
      }}
    >
      {/* ================================================================== */}
      {/* HEADER                                                              */}
      {/* ================================================================== */}

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Typography variant="h5">{title}</Typography>

            <Chip
              size="small"
              label={
                isPrimary
                  ? '10%'
                  : isSecondary
                    ? '30%'
                    : isGray
                      ? 'Neutral'
                      : '60%'
              }
              sx={{
                backgroundColor: isPrimary
                  ? theme.colorScale[3]
                  : isSecondary
                    ? theme.secondaryScale[3]
                    : isGray
                      ? theme.grayScale[3]
                      : theme.backgroundScale[3],

                color: isPrimary
                  ? theme.colorScale[11]
                  : isSecondary
                    ? theme.secondaryScale[11]
                    : isGray
                      ? theme.grayScale[11]
                      : theme.backgroundScale[11]
              }}
            />
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: theme.grayScale[11]
            }}
          >
            {description}
          </Typography>
        </Stack>
      </Box>

      {/* ================================================================== */}
      {/* FULL 1–12 SCALE                                                     */}
      {/* ================================================================== */}

      <Box
        sx={{
          p: 2,
          pt: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(3, 1fr)',
            sm: 'repeat(4, 1fr)',
            md: 'repeat(6, 1fr)',
            lg: 'repeat(12, 1fr)'
          }
        }}
      >
        {Array.from(
          {
            length: 12
          },
          (_, index) => index + 1
        ).map((step) => {
          const color = scale[step];

          return <ColorScaleItem key={step} step={step} color={color} />;
        })}
      </Box>

      <Divider />

      {/* ================================================================== */}
      {/* SEMANTIC GROUPS                                                     */}
      {/* ================================================================== */}

      {semanticGroups.map((group, groupIndex) => (
        <Box key={group.title}>
          {groupIndex > 0 && <Divider />}

          <Box
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4
              },
              pb: {
                xs: 2,
                sm: 2,
                md: 3
              }
            }}
          >
            <Typography variant="h5">{group.title}</Typography>

            <Typography
              variant="small"
              sx={{
                mt: 0.5,
                display: 'block',
                color: theme.grayScale[11]
              }}
            >
              {group.description}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              backgroundColor: theme.secondaryScale[3],
              display: 'grid',
              gridTemplateColumns: {
                xs:
                  group.steps.length === 2
                    ? 'repeat(2, 1fr)'
                    : 'repeat(3, 1fr)',
                sm: `repeat(${group.steps.length}, 1fr)`
              }
            }}
          >
            {group.steps.map((item) => {
              const color = scale[item.step];

              return (
                <ColorScaleItem
                  key={item.step}
                  step={item.step}
                  title={item.title}
                  description={item.description}
                  color={color}
                  large
                />
              );
            })}
          </Box>
        </Box>
      ))}

      {/* ================================================================== */}
      {/* SEMANTIC TOKENS                                                     */}
      {/* ================================================================== */}

      <Divider />

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Typography variant="h5">Semantic Tokens</Typography>

        <Typography
          variant="small"
          sx={{
            mt: 0.5,
            mb: 3,
            display: 'block',
            color: theme.grayScale[11]
          }}
        >
          Additional semantic aliases generated from the{' '}
          {colorName.toLowerCase()} scale.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(4, 1fr)'
            },
            gap: 2
          }}
        >
          {[
            {
              name: 'surface',
              color: scale.surface
            },
            {
              name: 'indicator',
              color: scale.indicator
            },
            {
              name: 'track',
              color: scale.track
            },
            {
              name: 'contrast',
              color: scale.contrast
            }
          ].map((item) => (
            <Box
              key={item.name}
              sx={{
                border: `1px solid ${theme.secondaryScale[6]}`,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  height: 90,
                  backgroundColor: item.color,
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 1.5
                }}
              >
                <Typography
                  sx={{
                    color:
                      item.color && isLightColor(item.color) ? '#000' : '#fff',
                    fontWeight: 700
                  }}
                >
                  {item.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.5,
                  backgroundColor: theme.backgroundScale[1]
                }}
              >
                <Typography
                  variant="code"
                  sx={{
                    wordBreak: 'break-all',
                    color: theme.grayScale[11]
                  }}
                >
                  {item.color}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </AppPaper>
  );
}

/* ========================================================================== */
/* COLOR SCALE ITEM                                                           */
/* ========================================================================== */

export function ColorScaleItem({
  step,
  color,
  title,
  description,
  large = false
}: {
  step: number;
  color: string;
  title?: string;
  description?: string;
  large?: boolean;
}) {
  const theme = useTheme();
  const useLightText = !isLightColor(color);

  return (
    <Box
      sx={{
        minWidth: 0,
        margin: 0.5,
        border: `2px solid ${theme.secondaryScale[6]}`,
        borderRadius: 2,
        backgroundColor: theme.secondaryScale[5]
      }}
    >
      {/* ================================================================== */}
      {/* COLOR                                                               */}
      {/* ================================================================== */}

      <Box
        sx={{
          height: large
            ? {
                xs: 120,
                sm: 120,
                md: 100
              }
            : {
                xs: 80,
                sm: 100,
                md: 100
              },
          backgroundColor: color,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderRadius: 2,
          border: `2px solid ${theme.secondaryScale[6]}`,
          p: {
            xs: 1.5,
            sm: 2
          }
        }}
      >
        <Typography
          sx={{
            color: useLightText ? '#fff' : '#000',
            fontSize: {
              xs: large ? '1.5rem' : '1rem',
              sm: large ? '2rem' : '1.25rem'
            },
            fontWeight: 700
          }}
        >
          {step}
        </Typography>
      </Box>

      {/* ================================================================== */}
      {/* INFORMATION                                                         */}
      {/* ================================================================== */}

      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2
          },
          minHeight: large ? 100 : 75
        }}
      >
        <Typography
          variant="label"
          sx={{
            display: 'block'
          }}
        >
          {title ?? `Step ${step}`}
        </Typography>

        {description && (
          <Typography
            variant="small"
            sx={{
              display: 'block',
              mt: 0.5,
              lineHeight: 1.4,
              color: theme.grayScale[11]
            }}
          >
            {description}
          </Typography>
        )}

        <Typography
          variant="code"
          sx={{
            display: 'block',
            mt: 1,
            fontSize: {
              xs: '0.6rem',
              sm: '0.7rem'
            },
            wordBreak: 'break-all',
            color: theme.grayScale[11]
          }}
        >
          {color}
        </Typography>
      </Box>
    </Box>
  );
}

/* ========================================================================== */
/* COLOR CONTRAST                                                             */
/* ========================================================================== */

/* ========================================================================== */
/* SHOWCASE CARD                                                              */
/* ========================================================================== */

export function ShowcaseCard({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <AppPaper
      variant="outlined"
      sx={{
        overflow: 'hidden',
        borderColor: theme.secondaryScale[6]
      }}
    >
      <Box
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4
          },
          py: 2.5
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="small"
          sx={{
            display: 'block',
            mt: 0.5,
            color: theme.grayScale[11]
          }}
        >
          {description}
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          },
          backgroundColor: theme.secondaryScale[3]
        }}
      >
        {children}
      </Box>
    </AppPaper>
  );
}

/* ========================================================================== */
/* STATUS DOT                                                                 */
/* ========================================================================== */

export function StatusDot({ color, label }: { color: string; label: string }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: 9,
          height: 9,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 0 3px ${color}22`
        }}
      />

      <Typography variant="small">{label}</Typography>
    </Stack>
  );
}

/* ========================================================================== */
/* SAMPLE CARD                                                                */
/* ========================================================================== */

export function SampleCard({
  icon,
  title,
  description,
  action
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  const theme = useTheme();

  return (
    <AppCard
      sx={{
        p: 2.5,
        borderRadius: 2,

        borderColor: theme.secondaryScale[6],
        transition: 'all 0.2s ease',

        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderColor: theme.secondaryScale[9]
        }
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.secondaryScale[3],
            color: theme.secondaryScale[11],
            border: `1px solid ${theme.secondaryScale[6]}`
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            variant="medium"
            sx={{
              fontWeight: 700
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="small"
            sx={{
              display: 'block',
              mt: 0.75,
              lineHeight: 1.5,
              color: theme.grayScale[11]
            }}
          >
            {description}
          </Typography>
        </Box>

        <Button
          variant="text"
          sx={{
            alignSelf: 'flex-start',
            px: 0,
            color: theme.colorScale[11]
          }}
        >
          {action} →
        </Button>
      </Stack>
    </AppCard>
  );
}

/* ========================================================================== */
/* STAT CARD                                                                  */
/* ========================================================================== */

export function StatCard({
  title,
  value,
  change,
  positive = false,
  icon
}: {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <AppCard
      sx={{
        p: 2.5,
        borderRadius: 2,

        borderColor: theme.secondaryScale[6]
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="small"
            sx={{
              color: theme.grayScale[11]
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.secondaryScale[3],
              color: theme.secondaryScale[11],
              border: `1px solid ${theme.secondaryScale[6]}`
            }}
          >
            {icon}
          </Box>
        </Stack>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="small"
          sx={{
            color: positive ? 'success.main' : 'warning.main'
          }}
        >
          {change} from last month
        </Typography>
      </Stack>
    </AppCard>
  );
}

/* ========================================================================== */
/* HOW TO ADD TYPOGRAPHY                                                      */
/* ========================================================================== */

export function TypographyUsageSection() {
  const theme = useTheme();

  const typographySamples = [
    {
      name: 'Display',
      variant: 'display' as const,
      description: 'Large page-level headings and hero titles.',
      code: `<Typography variant="display">
  Your main heading
</Typography>`
    },
    {
      name: 'Title',
      variant: 'title' as const,
      description: 'Primary section or page titles.',
      code: `<Typography variant="title">
  Section title
</Typography>`
    },
    {
      name: 'Section Title',
      variant: 'sectionTitle' as const,
      description: 'Subsection headings inside a page.',
      code: `<Typography variant="sectionTitle">
  Section heading
</Typography>`
    },
    {
      name: 'Lead',
      variant: 'lead' as const,
      description: 'Introductory or supporting text.',
      code: `<Typography variant="lead">
  Supporting description text
</Typography>`
    },
    {
      name: 'Large',
      variant: 'large' as const,
      description: 'Larger body text for important content.',
      code: `<Typography variant="large">
  Large body text
</Typography>`
    },
    {
      name: 'Medium',
      variant: 'medium' as const,
      description: 'Standard emphasized body content.',
      code: `<Typography variant="medium">
  Medium body text
</Typography>`
    },
    {
      name: 'Small',
      variant: 'small' as const,
      description: 'Compact supporting text.',
      code: `<Typography variant="small">
  Small supporting text
</Typography>`
    },
    {
      name: 'Label',
      variant: 'label' as const,
      description: 'Form labels, metadata, and UI labels.',
      code: `<Typography variant="label">
  Label text
</Typography>`
    },
    {
      name: 'Overline',
      variant: 'overlineCustom' as const,
      description: 'Categories, eyebrow text, and small headings.',
      code: `<Typography variant="overlineCustom">
  CATEGORY
</Typography>`
    },
    {
      name: 'Code',
      variant: 'code' as const,
      description: 'Technical values, commands, and code snippets.',
      code: `<Typography variant="code">
  npm install @mui/material
</Typography>`
    }
  ];

  return (
    <Box>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography
          variant="overlineCustom"
          sx={{
            color: theme.colorScale[9]
          }}
        >
          TYPOGRAPHY USAGE
        </Typography>

        <Typography variant="sectionTitle">How to Add Typography</Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.grayScale[11]
          }}
        >
          Use the predefined typography variants directly with MUI&apos;s
          Typography component. The theme handles font size, weight, line
          height, and responsive behavior for you.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {typographySamples.map((sample) => (
          <AppPaper
            key={sample.name}
            variant="outlined"
            sx={{
              borderColor: theme.secondaryScale[6]
            }}
          >
            <Stack>
              {/* Header */}

              <Stack
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                spacing={2}
                sx={{
                  p: {
                    xs: 2,
                    md: 3
                  },
                  justifyContent: 'space-between',
                  alignItems: {
                    xs: 'flex-start',
                    md: 'center'
                  }
                }}
              >
                <Stack>
                  <Typography variant="h5">{sample.name}</Typography>

                  <Typography
                    variant="small"
                    sx={{
                      mt: 0.5,
                      color: theme.grayScale[11]
                    }}
                  >
                    {sample.description}
                  </Typography>
                </Stack>

                <Chip
                  size="small"
                  label={`variant="${sample.variant}"`}
                  sx={{
                    fontFamily: 'monospace',
                    backgroundColor: theme.secondaryScale[3],
                    color: theme.secondaryScale[11],
                    border: `1px solid ${theme.secondaryScale[6]}`
                  }}
                />
              </Stack>

              <Divider />

              {/* Live preview */}

              <Stack
                spacing={2}
                sx={{ p: 3, backgroundColor: theme.secondaryScale[3] }}
              >
                <Box
                  sx={{
                    p: {
                      xs: 2,
                      md: 3
                    },
                    borderRadius: 2,
                    bgcolor: theme.backgroundScale[1],
                    border: `1px solid ${theme.secondaryScale[6]}`
                  }}
                >
                  <Typography variant={sample.variant}>
                    The quick brown fox jumps over the lazy dog.
                  </Typography>
                </Box>

                {/* Code */}

                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 2,
                    overflowX: 'auto',
                    borderRadius: 2,
                    bgcolor: theme.grayScale[2],
                    color: theme.grayScale[12],
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    lineHeight: 1.7,
                    border: `1px solid ${theme.grayScale[6]}`
                  }}
                >
                  <code>{sample.code}</code>
                </Box>
              </Stack>
            </Stack>
          </AppPaper>
        ))}
      </Stack>
    </Box>
  );
}
