export type ColorStep = {
  step: number;
  title: string;
  description: string;
};

export type ColorScale = Record<number, string> & {
  surface?: string;
  indicator?: string;
  track?: string;
  contrast?: string;
};

export const customTypography = [
  {
    variant: 'display' as const,
    description: 'Large hero and landing-page text.',
    text: 'Display Typography',
    size: 'clamp(2.75rem, 6vw, 5rem)'
  },
  {
    variant: 'title' as const,
    description: 'Primary page and feature titles.',
    text: 'Page Title',
    size: 'clamp(2rem, 4vw, 3rem)'
  },
  {
    variant: 'sectionTitle' as const,
    description: 'Section and content-area titles.',
    text: 'Section Title',
    size: 'clamp(1.5rem, 2.5vw, 2rem)'
  },
  {
    variant: 'lead' as const,
    description:
      'Introductory text used to emphasize important supporting content.',
    text: 'Lead Typography',
    size: 'clamp(1.05rem, 1.5vw, 1.25rem)'
  },
  {
    variant: 'large' as const,
    description: 'Large supporting text for prominent interface content.',
    text: 'Large Typography',
    size: 'clamp(1rem, 1.2vw, 1.125rem)'
  },
  {
    variant: 'medium' as const,
    description: 'Medium-sized supporting interface text.',
    text: 'Medium Typography',
    size: 'clamp(0.9rem, 1vw, 1rem)'
  },
  {
    variant: 'small' as const,
    description: 'Compact supporting text and secondary information.',
    text: 'Small Typography',
    size: 'clamp(0.75rem, 0.85vw, 0.875rem)'
  },
  {
    variant: 'label' as const,
    description: 'Form labels and emphasized UI labels.',
    text: 'Form Label',
    size: 'clamp(0.7rem, 0.8vw, 0.8rem)'
  },
  {
    variant: 'overlineCustom' as const,
    description: 'Custom uppercase labels for specialized UI.',
    text: 'CUSTOM OVERLINE',
    size: 'clamp(0.65rem, 0.7vw, 0.75rem)'
  },
  {
    variant: 'code' as const,
    description: 'Monospace typography for code and technical values.',
    text: 'const typography = theme.typography;',
    size: 'clamp(0.75rem, 0.85vw, 0.875rem)'
  }
];

export const colorGroups: {
  title: string;
  description: string;
  steps: ColorStep[];
}[] = [
  {
    title: 'Backgrounds',
    description: 'App and subtle backgrounds',
    steps: [
      {
        step: 1,
        title: 'App background',
        description: 'The main application background'
      },
      {
        step: 2,
        title: 'Subtle background',
        description: 'Secondary and recessed backgrounds'
      }
    ]
  },

  {
    title: 'Interactive components',
    description: 'UI elements and interaction states',
    steps: [
      {
        step: 3,
        title: 'UI element background',
        description: 'Background for interactive elements'
      },
      {
        step: 4,
        title: 'Hovered UI element',
        description: 'Hover state for interactive elements'
      },
      {
        step: 5,
        title: 'Selected / active',
        description: 'Selected, active, or pressed state'
      }
    ]
  },

  {
    title: 'Borders and separators',
    description: 'Borders, dividers, and focus states',
    steps: [
      {
        step: 6,
        title: 'Subtle border',
        description: 'Low-contrast borders and separators'
      },
      {
        step: 7,
        title: 'Default border',
        description: 'Standard component borders'
      },
      {
        step: 8,
        title: 'Strong border',
        description: 'Hovered and emphasized borders'
      }
    ]
  },

  {
    title: 'Solid colors',
    description: 'High-emphasis solid colors',
    steps: [
      {
        step: 9,
        title: 'Solid background',
        description: 'Primary solid color'
      },
      {
        step: 10,
        title: 'Hovered solid',
        description: 'Hovered solid color'
      }
    ]
  },

  {
    title: 'Accessible text',
    description: 'Text colors with accessible contrast',
    steps: [
      {
        step: 11,
        title: 'Low-contrast text',
        description: 'Secondary and supporting text'
      },
      {
        step: 12,
        title: 'High-contrast text',
        description: 'Primary readable text'
      }
    ]
  }
];

export type ShowcaseTab = 'overview' | 'typography' | 'colors' | 'components';

export const showcaseTabs: {
  value: ShowcaseTab;
  label: string;
}[] = [
  {
    value: 'overview',
    label: 'Overview'
  },
  {
    value: 'typography',
    label: 'Typography'
  },
  {
    value: 'colors',
    label: 'Colors'
  },
  {
    value: 'components',
    label: 'Components'
  }
];
