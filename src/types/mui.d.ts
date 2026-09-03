import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    display: React.CSSProperties;
    title: React.CSSProperties;
    sectionTitle: React.CSSProperties;
    lead: React.CSSProperties;
    large: React.CSSProperties;
    medium: React.CSSProperties;
    small: React.CSSProperties;
    label: React.CSSProperties;
    overlineCustom: React.CSSProperties;
    code: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
    title?: React.CSSProperties;
    sectionTitle?: React.CSSProperties;
    lead?: React.CSSProperties;
    large?: React.CSSProperties;
    medium?: React.CSSProperties;
    small?: React.CSSProperties;
    label?: React.CSSProperties;
    overlineCustom?: React.CSSProperties;
    code?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true;
    title: true;
    sectionTitle: true;
    lead: true;
    large: true;
    medium: true;
    small: true;
    label: true;
    overlineCustom: true;
    code: true;
  }
}
