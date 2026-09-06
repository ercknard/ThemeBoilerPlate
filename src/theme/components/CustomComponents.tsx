'use client';

import * as React from 'react';

import MuiAlert from '@mui/material/Alert';
import MuiBadge from '@mui/material/Badge';
import MuiButton, {
  type ButtonProps as MuiButtonProps
} from '@mui/material/Button';
import MuiCheckbox from '@mui/material/Checkbox';
import MuiCircularProgress from '@mui/material/CircularProgress';
import MuiDivider from '@mui/material/Divider';
import MuiDialog from '@mui/material/Dialog';
import MuiIconButton from '@mui/material/IconButton';
import MuiLinearProgress from '@mui/material/LinearProgress';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiPaper from '@mui/material/Paper';
import MuiRadio from '@mui/material/Radio';
import MuiSnackbarContent from '@mui/material/SnackbarContent';
import MuiSwitch from '@mui/material/Switch';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import MuiTextField from '@mui/material/TextField';
import MuiTooltip from '@mui/material/Tooltip';
import MuiChip from '@mui/material/Chip';

import { alpha, styled } from '@mui/material/styles';

/* ========================================================================== */
/* SHARED CONSTANTS                                                           */
/* ========================================================================== */

const TRANSITION_FAST = '160ms ease';
const TRANSITION_NORMAL = '180ms ease';

const RADIUS_SM = 6;
const RADIUS_MD = 8;
const RADIUS_LG = 10;
const RADIUS_XL = 12;
const RADIUS_XXL = 16;

/* ========================================================================== */
/* BUTTON                                                                     */
/* ========================================================================== */

const StyledAppButton = styled(MuiButton)(({ theme }) => ({
  minHeight: 42,
  padding: '8px 18px',

  borderRadius: RADIUS_LG,

  textTransform: 'none',
  fontWeight: 700,

  transition: `all ${TRANSITION_NORMAL}`,

  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.colorScale[9],
    color: theme.colorScale.contrast,

    '&:hover': {
      backgroundColor: theme.colorScale[10],
      boxShadow: `0 8px 24px ${alpha(theme.colorScale[9], 0.22)}`
    },

    '&:active': {
      backgroundColor: theme.colorScale[8]
    }
  },

  '&.MuiButton-containedSecondary': {
    backgroundColor: theme.secondaryScale[9],
    color: theme.secondaryScale.contrast,

    '&:hover': {
      backgroundColor: theme.secondaryScale[10],
      boxShadow: `0 8px 24px ${alpha(theme.secondaryScale[9], 0.18)}`
    },

    '&:active': {
      backgroundColor: theme.secondaryScale[8]
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

  '&.MuiButton-outlinedSecondary': {
    borderColor: theme.secondaryScale[7],
    color: theme.secondaryScale[11],

    '&:hover': {
      borderColor: theme.secondaryScale[9],
      backgroundColor: alpha(theme.secondaryScale[9], 0.08)
    }
  },

  '&.MuiButton-textPrimary': {
    color: theme.colorScale[11],

    '&:hover': {
      backgroundColor: alpha(theme.colorScale[9], 0.08)
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
    borderColor: theme.grayScale[6],

    boxShadow: 'none'
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

/* ========================================================================== */
/* PAPER                                                                      */
/* ========================================================================== */

export const AppPaper = styled(MuiPaper)(({ theme }) => ({
  position: 'relative',

  backgroundColor: theme.secondaryScale[4],
  backgroundImage: 'none',

  border: `1px solid ${theme.secondaryScale[6]}`,
  borderRadius: RADIUS_XL,

  boxShadow: 'none',

  transition: `border-color ${TRANSITION_NORMAL}, box-shadow ${TRANSITION_NORMAL}`,

  '&:hover': {
    borderColor: theme.secondaryScale[7]
  }
}));

/* ========================================================================== */
/* CARD                                                                       */
/* ========================================================================== */

export const AppCard = styled(MuiPaper)(({ theme }) => ({
  position: 'relative',

  overflow: 'hidden',

  backgroundColor: theme.secondaryScale[4],
  backgroundImage: 'none',

  border: `1px solid ${theme.secondaryScale[6]}`,
  borderRadius: RADIUS_XXL,

  boxShadow: 'none',

  transition: `
    border-color ${TRANSITION_NORMAL},
    box-shadow ${TRANSITION_NORMAL},
    transform ${TRANSITION_NORMAL}
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
  minHeight: 30,

  borderRadius: RADIUS_MD,

  fontWeight: 700,

  transition: `all ${TRANSITION_FAST}`,

  '& .MuiChip-label': {
    paddingInline: 10
  },

  /* ------------------------------------------------------------------------ */
  /* PRIMARY                                                                  */
  /* ------------------------------------------------------------------------ */

  '&.MuiChip-colorPrimary': {
    backgroundColor: alpha(theme.colorScale[9], 0.14),
    color: theme.colorScale[11],
    borderColor: theme.colorScale[7],

    '&:hover': {
      backgroundColor: alpha(theme.colorScale[9], 0.2)
    }
  },

  /* ------------------------------------------------------------------------ */
  /* SECONDARY                                                                */
  /* ------------------------------------------------------------------------ */

  '&.MuiChip-colorSecondary': {
    backgroundColor: alpha(theme.secondaryScale[9], 0.14),
    color: theme.secondaryScale[11],
    borderColor: theme.secondaryScale[7],

    '&:hover': {
      backgroundColor: alpha(theme.secondaryScale[9], 0.2)
    }
  },

  /* ------------------------------------------------------------------------ */
  /* DEFAULT                                                                  */
  /* ------------------------------------------------------------------------ */

  '&.MuiChip-colorDefault': {
    backgroundColor: theme.grayScale[3],
    color: theme.grayScale[11],
    borderColor: theme.grayScale[6],

    '&:hover': {
      backgroundColor: theme.grayScale[4]
    }
  }
}));

/* ========================================================================== */
/* ALERT                                                                      */
/* ========================================================================== */

export const AppAlert = styled(MuiAlert)(({ theme }) => ({
  borderRadius: RADIUS_XL,

  border: '1px solid',

  '& .MuiAlert-icon': {
    color: 'inherit'
  },

  '& .MuiAlert-message': {
    color: 'inherit'
  },

  /* ------------------------------------------------------------------------ */
  /* INFO                                                                     */
  /* ------------------------------------------------------------------------ */

  '&.MuiAlert-standardInfo': {
    backgroundColor: alpha(theme.secondaryScale[9], 0.08),

    borderColor: theme.secondaryScale[6],

    color: theme.secondaryScale[11]
  },

  /* ------------------------------------------------------------------------ */
  /* SUCCESS                                                                  */
  /* ------------------------------------------------------------------------ */

  '&.MuiAlert-standardSuccess': {
    backgroundColor: alpha(theme.palette.success.main, 0.08),

    borderColor: alpha(theme.palette.success.main, 0.4),

    color: theme.palette.success.main
  },

  /* ------------------------------------------------------------------------ */
  /* WARNING                                                                  */
  /* ------------------------------------------------------------------------ */

  '&.MuiAlert-standardWarning': {
    backgroundColor: alpha(theme.palette.warning.main, 0.08),

    borderColor: alpha(theme.palette.warning.main, 0.4),

    color: theme.palette.warning.main
  },

  /* ------------------------------------------------------------------------ */
  /* ERROR                                                                    */
  /* ------------------------------------------------------------------------ */

  '&.MuiAlert-standardError': {
    backgroundColor: alpha(theme.palette.error.main, 0.08),

    borderColor: alpha(theme.palette.error.main, 0.4),

    color: theme.palette.error.main
  }
}));

/* ========================================================================== */
/* BADGE                                                                      */
/* ========================================================================== */

export const AppBadge = styled(MuiBadge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    minWidth: 20,
    height: 20,

    paddingInline: 5,

    backgroundColor: theme.colorScale[9],
    color: theme.colorScale.contrast,

    border: `2px solid ${theme.backgroundScale[2]}`,

    fontWeight: 700,
    fontSize: '0.7rem'
  }
}));

/* ========================================================================== */
/* ICON BUTTON                                                                */
/* ========================================================================== */

export const AppIconButton = styled(MuiIconButton)(({ theme }) => ({
  width: 42,
  height: 42,

  borderRadius: RADIUS_LG,

  color: theme.grayScale[11],

  transition: `all ${TRANSITION_FAST}`,

  '&:hover': {
    backgroundColor: theme.grayScale[3],
    color: theme.grayScale[12]
  },

  /* ------------------------------------------------------------------------ */
  /* PRIMARY                                                                  */
  /* ------------------------------------------------------------------------ */

  '&.MuiIconButton-colorPrimary': {
    color: theme.colorScale[11],

    '&:hover': {
      backgroundColor: alpha(theme.colorScale[9], 0.1)
    }
  },

  /* ------------------------------------------------------------------------ */
  /* SECONDARY                                                                */
  /* ------------------------------------------------------------------------ */

  '&.MuiIconButton-colorSecondary': {
    color: theme.secondaryScale[11],

    '&:hover': {
      backgroundColor: alpha(theme.secondaryScale[9], 0.1)
    }
  },

  /* ------------------------------------------------------------------------ */
  /* DISABLED                                                                 */
  /* ------------------------------------------------------------------------ */

  '&.Mui-disabled': {
    color: theme.grayScale[7],

    backgroundColor: 'transparent'
  }
}));

/* ========================================================================== */
/* TEXT FIELD                                                                 */
/* ========================================================================== */

export const AppTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    minHeight: 44,

    borderRadius: RADIUS_LG,

    backgroundColor: theme.backgroundScale[2],

    transition: `all ${TRANSITION_FAST}`,

    '& fieldset': {
      borderColor: theme.grayScale[6],

      transition: `border-color ${TRANSITION_FAST}`
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

    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main
    },

    '&.Mui-error.Mui-focused': {
      boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.12)}`
    },

    '&.Mui-disabled': {
      backgroundColor: theme.grayScale[3],

      '& fieldset': {
        borderColor: theme.grayScale[5]
      }
    }
  },

  '& .MuiInputLabel-root': {
    color: theme.grayScale[10],

    '&.Mui-focused': {
      color: theme.colorScale[11]
    },

    '&.Mui-error': {
      color: theme.palette.error.main
    }
  },

  '& .MuiInputBase-input': {
    color: theme.grayScale[12],

    '&::placeholder': {
      color: theme.grayScale[8],
      opacity: 1
    }
  },

  '& .MuiFormHelperText-root': {
    marginInline: 2,

    color: theme.grayScale[9],

    '&.Mui-error': {
      color: theme.palette.error.main
    }
  }
}));

/* ========================================================================== */
/* LINEAR PROGRESS                                                            */
/* ========================================================================== */

export const AppLinearProgress = styled(MuiLinearProgress)(({ theme }) => ({
  height: 7,

  borderRadius: 999,

  backgroundColor: theme.grayScale[4],

  overflow: 'hidden',

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

  '& .MuiTabs-flexContainer': {
    gap: 2
  },

  '& .MuiTabs-indicator': {
    height: 2,

    borderRadius: 999,

    backgroundColor: theme.colorScale[9]
  }
}));

/* ========================================================================== */
/* TAB                                                                        */
/* ========================================================================== */

export const AppTab = styled(MuiTab)(({ theme }) => ({
  minHeight: 44,

  minWidth: 0,

  paddingInline: 16,

  borderRadius: RADIUS_MD,

  textTransform: 'none',

  fontWeight: 700,

  color: theme.grayScale[10],

  transition: `color ${TRANSITION_FAST}, background-color ${TRANSITION_FAST}`,

  '&:hover': {
    color: theme.secondaryScale[11],

    backgroundColor: alpha(theme.secondaryScale[9], 0.06)
  },

  '&.Mui-selected': {
    color: theme.colorScale[11]
  },

  '&.Mui-focusVisible': {
    backgroundColor: alpha(theme.colorScale[9], 0.1)
  }
}));

/* ========================================================================== */
/* SWITCH                                                                     */
/* ========================================================================== */

export const AppSwitch = styled(MuiSwitch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: theme.grayScale[7],

    transition: `color ${TRANSITION_FAST}, transform ${TRANSITION_FAST}`,

    '&:hover': {
      backgroundColor: alpha(theme.grayScale[9], 0.08)
    },

    '&.Mui-checked': {
      color: theme.colorScale[9],

      '& + .MuiSwitch-track': {
        backgroundColor: theme.colorScale[8],

        opacity: 1
      },

      '&:hover': {
        backgroundColor: alpha(theme.colorScale[9], 0.08)
      }
    },

    '&.Mui-disabled': {
      color: theme.grayScale[6]
    }
  },

  '& .MuiSwitch-track': {
    backgroundColor: theme.grayScale[6],

    opacity: 1,

    borderRadius: 999
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

  transition: `color ${TRANSITION_FAST}`,

  '&:hover': {
    backgroundColor: alpha(theme.colorScale[9], 0.08)
  },

  '&.Mui-checked': {
    color: theme.colorScale[9]
  },

  '&.MuiCheckbox-colorSecondary.Mui-checked': {
    color: theme.secondaryScale[9]
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

  transition: `color ${TRANSITION_FAST}`,

  '&:hover': {
    backgroundColor: alpha(theme.colorScale[9], 0.08)
  },

  '&.Mui-checked': {
    color: theme.colorScale[9]
  },

  '&.MuiRadio-colorSecondary.Mui-checked': {
    color: theme.secondaryScale[9]
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
    maxWidth: 320,

    padding: '7px 10px',

    backgroundColor: theme.grayScale[12],

    color: theme.grayScale[1],

    borderRadius: RADIUS_SM,

    fontSize: '0.75rem',
    fontWeight: 500,

    boxShadow: `0 8px 24px ${alpha(theme.grayScale[12], 0.25)}`
  },

  '& .MuiTooltip-arrow': {
    color: theme.grayScale[12]
  }
}));

/* ========================================================================== */
/* DIALOG                                                                     */
/* ========================================================================== */

export const AppDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.backgroundScale[2],

    backgroundImage: 'none',

    border: `1px solid ${theme.secondaryScale[6]}`,

    borderRadius: RADIUS_XL,

    boxShadow: `0 24px 80px ${alpha(theme.grayScale[12], 0.35)}`
  }
}));

/* ========================================================================== */
/* MENU                                                                       */
/* ========================================================================== */

export const AppMenu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 180,

    padding: 4,

    backgroundColor: theme.backgroundScale[2],

    backgroundImage: 'none',

    border: `1px solid ${theme.secondaryScale[6]}`,

    borderRadius: RADIUS_LG,

    boxShadow: `0 12px 40px ${alpha(theme.grayScale[12], 0.25)}`
  }
}));

/* ========================================================================== */
/* MENU ITEM                                                                  */
/* ========================================================================== */

export const AppMenuItem = styled(MuiMenuItem)(({ theme }) => ({
  minHeight: 38,

  marginBlock: 2,

  borderRadius: RADIUS_SM,

  color: theme.grayScale[11],

  transition: `background-color ${TRANSITION_FAST}, color ${TRANSITION_FAST}`,

  '&:hover': {
    backgroundColor: theme.secondaryScale[3],

    color: theme.secondaryScale[12]
  },

  '&.Mui-selected': {
    backgroundColor: theme.secondaryScale[4],

    color: theme.secondaryScale[12],

    '&:hover': {
      backgroundColor: theme.secondaryScale[5]
    }
  },

  '&.Mui-focusVisible': {
    backgroundColor: alpha(theme.secondaryScale[9], 0.12)
  },

  '&.Mui-disabled': {
    color: theme.grayScale[9]
  }
}));

/* ========================================================================== */
/* SNACKBAR CONTENT                                                           */
/* ========================================================================== */

export const AppSnackbarContent = styled(MuiSnackbarContent)(({ theme }) => ({
  minHeight: 48,

  backgroundColor: theme.grayScale[12],

  color: theme.grayScale[1],

  border: `1px solid ${theme.grayScale[7]}`,

  borderRadius: RADIUS_LG,

  boxShadow: `0 12px 40px ${alpha(theme.grayScale[12], 0.3)}`
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
