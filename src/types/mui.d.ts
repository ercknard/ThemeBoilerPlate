import '@mui/material/Typography';

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
