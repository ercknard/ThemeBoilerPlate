# Theme Boilerplate

A modern Next.js + TypeScript + Material UI boilerplate with a customizable design system, theme presets, responsive typography, color scales, and MUI component customization.

---

## 💻 Development

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# 🎨 Theme System

The project includes a custom theme system built on top of MUI.

It supports:

* Light mode
* Dark mode
* Multiple color presets
* Custom colors
* Custom gray scale
* Custom background scale
* Radix-inspired 12-step color relationships
* Custom typography
* Responsive breakpoints
* MUI component customization

The main theme configuration is located at:

```text
src/theme/theme.ts
```

---

# 🌈 Theme Presets

The boilerplate includes several predefined themes.

| Theme  | Primary   | Gray      | Background |
| ------ | --------- | --------- | ---------- |
| Blue   | `#4967C9` | `#707070` | `#0A0A0A`  |
| Purple | `#8B5CF6` | `#707070` | `#100B1A`  |
| Gold   | `#F2C94C` | `#707070` | `#171205`  |
| Green  | `#30A46C` | `#707070` | `#07140D`  |

Themes can be changed using the theme controls.

---

# 🖌️ Custom Colors

The theme system supports custom colors.

```ts
type CustomThemeColors = {
  color: string;
  gray: string;
  background: string;
};
```

Example:

```ts
const colors = {
  color: '#4967C9',
  gray: '#707070',
  background: '#0A0A0A'
};
```

The theme automatically generates the corresponding color relationships.

---

# 🌈 Color Scales

The theme generates a 12-step color scale inspired by the Radix color system.

| Step | Purpose                      |
| ---: | ---------------------------- |
|    1 | App background               |
|    2 | Subtle background            |
|    3 | UI element background        |
|    4 | Hovered UI element           |
|    5 | Selected / active UI element |
|    6 | Subtle border                |
|    7 | Default border               |
|    8 | Strong border                |
|    9 | Solid background             |
|   10 | Hovered solid background     |
|   11 | Low-contrast text            |
|   12 | High-contrast text           |

Additional semantic tokens are available:

```ts
colorScale.surface
colorScale.indicator
colorScale.track
colorScale.contrast
```

---

# 🌓 Light & Dark Mode

The application supports both light and dark modes.

The mode can be changed through the theme controls.

Theme preferences are stored in `localStorage`:

```text
theme-mode
```

When no preference has been saved, the application detects the user's system color preference.

---

# 📚 Theme Showcase

The `/theme` page provides an interactive overview of the design system.

Open:

```text
http://localhost:3000/theme
```

The showcase includes:

## Overview

General theme and typography examples.

## Typography

Examples of the custom typography system and responsive typography.

## Colors

Examples of:

* Color scales
* Gray scales
* Background scales
* Semantic colors
* Color usage
* Text colors

## Components

Examples of MUI components styled using the active theme.

---

# ✍️ Typography

The boilerplate extends MUI typography with custom variants.

Available variants:

```text
display
title
sectionTitle
lead
large
medium
small
label
overlineCustom
code
```

Example:

```tsx
<Typography variant="display">
  Hello World
</Typography>
```

---

# 🧩 MUI Components

The theme provides custom styling for commonly used MUI components, including:

* Buttons
* Icon Buttons
* Cards
* Papers
* Inputs
* Input Labels
* Chips
* Tooltips
* Dividers
* Checkboxes
* Radio buttons
* Switches
* Progress indicators
* Tabs
* Dialogs
* Menus
* Menu items
* Snackbar content

Component styles automatically adapt to the active theme.

---

# 📁 Project Structure

```text
.
├── public/
│   └── static/
│       └── logo.png
│
├── src/
│   ├── contexts/
│   │   └── themeContext.tsx
│   │
│   ├── pages/
│   │   ├── index.tsx
│   │   └── theme.tsx
│   │
│   ├── theme/
│   │   ├── theme.ts
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   │
│   └── ...
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🎛️ Theme Context

Theme state is managed through a custom React context.

Example:

```tsx
import { useThemeContext } from '@/contexts/themeContext';

export default function Example() {
  const {
    mode,
    isDarkMode,
    themeSet,
    toggleTheme,
    setThemeSet,
    customColors,
    setCustomColors
  } = useThemeContext();

  return (
    <div>
      Current theme: {themeSet}
    </div>
  );
}
```

---

# 💾 Persistent Preferences

Theme settings are saved to `localStorage`.

Stored values include:

```text
theme-mode
theme-set
theme-custom-colors
```

This allows theme preferences to persist between page reloads and sessions.

---

# 🖼️ Logo

The homepage supports a logo above the BoilerPlate title.

Place the image here:

```text
public/static/logo.png
```

Example:

```tsx
<Image
  src="/static/logo.png"
  alt="BoilerPlate"
  fill
  priority
  style={{
    objectFit: 'contain'
  }}
/>
```

---

# 🔗 Navigation

The homepage includes quick links to the theme showcase and GitHub repository.

## Theme

```text
/theme
```

Opens the interactive theme showcase.

## GitHub

Update the GitHub URL in the homepage:

```ts
const GITHUB_URL =
  'https://github.com/ercknard/ThemeBoilerPlate';
```

---

# 📱 Responsive Design

The boilerplate uses custom MUI breakpoints:

```ts
xs: 0
sm: 600
md: 960
lg: 1280
xl: 1440
xxl: 1600
xxxl: 1920
xxxxl: 2560
```

Responsive MUI styling can be used throughout the application:

```tsx
<Box
  sx={{
    px: { xs: 2, md: 4 },
    py: { xs: 4, md: 8 }
  }}
>
  ...
</Box>
```

---

# 🛠️ Customization

The main customization points are:

```text
src/theme/theme.ts
```

Use this file to modify:

* Color generation
* Theme presets
* Typography
* Breakpoints
* MUI component overrides
* Border radius
* Semantic colors

Theme state:

```text
src/contexts/themeContext.tsx
```

Theme controls:

```text
src/theme/ThemeToggle.tsx
```

---

# 📦 Technologies

| Technology  | Purpose            |
| ----------- | ------------------ |
| Next.js     | React framework    |
| TypeScript  | Type safety        |
| Material UI | UI components      |
| Emotion     | MUI styling engine |
| React       | UI library         |

---

# 📄 License

This project is available for personal and commercial use unless otherwise specified by the repository owner.

---

# 👨‍💻 Author

**CryptechServices**

Built with Next.js, TypeScript, and Material UI.

---

# ⭐ Contributing

Contributions, improvements, and suggestions are welcome.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

---

# 🔗 Links

* **Theme Showcase:** `/theme`
* **GitHub:** `https://github.com/ercknard/ThemeBoilerPlate`

---

> A clean starting point for building modern applications with a customizable MUI design system.
