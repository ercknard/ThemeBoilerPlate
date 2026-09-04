'use client';

import * as React from 'react';

import MuiButton, {
  type ButtonProps as MuiButtonProps
} from '@mui/material/Button';
import MuiCard from '@mui/material/Paper';
import MuiChip from '@mui/material/Chip';
import MuiAlert from '@mui/material/Alert';
import MuiBadge from '@mui/material/Badge';
import MuiIconButton from '@mui/material/IconButton';
import MuiTextField from '@mui/material/TextField';
import MuiLinearProgress from '@mui/material/LinearProgress';
import MuiCircularProgress from '@mui/material/CircularProgress';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import MuiSwitch from '@mui/material/Switch';
import MuiCheckbox from '@mui/material/Checkbox';
import MuiDivider from '@mui/material/Divider';
import { semanticColors } from '@/theme/theme';
import MuiRadio from '@mui/material/Radio';
import MuiTooltip from '@mui/material/Tooltip';
import MuiDialog from '@mui/material/Dialog';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSnackbarContent from '@mui/material/SnackbarContent';
import MuiPaper from '@mui/material/Paper';

import { alpha, styled } from '@mui/material/styles';

/* ========================================================================== */
/* BUTTON                                                                     */
/* ========================================================================== */

const StyledAppButton = styled(MuiButton)(({ theme }) => ({
  minHeight: 42,
  padding: '8px 18px',
  borderRadius: 10,
  textTransform: 'none',
  fontWeight: 700,
  transition: 'all 180ms ease',

  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.colorScale[9],
    color: theme.colorScale.contrast,

    '&:hover': {
      backgroundColor: theme.colorScale[10],
      boxShadow: `0 8px 24px ${alpha(theme.colorScale[9], 0.22)}`
    }
  },

  '&.MuiButton-outlinedPrimary': {
    borderColor: theme.colorScale[7],
    color: theme.colorScale[11],

    '&:hover': {
      borderColor: theme.colorScale[9],
      backgroundColor: alpha(theme.colorScale[9], 0.08)
    }
  },

  '&.MuiButton-textPrimary': {
    color: theme.colorScale[11],

    '&:hover': {
      backgroundColor: alpha(theme.colorScale[9], 0.08)
    }
  },

  '&.MuiButton-containedSecondary': {
    backgroundColor: theme.secondaryScale[9],
    color: theme.secondaryScale.contrast,

    '&:hover': {
      backgroundColor: theme.secondaryScale[10],
      boxShadow: `0 8px 24px ${alpha(theme.secondaryScale[9], 0.18)}`
    }
  },

  '&.MuiButton-outlinedSecondary': {
    borderColor: theme.secondaryScale[7],
    color: theme.secondaryScale[11],

    '&:hover': {
      borderColor: theme.secondaryScale[9],
      backgroundColor: alpha(theme.secondaryScale[9], 0.08)
    }
  },

  '&.MuiButton-textSecondary': {
    color: theme.secondaryScale[11],

    '&:hover': {
      backgroundColor: alpha(theme.secondaryScale[9], 0.08)
    }
  },

  '&.Mui-disabled': {
    backgroundColor: theme.grayScale[4],
    color: theme.grayScale[8],
    borderColor: theme.grayScale[6]
  }
}));

/* ========================================================================== */
/* APP BUTTON                                                                 */
/* ========================================================================== */

type AppButtonProps = MuiButtonProps & {
  component?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
};

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(props, ref) {
    return <StyledAppButton ref={ref} {...props} />;
  }
);

AppButton.displayName = 'AppButton';

export const AppPaper = styled(MuiPaper)(({ theme }) => ({
  backgroundColor: theme.backgroundScale[5],
  backgroundImage: 'none',
  border: `1px solid ${theme.secondaryScale[6]}`,
  boxShadow: 'none'
}));

/* ========================================================================== */
/* CARD                                                                       */
/* ========================================================================== */

export const AppCard = styled(MuiCard)(({ theme }) => ({
  position: 'relative',

  overflow: 'hidden',

  backgroundColor: theme.backgroundScale[5],

  border: `1px solid ${theme.secondaryScale[6]}`,

  borderRadius: 16,

  transition: `
    border-color 180ms ease,
    box-shadow 180ms ease
  `,

  '&:hover': {
    borderColor: theme.secondaryScale[8],

    boxShadow: `0 12px 40px ${alpha(theme.secondaryScale[9], 0.08)}`
  }
}));

/* ========================================================================== */
/* CHIP                                                                       */
/* ========================================================================== */

export const AppChip = styled(MuiChip)(({ theme }) => ({
  borderRadius: 8,

  fontWeight: 700,

  /* PRIMARY */

  '&.MuiChip-colorPrimary': {
    backgroundColor: alpha(theme.colorScale[9], 0.14),

    color: theme.colorScale[11],

    borderColor: theme.colorScale[7]
  },

  /* SECONDARY */

  '&.MuiChip-colorSecondary': {
    backgroundColor: alpha(theme.secondaryScale[9], 0.14),

    color: theme.secondaryScale[11],

    borderColor: theme.secondaryScale[7]
  },

  /* NEUTRAL */

  '&.MuiChip-colorDefault': {
    backgroundColor: theme.grayScale[3],

    color: theme.grayScale[11],

    borderColor: theme.grayScale[6]
  }
}));

/* ========================================================================== */
/* ALERT                                                                      */
/* ========================================================================== */

export const AppAlert = styled(MuiAlert)(({ theme }) => ({
  borderRadius: 12,

  border: '1px solid',

  /* INFO / SUPPORTING */

  '&.MuiAlert-standardInfo': {
    backgroundColor: alpha(theme.secondaryScale[9], 0.08),

    borderColor: theme.secondaryScale[6],

    color: theme.secondaryScale[11]
  },

  /* SUCCESS */

  '&.MuiAlert-standardSuccess': {
    borderColor: alpha(semanticColors.success, 0.4)
  },

  /* WARNING */

  '&.MuiAlert-standardWarning': {
    borderColor: alpha(semanticColors.warning, 0.4)
  },

  /* ERROR */

  '&.MuiAlert-standardError': {
    borderColor: alpha(semanticColors.error, 0.4)
  }
}));

/* ========================================================================== */
/* BADGE                                                                      */
/* ========================================================================== */

export const AppBadge = styled(MuiBadge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.colorScale[9],

    color: theme.colorScale.contrast,

    fontWeight: 700
  }
}));

/* ========================================================================== */
/* ICON BUTTON                                                                */
/* ========================================================================== */

export const AppIconButton = styled(MuiIconButton)(({ theme }) => ({
  width: 42,
  height: 42,

  borderRadius: 10,

  color: theme.grayScale[11],

  transition: 'all 160ms ease',

  /* NEUTRAL */

  '&:hover': {
    backgroundColor: theme.grayScale[3],

    color: theme.grayScale[12]
  },

  /* PRIMARY */

  '&.MuiIconButton-colorPrimary': {
    color: theme.colorScale[11],

    '&:hover': {
      backgroundColor: alpha(theme.colorScale[9], 0.1)
    }
  },

  /* SECONDARY */

  '&.MuiIconButton-colorSecondary': {
    color: theme.secondaryScale[11],

    '&:hover': {
      backgroundColor: alpha(theme.secondaryScale[9], 0.1)
    }
  },

  /* DISABLED */

  '&.Mui-disabled': {
    color: theme.grayScale[7]
  }
}));

/* ========================================================================== */
/* TEXT FIELD                                                                 */
/* ========================================================================== */

export const AppTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,

    backgroundColor: theme.backgroundScale[2],

    '& fieldset': {
      borderColor: theme.grayScale[6]
    },

    '&:hover fieldset': {
      borderColor: theme.secondaryScale[7]
    },

    '&.Mui-focused fieldset': {
      borderColor: theme.colorScale[9]
    },

    '&.Mui-focused': {
      boxShadow: `0 0 0 3px ${alpha(theme.colorScale[9], 0.12)}`
    },

    '&.Mui-disabled': {
      backgroundColor: theme.grayScale[3],

      '& fieldset': {
        borderColor: theme.grayScale[5]
      }
    }
  },

  '& .MuiInputLabel-root': {
    color: theme.grayScale[10]
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.colorScale[11]
  },

  '& .MuiFormHelperText-root': {
    color: theme.grayScale[9]
  }
}));

/* ========================================================================== */
/* LINEAR PROGRESS                                                            */
/* ========================================================================== */

export const AppLinearProgress = styled(MuiLinearProgress)(({ theme }) => ({
  height: 7,

  borderRadius: 999,

  backgroundColor: theme.grayScale[4],

  '& .MuiLinearProgress-bar': {
    borderRadius: 999,

    backgroundColor: theme.colorScale[9]
  },

  '&.MuiLinearProgress-colorSecondary .MuiLinearProgress-bar': {
    backgroundColor: theme.secondaryScale[9]
  }
}));

/* ========================================================================== */
/* CIRCULAR PROGRESS                                                          */
/* ========================================================================== */

export const AppCircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  color: theme.colorScale[9],

  '&.MuiCircularProgress-colorSecondary': {
    color: theme.secondaryScale[9]
  }
}));

/* ========================================================================== */
/* TABS                                                                       */
/* ========================================================================== */

export const AppTabs = styled(MuiTabs)(({ theme }) => ({
  minHeight: 44,

  '& .MuiTabs-indicator': {
    height: 2,

    borderRadius: 999,

    backgroundColor: theme.colorScale[9]
  }
}));

export const AppTab = styled(MuiTab)(({ theme }) => ({
  minHeight: 44,

  paddingInline: 16,

  textTransform: 'none',

  fontWeight: 700,

  color: theme.grayScale[10],

  transition: 'color 160ms ease, background-color 160ms ease',

  '&:hover': {
    color: theme.secondaryScale[11],

    backgroundColor: alpha(theme.secondaryScale[9], 0.06)
  },

  '&.Mui-selected': {
    color: theme.colorScale[11]
  }
}));

/* ========================================================================== */
/* SWITCH                                                                     */
/* ========================================================================== */

export const AppSwitch = styled(MuiSwitch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: theme.grayScale[7],

    '&:hover': {
      backgroundColor: alpha(theme.grayScale[9], 0.08)
    },

    '&.Mui-checked': {
      color: theme.colorScale[9],

      '& + .MuiSwitch-track': {
        backgroundColor: theme.colorScale[8],

        opacity: 1
      }
    },

    '&.Mui-disabled': {
      color: theme.grayScale[6]
    }
  },

  '& .MuiSwitch-track': {
    backgroundColor: theme.grayScale[6],

    opacity: 1
  },

  '& .MuiSwitch-thumb': {
    boxShadow: 'none'
  }
}));

/* ========================================================================== */
/* CHECKBOX                                                                   */
/* ========================================================================== */

export const AppCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  color: theme.grayScale[8],

  '&:hover': {
    backgroundColor: alpha(theme.colorScale[9], 0.08)
  },

  '&.Mui-checked': {
    color: theme.colorScale[9]
  },

  '&.Mui-disabled': {
    color: theme.grayScale[6]
  }
}));

/* ========================================================================== */
/* DIVIDER                                                                    */
/* ========================================================================== */

export const AppDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.grayScale[6]
}));

/* ========================================================================== */
/* SECONDARY DIVIDER                                                          */
/* ========================================================================== */

export const AppSecondaryDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.secondaryScale[6]
}));

/* ========================================================================== */
/* RADIO                                                                      */
/* ========================================================================== */

export const AppRadio = styled(MuiRadio)(({ theme }) => ({
  color: theme.secondaryScale[7],

  '&.Mui-checked': {
    color: theme.colorScale[9]
  },

  '&.Mui-disabled': {
    color: theme.grayScale[8]
  }
}));

/* ========================================================================== */
/* TOOLTIP                                                                    */
/* ========================================================================== */

export const AppTooltip = styled(MuiTooltip)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.grayScale[12],
    color: theme.grayScale[1],
    borderRadius: 6,
    fontSize: '0.75rem'
  }
}));

/* ========================================================================== */
/* DIALOG                                                                     */
/* ========================================================================== */

export const AppDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.backgroundScale[2],
    border: `1px solid ${theme.secondaryScale[6]}`,
    backgroundImage: 'none'
  }
}));

/* ========================================================================== */
/* MENU                                                                       */
/* ========================================================================== */

export const AppMenu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.backgroundScale[2],
    border: `1px solid ${theme.secondaryScale[6]}`,
    backgroundImage: 'none'
  }
}));

/* ========================================================================== */
/* MENU ITEM                                                                  */
/* ========================================================================== */

export const AppMenuItem = styled(MuiMenuItem)(({ theme }) => ({
  borderRadius: 6,

  '&:hover': {
    backgroundColor: theme.secondaryScale[3]
  },

  '&.Mui-selected': {
    backgroundColor: theme.secondaryScale[4],

    '&:hover': {
      backgroundColor: theme.secondaryScale[5]
    }
  },

  '&.Mui-disabled': {
    color: theme.grayScale[9]
  }
}));

/* ========================================================================== */
/* SNACKBAR CONTENT                                                           */
/* ========================================================================== */

export const AppSnackbarContent = styled(MuiSnackbarContent)(({ theme }) => ({
  backgroundColor: theme.grayScale[12],
  color: theme.grayScale[1]
}));

/* ========================================================================== */
/* EXPORT COLLECTION                                                          */
/* ========================================================================== */

export const CustomComponents = {
  Button: AppButton,
  Card: AppCard,
  Paper: AppPaper,
  Chip: AppChip,
  Alert: AppAlert,
  Badge: AppBadge,

  IconButton: AppIconButton,

  TextField: AppTextField,

  LinearProgress: AppLinearProgress,
  CircularProgress: AppCircularProgress,

  Tabs: AppTabs,
  Tab: AppTab,

  Switch: AppSwitch,
  Checkbox: AppCheckbox,
  Radio: AppRadio,

  Divider: AppDivider,
  SecondaryDivider: AppSecondaryDivider,

  Tooltip: AppTooltip,

  Dialog: AppDialog,

  Menu: AppMenu,
  MenuItem: AppMenuItem,

  SnackbarContent: AppSnackbarContent
};

export default CustomComponents;
