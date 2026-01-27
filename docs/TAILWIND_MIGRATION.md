# Tailwind CSS Migration Guide

This document explains our Tailwind CSS setup and migration strategy from styled-components.

## Table of Contents

- [Overview](#overview)
- [Why Tailwind?](#why-tailwind)
- [Project Setup](#project-setup)
- [Design System](#design-system)
- [How to Write Styles](#how-to-write-styles)
- [Tooling](#tooling)
- [Migration Process](#migration-process)
- [FAQ](#faq)

---

## Overview

We are migrating from **styled-components** to **Tailwind CSS** for improved performance, better developer experience, and smaller bundle sizes. This is a gradual migration - both systems will coexist during the transition.

### Key Benefits

- **Performance**: No runtime CSS-in-JS overhead
- **Bundle Size**: Tailwind purges unused styles automatically
- **Developer Experience**: Faster styling with utility classes
- **Consistency**: Design tokens enforced through configuration

---

## Why Tailwind?

| styled-components | Tailwind CSS |
|-------------------|--------------|
| Runtime CSS generation | Build-time CSS generation |
| Requires `'use client'` directive | Works with Server Components |
| Dynamic styles via props | Conditional classes via `cn()` |
| Custom CSS syntax | Utility-first classes |
| Theme via ThemeProvider | Theme via config + CSS variables |

---

## Project Setup

### File Structure

```
├── tailwind.config.js      # Design tokens (colors, typography, spacing)
├── app/globals.css         # CSS variables, @tailwind directives, base styles
├── lib/
│   ├── cn.ts               # Utility for conditional class merging
│   └── cva.ts              # Class Variance Authority for component variants
├── .prettierrc             # Prettier config with Tailwind class sorting
├── eslint.config.mjs       # ESLint with a11y, perfectionist, unused-imports
├── .vscode/
│   ├── settings.json       # VS Code settings for Tailwind IntelliSense
│   └── extensions.json     # Recommended VS Code extensions
├── scripts/checks/         # Compliance check scripts
│   ├── index.mjs           # Main runner
│   ├── ada.mjs             # Accessibility checks
│   ├── seo.mjs             # SEO checks
│   └── performance.mjs     # Performance checks
└── .cursor/rules/
    ├── tailwind-migration.mdc  # AI migration guidelines
    └── design-tokens.mdc       # Design token quick reference
```

### NPM Scripts

```bash
# Development
npm run dev              # Start dev server

# Linting & Formatting
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check formatting

# Compliance Checks
npm run checks           # Run ALL compliance checks
npm run checks:ada       # Run accessibility checks only
npm run checks:seo       # Run SEO checks only
npm run checks:perf      # Run performance checks only
```

---

## Design System

Our design tokens from `styles/colors.js`, `styles/text.js`, and `styles/media.js` are now available as Tailwind utilities.

### Breakpoints

| Prefix | Range | Usage |
|--------|-------|-------|
| `mob:` | 0 - 480px | Mobile-only styles |
| `tab:` | 481px - 1024px | Tablet-only styles |
| `desk:` | 1025px - 1600px | Desktop-only styles |
| `fw:` | 1601px+ | Large screens (full width) |

**Example:**
```jsx
<h1 className="text-h1-mob tab:text-h1-tab desk:text-h1-desk fw:text-h1">
  Responsive Heading
</h1>
```

### Colors

All colors from `styles/colors.js` are available:

```jsx
// Purple variants
className="text-purple-DEFAULT"     // #3D2562
className="bg-purple-dark"          // #201435
className="border-purple-border"    // #945AEE
className="text-purple-light"       // #7E5FDD

// Orange variants
className="bg-orange-DEFAULT"       // #ff5100
className="text-orange-500"         // #FF612A

// Teal variants
className="bg-teal-DEFAULT"         // #00A19B
className="text-teal-dark"          // #007C77

// Greys
className="bg-grey-800"             // #191D1E
className="text-grey-500"           // #838587
className="bg-grey-25"              // #F6F7F7

// Text colors
className="text-txt-primary"        // #1B1D21
className="text-txt-subtle"         // #808085
```

### Gradients

Gradients are available via CSS custom properties:

```jsx
className="bg-purple-gradient"      // Purple gradient
className="bg-orange-gradient"      // Orange gradient
className="bg-purple-orbital"       // Orbital purple gradient
className="bg-light-purple"         // Light purple gradient
className="bg-dark-purple"          // Dark purple gradient
className="bg-medium-purple"        // Medium purple gradient
className="bg-grey-gradient"        // Grey gradient
```

### Typography

Font sizes mapped from `styles/text.js`:

```jsx
// Headings
className="text-h1"                 // 46px / 56px line-height / 800 weight
className="text-h2"                 // 46px / 56px line-height / 700 weight
className="text-h3"                 // 32px / 40px line-height / 700 weight
className="text-h4"                 // 26px / 32px line-height / 700 weight
className="text-h5"                 // 20px / 24px line-height / 700 weight

// Body text
className="text-body-xl"            // 23px / 30px line-height
className="text-body-xl-bold"       // 23px / 28px line-height / 700 weight
className="text-body-lg"            // 18px / 24px line-height
className="text-body-lg-bold"       // 18px / 22px line-height / 700 weight
className="text-body-md"            // 16px / 22px line-height
className="text-body-md-bold"       // 16px / 22px line-height / 600 weight
className="text-body-sm"            // 14px / 18px line-height
className="text-body-sm-bold"       // 14px / 18px line-height / 700 weight

// Special styles
className="text-eyebrow"            // 14px uppercase with letter-spacing
className="text-tag"                // 10px
className="text-tag-bold"           // 11px / 600 weight
className="text-subtle"             // 14px subtle text

// Font families
className="font-archivo"            // Archivo font
className="font-archivo-bold"       // Archivo Bold
className="font-orbitron"           // Orbitron (for stats)
```

---

## How to Write Styles

### The `cn()` Utility

Use the `cn()` utility for conditional and merged class names:

```jsx
import { cn } from '@/lib/cn';

// Basic usage
<div className={cn('px-4 py-2', 'bg-purple-DEFAULT')}>

// Conditional classes
<button className={cn(
  'px-4 py-2 rounded-md',
  isActive && 'bg-purple-DEFAULT text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>

// Object syntax
<div className={cn({
  'bg-green-500': isSuccess,
  'bg-red-500': isError,
  'bg-grey-200': !isSuccess && !isError
})}>

// Overriding classes (tailwind-merge handles conflicts)
<div className={cn('px-4', 'px-6')}>  {/* Results in 'px-6' */}
```

### Class Variance Authority (CVA)

Use CVA for components with multiple variants. It provides type-safe variant props and clean organization:

```jsx
import { cva, type VariantProps } from '@/lib/cva';
import { cn } from '@/lib/cn';

// Define variants
const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-purple-DEFAULT text-white hover:bg-purple-dark focus:ring-purple-border',
        secondary: 'bg-transparent border-2 border-purple-border text-purple-DEFAULT hover:bg-purple-100',
        orange: 'bg-orange-DEFAULT text-white hover:bg-orange-dark focus:ring-orange-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-body-sm',
        md: 'px-4 py-2 text-body-md',
        lg: 'px-6 py-3 text-body-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// TypeScript: Extract variant types
type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

// Use in component
function Button({ variant, size, className, children }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary" size="lg">Click Me</Button>
<Button variant="secondary">Secondary</Button>
```

**When to use CVA vs cn():**
- Use `cn()` for simple conditional classes
- Use `cva()` when a component has multiple variant dimensions (size, color, state, etc.)

### Responsive Design

Write mobile-first styles, then add breakpoint prefixes:

```jsx
// Mobile-first approach
<div className="text-body-sm tab:text-body-md desk:text-body-lg fw:text-body-xl">

// Responsive spacing
<section className="p-4 tab:p-8 desk:p-12 fw:p-16">

// Responsive layout
<div className="flex flex-col tab:flex-row gap-4 tab:gap-6">
```

### Handling Dynamic Styles

**Before (styled-components):**
```jsx
const Button = styled.button`
  padding: ${props => props.size === 'large' ? '16px 32px' : '8px 16px'};
  background: ${props => props.variant === 'primary' ? '#3D2562' : 'transparent'};
`;
```

**After (Tailwind):**
```jsx
function Button({ size, variant, children }) {
  return (
    <button className={cn(
      'rounded-md transition-colors',
      // Size variants
      size === 'large' ? 'px-8 py-4' : 'px-4 py-2',
      // Color variants
      variant === 'primary' 
        ? 'bg-purple-DEFAULT text-white hover:bg-purple-dark' 
        : 'bg-transparent border border-purple-border'
    )}>
      {children}
    </button>
  );
}
```

### Focus States (ADA Compliance)

Always add visible focus states to interactive elements:

```jsx
<button className="
  px-4 py-2 rounded-md
  bg-purple-DEFAULT text-white
  hover:bg-purple-dark
  focus:outline-none focus:ring-2 focus:ring-purple-border focus:ring-offset-2
  focus-visible:ring-2 focus-visible:ring-purple-border
">
  Click me
</button>
```

---

## Tooling

### Prettier - Automatic Class Sorting

Prettier automatically sorts Tailwind classes when you save. The order follows Tailwind's recommended structure:

```jsx
// Before save (messy)
<div className="text-white px-4 sm:px-8 py-2 bg-purple-DEFAULT hover:bg-purple-dark">

// After save (sorted)
<div className="bg-purple-DEFAULT px-4 py-2 text-white hover:bg-purple-dark sm:px-8">
```

The plugin recognizes classes in:
- `className` attributes
- `cn()`, `clsx()`, `twMerge()` function calls

### ESLint - Code Quality

Our ESLint setup includes:

1. **Perfectionist** - Sorts imports, switch cases, and object keys
2. **jsx-a11y** - Catches accessibility issues
3. **Next.js rules** - Core Web Vitals optimization

**Import Order (enforced by Perfectionist):**
```jsx
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Next.js imports
import Image from 'next/image';
import Link from 'next/link';

// 3. External packages
import { storyblokEditable } from '@storyblok/react/rsc';

// 4. Internal imports (aliases)
import { cn } from '@/lib/cn';
import Button from '@/components/globalComponents/Button';

// 5. Relative imports
import { formatDate } from './utils';
```

### Compliance Checks

Run `npm run checks` to scan the codebase:

**ADA Checks (`checks:ada`):**
- Images without `alt` attributes
- Buttons/links without accessible text
- Missing focus styles
- Invalid ARIA usage
- Potential color contrast issues

**SEO Checks (`checks:seo`):**
- Multiple `<h1>` tags on a page
- Skipped heading levels (h1 → h3)
- Missing semantic HTML (`<main>`, `<article>`)
- Generic link text ("click here", "read more")
- Missing metadata exports

**Performance Checks (`checks:perf`):**
- Arbitrary Tailwind values (`w-[450px]`)
- Inline styles that should use Tailwind
- Files with styled-components (migration candidates)
- Unnecessary `'use client'` directives
- Console statements
- Large files (500+ lines)

---

## Migration Process

### Step-by-Step Guide

1. **Identify the component** to migrate
   ```bash
   npm run checks:perf  # See files with styled-components
   ```

2. **Remove styled-components imports**
   ```jsx
   // Remove this
   import styled from 'styled-components';
   ```

3. **Convert styled components to native elements + Tailwind**
   
   **Before:**
   ```jsx
   const Wrapper = styled.div`
     display: flex;
     padding: 24px;
     background: ${props => props.theme.hero.bg};
   `;
   
   <Wrapper>Content</Wrapper>
   ```
   
   **After:**
   ```jsx
   <div className="flex p-6 bg-purple-orbital">
     Content
   </div>
   ```

4. **Convert props-based styles to conditional classes**
   
   **Before:**
   ```jsx
   const Box = styled.div`
     width: ${props => props.centered ? '100%' : '50%'};
   `;
   ```
   
   **After:**
   ```jsx
   <div className={cn(centered ? 'w-full' : 'w-1/2')}>
   ```

5. **Map media queries to responsive prefixes**
   
   | Old | New |
   |-----|-----|
   | `${media.mobile} { ... }` | `mob:...` |
   | `${media.tablet} { ... }` | `tab:...` |
   | `${media.desktop} { ... }` | `desk:...` |
   | `${media.fullWidth} { ... }` | `fw:...` |

6. **Run compliance checks**
   ```bash
   npm run checks
   ```

7. **Test all breakpoints** - Verify at mob (480px), tab (1024px), desk (1600px), and fw (1601px+)

### Migration Checklist

- [ ] Remove styled-components imports
- [ ] Replace styled components with native elements + Tailwind classes
- [ ] Convert dynamic styles (props) to conditional classes using `cn()`
- [ ] Map media queries to responsive prefixes
- [ ] Replace theme values with Tailwind design tokens
- [ ] Add focus states to interactive elements
- [ ] Verify alt text on images
- [ ] Check heading hierarchy
- [ ] Test all breakpoints
- [ ] Remove unused styled-component definitions
- [ ] Run `npm run checks` to validate

---

## FAQ

### Q: Can I still use styled-components?

Yes, during the migration both systems coexist. However, **all new components should use Tailwind**.

### Q: What about complex animations?

For simple animations, use Tailwind's built-in utilities:
```jsx
className="transition-all duration-300 ease-in-out hover:scale-105"
```

For complex animations (GSAP, etc.), continue using JavaScript-based solutions.

### Q: How do I handle theme switching?

Use CSS custom properties defined in `globals.css`:
```css
:root {
  --color-primary: #3D2562;
}

[data-theme="dark"] {
  --color-primary: #7E5FDD;
}
```

### Q: What if I need a value not in the config?

1. **First**, check if a close value exists in `tailwind.config.js`
2. **If not**, add the value to the config (preferred)
3. **Last resort**: Use arbitrary values sparingly if ever: `w-[347px]`

### Q: Why is ESLint complaining about my imports?

The perfectionist plugin enforces import sorting. Run `npm run lint:fix` to auto-fix.

### Q: How do I know if my component is accessible?

Run `npm run checks:ada` and fix any reported issues. Key things to check:
- All images have `alt` text
- Buttons have visible or aria-label text
- Focus states are visible
- Color contrast meets WCAG AA (4.5:1)

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## Questions?

If you have questions about the migration, check the `.cursor/rules/tailwind-migration.mdc` file for AI assistant guidelines, or reach out to the team.
