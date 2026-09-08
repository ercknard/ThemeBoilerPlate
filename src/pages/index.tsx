'use client';

import Head from 'next/head';
import Image from 'next/image';

import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GitHubIcon from '@mui/icons-material/GitHub';
import LayersIcon from '@mui/icons-material/Layers';
import PaletteIcon from '@mui/icons-material/Palette';
import SpeedIcon from '@mui/icons-material/Speed';

import { useThemeContext } from '@/contexts/themeContext';

import SkyEffects from '@/theme/common/SkyEffects';
import {
  AppButton,
  AppCard,
  AppChip
} from '@/theme/components/CustomComponents';
import ThemeToggle from '@/theme/ThemeToggle';
import { THEME_ICONS, THEME_SETS } from '@/theme/theme';
import React from 'react';
import Navbar from '@/theme/layout/Navbar';

/* ========================================================================== */
/* CONSTANTS                                                                  */
/* ========================================================================== */

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const FEATURES = [
  {
    icon: <ColorLensIcon />,
    title: 'Dynamic Color Scales',
    description:
      'Build consistent interfaces from carefully structured color scales that adapt with your active theme.'
  },
  {
    icon: <LayersIcon />,
    title: 'Semantic Surfaces',
    description:
      'Separate backgrounds, surfaces, borders, accents, and content colors for predictable UI composition.'
  },
  {
    icon: <AutoAwesomeIcon />,
    title: 'Theme Switching',
    description:
      'Switch between complete visual systems instantly while components automatically follow the active theme.'
  },
  {
    icon: <SpeedIcon />,
    title: 'MUI Native',
    description:
      'Designed around MUI components, tokens, responsive breakpoints, and the sx styling system.'
  }
];

/* ========================================================================== */
/* HOME                                                                       */
/* ========================================================================== */

export default function Home() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();
  const [activeThemeOpen, setActiveThemeOpen] = React.useState(false);
  const themeIcon = THEME_ICONS[themeSet];

  const activeTheme = THEME_SETS[themeSet];

  const primary = theme.colorScale[9];
  const primaryStrong = theme.colorScale[8];

  const secondary = theme.secondaryScale[9];
  const secondaryStrong = theme.secondaryScale[8];

  const background = theme.backgroundScale[1];
  const surface = theme.backgroundScale[3];

  const textPrimary = theme.grayScale[12];
  const textSecondary = theme.grayScale[10];

  const isDarkMode = theme.palette.mode === 'dark';

  const ctaBackground = isDarkMode
    ? alpha(theme.secondaryScale[3], 0.8)
    : alpha(surface, 0.9);

  const ctaSurface = isDarkMode
    ? alpha(theme.secondaryScale[4], 0.72)
    : alpha(surface, 0.72);

  return (
    <>
      <Head>
        <title>
          BoilerPlate | Theme System | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>

        <meta
          name="description"
          content="A flexible MUI theme system with dynamic color scales, semantic surfaces, typography, and responsive components."
        />

        <meta name="theme-color" content={background} />
      </Head>

      <Navbar />

      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',

          /*
           * Keep mobile extremely simple.
           * Desktop gets the decorative gradient system.
           */
          backgroundColor: background,

          background: {
            xs: background,

            // lg: `
            //   radial-gradient(
            //     circle at 50% -20%,
            //     ${alpha(primaryStrong, 0.75)},
            //     transparent 42%
            //   ),
            //   ${background}
            // `

            lg: `
              radial-gradient(
                circle at 50% -20%,
                ${alpha(primaryStrong, 0.75)},
                transparent 42%
              ),
              radial-gradient(
                circle at 100% 50%,
                ${alpha(secondaryStrong, 0.5)},
                transparent 38%
              ),
              radial-gradient(
                circle at 0% 50%,
                ${alpha(secondaryStrong, 0.5)},
                transparent 38%
              ),
              ${background}
            `
          },

          color: textPrimary,

          paddingTop: 5,
          transition: {
            xs: 'none',
            md: `
              background 0.8s ease-in-out,
              color 0.8s ease-in-out
            `
          }
        }}
      >
        {/* ================================================================== */}
        {/* SKY EFFECTS                                                        */}
        {/* ================================================================== */}

        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        >
          <SkyEffects color={primary} />
        </Box>

        {/* <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            opacity: 0.35,
            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1422 800"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            <defs>
              <filter
                id="llleaves-blur-2"
                x="-100%"
                y="-100%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>

              <filter
                id="llleaves-blur-3"
                x="-100%"
                y="-100%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              </filter>

              <filter
                id="llleaves-blur-4"
                x="-100%"
                y="-100%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
              </filter>
            </defs>

            <g fill={theme.secondaryScale[9]}>
              <path
                d="M756 392H806C834 392 856 414 856 442H806C778 442 756 420 756 392Z"
                transform="matrix(0.12176829789661851,0.10964066789337946,-0.10964066789337946,0.12176829789661851,753.5749104068647,277.8522414550462)"
                filter="url(#llleaves-blur-4)"
                opacity={0.25}
              />

              <path
                d="M795 508H845C873 508 895 530 895 558H845C817 558 795 536 795 508Z"
                transform="matrix(0.11998066948577134,0.11586398571624701,-0.11586398571624701,0.11998066948577134,805.3718386712828,371.14523523385515)"
                filter="url(#llleaves-blur-4)"
                opacity={0.25}
              />

              <path
                d="M553 116H603C631 116 653 138 653 166H603C575 166 553 144 553 116Z"
                transform="matrix(0.11840476490480961,0.1226117233561761,-0.1226117233561761,0.11840476490480961,548.8901797556206,50.370058964647654)"
                filter="url(#llleaves-blur-4)"
                opacity={0.26}
              />

              <path
                d="M1142 28H1192C1220 28 1242 50 1242 78H1192C1164 78 1142 56 1142 28Z"
                transform="matrix(0.020055861099931706,0.22923954134913613,-0.22923954134913613,0.020055861099931706,1180.2431092603856,-221.31649392646665)"
                filter="url(#llleaves-blur-3)"
                opacity={0.35}
              />

              <path
                d="M1108 443H1158C1186 443 1208 465 1208 493H1158C1130 493 1108 471 1108 443Z"
                transform="matrix(0.061829763614431,0.20223604421851707,-0.20223604421851707,0.061829763614431,1181.0476024287548,204.87433142340353)"
                filter="url(#llleaves-blur-3)"
                opacity={0.32}
              />

              <path
                d="M246 728H296C324 728 346 750 346 778H296C268 778 246 756 246 728Z"
                transform="matrix(0.07916402973102532,0.18649876672997778,-0.18649876672997778,0.07916402973102532,413.0010185472898,638.1858506604646)"
                filter="url(#llleaves-blur-3)"
                opacity={0.31}
              />

              <path
                d="M2 326H52C80 326 102 348 102 376H52C24 376 2 354 2 326Z"
                transform="matrix(-0.17236602108972096,0.23724147513144497,-0.23724147513144497,-0.17236602108972096,144.23479086780267,399.1639166956569)"
                filter="url(#llleaves-blur-3)"
                opacity={0.45}
              />

              <path
                d="M-1 577H49C77 577 99 599 99 627H49C21 627 -1 605 -1 577Z"
                transform="matrix(-0.17236602108972096,0.23724147513144497,-0.23724147513144497,-0.17236602108972096,200.26530306252621,694.1395124145712)"
                filter="url(#llleaves-blur-3)"
                opacity={0.45}
              />

              <path
                d="M82 627H132C160 627 182 649 182 677H132C104 677 82 655 82 627Z"
                transform="matrix(-0.06280654371694289,0.2519032880412,-0.2519032880412,-0.06280654371694289,304.5314075734989,659.6986324820084)"
                filter="url(#llleaves-blur-3)"
                opacity={0.4}
              />

              <path
                d="M628 36H678C706 36 728 58 728 86H678C650 86 628 64 628 36Z"
                transform="matrix(0.10717950984674939,0.14751993959802798,-0.14751993959802798,0.10717950984674939,614.3310086393836,-45.55646914811467)"
                filter="url(#llleaves-blur-4)"
                opacity={0.28}
              />

              <path
                d="M357 246H407C435 246 457 268 457 296H407C379 296 357 274 357 246Z"
                transform="matrix(0.10931468020109265,0.14506548028795113,-0.14506548028795113,0.10931468020109265,401.82167031619,182.33407118830777)"
                filter="url(#llleaves-blur-4)"
                opacity={0.28}
              />

              <path
                d="M595 610H645C673 610 695 632 695 660H645C617 660 595 638 595 610Z"
                transform="matrix(0.12475995927964123,0.09401337260583333,-0.09401337260583333,0.12475995927964123,624.2283178693356,495.1388005266653)"
                filter="url(#llleaves-blur-4)"
                opacity={0.24}
              />

              <path
                d="M296 29H346C374 29 396 51 396 79H346C318 79 296 57 296 29Z"
                transform="matrix(-0.017035131313224126,0.24361372754968091,-0.24361372754968091,-0.017035131313224126,365.04929672205833,-29.37045264127549)"
                filter="url(#llleaves-blur-3)"
                opacity={0.37}
              />

              <path
                d="M786 220H836C864 220 886 242 886 270H836C808 270 786 248 786 220Z"
                transform="matrix(0.11998066948577134,0.11586398571624701,-0.11586398571624701,0.11998066948577134,764.0828368103756,118.74244391720352)"
                filter="url(#llleaves-blur-4)"
                opacity={0.25}
              />

              <path
                d="M1020 533H1070C1098 533 1120 555 1120 583H1070C1042 583 1020 561 1020 533Z"
                transform="matrix(0.0840409590654436,0.18022641832210431,-0.18022641832210431,0.0840409590654436,1080.6425152237096,318.2628772368309)"
                filter="url(#llleaves-blur-4)"
                opacity={0.3}
              />

              <path
                d="M291 329H341C369 329 391 351 391 379H341C313 379 291 357 291 329Z"
                transform="matrix(0.09153412482838388,0.1721506510470563,-0.1721506510470563,0.09153412482838388,370.728193904179,262.8935478037059)"
                filter="url(#llleaves-blur-4)"
                opacity={0.3}
              />

              <path
                d="M1307 169H1357C1385 169 1407 191 1407 219H1357C1329 219 1307 197 1307 169Z"
                transform="matrix(0.01609487195943342,0.23016739233636793,-0.23016739233636793,0.01609487195943342,1379.8117328643043,-121.45955656058135)"
                filter="url(#llleaves-blur-3)"
                opacity={0.35}
              />

              <path
                d="M478 603H528C556 603 578 625 578 653H528C500 653 478 631 478 603Z"
                transform="matrix(0.12324382110822898,0.10713421920717896,-0.10713421920717896,0.12324382110822898,530.2075521169635,494.0360126026417)"
                filter="url(#llleaves-blur-4)"
                opacity={0.25}
              />

              <path
                d="M91 28H141C169 28 191 50 191 78H141C113 78 91 56 91 28Z"
                transform="matrix(-0.24531211609286252,0.19864983476128015,-0.19864983476128015,-0.24531211609286252,186.11744961144146,37.99191545158121)"
                filter="url(#llleaves-blur-2)"
                opacity={0.48}
              />

              <path
                d="M1237 499H1287C1315 499 1337 521 1337 549H1287C1259 549 1237 527 1237 499Z"
                transform="matrix(0.03138955414312964,0.22334828314916405,-0.22334828314916405,0.03138955414312964,1363.6361441879542,220.10263321602594)"
                filter="url(#llleaves-blur-3)"
                opacity={0.34}
              />

              <path
                d="M966 281H1016C1044 281 1066 303 1066 331H1016C988 331 966 309 966 281Z"
                transform="matrix(0.09792213527629723,0.16296980060829327,-0.16296980060829327,0.09792213527629723,966.3798695454198,110.4585091874271)"
                filter="url(#llleaves-blur-4)"
                opacity={0.29}
              />

              <path
                d="M509 25H559C587 25 609 47 609 75H559C531 75 509 53 509 25Z"
                transform="matrix(0.08139279986784925,0.18281122163421562,-0.18281122163421562,0.08139279986784925,522.6419859555831,-56.261112886918994)"
                filter="url(#llleaves-blur-3)"
                opacity={0.3}
              />

              <path
                d="M924 569H974C1002 569 1024 591 1024 619H974C946 619 924 597 924 569Z"
                transform="matrix(0.10928871699098319,0.14503102594442274,-0.14503102594442274,0.10928871699098319,953.7012190617695,387.8222828374882)"
                filter="url(#llleaves-blur-4)"
                opacity={0.28}
              />

              <path
                d="M671 500H721C749 500 771 522 771 550H721C693 550 671 528 671 500Z"
                transform="matrix(0.1242247378880033,0.09705500216846139,-0.09705500216846139,0.1242247378880033,682.3878401211919,389.8053560453376)"
                filter="url(#llleaves-blur-4)"
                opacity={0.24}
              />

              <path
                d="M1324 580H1374C1402 580 1424 602 1424 630H1374C1346 630 1324 608 1324 580Z"
                transform="matrix(0.012181831817428719,0.23244319801527336,-0.23244319801527336,0.012181831817428719,1497.8902978820932,278.25303767747)"
                filter="url(#llleaves-blur-3)"
                opacity={0.36}
              />

              <path
                d="M323 140H373C401 140 423 162 423 190H373C345 190 323 168 323 140Z"
                transform="matrix(0.08932283268452518,0.17530592980812792,-0.17530592980812792,0.08932283268452518,368.6080618270132,84.87262078862163)"
                filter="url(#llleaves-blur-4)"
                opacity={0.3}
              />

              <path
                d="M657 172H707C735 172 757 194 757 222H707C679 222 657 200 657 172Z"
                transform="matrix(0.12505402542265284,0.09423496733889783,-0.09423496733889783,0.12505402542265284,637.1510925919473,105.74023508313662)"
                filter="url(#llleaves-blur-4)"
                opacity={0.24}
              />

              <path
                d="M1329 40H1379C1407 40 1429 62 1429 90H1379C1351 90 1329 68 1329 40Z"
                transform="matrix(-0.012706924951017148,0.2424625718710633,-0.2424625718710633,-0.012706924951017148,1412.2829166790718,-268.5299364883802)"
                filter="url(#llleaves-blur-3)"
                opacity={0.37}
              />

              <path
                d="M545 503H595C623 503 645 525 645 553H595C567 553 545 531 545 503Z"
                transform="matrix(0.1253635824052996,0.0944682352569089,-0.0944682352569089,0.1253635824052996,570.2878966844946,405.599428512141)"
                filter="url(#llleaves-blur-4)"
                opacity={0.24}
              />

              <path
                d="M803 724H853C881 724 903 746 903 774H853C825 774 803 752 803 724Z"
                transform="matrix(0.11998066948577134,0.11586398571624701,-0.11586398571624701,0.11998066948577134,837.438614230106,560.3024987391987)"
                filter="url(#llleaves-blur-4)"
                opacity={0.25}
              />

              <path
                d="M542 216H592C620 216 642 238 642 266H592C564 266 542 244 542 216Z"
                transform="matrix(0.12481396821651339,0.09751535935482815,-0.09751535935482815,0.12481396821651339,541.6113324203377,153.190740921762)"
                filter="url(#llleaves-blur-4)"
                opacity={0.24}
              />

              <path
                d="M285 517H335C363 517 385 539 385 567H335C307 567 285 545 285 517Z"
                transform="matrix(0.09153412482838388,0.1721506510470563,-0.1721506510470563,0.09153412482838388,397.6417210499959,434.7180362422521)"
                filter="url(#llleaves-blur-4)"
                opacity={0.3}
              />

              <path
                d="M4 456H54C82 456 104 478 104 506H54C26 506 4 484 4 456Z"
                transform="matrix(-0.17236602108972096,0.23724147513144497,-0.23724147513144497,-0.17236602108972096,177.42091467706996,551.0970164870578)"
                filter="url(#llleaves-blur-3)"
                opacity={0.45}
              />

              <path
                d="M272 636H322C350 636 372 658 372 686H322C294 686 272 664 272 636Z"
                transform="matrix(0.07916402973102532,0.18649876672997778,-0.18649876672997778,0.07916402973102532,419.7848672351252,548.6199734607394)"
                filter="url(#llleaves-blur-3)"
                opacity={0.31}
              />

              <path
                d="M123 505H173C201 505 223 527 223 555H173C145 555 123 533 123 505Z"
                transform="matrix(-0.03465373960289519,0.24657416953782715,-0.24657416953782715,-0.03465373960289519,309.6794068063492,505.7091506594904)"
                filter="url(#llleaves-blur-3)"
                opacity={0.38}
              />

              <path
                d="M1204 256H1254C1282 256 1304 278 1304 306H1254C1226 306 1204 284 1204 256Z"
                transform="matrix(0.03862634920836947,0.2190609120236306,-0.2190609120236306,0.03862634920836947,1267.118674371345,-4.556387805184613)"
                filter="url(#llleaves-blur-3)"
                opacity={0.34}
              />

              <path
                d="M699 289H749C777 289 799 311 799 339H749C721 339 699 317 699 289Z"
                transform="matrix(0.12374960351090239,0.10021045303734154,-0.10021045303734154,0.12374960351090239,687.7776292240594,200.08499517260785)"
                filter="url(#llleaves-blur-4)"
                opacity={0.24}
              />

              <path
                d="M852 310H902C930 310 952 332 952 360H902C874 360 852 338 852 310Z"
                transform="matrix(0.11621752779583358,0.12907264081256234,-0.12907264081256234,0.11621752779583358,840.4111246003665,179.64360617546453)"
                filter="url(#llleaves-blur-4)"
                opacity={0.26}
              />

              <path
                d="M231 433H281C309 433 331 455 331 483H281C253 483 231 461 231 433Z"
                transform="matrix(0.061643479301512934,0.20162673568582648,-0.20162673568582648,0.061643479301512934,356.02322726038335,373.11017375218984)"
                filter="url(#llleaves-blur-3)"
                opacity={0.32}
              />

              <path
                d="M98 142H148C176 142 198 164 198 192H148C120 192 98 170 98 142Z"
                transform="matrix(-0.09684067021905275,0.252278571005273,-0.252278571005273,-0.09684067021905275,204.4629405503004,145.8351634178014)"
                filter="url(#llleaves-blur-3)"
                opacity={0.41}
              />

              <path
                d="M1238 43H1288C1316 43 1338 65 1338 93H1288C1260 93 1238 71 1238 43Z"
                transform="matrix(0.004120790546290216,0.23607993228536453,-0.23607993228536453,0.004120790546290216,1298.745857171783,-236.35116654069725)"
                filter="url(#llleaves-blur-3)"
                opacity={0.36}
              />

              <path
                d="M133 722H183C211 722 233 744 233 772H183C155 772 133 750 133 722Z"
                transform="matrix(-0.004166990534241287,0.23872672782242157,-0.23872672782242157,-0.004166990534241287,362.0914249511151,706.4257507375751)"
                filter="url(#llleaves-blur-3)"
                opacity={0.36}
              />

              <path
                d="M1011 147H1061C1089 147 1111 169 1111 197H1061C1033 197 1011 175 1011 147Z"
                transform="matrix(0.08667446526296825,0.17770898909549507,-0.17770898909549507,0.08667446526296825,999.6043384804158,-31.457245455550805)"
                filter="url(#llleaves-blur-4)"
                opacity={0.3}
              />

              <path
                d="M365 719H415C443 719 465 741 465 769H415C387 769 365 747 365 719Z"
                transform="matrix(0.11312634526883557,0.13481872839118778,-0.13481872839118778,0.11312634526883557,468.35770063647686,603.8842268376434)"
                filter="url(#llleaves-blur-4)"
                opacity={0.27}
              />

              <path
                d="M184 331H234C262 331 284 353 284 381H234C206 381 184 359 184 331Z"
                transform="matrix(0.02393296522656091,0.22770695363573631,-0.22770695363573631,0.02393296522656091,309.4633616313069,294.196437228582)"
                filter="url(#llleaves-blur-3)"
                opacity={0.35}
              />

              <path
                d="M1028 720H1078C1106 720 1128 742 1128 770H1078C1050 770 1028 748 1028 720Z"
                transform="matrix(0.0840409590654436,0.18022641832210431,-0.18022641832210431,0.0840409590654436,1121.6725277774196,488.1054065450161)"
                filter="url(#llleaves-blur-4)"
                opacity={0.3}
              />

              <path
                d="M944 37H994C1022 37 1044 59 1044 87H994C966 87 944 65 944 37Z"
                transform="matrix(0.0818661082571373,0.18387428968195396,-0.18387428968195396,0.0818661082571373,924.0252943526867,-125.84674265580475)"
                filter="url(#llleaves-blur-3)"
                opacity={0.31}
              />

              <path
                d="M882 433H932C960 433 982 455 982 483H932C904 483 882 461 882 433Z"
                transform="matrix(0.11172895543928014,0.1379737693745985,-0.1379737693745985,0.11172895543928014,891.060599904157,278.2365853516839)"
                filter="url(#llleaves-blur-4)"
                opacity={0.27}
              />

              <path
                d="M499 401H549C577 401 599 423 599 451H549C521 451 499 429 499 401Z"
                transform="matrix(0.12294623870452447,0.10316414355160029,-0.10316414355160029,0.12294623870452447,525.4504401041978,316.98778750204406)"
                filter="url(#llleaves-blur-4)"
                opacity={0.24}
              />

              <path
                d="M582 306H632C660 306 682 328 682 356H632C604 356 582 334 582 306Z"
                transform="matrix(0.12475995927964123,0.09401337260583333,-0.09401337260583333,0.12475995927964123,584.2701320677976,230.2880019915521)"
                filter="url(#llleaves-blur-4)"
                opacity={0.24}
              />

              <path
                d="M1141 545H1191C1219 545 1241 567 1241 595H1191C1163 595 1141 573 1141 545Z"
                transform="matrix(0.05210283099353127,0.20897304113209553,-0.20897304113209553,0.05210283099353127,1248.0601617319987,291.4144943453614)"
                filter="url(#llleaves-blur-3)"
                opacity={0.33}
              />

              <path
                d="M1088 333H1138C1166 333 1188 355 1188 383H1138C1110 383 1088 361 1088 333Z"
                transform="matrix(0.07093397271207671,0.19488948829864106,-0.19488948829864106,0.07093397271207671,1127.0475758645703,110.82140008522302)"
                filter="url(#llleaves-blur-3)"
                opacity={0.32}
              />
            </g>
          </svg>
        </Box> */}

        <Box
          sx={{
            position: 'absolute',
            bottom: -6,
            left: 0,
            width: '100vw',
            opacity: 0.25,
            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2400 800"
            width="100%"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="theme-wave-gradient"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
              >
                <stop offset="0%" stopColor={theme.colorScale[9]} />

                <stop offset="100%" stopColor={theme.colorScale[7]} />
              </linearGradient>
            </defs>

            <path
              d="
      M 0 323.089
      Q 600 466.524 800 317.354
      Q 1400 621.009 1600 321.322
      Q 2200 548.547 2400 323.389
      L 2400 800
      L 0 800
      L 0 323.202
      Z
    "
              transform="translate(0 41.323)"
              fill="url(#theme-wave-gradient)"
            />
          </svg>
        </Box>

        {/* ================================================================== */}
        {/* DESKTOP DECORATIVE GLOW                                           */}
        {/* ================================================================== */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',

            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        >
          {/* Primary glow */}

          {/* <Box
            sx={{
              position: 'absolute',

              width: {
                md: 600
              },

              height: {
                md: 600
              },

              top: -300,
              left: '15%',

              transform: 'translateX(-50%)',

              borderRadius: '50%',

              background: `
                radial-gradient(
                  circle,
                  ${alpha(primary, 0.12)} 0%,
                  transparent 68%
                )
              `
            }}
          /> */}

          {/* Secondary glow */}

          {/* <Box
            sx={{
              position: 'absolute',

              width: 500,
              height: 500,

              right: -250,
              bottom: -250,

              borderRadius: '50%',

              background: `
                radial-gradient(
                  circle,
                  ${alpha(secondary, 0.12)} 0%,
                  transparent 70%
                )
              `
            }}
          /> */}
        </Box>

        {/* ================================================================== */}
        {/* MAIN CONTAINER                                                     */}
        {/* ================================================================== */}

        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,

            py: {
              xs: 5,
              sm: 8,
              md: 10
            }
          }}
        >
          {/* ================================================================= */}
          {/* HERO                                                              */}
          {/* ================================================================= */}

          <Stack
            spacing={3}
            sx={{
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            {/* Theme logo */}

            <Box
              sx={{
                position: 'relative',

                width: {
                  xs: 100,
                  sm: 140,
                  md: 160
                },

                height: {
                  xs: 100,
                  sm: 140,
                  md: 160
                },

                '@keyframes logoFloat': {
                  '0%': {
                    transform: 'translateY(0) scale(1)'
                  },

                  '50%': {
                    transform: 'translateY(-8px) scale(1.025)'
                  },

                  '100%': {
                    transform: 'translateY(0) scale(1)'
                  }
                },

                '@keyframes logoGlow': {
                  '0%, 100%': {
                    opacity: 0.55
                  },

                  '50%': {
                    opacity: 0.9
                  }
                },

                '&::before': {
                  content: '""',

                  display: {
                    xs: 'none',
                    md: 'block'
                  },

                  position: 'absolute',
                  inset: '-25%',

                  borderRadius: '50%',

                  background: `
                    radial-gradient(
                      circle,
                      ${alpha(primary, 0.18)},
                      transparent 68%
                    )
                  `,

                  filter: 'blur(18px)',

                  animation: 'logoGlow 4s ease-in-out infinite'
                }
              }}
            >
              <Image
                src={themeIcon}
                alt={`${themeSet} theme`}
                fill
                priority
                sizes="(max-width: 600px) 100px, 160px"
                style={{
                  objectFit: 'contain',

                  filter: `
                    drop-shadow(
                      0 0 10px ${alpha(primary, 0.5)}
                    )
                    drop-shadow(
                      0 0 30px ${alpha(primary, 0.35)}
                    )
                  `,

                  animation: 'logoFloat 4s ease-in-out infinite'
                }}
              />
            </Box>

            {/* Hero text */}

            <Stack
              spacing={1}
              sx={{
                alignItems: 'center'
              }}
            >
              <Typography
                variant="overlineCustom"
                sx={{
                  color: primary,
                  fontWeight: 700,
                  letterSpacing: '0.16em'
                }}
              >
                CRYPTECH SERVICES
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,

                  fontSize: {
                    xs: '2rem',
                    sm: '2.75rem',
                    md: '3.5rem'
                  },

                  lineHeight: 1.05,

                  background: {
                    xs: 'none',

                    md: `
                      linear-gradient(
                        135deg,
                        ${textPrimary},
                        ${alpha(primary, 0.8)}
                      )
                    `
                  },

                  backgroundClip: {
                    xs: 'initial',
                    md: 'text'
                  },

                  WebkitBackgroundClip: {
                    xs: 'initial',
                    md: 'text'
                  },

                  WebkitTextFillColor: {
                    xs: 'initial',
                    md: 'transparent'
                  }
                }}
              >
                Theme Boilerplate
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: 650,
                  color: textSecondary,

                  fontSize: {
                    xs: '0.95rem',
                    sm: '1.05rem'
                  }
                }}
              >
                A modern design foundation for creating beautiful, scalable, and
                consistent theme-aware interfaces.
              </Typography>
            </Stack>

            {/* Theme toggle */}

            <Box
              sx={{
                p: 2,
                borderRadius: 2,

                backgroundColor: theme.secondaryScale[4],

                border: `1px solid ${alpha(secondary, 0.25)}`,

                boxShadow: {
                  xs: 'none',
                  md: `
                    0 10px 40px
                    ${alpha('#000000', 0.16)}
                  `
                },

                backdropFilter: {
                  xs: 'none',
                  md: 'blur(14px)'
                }
              }}
            >
              <ThemeToggle />
            </Box>

            {/* =============================================================== */}
            {/* ACTIVE THEME CARD                                               */}
            {/* =============================================================== */}

            <Paper
              elevation={0}
              sx={{
                mt: 1.5,
                width: '100%',
                maxWidth: 520,
                overflow: 'hidden',

                borderRadius: 2.5,

                backgroundColor: theme.secondaryScale[4],

                border: `1px solid ${alpha(secondary, 0.25)}`,

                backdropFilter: {
                  xs: 'none',
                  md: 'blur(14px)'
                }
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => setActiveThemeOpen((prev) => !prev)}
                aria-expanded={activeThemeOpen}
                sx={{
                  width: '100%',
                  border: 0,
                  outline: 0,
                  cursor: 'pointer',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  p: 1.5,

                  color: textPrimary,

                  backgroundColor: 'transparent',

                  textAlign: 'left',

                  '&:hover': {
                    backgroundColor: alpha(secondary, 0.06)
                  }
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.25}
                  sx={{
                    alignItems: 'center',
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderRadius: 1.5,

                      backgroundColor: alpha(primary, 0.1),

                      border: `1px solid ${alpha(primary, 0.2)}`
                    }}
                  >
                    <Image
                      src={themeIcon}
                      alt=""
                      width={28}
                      height={28}
                      style={{
                        objectFit: 'contain'
                      }}
                    />
                  </Box>

                  <Stack
                    spacing={0.25}
                    sx={{
                      minWidth: 0
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 800,
                          lineHeight: 1.2
                        }}
                      >
                        {activeTheme?.label ?? themeSet}
                      </Typography>

                      <Chip
                        label="ACTIVE"
                        size="small"
                        color="primary"
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          fontWeight: 800
                        }}
                      />
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{
                        color: textSecondary,
                        textTransform: 'capitalize'
                      }}
                    >
                      {activeTheme?.category ?? 'Theme'}
                    </Typography>
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    ml: 1,
                    flexShrink: 0,

                    width: 30,
                    height: 30,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: '50%',

                    color: textSecondary,

                    transition: 'transform 0.25s ease',

                    transform: activeThemeOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)'
                  }}
                >
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 18,
                      transform: 'rotate(90deg)'
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateRows: activeThemeOpen ? '1fr' : '0fr',

                  transition: 'grid-template-rows 0.3s ease'
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      px: 1.5,
                      pb: 1.5
                    }}
                  >
                    <Divider
                      sx={{
                        mb: 1.5,
                        borderColor: alpha(secondary, 0.15)
                      }}
                    />

                    <Stack spacing={1.25}>
                      {[
                        {
                          label: 'Primary',
                          value: primary
                        },
                        {
                          label: 'Secondary',
                          value: secondary
                        },
                        {
                          label: 'Surface',
                          value: surface
                        },
                        {
                          label: 'Background',
                          value: background
                        }
                      ].map((item) => (
                        <Stack
                          key={item.label}
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: textSecondary,
                              fontWeight: 600
                            }}
                          >
                            {item.label}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={0.75}
                            sx={{
                              alignItems: 'center'
                            }}
                          >
                            <Box
                              sx={{
                                width: 26,
                                height: 26,

                                borderRadius: 1,

                                backgroundColor: item.value,

                                border: `1px solid ${alpha(textPrimary, 0.12)}`
                              }}
                            />

                            <Typography
                              variant="caption"
                              sx={{
                                color: textSecondary,
                                fontFamily: 'monospace',
                                fontSize: '0.7rem'
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Stack>

          {/* ================================================================= */}
          {/* FEATURE HERO PANEL                                               */}
          {/* ================================================================= */}

          <Box
            sx={{
              mt: {
                xs: 5,
                md: 4
              },

              position: 'relative',

              borderRadius: {
                xs: 3,
                md: 6
              },

              overflow: 'hidden',

              border: {
                xs: `1px solid ${alpha(secondary, 0.5)} `,
                md: `2px solid ${alpha(secondary, 0.5)} `
              },

              background: {
                xs: alpha(surface, 0.96),

                md: `
                  linear-gradient(
                    135deg,
                    ${alpha(surface, 0.92)},
                    ${alpha(theme.secondaryScale[3], 0.78)}
                  )
                `
              },

              boxShadow: {
                xs: 'none',
                md: `
                  0 30px 100px
                  ${alpha('#000000', 0.28)},
                  0 0 70px
                  ${alpha(secondary, 0.1)}
                `
              },

              backdropFilter: {
                xs: 'none',
                md: 'blur(18px)'
              },

              transition: {
                xs: 'none',

                md: `
                  border-color 0.8s ease,
                  background 0.8s ease,
                  box-shadow 0.8s ease
                `
              },

              '&::before': {
                content: '""',

                position: 'absolute',

                display: {
                  xs: 'none',
                  md: 'block'
                },

                width: 550,
                height: 550,

                top: -300,
                right: -150,

                borderRadius: '50%',

                background: `
                  radial-gradient(
                    circle,
                    ${alpha(primary, 0.25)},
                    transparent 70%
                  )
                `,

                pointerEvents: 'none'
              },

              '&::after': {
                content: '""',

                position: 'absolute',

                display: {
                  xs: 'none',
                  md: 'block'
                },

                width: 450,
                height: 450,

                bottom: -300,
                left: -180,

                borderRadius: '50%',

                background: `
                  radial-gradient(
                    circle,
                    ${alpha(secondary, 0.18)},
                    transparent 70%
                  )
                `,

                pointerEvents: 'none'
              }
            }}
          >
            <Box
              sx={{
                position: 'absolute',

                top: {
                  xs: 12,
                  md: 18
                },

                right: {
                  xs: 12,
                  md: 20
                },

                zIndex: 3,

                display: 'flex',
                alignItems: 'center',
                gap: 0.75,

                px: 1.25,
                py: 0.6,

                borderRadius: 99,

                backgroundColor: alpha(primary, 0.1),

                border: `1px solid ${alpha(primary, 0.25)}`,

                backdropFilter: {
                  xs: 'none',
                  md: 'blur(10px)'
                },

                boxShadow: `
      0 6px 20px
      ${alpha('#000000', 0.12)}
    `
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,

                  flexShrink: 0,

                  borderRadius: '50%',

                  backgroundColor: primary,

                  boxShadow: `0 0 10px ${alpha(primary, 0.65)}`
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: primary,

                  fontSize: {
                    xs: '0.6rem',
                    md: '0.65rem'
                  },

                  fontWeight: 800,

                  letterSpacing: '0.1em',

                  lineHeight: 1
                }}
              >
                SAMPLE HERO
              </Typography>
            </Box>

            <Stack
              direction={{
                xs: 'column',
                md: 'row'
              }}
              sx={{
                position: 'relative',
                zIndex: 1,

                minHeight: {
                  xs: 0,
                  md: 600
                }
              }}
            >
              {/* ============================================================= */}
              {/* HERO COPY                                                      */}
              {/* ============================================================= */}

              <Stack
                spacing={3}
                sx={{
                  justifyContent: 'center',
                  flex: 1,

                  px: {
                    xs: 2.5,
                    sm: 5,
                    md: 8
                  },

                  py: {
                    xs: 4,
                    sm: 6,
                    md: 8
                  }
                }}
              >
                <Box>
                  <AppChip
                    label={`${themeSet.toUpperCase()} THEME`}
                    color="secondary"
                  />
                </Box>

                <Typography
                  variant="display"
                  sx={{
                    maxWidth: 700,

                    color: textPrimary,

                    fontSize: {
                      xs: '2.3rem',
                      sm: '3.25rem',
                      md: '4.2rem'
                    },

                    lineHeight: 1.02,

                    fontWeight: 800,

                    letterSpacing: '-0.035em',

                    textShadow: {
                      xs: 'none',

                      md: `
                        0 0 50px
                        ${alpha(secondary, 0.22)}
                      `
                    }
                  }}
                >
                  Build beautiful interfaces with your theme.
                </Typography>

                <Typography
                  variant="lead"
                  sx={{
                    maxWidth: 620,

                    color: textSecondary,

                    fontSize: {
                      xs: '1rem',
                      md: '1.15rem'
                    },

                    lineHeight: 1.7
                  }}
                >
                  A flexible design system with dynamic color scales,
                  typography, surfaces, semantic colors, and responsive
                  components designed to work together seamlessly.
                </Typography>

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
                  <AppButton
                    component="a"
                    href="https://cryptech.services/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 3.5,
                      minHeight: 48,

                      boxShadow: {
                        xs: 'none',

                        md: `
        0 12px 35px
        ${alpha(primary, 0.35)}
      `
                      },

                      '&:hover': {
                        boxShadow: {
                          xs: 'none',

                          md: `
          0 15px 45px
          ${alpha(primary, 0.48)}
        `
                        }
                      }
                    }}
                  >
                    Cryptech Services
                  </AppButton>

                  <AppButton
                    component="a"
                    href={GITHUB_URL || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<GitHubIcon />}
                    sx={{
                      px: 3.5,
                      minHeight: 48,

                      backgroundColor: {
                        xs: 'transparent',
                        md: alpha(secondary, 0.08)
                      },

                      '&:hover': {
                        backgroundColor: {
                          xs: 'transparent',
                          md: alpha(secondary, 0.16)
                        }
                      }
                    }}
                  >
                    View on GitHub
                  </AppButton>
                </Stack>
              </Stack>

              {/* ============================================================= */}
              {/* DESKTOP PREVIEW                                                */}
              {/* ============================================================= */}

              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex'
                  },

                  width: {
                    md: 400,
                    lg: 450
                  },

                  alignItems: 'center',
                  justifyContent: 'center',

                  p: 5
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 330,

                    p: 1.5,

                    borderRadius: 4,

                    backgroundColor: alpha(background, 0.72),

                    border: `1px solid ${alpha(secondary, 0.32)}`,

                    boxShadow: `
                      0 25px 70px
                      ${alpha('#000000', 0.35)}
                    `,

                    transform:
                      'perspective(1000px) rotateY(-7deg) rotateX(3deg)',

                    transition: 'transform 0.5s ease',

                    '&:hover': {
                      transform:
                        'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-6px)'
                    }
                  }}
                >
                  <Stack spacing={1.5}>
                    {/* Preview header */}

                    <Box
                      sx={{
                        height: 42,

                        px: 1.5,

                        display: 'flex',
                        alignItems: 'center',

                        borderRadius: 2,

                        backgroundColor: alpha(surface, 0.8),

                        border: `1px solid ${alpha(secondary, 0.2)}`
                      }}
                    >
                      <Stack direction="row" spacing={0.7}>
                        {[0, 1, 2].map((item) => (
                          <Box
                            key={item}
                            sx={{
                              width: 7,
                              height: 7,

                              borderRadius: '50%',

                              backgroundColor: alpha(textSecondary, 0.45)
                            }}
                          />
                        ))}
                      </Stack>

                      <Typography
                        variant="caption"
                        sx={{
                          ml: 1.5,
                          color: textSecondary
                        }}
                      >
                        Theme Preview
                      </Typography>
                    </Box>

                    {/* Preview body */}

                    <Box
                      sx={{
                        p: 2,

                        borderRadius: 2,

                        backgroundColor: alpha(surface, 0.65),

                        border: `1px solid ${alpha(secondary, 0.15)}`
                      }}
                    >
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            width: '62%',
                            height: 14,

                            borderRadius: 1,

                            backgroundColor: alpha(textPrimary, 0.75)
                          }}
                        />

                        <Stack spacing={1}>
                          <Box
                            sx={{
                              width: '90%',
                              height: 7,

                              borderRadius: 1,

                              backgroundColor: alpha(textSecondary, 0.3)
                            }}
                          />

                          <Box
                            sx={{
                              width: '74%',
                              height: 7,

                              borderRadius: 1,

                              backgroundColor: alpha(textSecondary, 0.22)
                            }}
                          />
                        </Stack>

                        {/* Preview gradient */}

                        <Box
                          sx={{
                            height: 105,

                            borderRadius: 2,

                            background: `
                              linear-gradient(
                                135deg,
                                ${secondary},
                                ${primary}
                              )
                            `,

                            boxShadow: `
                              inset 0 0 30px
                              ${alpha('#ffffff', 0.08)},
                              0 10px 30px
                              ${alpha(primary, 0.2)}
                            `
                          }}
                        />

                        {/* Preview colors */}

                        <Stack direction="row" spacing={1}>
                          {[primary, secondary, textPrimary, textSecondary].map(
                            (color, index) => (
                              <Box
                                key={index}
                                sx={{
                                  flex: 1,
                                  height: 24,

                                  borderRadius: 1,

                                  backgroundColor: color,

                                  border: `1px solid ${alpha('#ffffff', 0.08)}`
                                }}
                              />
                            )
                          )}
                        </Stack>

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
            </Stack>
          </Box>

          {/* ================================================================= */}
          {/* FEATURES INTRO                                                    */}
          {/* ================================================================= */}

          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              textAlign: 'center',

              mt: {
                xs: 8,
                md: 14
              }
            }}
          >
            <Typography
              variant="overlineCustom"
              sx={{
                color: secondary,
                fontWeight: 700,
                letterSpacing: '0.14em'
              }}
            >
              DESIGNED FOR BUILDERS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,

                fontSize: {
                  xs: '1.8rem',
                  md: '2.5rem'
                }
              }}
            >
              Everything your theme needs.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 650,
                color: textSecondary
              }}
            >
              A structured foundation that keeps colors, components, typography,
              and surfaces visually consistent across your application.
            </Typography>
          </Stack>

          {/* ================================================================= */}
          {/* FEATURES                                                           */}
          {/* ================================================================= */}

          <Box
            sx={{
              mt: 5,

              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)'
              },

              gap: 2
            }}
          >
            {FEATURES.map((feature) => (
              <AppCard
                key={feature.title}
                sx={{
                  position: 'relative',

                  p: {
                    xs: 2.5,
                    md: 3.5
                  },

                  minHeight: {
                    xs: 0,
                    md: 220
                  },

                  borderRadius: 3,

                  backgroundColor: theme.secondaryScale[4],

                  border: `1px solid ${alpha(secondary, 0.18)}`,

                  backdropFilter: {
                    xs: 'none',
                    md: 'blur(14px)'
                  },

                  transition: {
                    xs: 'none',

                    md: `
                      transform 0.3s ease,
                      border-color 0.3s ease,
                      background-color 0.3s ease,
                      box-shadow 0.3s ease
                    `
                  },

                  '&:hover': {
                    transform: {
                      xs: 'none',
                      md: 'translateY(-6px)'
                    },

                    backgroundColor: {
                      xs: theme.secondaryScale[4],
                      md: theme.secondaryScale[5]
                    },

                    borderColor: {
                      xs: alpha(secondary, 0.18),
                      md: alpha(primary, 0.4)
                    },

                    boxShadow: {
                      xs: 'none',

                      md: `
                        0 18px 50px
                        ${alpha('#000000', 0.2)}
                      `
                    }
                  }
                }}
              >
                <Stack spacing={2.5}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderRadius: 2,

                      color: primary,

                      backgroundColor: alpha(primary, 0.1),

                      border: `1px solid ${alpha(primary, 0.18)}`
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: textSecondary,
                      lineHeight: 1.7
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Stack>
              </AppCard>
            ))}
          </Box>

          {/* ================================================================= */}
          {/* CTA                                                                */}
          {/* ================================================================= */}

          <Box
            sx={{
              mt: {
                xs: 5,
                md: 8
              },

              position: 'relative',
              overflow: 'hidden',

              borderRadius: {
                xs: 3,
                md: 4
              },

              border: `2px solid ${alpha(primary, isDarkMode ? 0.34 : 0.28)}`,

              background: `
      linear-gradient(
        135deg,
        ${alpha(theme.backgroundScale[1], isDarkMode ? 0.75 : 0.11)} 0%,
        ${ctaBackground} 45%,
        ${alpha(secondary, isDarkMode ? 0.25 : 0.11)} 100%
      )
    `,

              boxShadow: {
                xs: 'none',
                md: isDarkMode
                  ? `
          0 24px 70px
          ${alpha('#000000', 0.32)},
          0 0 60px
          ${alpha(primary, 0.06)}
        `
                  : `
          0 24px 70px
          ${alpha('#000000', 0.18)}
        `
              },

              backdropFilter: {
                xs: 'none',
                md: 'blur(18px)'
              },

              transition: {
                xs: 'none',
                md: `
        border-color 0.5s ease,
        box-shadow 0.5s ease,
        background 0.5s ease
      `
              },

              '&::before': {
                content: '""',

                position: 'absolute',

                width: 420,
                height: 420,

                top: -260,
                right: -140,

                borderRadius: '50%',

                background: `
        radial-gradient(
          circle,
          ${alpha(primary, isDarkMode ? 0.3 : 0.22)} 0%,
          transparent 68%
        )
      `,

                pointerEvents: 'none'
              },

              '&::after': {
                content: '""',

                position: 'absolute',

                width: 320,
                height: 320,

                bottom: -240,
                left: -140,

                borderRadius: '50%',

                background: `
        radial-gradient(
          circle,
          ${alpha(secondary, isDarkMode ? 0.22 : 0.16)} 0%,
          transparent 68%
        )
      `,

                pointerEvents: 'none'
              }
            }}
          >
            <Stack
              direction={{
                xs: 'column',
                md: 'row'
              }}
              spacing={{
                xs: 3,
                md: 5
              }}
              sx={{
                position: 'relative',
                zIndex: 1,

                alignItems: {
                  xs: 'stretch',
                  md: 'center'
                },

                justifyContent: 'space-between',

                p: {
                  xs: 2.5,
                  sm: 4,
                  md: 5
                }
              }}
            >
              {/* ===================================================================== */}
              {/* CTA CONTENT                                                           */}
              {/* ===================================================================== */}

              <Stack
                spacing={2}
                sx={{
                  flex: 1,
                  minWidth: 0
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderRadius: 1.5,

                      color: primary,

                      backgroundColor: alpha(primary, isDarkMode ? 0.16 : 0.12),

                      border: `1px solid ${alpha(
                        primary,
                        isDarkMode ? 0.28 : 0.2
                      )}`
                    }}
                  >
                    <AutoAwesomeIcon
                      sx={{
                        fontSize: 17
                      }}
                    />
                  </Box>

                  <Typography
                    variant="overlineCustom"
                    sx={{
                      color: primary,

                      fontWeight: 800,

                      letterSpacing: '0.14em'
                    }}
                  >
                    BUILD WITH CONFIDENCE
                  </Typography>
                </Stack>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 850,

                    fontSize: {
                      xs: '1.7rem',
                      sm: '2.1rem',
                      md: '2.5rem'
                    },

                    lineHeight: 1.08,

                    letterSpacing: '-0.025em'
                  }}
                >
                  Your theme is ready.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: 650,

                    color: textSecondary,

                    lineHeight: 1.7,

                    fontSize: {
                      xs: '0.9rem',
                      sm: '0.98rem'
                    }
                  }}
                >
                  Explore the complete theme system, customize your tokens, and
                  build consistent interfaces from the same design foundation.
                </Typography>

                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row'
                  }}
                  spacing={1.5}
                  sx={{
                    pt: 0.5
                  }}
                >
                  <AppButton
                    component="a"
                    href="/documentation"
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      minHeight: 46,

                      px: 2.5,

                      boxShadow: {
                        xs: 'none',

                        md: `
                0 10px 30px
                ${alpha(primary, 0.28)}
              `
                      },

                      '&:hover': {
                        boxShadow: {
                          xs: 'none',

                          md: `
                  0 14px 38px
                  ${alpha(primary, 0.38)}
                `
                        }
                      }
                    }}
                  >
                    Explore Theme System
                  </AppButton>
                </Stack>
              </Stack>

              {/* ===================================================================== */}
              {/* THEME TOKEN PREVIEW                                                   */}
              {/* ===================================================================== */}

              <Box
                sx={{
                  width: {
                    xs: '100%',
                    md: 300,
                    lg: 340
                  },

                  flexShrink: 0
                }}
              >
                <Box
                  sx={{
                    p: 1.5,

                    borderRadius: 3,

                    backgroundColor: ctaSurface,

                    border: `1px solid ${alpha(
                      secondary,
                      isDarkMode ? 0.32 : 0.22
                    )}`,

                    boxShadow: isDarkMode
                      ? `
              inset 0 1px 0
              ${alpha('#ffffff', 0.06)},
              0 20px 50px
              ${alpha('#000000', 0.25)}
            `
                      : `
              inset 0 1px 0
              ${alpha('#ffffff', 0.04)},
              0 20px 50px
              ${alpha('#000000', 0.16)}
            `,

                    transform: {
                      xs: 'none',
                      md: 'rotate(2deg)'
                    },

                    transition: 'transform 0.4s ease',

                    '&:hover': {
                      transform: {
                        xs: 'none',
                        md: 'rotate(0deg) translateY(-4px)'
                      }
                    }
                  }}
                >
                  <Stack spacing={1.25}>
                    {/* =============================================================== */}
                    {/* PREVIEW HEADER                                                   */}
                    {/* =============================================================== */}

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: 'center',

                        px: 1,
                        py: 0.75
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,

                          flexShrink: 0,

                          borderRadius: '50%',

                          backgroundColor: primary,

                          boxShadow: `
                  0 0 12px
                  ${alpha(primary, 0.6)}
                `
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          color: textSecondary,

                          fontWeight: 700
                        }}
                      >
                        Theme Tokens
                      </Typography>

                      <Box
                        sx={{
                          flex: 1
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          color: primary,

                          fontFamily: 'monospace',

                          fontSize: '0.65rem',

                          fontWeight: 600
                        }}
                      >
                        {themeSet}
                      </Typography>
                    </Stack>

                    {/* =============================================================== */}
                    {/* MAIN TOKEN                                                       */}
                    {/* =============================================================== */}

                    <Box
                      sx={{
                        height: 82,

                        display: 'flex',

                        alignItems: 'flex-end',

                        p: 1.5,

                        borderRadius: 2,

                        background: `
                linear-gradient(
                  135deg,
                  ${primary},
                  ${secondary}
                )
              `,

                        boxShadow: `
                inset 0 0 35px
                ${alpha('#ffffff', 0.08)},
                0 8px 25px
                ${alpha(primary, 0.12)}
              `
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#ffffff',

                          fontWeight: 700,

                          textShadow: `
                  0 1px 3px
                  rgba(0,0,0,0.25)
                `
                        }}
                      >
                        Primary + Secondary
                      </Typography>
                    </Box>

                    {/* =============================================================== */}
                    {/* TOKEN ROWS                                                       */}
                    {/* =============================================================== */}

                    <Stack direction="row" spacing={1}>
                      {[
                        {
                          label: 'Primary',
                          color: primary
                        },
                        {
                          label: 'Secondary',
                          color: secondary
                        },
                        {
                          label: 'Surface',
                          color: surface
                        },
                        {
                          label: 'Base',
                          color: background
                        }
                      ].map((token) => (
                        <Stack
                          key={token.label}
                          spacing={0.5}
                          sx={{
                            flex: 1,
                            minWidth: 0
                          }}
                        >
                          <Box
                            sx={{
                              height: 32,

                              borderRadius: 1.25,

                              backgroundColor: token.color,

                              border: `1px solid ${alpha(
                                textPrimary,
                                isDarkMode ? 0.16 : 0.1
                              )}`,

                              boxShadow: isDarkMode
                                ? `
                        0 2px 8px
                        ${alpha('#000000', 0.18)}
                      `
                                : 'none'
                            }}
                          />

                          <Typography
                            variant="caption"
                            sx={{
                              color: textSecondary,

                              fontSize: '0.58rem',

                              overflow: 'hidden',

                              textOverflow: 'ellipsis',

                              whiteSpace: 'nowrap'
                            }}
                          >
                            {token.label}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* ================================================================= */}
          {/* FOOTER                                                           */}
          {/* ================================================================= */}

          <Box
            component="footer"
            sx={{
              mt: {
                xs: 6,
                md: 10
              },

              pt: {
                xs: 3,
                md: 4
              },

              borderTop: `1px solid ${alpha(secondary, 0.5)}`
            }}
          >
            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={{
                xs: 2.5,
                sm: 3
              }}
              sx={{
                alignItems: {
                  xs: 'flex-start',
                  sm: 'center'
                },

                justifyContent: 'space-between'
              }}
            >
              {/* Brand */}

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignItems: 'center',
                  minWidth: 0
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: 1.5,

                    backgroundColor: alpha(primary, 0.1),

                    border: `1px solid ${alpha(primary, 0.2)}`,

                    color: primary
                  }}
                >
                  <PaletteIcon
                    sx={{
                      fontSize: 18
                    }}
                  />
                </Box>

                <Stack spacing={0}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: textPrimary
                    }}
                  >
                    Cryptech Services
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: textSecondary,
                      lineHeight: 1.3
                    }}
                  >
                    Theme System
                  </Typography>
                </Stack>
              </Stack>

              {/* Navigation */}

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <AppButton
                  component="a"
                  href="/documentation"
                  variant="text"
                  color="primary"
                  size="small"
                  startIcon={<PaletteIcon />}
                  sx={{
                    minHeight: 36,
                    px: 1.25,
                    borderRadius: 1.5,

                    '&:hover': {
                      backgroundColor: alpha(primary, 0.08)
                    }
                  }}
                >
                  Documentation
                </AppButton>

                {GITHUB_URL && (
                  <AppButton
                    component="a"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    color="secondary"
                    size="small"
                    startIcon={<GitHubIcon />}
                    sx={{
                      minHeight: 36,
                      px: 1.25,
                      borderRadius: 1.5,

                      '&:hover': {
                        backgroundColor: alpha(secondary, 0.08)
                      }
                    }}
                  >
                    GitHub
                  </AppButton>
                )}
              </Stack>
            </Stack>

            {/* Bottom line */}

            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={1}
              sx={{
                pt: 2,

                alignItems: {
                  xs: 'flex-start',
                  sm: 'center'
                },

                justifyContent: 'space-between'
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: textSecondary
                }}
              >
                Built with MUI · Designed for scalable interfaces
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: primary,
                    boxShadow: {
                      xs: 'none',
                      md: `0 0 10px ${alpha(primary, 0.6)}`
                    }
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: textSecondary,
                    fontFamily: 'monospace'
                  }}
                >
                  {themeSet}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
