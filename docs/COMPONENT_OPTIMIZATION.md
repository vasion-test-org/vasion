# Component Optimization and Compliance Guide

This document explains our component optimization strategy, Tailwind CSS setup, and compliance standards for accessibility, SEO, and performance.

## Table of Contents

- [Overview](#overview)
- [Why Tailwind?](#why-tailwind)
- [Project Setup](#project-setup)
- [Design System](#design-system)
- [How to Write Styles](#how-to-write-styles)
- [Tooling](#tooling)
- [Optimization Process](#optimization-process)
- [FAQ](#faq)

---

## Overview

We are optimizing components for **performance**, **accessibility**, and **SEO** compliance. This includes migrating from styled-components to Tailwind CSS, converting to Server Components where possible, and ensuring WCAG 2.1 AA compliance.

### Key Benefits

- **Performance**: Server Components, no runtime CSS-in-JS overhead
- **Bundle Size**: Tailwind purges unused styles automatically
- **Accessibility**: WCAG 2.1 AA compliance enforced
- **SEO**: Semantic HTML, proper heading hierarchy
- **Developer Experience**: Faster styling with utility classes
- **Consistency**: Design tokens enforced through configuration

---

## Why Tailwind?

| styled-components                 | Tailwind CSS                     |
| --------------------------------- | -------------------------------- |
| Runtime CSS generation            | Build-time CSS generation        |
| Requires `'use client'` directive | Works with Server Components     |
| Dynamic styles via props          | Conditional classes via `cn()`   |
| Custom CSS syntax                 | Utility-first classes            |
| Theme via ThemeProvider           | Theme via config + CSS variables |

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

### Breakpoints (Mobile-First)

Tailwind uses **min-width** breakpoints. Base classes = mobile, breakpoint prefixes override for larger screens.

| Prefix      | Range          | Usage                              |
| ----------- | -------------- | ---------------------------------- |
| **(none)**  | 0 - 480px      | Mobile styles (base, no prefix)    |
| `md:`       | 481px+         | Tablet and up                      |
| `lg:`       | 1025px+        | Desktop and up                     |
| `xl:`       | 1601px+        | Full width and up                  |

**Key Concept:** Styles cascade UP. A `md:` class applies to tablet, desktop, AND fullWidth unless overridden.

**Example:**

```jsx
// Mobile base, add breakpoints for what CHANGES
<h1 className="text-h3 md:text-h2 lg:text-h1">Responsive Heading</h1>

// Mobile: column, Tablet+: row
<div className="flex flex-col md:flex-row gap-6">
```

**Converting styled-components (desktop-first) → Tailwind (mobile-first):**
- `${media.mobile}` → base (no prefix)
- `${media.tablet}` → `md:`
- Desktop (base in styled) → `lg:`
- `${media.fullWidth}` → `xl:`

### Colors (Tailwind v4 - No DEFAULT Suffix)

**IMPORTANT:** In Tailwind v4, colors are used directly without `-DEFAULT` suffix:
- ✅ `text-orange`, `bg-purple`, `fill-orange`
- ❌ `text-orange-DEFAULT`, `bg-purple-DEFAULT` (NEVER use this)

```jsx
// Purple variants
className = 'text-purple'; // #3D2562
className = 'bg-purple-dark'; // #201435
className = 'border-purple-border'; // #945AEE
className = 'text-purple-light'; // #7E5FDD

// Orange variants
className = 'bg-orange'; // #ff5100
className = 'text-orange-500'; // #FF612A
className = 'hover:fill-orange'; // for SVG icons

// Teal variants
className = 'bg-teal'; // #00A19B
className = 'text-teal-dark'; // #007C77

// Greys
className = 'bg-grey-800'; // #191D1E
className = 'text-grey-500'; // #838587
className = 'bg-grey-25'; // #F6F7F7

// Text colors
className = 'text-txt-primary'; // #1B1D21
className = 'text-txt-subtle'; // #808085
```

### Gradients

Gradients are available via CSS custom properties:

```jsx
className = 'bg-purple-gradient'; // Purple gradient
className = 'bg-orange-gradient'; // Orange gradient
className = 'bg-purple-orbital'; // Orbital purple gradient
className = 'bg-light-purple'; // Light purple gradient
className = 'bg-dark-purple'; // Dark purple gradient
className = 'bg-medium-purple'; // Medium purple gradient
className = 'bg-grey-gradient'; // Grey gradient
```

### Typography

Font sizes mapped from `styles/text.js`:

```jsx
// Headings
className = 'text-h1'; // 46px / 56px line-height / 800 weight
className = 'text-h2'; // 46px / 56px line-height / 700 weight
className = 'text-h3'; // 32px / 40px line-height / 700 weight
className = 'text-h4'; // 26px / 32px line-height / 700 weight
className = 'text-h5'; // 20px / 24px line-height / 700 weight

// Body text
className = 'text-body-xl'; // 23px / 30px line-height
className = 'text-body-xl-bold'; // 23px / 28px line-height / 700 weight
className = 'text-body-lg'; // 18px / 24px line-height
className = 'text-body-lg-bold'; // 18px / 22px line-height / 700 weight
className = 'text-body-md'; // 16px / 22px line-height
className = 'text-body-md-bold'; // 16px / 22px line-height / 600 weight
className = 'text-body-sm'; // 14px / 18px line-height
className = 'text-body-sm-bold'; // 14px / 18px line-height / 700 weight

// Special styles
className = 'text-eyebrow'; // 14px uppercase with letter-spacing
className = 'text-tag'; // 10px
className = 'text-tag-bold'; // 11px / 600 weight
className = 'text-subtle'; // 14px subtle text

// Font families
className = 'font-archivo'; // Archivo font
className = 'font-archivo-bold'; // Archivo Bold
className = 'font-orbitron'; // Orbitron (for stats)
```

---

## How to Write Styles

### CRITICAL: Pure Tailwind Only

**NEVER use these in components:**
- ❌ Inline `style` attributes (`style={{ padding: '20px' }}`)
- ❌ Scoped `<style>` tags (`<style>{`.class { ... }`}</style>`)
- ❌ CSS-in-JS or styled-components for new code

**ALWAYS use:**
- ✅ Tailwind utility classes
- ✅ `cn()` for conditional classes
- ✅ `tw` tagged template for variant groups (cleaner responsive code)

### The `cn()` Utility

Use the `cn()` utility for conditional and merged class names:

```jsx
import { cn } from '@/lib/cn';

// Basic usage
<div className={cn('px-4 py-2', 'bg-purple')}>

// Conditional classes
<button className={cn(
  'px-4 py-2 rounded-md',
  isActive && 'bg-purple text-white',
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

### The `tw` Tagged Template (Variant Groups)

Use `tw` for cleaner responsive styles with **variant groups**. Instead of repeating prefixes, group them:

```jsx
import { tw } from '@/lib/cn';

// ❌ Verbose - repeating md: prefix
<div className="flex px-4 py-2 md:px-8 md:py-4 md:gap-6 lg:px-12 lg:py-6 lg:gap-8">

// ✅ Clean - using tw with variant groups
<div className={tw`flex px-4 py-2 md:(px-8 py-4 gap-6) lg:(px-12 py-6 gap-8)`}>
```

**How it works:**
- `md:(px-8 py-4 gap-6)` expands to `md:px-8 md:py-4 md:gap-6`
- Works with any variant: `hover:`, `focus:`, `lg:`, `xl:`, etc.

**More examples:**

```jsx
// Hover and focus states grouped
<button className={tw`bg-white text-purple hover:(bg-purple text-white) focus:(ring-2 ring-purple-border outline-none)`}>

// Complex responsive layout
<section className={tw`
  flex flex-col gap-4 p-4
  md:(flex-row gap-6 p-8)
  lg:(gap-8 p-12)
  xl:(gap-10 p-16)
`}>

// With conditionals (combine tw and cn)
<div className={cn(
  tw`flex gap-4 md:(gap-6 p-4) lg:(gap-8 p-6)`,
  isActive && 'bg-purple text-white',
  className
)}>
```

**When to use which:**
- `tw` - When you have multiple responsive breakpoints (cleaner syntax)
- `cn()` - When you have conditional classes based on props/state
- Both together - Complex components with responsive + conditional styles

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
        primary: 'bg-purple text-white hover:bg-purple-dark focus:ring-purple-border',
        secondary: 'bg-transparent border-2 border-purple-border text-purple hover:bg-purple-100',
        orange: 'bg-orange text-white hover:bg-orange-dark focus:ring-orange-500',
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

### Responsive Design (Mobile-First)

Write mobile-first styles, then add breakpoint prefixes for larger screens:

```jsx
// Mobile-first approach (base = mobile, then override for larger)
<div className="text-body-sm md:text-body-md lg:text-body-lg xl:text-body-xl">

// Responsive spacing
<section className="p-4 md:p-8 lg:p-12 xl:p-16">

// Responsive layout (column on mobile, row on tablet+)
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
```

**Key insight:** Only specify what CHANGES at each breakpoint. Unchanged values inherit from smaller breakpoints.

### Handling Dynamic Styles

**Before (styled-components):**

```jsx
const Button = styled.button`
  padding: ${(props) => (props.size === 'large' ? '16px 32px' : '8px 16px')};
  background: ${(props) => (props.variant === 'primary' ? '#3D2562' : 'transparent')};
`;
```

**After (Tailwind):**

```jsx
function Button({ size, variant, children }) {
  return (
    <button
      className={cn(
        'rounded-md transition-colors',
        // Size variants
        size === 'large' ? 'px-8 py-4' : 'px-4 py-2',
        // Color variants
        variant === 'primary'
          ? 'bg-purple hover:bg-purple-dark text-white'
          : 'border-purple-border border bg-transparent'
      )}
    >
      {children}
    </button>
  );
}
```

### Focus States (ADA Compliance)

Always add visible focus states to interactive elements:

```jsx
<button className="bg-purple hover:bg-purple-dark focus:ring-purple-border focus-visible:ring-purple-border rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none focus-visible:ring-2">
  Click me
</button>
```

---

## Tooling

### Prettier - Automatic Class Sorting

Prettier automatically sorts Tailwind classes when you save. The order follows Tailwind's recommended structure:

```jsx
// Before save (messy)
<div className="text-white px-4 md:px-8 py-2 bg-purple hover:bg-purple-dark">

// After save (sorted)
<div className="bg-purple px-4 py-2 text-white hover:bg-purple-dark md:px-8">
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

Our ADA check combines **ESLint jsx-a11y** (AST-level analysis) with **custom pattern checks** for comprehensive WCAG 2.1 AA coverage:

*ESLint jsx-a11y Rules (automatically integrated):*
- `alt-text` - Images must have alt props
- `click-events-have-key-events` - Interactive elements need keyboard handlers
- `no-static-element-interactions` - Non-native interactive elements need roles
- `aria-props` / `aria-proptypes` - Valid ARIA attributes
- `label-has-associated-control` - Form labels properly associated
- `anchor-has-content` / `anchor-is-valid` - Links have proper content
- `heading-has-content` - Headings have text
- `interactive-supports-focus` - Interactive elements are focusable
- And 20+ more rules covering all WCAG principles

*Custom Pattern Checks:*
- Potential color contrast issues (Tailwind class combinations)
- Focus ring visibility (non-text contrast)
- Skip navigation for pages
- Language attributes
- Form error patterns

**SEO Checks (`checks:seo`):**

- Multiple `<h1>` tags on a page
- Skipped heading levels (h1 → h3)
- Missing semantic HTML (`<main>`, `<article>`)
- Generic link text ("click here", "read more")
- Meta tag presence (title, description, Open Graph, Twitter)
- Canonical URL configuration
- Robots/noindex directives
- Structured data (JSON-LD)
- Image optimization (Next.js Image usage)
- Missing metadata exports

**Performance Checks (`checks:perf`):**

- Arbitrary Tailwind values (`w-[450px]`)
- Inline styles that should use Tailwind
- Files with styled-components (migration candidates)
- Unnecessary `'use client'` directives
- Console statements
- Large files (500+ lines)

---

## Optimization Process

### Before Starting: Get Figma Reference

**Always ask for a Figma link** before converting a component. Use the Figma MCP tools to:

- Fetch exact design specifications
- Extract colors, spacing, typography, dimensions
- Verify converted component matches design precisely

### Step 0: Evaluate Server Component Potential

**CRITICAL**: Always check if the component can be a Server Component.

**Can be Server Component if:**

- No React hooks (`useState`, `useEffect`, `useContext`, `useRef`)
- No browser APIs (`window`, `document`)
- No event handlers that modify state
- No client-only libraries (GSAP in the main component)

**If GSAP/animations are needed:**

- Extract animation logic to minimal client component
- Use the reusable `CarouselAnimator` for horizontal loop animations
- Keep main component as Server Component

### Step 1: Identify and Analyze

```bash
npm run checks:perf  # See files with styled-components
npm run checks -- components/MyComponent.js  # Check specific file
```

### Step 2: Convert to Server Component (if possible)

**Server Component Pattern (Pure Tailwind):**

```jsx
// MyComponent.js - NO 'use client'
import Image from 'next/image';

import clsx from 'clsx';

import CarouselAnimator from '@/components/CarouselAnimator';
import { tw } from '@/lib/cn';

const MyComponent = ({ blok }) => {
  const isTransparent = blok.transparent_background;
  const theme = blok.theme || 'default';
  const shouldAnimate = blok.items?.length > 5;

  return (
    <>
      <section
        className={clsx(
          'flex w-full items-center justify-center',
          // Mobile-first responsive padding using tw for variant groups
          tw`p-7 md:p-10 lg:p-15 xl:p-15`,
          // Max width
          'max-w-326 mx-auto'
        )}
      >
        <div
          className={clsx(
            'w-full overflow-hidden rounded-3xl',
            // Background based on theme (pure Tailwind, no inline styles)
            isTransparent
              ? 'bg-transparent'
              : theme === 'dark'
                ? 'bg-purple-dark'
                : theme === 'light'
                  ? 'bg-white'
                  : 'bg-purple',
            // Text color
            theme === 'light' ? 'text-txt-primary' : 'text-white'
          )}
        >
          {blok.items?.map((item) => (
            <div key={item._uid} className="item shrink-0">
              ...
            </div>
          ))}
        </div>
      </section>

      {/* Minimal client component for animation only */}
      {shouldAnimate && <CarouselAnimator selector=".item" />}
    </>
  );
};

export default MyComponent;
```

**Key patterns:**
- ❌ No `<style>` tags - use Tailwind responsive classes
- ❌ No `style={{ }}` inline - use conditional Tailwind classes via `clsx()`
- ✅ Use `tw` for grouped responsive classes
- ✅ Use ternary/conditional for theme-based styling

### Step 3: Remove styled-components

```jsx
// Remove this
import styled from 'styled-components';
```

### Step 4: Convert Styles (Mobile-First)

**Map styled-components (desktop-first) → Tailwind (mobile-first):**

| Styled-Component              | Tailwind        | Explanation                      |
| ----------------------------- | --------------- | -------------------------------- |
| `${media.mobile} { ... }`     | base (no prefix)| Mobile = default Tailwind styles |
| `${media.tablet} { ... }`     | `md:...`        | Tablet overrides mobile          |
| Desktop (base in styled)      | `lg:...`        | Desktop overrides tablet         |
| `${media.fullWidth} { ... }`  | `xl:...`        | FullWidth overrides desktop      |

**Example conversion:**

```jsx
// Original styled-component (desktop-first)
const Box = styled.div`
  flex-direction: row;      /* Desktop default */
  ${media.mobile} { flex-direction: column; }
`;

// Tailwind (mobile-first) - base is mobile, lg: is desktop
<div className="flex flex-col lg:flex-row">
```

**Convert vw to Tailwind:**

```jsx
// If all breakpoints target SAME px → ONE base class
// Mobile: 41.667vw × 4.8 = 200px
// Tablet: 19.531vw × 10.24 = 200px
// Desktop: 12.5vw × 16 = 200px
className="w-50" // 200px / 4 = 50

// If breakpoints target DIFFERENT px → separate classes
// Mobile: 353.738vw × 4.8 = 1698px → w-425 (base)
// Tablet: 124.902vw × 10.24 = 1279px → md:w-320
// Desktop: 88.806vw × 16 = 1421px → lg:w-355
className="w-425 md:w-320 lg:w-355"
```

### Step 5: Run Compliance Checks

```bash
# Check specific component
npm run checks -- components/MyComponent.js

# Check multiple files
npm run checks -- components/MyComponent.js components/OtherComponent.js

# Check entire directory
npm run checks -- components/centeredSections/
```

### Step 6: Test All Breakpoints

Verify at: mobile (480px), tablet (1024px), desktop (1600px), fullWidth (1601px+)

### Optimization Checklist

**Phase 0: Planning**

- [ ] Ask for Figma reference link
- [ ] Evaluate if component can be Server Component
- [ ] Identify client-only code that needs extraction

**Phase 1: Convert Structure**

- [ ] Remove styled-components imports
- [ ] Remove `'use client'` if converting to Server Component
- [ ] Preserve EXACT container structure
- [ ] Handle ALL original props (`transparent_background`, `offset_spacing`, etc.)

**Phase 2: Convert Styles (Pure Tailwind)**

- [ ] Use `tw` utility for grouped responsive classes
- [ ] Use `cn()` or `clsx()` for conditional classes
- [ ] Convert vw → px → Tailwind number (px / 4)
- [ ] Use `list-none` class on ul/li elements (not inline style)
- [ ] **NEVER use** inline `style` attributes or `<style>` tags

**Phase 3: Extract Client Logic**

- [ ] Move GSAP to `CarouselAnimator` or similar minimal client component
- [ ] Conditionally render client component only when needed

**Phase 4: Validate**

- [ ] Add focus states to interactive elements
- [ ] Verify alt text on images
- [ ] Check heading hierarchy
- [ ] Test ALL breakpoints
- [ ] Run `npm run checks -- path/to/component.js`
- [ ] Remove debug console.log statements

---

## FAQ

### Q: Can I still use styled-components?

Yes, during the migration both systems coexist. However, **all new components should use Tailwind**.

### Q: Should I use Server or Client Components?

**Always prefer Server Components** for performance benefits:

- Zero client-side JavaScript
- Faster initial page load
- Better SEO
- Reduced bundle size

Only use `'use client'` when you need:

- React hooks (`useState`, `useEffect`, `useContext`)
- Browser APIs (`window`, `document`)
- Event handlers that modify state
- Client-only libraries like GSAP

### Q: How do I handle GSAP animations?

Extract animation logic to minimal client components. Use the reusable `CarouselAnimator`:

```jsx
// Server Component
import CarouselAnimator from '@/components/CarouselAnimator';

const MyComponent = ({ blok }) => {
  const shouldAnimate = blok.items?.length > 5;

  return (
    <>
      <div className="items">
        {blok.items?.map((item) => (
          <div key={item._uid} className="item">
            ...
          </div>
        ))}
      </div>

      {shouldAnimate && (
        <CarouselAnimator selector=".item" options={{ speed: 1, reversed: false }} />
      )}
    </>
  );
};
```

**CarouselAnimator Options:**

- `selector` - CSS selector for items (e.g., `.item`)
- `speed` - Animation speed (default: 1)
- `reversed` - Reverse direction (default: false)
- `draggable` - Enable drag interaction (default: false)
- `paused` - Start paused (default: false)
- `onChange` - Callback when active item changes

### Q: What about complex animations?

For simple animations, use Tailwind's built-in utilities:

```jsx
className = 'transition-all duration-300 ease-in-out hover:scale-105';
```

For complex animations (GSAP, etc.), extract to minimal client components.

### Q: How do I handle theme switching?

**Use conditional Tailwind classes based on theme prop:**

```jsx
import clsx from 'clsx';

const ThemedComponent = ({ theme = 'default' }) => {
  return (
    <div
      className={clsx(
        'p-6 rounded-lg',
        // Background per theme
        theme === 'dark' && 'bg-purple-dark text-white',
        theme === 'light' && 'bg-white text-txt-primary',
        theme === 'default' && 'bg-purple text-white'
      )}
    >
      Content here
    </div>
  );
};
```

**For site-wide themes**, CSS custom properties in `globals.css`:

```css
:root {
  --color-primary: #3d2562;
}

[data-theme='dark'] {
  --color-primary: #7e5fdd;
}
```

### Q: What if I need a value not in the config?

1. **First**, check if a close value exists in `tailwind.config.js`
2. **If not**, add the value to the config (preferred)
3. **Last resort**: Use arbitrary values sparingly if ever: `w-[347px]`

### Q: Why is ESLint complaining about my imports?

The perfectionist plugin enforces import sorting. Run `npm run lint:fix` to auto-fix.

### Q: How do I know if my component is accessible?

Run `npm run checks:ada` to get a comprehensive accessibility report. The check combines:

1. **ESLint jsx-a11y** - AST-level analysis that catches issues in React/JSX
2. **Custom pattern checks** - Project-specific patterns ESLint can't detect

```bash
# Check specific component
npm run checks:ada -- components/MyComponent.js

# Check entire codebase
npm run checks:ada
```

Key things to check:

- All images have `alt` text (or `alt=""` for decorative)
- Buttons/links have visible or `aria-label` text
- Interactive elements have keyboard handlers (`onClick` needs `onKeyDown`)
- Focus states are visible (`focus:ring-2`, etc.)
- Color contrast meets WCAG AA (4.5:1 for text)
- Non-native interactive elements have proper `role` and `tabIndex`

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## Questions?

If you have questions about the migration, check the `.cursor/rules/tailwind-migration.mdc` file for AI assistant guidelines, or reach out to the team.
