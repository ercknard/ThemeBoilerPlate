# Next.js Boilerplate

A modern **Next.js boilerplate** built with TypeScript, Material UI, Emotion, and Tailwind CSS.

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Material UI (MUI)**
* **Emotion**
* **Tailwind CSS**
* **ESLint**

## Requirements

* Node.js 20.9 or later
* npm

## Getting Started

Clone the repository:

```bash
git clone https://github.com/username/repository.git
cd repository
```

Install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env.local
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

## Project Structure

```text
.
├── public/
│   └── ...
├── src/
│   └── pages/
│       ├── _app.tsx
│       ├── index.tsx
│       └── 404.tsx
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Import Aliases

The project supports convenient path aliases:

```tsx
import Component from '@/components/Component';
```

Server-side imports:

```tsx
import something from '@server/something';
```

Worker imports:

```tsx
import something from '@worker/something';
```

Configured aliases:

```text
@/*         → src/*
@server/*   → server/*
@worker/*   → server_worker/*
```

## Styling

### Material UI

```tsx
import { Box, Typography } from '@mui/material';

export default function Example() {
  return (
    <Box>
      <Typography>Hello World</Typography>
    </Box>
  );
}
```

### Tailwind CSS

Tailwind can be used directly in components:

```tsx
export default function Example() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        Hello World
      </h1>
    </div>
  );
}
```

MUI and Tailwind can be used together when appropriate.

## Environment Variables

Create `.env.local` for local development.

Example:

```env
NEXT_PUBLIC_APP_NAME=Next.js App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Do not commit `.env.local` or other files containing secrets.

Use `.env.example` as the template for required environment variables.

> Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never place private secrets in them.

## Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Error Pages

Custom error pages are located in:

```text
src/pages/404.tsx
```

Additional Pages Router error pages can be added as needed:

```text
src/pages/400.tsx
src/pages/403.tsx
src/pages/404.tsx
src/pages/429.tsx
src/pages/500.tsx
src/pages/503.tsx
```

## License

This project is licensed under the MIT License.
