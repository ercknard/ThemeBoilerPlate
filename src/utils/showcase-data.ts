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
