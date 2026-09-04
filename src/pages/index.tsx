import Head from 'next/head';
import Image from 'next/image';

import { Box, Stack, Typography } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '@/contexts/themeContext';

import ThemeToggle from '@/theme/ThemeToggle';

import { AppButton, AppChip } from '@/theme/CustomComponents';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

export default function Home() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();

  const THEME_ICONS = {
    blue: '/static/images/logo-blue.png',
    purple: '/static/images/logo-purple.png',
    gold: '/static/images/logo-gold.png',
    green: '/static/images/logo-green.png'
  } as const;

  const themeIcon = THEME_ICONS[themeSet];

  return (
    <>
      <Head>
        <title>BoilerPlate</title>

        <meta name="description" content="CryptechServices Theme System" />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',

          px: {
            xs: 2,
            sm: 3,
            md: 5
          },

          py: {
            xs: 6,
            md: 8
          },

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          /*
           * ================================================================
           * 60% BACKGROUND
           * ================================================================
           */

          background: `
            radial-gradient(
              circle at top,
              ${theme.backgroundScale[6]},
              ${theme.colorScale[3]} 65%
            )
          `,

          transition: 'background 0.8s ease-in-out'
        }}
      >
        {/* ================================================================ */}
        {/* BACKGROUND CONNECTION NETWORK                                    */}
        {/* ================================================================ */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,

            overflow: 'hidden',

            pointerEvents: 'none',

            zIndex: 0,

            opacity: 0,

            '& svg': {
              position: 'absolute',
              inset: 0,

              width: '100%',
              height: '100%'
            }
          }}
        >
          <svg viewBox="0 0 1200 560" preserveAspectRatio="none">
            {/* ============================================================ */}
            {/* SECONDARY CONNECTION LINES — 30%                             */}
            {/* ============================================================ */}

            <g
              fill="none"
              stroke={theme.secondaryScale[7]}
              strokeWidth="1.2"
              opacity="0.55"
            >
              <path d="M20 120 L180 175 L350 90 L540 150 L735 75 L920 145 L1180 90" />

              <path d="M20 425 L190 350 L365 440 L545 350 L750 455 L950 365 L1180 430" />

              <path d="M180 175 L190 350" />

              <path d="M350 90 L365 440" />

              <path d="M540 150 L545 350" />

              <path d="M735 75 L750 455" />

              <path d="M920 145 L950 365" />

              <path d="M350 90 L545 350" />

              <path d="M735 75 L545 350" />

              <path d="M540 150 L950 365" />
            </g>

            {/* ============================================================ */}
            {/* SECONDARY HIGHLIGHTS                                         */}
            {/* ============================================================ */}

            <g
              fill="none"
              stroke={theme.secondaryScale[9]}
              strokeWidth="2"
              opacity="0.5"
            >
              <path d="M20 120 L180 175 L350 90 L540 150" />

              <path d="M545 350 L750 455 L950 365 L1180 430" />

              <path d="M350 90 L735 75" />

              <path d="M545 350 L920 145" />
            </g>

            {/* ============================================================ */}
            {/* SECONDARY NODES                                              */}
            {/* ============================================================ */}

            <g fill={theme.secondaryScale[9]}>
              <circle cx="20" cy="120" r="4" />
              <circle cx="180" cy="175" r="5" />
              <circle cx="350" cy="90" r="4" />
              <circle cx="540" cy="150" r="6" />
              <circle cx="735" cy="75" r="5" />
              <circle cx="920" cy="145" r="4" />
              <circle cx="1180" cy="90" r="4" />

              <circle cx="20" cy="425" r="4" />
              <circle cx="190" cy="350" r="5" />
              <circle cx="365" cy="440" r="4" />
              <circle cx="545" cy="350" r="6" />
              <circle cx="750" cy="455" r="5" />
              <circle cx="950" cy="365" r="4" />
              <circle cx="1180" cy="430" r="4" />
            </g>

            {/* ============================================================ */}
            {/* NODE HALOS                                                   */}
            {/* ============================================================ */}

            <g
              fill="none"
              stroke={theme.secondaryScale[6]}
              strokeWidth="1"
              opacity="0.5"
            >
              <circle cx="180" cy="175" r="12" />

              <circle cx="540" cy="150" r="16" />

              <circle cx="735" cy="75" r="12" />

              <circle cx="545" cy="350" r="16" />

              <circle cx="750" cy="455" r="12" />
            </g>

            {/* ============================================================ */}
            {/* PRIMARY NODES — 10%                                          */}
            {/* ============================================================ */}

            <g fill={theme.colorScale[9]} opacity="0.5">
              <circle cx="540" cy="150" r="2.5" />

              <circle cx="545" cy="350" r="2.5" />
            </g>
          </svg>
        </Box>

        {/* ================================================================ */}
        {/* BRAND / HEADER                                                   */}
        {/* ================================================================ */}

        <Stack
          spacing={3}
          sx={{
            position: 'relative',
            zIndex: 2,

            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {/* ============================================================ */}
          {/* LOGO                                                         */}
          {/* ============================================================ */}

          <Box
            sx={{
              width: {
                xs: 120,
                sm: 160
              },

              height: {
                xs: 120,
                sm: 160
              },

              position: 'relative'
            }}
          >
            <Image
              src={themeIcon}
              alt={`${themeSet} theme`}
              fill
              priority
              style={{
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* ============================================================ */}
          {/* TITLE                                                        */}
          {/* ============================================================ */}

          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              mb: 3
            }}
          >
            <Typography variant="overlineCustom" color="primary">
              CryptechServices Theme System
            </Typography>

            <Typography variant="h3">THEME BOILERPLATE</Typography>

            <ThemeToggle />
          </Stack>

          {/* ============================================================ */}
          {/* LINKS                                                        */}
          {/* ============================================================ */}

          <Stack
            direction={{
              xs: 'row',
              sm: 'row'
            }}
            spacing={2}
          >
            {/* PRIMARY — 10% */}

            <AppButton
              component="a"
              href="/theme"
              variant="contained"
              color="primary"
              startIcon={<PaletteIcon />}
            >
              Theme
            </AppButton>

            {/* SECONDARY — 30% */}

            <AppButton
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              color="secondary"
              startIcon={<GitHubIcon />}
            >
              GitHub
            </AppButton>
          </Stack>
        </Stack>

        {/* ================================================================ */}
        {/* SAMPLE HERO                                                      */}
        {/* ================================================================ */}

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,

            width: '100%',
            maxWidth: 1200,

            mt: {
              xs: 7,
              md: 10
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',

              minHeight: {
                xs: 480,
                sm: 520,
                md: 560
              },

              display: 'flex',
              alignItems: 'center',

              borderRadius: 4,

              /*
               * ============================================================
               * COLOR ROLES
               *
               * 60% → Background
               * 30% → Secondary
               * 10% → Primary
               * ============================================================
               */

              background: `
                linear-gradient(
                  135deg,
                  ${theme.backgroundScale[3]} 0%,
                  ${theme.backgroundScale[2]} 45%,
                  ${theme.backgroundScale[1]} 100%
                )
              `,

              /*
               * SECONDARY STRUCTURAL BORDER
               */

              border: `1px solid ${theme.secondaryScale[7]}`,

              boxShadow: `
                0 24px 80px
                ${theme.secondaryScale[3]}
              `,

              transition: `
                background 0.8s ease-in-out,
                border-color 0.8s ease-in-out,
                box-shadow 0.8s ease-in-out
              `,

              /* ========================================================== */
              /* PRIMARY GLOW — 10%                                        */
              /* ========================================================== */

              '&::before': {
                content: '""',

                position: 'absolute',

                width: {
                  xs: 240,
                  sm: 360,
                  md: 500
                },

                height: {
                  xs: 240,
                  sm: 360,
                  md: 500
                },

                borderRadius: '50%',

                top: {
                  xs: -100,
                  md: -180
                },

                right: {
                  xs: -100,
                  md: -160
                },

                background: `
                  radial-gradient(
                    circle,
                    ${theme.colorScale[8]} 0%,
                    ${theme.colorScale[4]} 42%,
                    transparent 72%
                  )
                `,

                opacity: 0.55,

                transition: 'background 0.8s ease-in-out',

                pointerEvents: 'none'
              },

              /* ========================================================== */
              /* SECONDARY GLOW — 30%                                      */
              /* ========================================================== */

              '&::after': {
                content: '""',

                position: 'absolute',

                width: 360,
                height: 360,

                borderRadius: '50%',

                bottom: -200,
                left: -120,

                background: `
                  radial-gradient(
                    circle,
                    ${theme.secondaryScale[8]} 0%,
                    ${theme.secondaryScale[5]} 35%,
                    transparent 72%
                  )
                `,

                opacity: 0.35,

                transition: 'background 0.8s ease-in-out',

                pointerEvents: 'none'
              }
            }}
          >
            {/* ============================================================ */}
            {/* HERO CONTENT                                                 */}
            {/* ============================================================ */}

            <Stack
              spacing={3}
              sx={{
                position: 'relative',

                zIndex: 2,

                width: '100%',

                maxWidth: {
                  xs: '100%',
                  md: 720
                },

                px: {
                  xs: 3,
                  sm: 5,
                  md: 7
                },

                py: {
                  xs: 5,
                  md: 7
                }
              }}
            >
              {/* ======================================================== */}
              {/* SECONDARY BADGE — 30%                                   */}
              {/* ======================================================== */}

              <Box>
                <AppChip
                  label={`${themeSet.toUpperCase()} THEME`}
                  color="secondary"
                />
              </Box>

              {/* ======================================================== */}
              {/* HEADING                                                  */}
              {/* ======================================================== */}

              <Typography
                variant="display"
                sx={{
                  maxWidth: 700,

                  color: theme.grayScale[12],

                  textShadow: `
                    0 0 40px
                    ${theme.secondaryScale[4]}
                  `,

                  transition: `
                    color 0.8s ease-in-out,
                    text-shadow 0.8s ease-in-out
                  `
                }}
              >
                Build beautiful interfaces with your theme.
              </Typography>

              {/* ======================================================== */}
              {/* DESCRIPTION — NEUTRAL                                   */}
              {/* ======================================================== */}

              <Typography
                variant="lead"
                sx={{
                  maxWidth: 620,

                  color: theme.grayScale[11],

                  transition: 'color 0.8s ease-in-out'
                }}
              >
                A flexible MUI theme system with dynamic color scales,
                typography, surfaces, and semantic colors designed to work
                together.
              </Typography>

              {/* ======================================================== */}
              {/* ACTIONS                                                  */}
              {/* ======================================================== */}

              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                spacing={2}
                sx={{
                  pt: 1
                }}
              >
                {/* ====================================================== */}
                {/* PRIMARY — 10%                                          */}
                {/* ====================================================== */}

                <AppButton
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 3,

                    boxShadow: `
                      0 8px 30px
                      ${theme.colorScale[4]}
                    `,

                    '&:hover': {
                      boxShadow: `
                        0 10px 35px
                        ${theme.colorScale[5]}
                      `
                    }
                  }}
                >
                  Get Started
                </AppButton>

                {/* ====================================================== */}
                {/* SECONDARY — 30%                                        */}
                {/* ====================================================== */}

                <AppButton
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 3,

                    backgroundColor: theme.secondaryScale[2]
                  }}
                >
                  Explore Theme
                </AppButton>
              </Stack>
            </Stack>

            {/* ============================================================ */}
            {/* THEME PREVIEW CARD — SECONDARY STRUCTURE                     */}
            {/* ============================================================ */}

            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'block'
                },

                position: 'absolute',

                right: '6%',

                top: '50%',

                transform: 'translateY(-50%)',

                width: 300,

                height: 360,

                borderRadius: 4,

                /*
                 * SECONDARY 30%
                 */

                backgroundColor: theme.secondaryScale[2],

                border: `
                  1px solid
                  ${theme.secondaryScale[7]}
                `,

                boxShadow: `
                  0 20px 60px
                  ${theme.backgroundScale[1]},
                  0 0 40px
                  ${theme.secondaryScale[3]}
                `,

                backdropFilter: 'blur(16px)',

                p: 2,

                overflow: 'hidden',

                transition: `
                  background-color 0.8s ease-in-out,
                  border-color 0.8s ease-in-out,
                  box-shadow 0.8s ease-in-out
                `
              }}
            >
              {/* ======================================================== */}
              {/* PREVIEW CONNECTIONS                                      */}
              {/* ======================================================== */}

              <Box
                sx={{
                  position: 'absolute',

                  inset: 0,

                  pointerEvents: 'none',

                  opacity: 0.25
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 300 360">
                  <g
                    fill="none"
                    stroke={theme.secondaryScale[7]}
                    strokeWidth="1"
                    opacity="0.25"
                  >
                    <path d="M10 55 L90 95 L150 50 L230 100 L290 70" />

                    <path d="M20 285 L90 240 L155 290 L220 250 L290 285" />

                    <path d="M90 95 L90 240" />

                    <path d="M150 50 L155 290" />

                    <path d="M230 100 L220 250" />
                  </g>

                  <g fill={theme.secondaryScale[9]}>
                    <circle cx="90" cy="95" r="4" />

                    <circle cx="150" cy="50" r="4" />

                    <circle cx="155" cy="290" r="4" />

                    <circle cx="220" cy="250" r="4" />
                  </g>
                </svg>
              </Box>

              <Stack
                spacing={2}
                sx={{
                  position: 'relative',

                  zIndex: 1,

                  height: '100%'
                }}
              >
                {/* ====================================================== */}
                {/* PREVIEW HEADER                                         */}
                {/* ====================================================== */}

                <Box
                  sx={{
                    height: 48,

                    flexShrink: 0,

                    borderRadius: 2,

                    backgroundColor: theme.backgroundScale[3],

                    border: `
                      1px solid
                      ${theme.secondaryScale[5]}
                    `,

                    display: 'flex',

                    alignItems: 'center',

                    px: 2,

                    transition: `
                      background-color 0.8s ease-in-out,
                      border-color 0.8s ease-in-out
                    `
                  }}
                >
                  <Typography
                    variant="label"
                    sx={{
                      color: theme.secondaryScale[11]
                    }}
                  >
                    Theme Preview
                  </Typography>
                </Box>

                {/* ====================================================== */}
                {/* PREVIEW MAIN                                           */}
                {/* ====================================================== */}

                <Box
                  sx={{
                    flex: 1,

                    borderRadius: 2,

                    backgroundColor: theme.backgroundScale[1],

                    border: `
                      1px solid
                      ${theme.secondaryScale[4]}
                    `,

                    p: 2,

                    transition: `
                      background-color 0.8s ease-in-out,
                      border-color 0.8s ease-in-out
                    `
                  }}
                >
                  <Stack spacing={2}>
                    {/* ================================================= */}
                    {/* NEUTRAL HEADING                                    */}
                    {/* ================================================= */}

                    <Box
                      sx={{
                        height: 12,

                        width: '65%',

                        borderRadius: 1,

                        backgroundColor: theme.grayScale[8]
                      }}
                    />

                    {/* ================================================= */}
                    {/* NEUTRAL TEXT                                      */}
                    {/* ================================================= */}

                    <Box
                      sx={{
                        height: 8,

                        width: '85%',

                        borderRadius: 1,

                        backgroundColor: theme.grayScale[5]
                      }}
                    />

                    <Box
                      sx={{
                        height: 8,

                        width: '72%',

                        borderRadius: 1,

                        backgroundColor: theme.grayScale[5]
                      }}
                    />

                    {/* ================================================= */}
                    {/* SECONDARY VISUAL — 30%                            */}
                    {/* ================================================= */}

                    <Box
                      sx={{
                        mt: 1,

                        height: 80,

                        borderRadius: 2,

                        background: `
                          linear-gradient(
                            135deg,
                            ${theme.secondaryScale[5]},
                            ${theme.secondaryScale[8]}
                          )
                        `,

                        border: `
                          1px solid
                          ${theme.secondaryScale[7]}
                        `,

                        transition: `
                          background 0.8s ease-in-out,
                          border-color 0.8s ease-in-out
                        `
                      }}
                    />

                    {/* ================================================= */}
                    {/* PRIMARY ACTION — 10%                              */}
                    {/* ================================================= */}

                    <AppButton
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Primary Action
                    </AppButton>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
