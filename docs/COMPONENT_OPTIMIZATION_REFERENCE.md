# Vasion Component Optimization and Compliance - Complete Reference

This document contains all information needed to understand and execute component optimization, including Tailwind CSS styling, Server Component patterns, and compliance standards. Use this as a reference for creating documentation, training materials, or AI assistant rules.

**For AI / conversions:** When converting or creating components, follow **`.cursor/rules/component-conversion-playbook.mdc`** first (in order); use **`components/LogoCube.js`** as the example. This reference doc supports the playbook and rule files.

---

## Project Overview

**Goal**: Optimize components for performance, accessibility, and SEO compliance. This includes Tailwind CSS styling, Server Component patterns, and WCAG 2.1 AA compliance.

**Key Benefits**:

- **Performance**: Server Components, no runtime CSS-in-JS overhead
- **Bundle Size**: Automatic CSS purging (smaller bundles)
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Semantic HTML, proper structure
- **Developer Experience**: Design tokens, utility classes
- **Consistency**: Enforced through configuration and checks

---

## Technology Stack

- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS (migrating from styled-components)
- **CMS**: Storyblok
- **Animations**: GSAP
- **Utilities**:
  - `cn()` - Conditional class merging with Tailwind conflict resolution
  - `tw` - Tagged template for variant groups (`md:(px-4 py-2)`)
  - `cva()` - Class Variance Authority for component variants

---

## Breakpoints (Mobile-First)

Tailwind uses **min-width** breakpoints. Base (no prefix) = mobile, breakpoint prefixes override for larger screens.

| Prefix     | Range     | Viewport Width | Use Case             |
| ---------- | --------- | -------------- | -------------------- |
| **(none)** | 0 - 480px | 480px          | Mobile (base styles) |
| `md:`      | 481px+    | 1024px         | Tablet and up        |
| `lg:`      | 1025px+   | 1600px         | Desktop and up       |
| `xl:`      | 1601px+   | 1601px+        | Full width and up    |

**Converting styled-components (desktop-first) → Tailwind (mobile-first):**

- `${media.mobile}` → base (no prefix)
- `${media.tablet}` → `md:`
- Desktop (base in styled) → `lg:`
- `${media.fullWidth}` → `xl:`

---

## Color System (Tailwind v4 - No DEFAULT Suffix)

**IMPORTANT:** In Tailwind v4, colors are used directly without `-DEFAULT` suffix:

- ✅ `text-orange`, `bg-purple`, `fill-orange`
- ❌ `text-orange-DEFAULT`, `bg-purple-DEFAULT` (NEVER use this)

### Purple (Brand Primary)

| Token      | Hex     | Tailwind Class     |
| ---------- | ------- | ------------------ |
| Navy       | #090121 | `purple-navy`      |
| Dark       | #201435 | `purple-dark`      |
| Default    | #3D2562 | `purple`           |
| Medium     | #583F99 | `purple-medium`    |
| Light      | #7E5FDD | `purple-light`     |
| Border     | #945AEE | `purple-border`    |
| Tag        | #E5DFF8 | `purple-tag`       |
| Light Grey | #F5F4F7 | `purple-lightGrey` |

### Orange

| Token   | Hex     | Tailwind Class |
| ------- | ------- | -------------- |
| Dark    | #CC4800 | `orange-dark`  |
| Default | #ff5100 | `orange`       |
| 500     | #FF612A | `orange-500`   |

### Teal

| Token   | Hex     | Tailwind Class |
| ------- | ------- | -------------- |
| Dark    | #007C77 | `teal-dark`    |
| Default | #00A19B | `teal`         |
| 500     | #33B4AF | `teal-500`     |

### Grey Scale

| Token | Hex     | Tailwind Class |
| ----- | ------- | -------------- |
| 800   | #191D1E | `grey-800`     |
| 700   | #38383D | `grey-700`     |
| 600   | #5E5F61 | `grey-600`     |
| 500   | #838587 | `grey-500`     |
| 400   | #A8ABAE | `grey-400`     |
| 100   | #CFD2D4 | `grey-100`     |
| 50    | #EBECEC | `grey-50`      |
| 25    | #F6F7F7 | `grey-25`      |

### Text Colors

| Token   | Hex     | Tailwind Class |
| ------- | ------- | -------------- |
| Primary | #1B1D21 | `txt-primary`  |
| Subtle  | #808085 | `txt-subtle`   |

### Gradients

- `bg-purple-orbital` - Purple orbital gradient
- `bg-purple-gradient` - Purple linear gradient
- `bg-orange-gradient` - Orange linear gradient
- `bg-light-purple` - Light purple gradient
- `bg-dark-purple` - Dark purple gradient
- `bg-medium-purple` - Medium purple gradient

---

## Typography

### Headings

| Class     | Size | Line Height | Weight |
| --------- | ---- | ----------- | ------ |
| `text-h1` | 46px | 56px        | 800    |
| `text-h2` | 46px | 56px        | 700    |
| `text-h3` | 32px | 40px        | 700    |
| `text-h4` | 26px | 32px        | 700    |
| `text-h5` | 20px | 24px        | 700    |

### Body Text

| Class               | Size | Line Height | Weight |
| ------------------- | ---- | ----------- | ------ |
| `text-body-xl`      | 23px | 30px        | 400    |
| `text-body-xl-bold` | 23px | 28px        | 700    |
| `text-body-lg`      | 18px | 24px        | 400    |
| `text-body-lg-bold` | 18px | 22px        | 700    |
| `text-body-md`      | 16px | 22px        | 400    |
| `text-body-md-bold` | 16px | 22px        | 600    |
| `text-body-sm`      | 14px | 18px        | 400    |
| `text-body-sm-bold` | 14px | 18px        | 700    |

### Special Text

| Class            | Description                                       |
| ---------------- | ------------------------------------------------- |
| `text-eyebrow`   | 14px, uppercase, 2.8px letter-spacing, 700 weight |
| `text-tag`       | 10px                                              |
| `text-tag-bold`  | 11px, 600 weight                                  |
| `text-subtle`    | 14px                                              |
| `text-button-lg` | 16px, uppercase, 700 weight                       |

### Font Families

- `font-archivo` - Archivo
- `font-archivo-bold` - Archivo Bold
- `font-orbitron` - Orbitron Regular

---

## Unit Conversion

### VW to Tailwind

**Key Insight**: Different vw values per breakpoint often target the SAME pixel size.

| Target Pixels | Desktop (1600px) | Tablet (1024px) | Mobile (480px) | Tailwind |
| ------------- | ---------------- | --------------- | -------------- | -------- |
| 200px         | 12.5vw           | 19.531vw        | 41.667vw       | `w-50`   |
| 100px         | 6.25vw           | 9.766vw         | 20.833vw       | `w-25`   |
| 80px          | 5vw              | 7.813vw         | 16.667vw       | `w-20`   |
| 40px          | 2.5vw            | 3.906vw         | 8.333vw        | `w-10`   |

**Conversion Formula**:

```
px = vw × (viewportWidth / 100)
rem = px / 16
```

### PX to Tailwind Class

**Formula**: `px / 4 = Tailwind number`

Tailwind JIT auto-generates any number: `number × 0.25rem = size`

| Pixels | Calculation    | Tailwind Class |
| ------ | -------------- | -------------- |
| 1304px | 1304 / 4 = 326 | `w-326`        |
| 200px  | 200 / 4 = 50   | `w-50`         |
| 100px  | 100 / 4 = 25   | `w-25`         |
| 24px   | 24 / 4 = 6     | `p-6`          |

**IMPORTANT**: Do NOT add custom values to `tailwind.config.js` - JIT handles it automatically.

---

## Server vs Client Components

### Server Components (PREFERRED)

**Benefits**:

- Zero client-side JavaScript for static content
- Faster initial page load
- Better SEO (content available immediately)
- Reduced bundle size

**Use When**:

- Rendering static content
- Displaying CMS data (Storyblok)
- Layout containers and wrappers
- No user interactivity needed

### Client Components (Only When Required)

**Required For**:

- React hooks: `useState`, `useEffect`, `useContext`, `useRef`
- Browser APIs: `window`, `document`, `localStorage`
- Event handlers that modify state
- Client-only libraries: GSAP, Swiper, etc.

### Extracting Client Logic Pattern

When a component needs GSAP animations but should be a Server Component:

```jsx
// MyComponent.js - Server Component (NO 'use client')
import CarouselAnimator from '@/components/CarouselAnimator';
import { cn, tw } from '@/lib/cn';
import { tw } from '@/lib/cn';

const MyComponent = ({ blok }) => {
  const theme = blok.theme || 'default';
  const shouldAnimate = blok.items?.length > 5;

  return (
    <>
      <section
        className={cn(
          'flex w-full items-center justify-center',
          tw`p-7 md:p-10 lg:p-15`,
          // Theme via conditional Tailwind (no inline styles!)
          theme === 'dark' && 'bg-purple-dark text-white',
          theme === 'light' && 'text-txt-primary bg-white',
          theme === 'default' && 'bg-purple text-white'
        )}
      >
        {blok.items?.map((item) => (
          <div key={item._uid} className="item shrink-0">
            ...
          </div>
        ))}
      </section>

      {/* Minimal client component - animation only */}
      {shouldAnimate && <CarouselAnimator selector=".item" />}
    </>
  );
};
```

---

## Pure Tailwind Pattern (REQUIRED)

**NEVER use these:**

- ❌ Inline `style` attributes
- ❌ Scoped `<style>` tags
- ❌ CSS-in-JS or styled-components for new code

**ALWAYS use Tailwind utilities with `cn()` and `tw`:**

```jsx
import { cn, tw } from '@/lib/cn';

const MyComponent = ({ blok }) => {
  const isTransparent = blok.transparent_background;
  const theme = blok.theme || 'default';

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center',
        // Responsive padding using tw for grouped variants
        tw`p-7 md:p-10 lg:p-15 xl:p-15`,
        // Conditional background (no inline styles!)
        isTransparent ? 'bg-transparent' : theme === 'dark' ? 'bg-purple-dark' : 'bg-purple',
        // Border radius (responsive)
        'rounded-4xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl'
      )}
    >
      ...
    </div>
  );
};
```

---

## CarouselAnimator (Reusable Client Component)

A minimal client component for GSAP horizontal loop animations.

### Usage

```jsx
import CarouselAnimator from '@/components/CarouselAnimator';

// Basic usage
<CarouselAnimator selector=".logo-item" />

// With options
<CarouselAnimator
  selector=".testimonial-card"
  options={{
    speed: 0.5,
    reversed: true,
    draggable: true,
    paused: true,
  }}
  onChange={(element, index) => console.log('Active:', index)}
/>
```

### Available Options

| Option      | Type     | Default          | Description              |
| ----------- | -------- | ---------------- | ------------------------ |
| `selector`  | string   | `.carousel-item` | CSS selector for items   |
| `speed`     | number   | 1                | Animation speed (px/sec) |
| `reversed`  | boolean  | false            | Reverse direction        |
| `draggable` | boolean  | false            | Enable drag interaction  |
| `paused`    | boolean  | false            | Start paused             |
| `repeat`    | number   | -1               | Repeats (-1 = infinite)  |
| `onChange`  | function | -                | Callback on item change  |

---

## Utilities

### cn() - Conditional Classes

```jsx
import { cn } from '@/lib/cn';

<div className={cn(
  'base-classes',
  isActive && 'bg-purple text-white',
  isDisabled && 'opacity-50 cursor-not-allowed',
  className // Allow override
)}>
```

### tw - Variant Groups (PREFERRED for responsive)

Use `tw` tagged template for cleaner responsive styles with **variant groups**:

```jsx
import { tw } from '@/lib/cn';

// ❌ Verbose - repeating prefixes
<div className="px-4 py-2 md:px-8 md:py-4 md:gap-6 lg:px-12 lg:py-6 lg:gap-8">

// ✅ Clean - grouped variants
<div className={tw`px-4 py-2 md:(px-8 py-4 gap-6) lg:(px-12 py-6 gap-8)`}>
```

**How it works:** `md:(px-8 py-4)` expands to `md:px-8 md:py-4`

**More examples:**

```jsx
// Hover/focus states
<button className={tw`bg-white hover:(bg-purple text-white) focus:(ring-2 ring-purple-border)`}>

// Complex responsive
<section className={tw`
  flex flex-col gap-4 p-4
  md:(flex-row gap-6 p-8)
  lg:(gap-8 p-12)
  xl:(gap-10 p-16)
`}>

// Combine tw + cn for conditionals
<div className={cn(
  tw`flex gap-4 md:(gap-6 p-4) lg:(gap-8 p-6)`,
  isActive && 'bg-purple text-white'
)}>
```

### cva() - Component Variants

```jsx
import { cva, type VariantProps } from '@/lib/cva';

const buttonVariants = cva(
  'rounded-md font-semibold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-purple text-white',
        secondary: 'bg-transparent border border-purple-border',
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
```

---

## ADA Compliance (WCAG 2.1 AA)

### Images

- All `<img>` and `<Image>` MUST have `alt` attribute
- Decorative images: `alt=""` with `aria-hidden="true"`

### Interactive Elements

- ALL buttons/links MUST have visible focus states:
  ```jsx
  className = 'focus:outline-none focus:ring-2 focus:ring-purple-border focus:ring-offset-2';
  ```
- Icon-only buttons need `aria-label`

### Color Contrast

- Normal text: minimum 4.5:1 ratio
- Large text (18px+): minimum 3:1 ratio

### Keyboard Navigation

- All functionality accessible via keyboard
- Use semantic elements: `<button>`, `<a>`, `<input>`

### Forms

- All inputs need labels (`<label>`, `aria-label`, or `aria-labelledby`)
- Placeholders are NOT sufficient as labels

---

## SEO Best Practices

### Headings

- Every page MUST have exactly ONE `<h1>`
- Headings follow logical order: h1 → h2 → h3 (never skip)

### Semantic HTML

- Use landmarks: `<main>`, `<nav>`, `<header>`, `<footer>`
- Use `<article>` for self-contained content
- Use `<section>` for thematic groupings

### Links

- Use descriptive anchor text (not "click here")
- External links: `target="_blank" rel="noopener noreferrer"`

### Images

- ALL images need descriptive `alt` text
- Use Next.js `<Image>` for optimization
- Use `priority` for above-fold images

---

## Compliance Scripts

### Run All Checks

```bash
npm run checks
```

### Run on Specific Files

```bash
# Single file
npm run checks -- components/MyComponent.js

# Multiple files
npm run checks -- components/A.js components/B.js

# Directory
npm run checks -- components/centeredSections/
```

### Individual Checks

```bash
npm run checks:ada       # Accessibility
npm run checks:seo       # SEO
npm run checks:perf      # Performance
```

---

## Optimization Checklist

### Phase 0: Planning

- [ ] Ask for Figma reference link
- [ ] Evaluate if component can be Server Component
- [ ] Identify client-only code needing extraction

### Phase 1: Convert Structure

- [ ] Remove styled-components imports
- [ ] Remove `'use client'` if converting to Server Component
- [ ] Preserve EXACT container structure
- [ ] Handle ALL original props

### Phase 2: Convert Styles (Pure Tailwind)

- [ ] Use `tw` utility for grouped responsive classes
- [ ] Use `cn()` for conditional classes (NOT clsx directly)
- [ ] Convert vw → px → Tailwind (px / 4)
- [ ] Use `list-none` class on ul/li elements
- [ ] **NEVER** use inline `style` or `<style>` tags

### Phase 3: Extract Client Logic

- [ ] Move GSAP to `CarouselAnimator`
- [ ] Conditionally render client components

### Phase 4: Validate

- [ ] Add focus states to interactive elements
- [ ] Verify alt text on images
- [ ] Check heading hierarchy
- [ ] Test ALL breakpoints
- [ ] Run `npm run checks -- path/to/component.js`

---

## Styled-Components to Tailwind Mapping (Mobile-First)

**Breakpoint Conversion:**
| styled-components | Tailwind | Explanation |
| ---------------------------- | ------------------ | -------------------------------- |
| `${media.mobile} { ... }` | base (no prefix) | Mobile = default Tailwind styles |
| `${media.tablet} { ... }` | `md:...` | Tablet overrides mobile |
| Desktop (base in styled) | `lg:...` | Desktop overrides tablet |
| `${media.fullWidth} { ... }` | `xl:...` | FullWidth overrides desktop |

**Theme Values:**
| styled-components | Tailwind |
| ---------------------------- | ---------------------------------- |
| `${text.h1}` | `text-h1 font-archivo` |
| `${text.bodyLg}` | `text-body-lg font-archivo` |
| `${colors.primaryPurple}` | `bg-purple` or `text-purple` |
| `${colors.primaryOrange}` | `bg-orange` or `text-orange` |
| `${colors.txtPrimary}` | `text-txt-primary` |

**Note:** Never use `-DEFAULT` suffix in Tailwind v4. Use `text-orange` not `text-orange-DEFAULT`.

---

## File Structure

```
├── tailwind.config.js          # Design tokens
├── app/globals.css             # CSS variables, base styles
├── lib/
│   ├── cn.ts                   # cn(), tw tagged template, expandVariantGroups()
│   └── cva.ts                  # Component variants (CVA)
├── components/
│   └── CarouselAnimator.js     # Reusable GSAP animation
├── scripts/checks/
│   ├── index.mjs               # Main runner
│   ├── ada.mjs                 # Accessibility checks
│   ├── seo.mjs                 # SEO checks
│   └── performance.mjs         # Performance checks
├── .cursorrules                # AI assistant rules (root)
└── .cursor/rules/
    ├── tailwind-migration.mdc  # Migration guidelines
    └── design-tokens.mdc       # Token quick reference
```

---

## Key Principles

1. **Server Components First** - Only use `'use client'` when required
2. **Pure Tailwind Only** - No inline styles, no `<style>` tags, no CSS-in-JS
3. **Use `tw` for Responsive** - Cleaner variant groups: `md:(px-4 py-2)`
4. **No Arbitrary Values** - Use `px-4` formula, not `w-[450px]`
5. **Preserve Layout** - Converted components must look identical
6. **ADA Compliance** - Focus states, alt text, semantic HTML
7. **Test All Breakpoints** - Mobile, tablet, desktop, fullWidth
8. **Ask for Figma** - Get design reference before converting
