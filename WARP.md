# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Install dependencies

Use npm (lockfile is `package-lock.json`):

```bash
npm install
```

### Run the development server

Starts the Next.js dev server on port 3000:

```bash
npm run dev
```

Then open http://localhost:3000.

### Build for production

Creates an optimized production build:

```bash
npm run build
```

### Run the production server

Serves the previously built app:

```bash
npm run start
```

### Linting

Runs ESLint with Next.js's recommended config (`eslint-config-next`):

```bash
npm run lint
```

### Testing

There is currently no `test` script or test framework configured in `package.json`. Add your preferred test runner (e.g., Jest, Vitest, Playwright) and a corresponding `npm test` script before attempting to run tests from this repo.

## Project overview

This is a Next.js 16 project using the App Router, TypeScript, and Tailwind CSS, structured around the `src/app` directory.

### Routing and layout (`src/app`)

- `src/app/layout.tsx` defines the root `RootLayout` component used by all routes.
  - Loads `Geist` and `Geist_Mono` fonts via `next/font/google` and exposes them as CSS variables (`--font-geist-sans`, `--font-geist-mono`).
  - Wraps all pages in the `<html>` and `<body>` shell and applies the font variables plus `antialiased` to the `<body>`.
  - Exposes basic `metadata` (`title`, `description`) for the app.
- `src/app/page.tsx` is the main (index) route component.
  - Uses `next/image` and Tailwind utility classes to render the initial landing layout.
  - Currently contains the default "edit the page.tsx file" content from the Next.js starter; expect this to evolve into the portfolio landing page.

### Global styling and theming

- `src/app/globals.css` is imported once from `RootLayout` and is the central place for global styles and Tailwind setup.
  - Uses Tailwind CSS v4 via the `@import "tailwindcss";` directive.
  - Defines CSS custom properties `--background` and `--foreground` on `:root`, with a dark-mode variant under `@media (prefers-color-scheme: dark)`.
  - Declares a Tailwind `@theme inline` block that maps theme tokens (e.g., `--color-background`, `--color-foreground`, `--font-sans`, `--font-mono`) to the CSS variables set by the fonts and color scheme.
  - Sets base `<body>` styles (background, text color, fallback font family).
- `postcss.config.mjs` wires Tailwind into the build via the `"@tailwindcss/postcss"` plugin.

### Configuration and TypeScript setup

- `next.config.ts` currently exports a minimal `nextConfig` object; customize this if you need extra Next.js configuration (image domains, redirects, etc.).
- `tsconfig.json` enables strict TypeScript settings and configures Next.js tooling:
  - `strict: true`, `noEmit: true`, `moduleResolution: "bundler"`, and JSX set to `"react-jsx"`.
  - Includes all `.ts`/`.tsx` files in the repo plus Next.js-generated type files under `.next/`.
  - Defines a path alias `@/*` → `./src/*`, so imports like `@/app/page` or `@/components/...` will resolve to files under `src/`.

### Dependencies

- Runtime dependencies:
  - `next@16`, `react@19`, and `react-dom@19`.
- Dev dependencies:
  - `typescript`, `@types/node`, `@types/react`, `@types/react-dom` for typing.
  - `eslint` and `eslint-config-next` for linting.
  - `tailwindcss` and `@tailwindcss/postcss` for styling.

There are currently no additional domain-specific modules, components, or tests beyond the initial Next.js starter files in `src/app`. Future work will primarily involve expanding the `src` tree (e.g., adding route segments and shared components under `src/`) and updating `page.tsx` and `globals.css` to implement the desired portfolio design.