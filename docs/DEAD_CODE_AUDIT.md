# Dead Code Audit Results

> Generated: March 5, 2026
> Purpose: Track removed/flagged dead code from the latest cleanup pass.

---

## 1. Unused Components

These components were never imported outside their own file and have been deleted.

| File | Reason |
|------|--------|
| `components/LazyImage.js` | Not imported by any component. Only mentioned in `CORE_WEB_VITALS_OPTIMIZATIONS.md`. Created as part of a perf spike but never adopted. |
| `components/LazyHydration.js` | Not imported by anything. Only referenced in `TBT_OPTIMIZATIONS.md`. Written but never wired up. |
| `components/ContentWidth.js` | Zero imports across the entire codebase. A styled-components wrapper that was never used. |
| `components/SEOUpdater.js` | Not imported by anything. Does client-side noindex injection via `document.createElement` using `PageDataContext`, but nothing ever mounts it. Complete dead code. |

---

## 2. Unused Utility Files (`lib/`, `hooks/`)

| File | Reason |
|------|--------|
| `lib/gtmOptimization.js` | Zero imports in any source file. Logic is essentially duplicated by `GTMPerformanceMonitor.js`. An earlier approach that was replaced by the component. |
| ~~`lib/tailwind-utils.ts`~~ | ~~Not imported by any source file. Only mentioned in `.cursorrules` docs as a suggested utility, but no code actually uses it.~~ **Restored** — file was recreated with `vwToPx`, `vwToRem`, `pxToTailwind`, `vwToTailwind`, and `detectBreakpoint`. Referenced throughout `.cursorrules`, `design-tokens.mdc`, and `tailwind-migration.mdc` as the standard conversion utility for styled-components → Tailwind migrations. |
| `hooks/useOptimizedState.js` | Not imported by any component. Only referenced in `REACT_SCHEDULER_OPTIMIZATIONS.md`. |
| `lib/performanceUtils.js` | Only imported by `hooks/useOptimizedState.js`, which is itself unused. Effectively dead. |

---

## 3. `console.log` Statements in Production Code

These were identified as leftover debug statements that should be removed before the next production deploy.

| File | Lines / Context |
|------|----------------|
| `components/globalComponents/Footer.js` | Lines 30–31: `const testClasses = tw\`...\`` and `console.log('Generated classes:', testClasses)` — leftover from Tailwind variant group debugging. |
| `components/ResourceCta.js` | Line 14: `console.log(blok)` — raw Storyblok data dump, forgotten debug line. |
| `components/FormTracking.tsx` | Line 173: `console.log('UTM values passed to Marketo:', valuesToSet)` |
| `components/CookieConsentVideo.js` | Lines 83, 309, 312, 315, 318, 321, 324: multiple `console.log` for player lifecycle events (load, pause, play, ready, start). |
| `components/PerformanceMonitor.js` | Lines 23, 44: logs web vitals and navigation timing to console in production. |
| `components/GTMPerformanceMonitor.js` | Lines 20, 43, 60, 64, 69, 87: logs GTM script load time, size, dataLayer pushes — all firing in production. |

---

## 4. TODO/FIXME Comments — Unfinished Work

| File | Line | Comment |
|------|------|---------|
| `components/MasonryGrid.js` | 121 | `{/* TODO: @Bubba */}` — next to a commented-out `<Form>` block (`{/* {blok?.form && <Form blok={blok.form[0]} />} */}`). Unfinished form integration. |

---

## 5. Dead Documentation Files

These root-level markdown files reference code that is either deleted or was never actually adopted. They should either be updated to reflect current state or removed.

| File | Problem |
|------|---------|
| `CORE_WEB_VITALS_OPTIMIZATIONS.md` | References `components/CriticalCSS.js` (deleted) and `components/LazyImage.js` (unused). Describes a system that isn't running. |
| `TBT_OPTIMIZATIONS.md` | References `components/LazyHydration.js` and `lib/scriptOptimization.js` as "implemented" — `LazyHydration` is unused. |
| `REACT_SCHEDULER_OPTIMIZATIONS.md` | Documents `hooks/useOptimizedState.js` and `lib/performanceUtils.js` as implemented optimizations — both are dead code. |

---

## 6. Scratch / Dev Files

| File | Reason |
|------|--------|
| `test-tw.js` (root) | Full of `console.log` statements testing Tailwind variant group expansion. Throwaway scratch file never cleaned up. No exports, not referenced anywhere. |

---

## 7. Dependency Issues in `package.json`

| Issue | Detail |
|-------|--------|
| `npm-check-updates` in `dependencies` | CLI tool for checking package update availability. Should be in `devDependencies`. Has no business in the production bundle. |
| `clone-deep` in `dependencies` | No source file directly imports it. Only referenced in `next.config.js` for webpack chunking hints. If nothing imports it directly, it's deadweight — or it's a transitive dep being incorrectly forced into `package.json`. |
| `critters` in `dependencies` | Consumed implicitly by `next.config.js`'s `optimizeCss` option (Next.js uses it internally). Works but is an implicit coupling — if `optimizeCss` is removed, `critters` becomes orphaned. |

---

## 8. Commented-Out Imports

Not blocking, but worth cleaning during the styled-components migration:

- `components/ConversicaChat.js` — has a commented-out import
- `components/copyComponents/BodyCopy.js` — commented import remains from migration
- `components/copyComponents/Header.js` — same
- `components/centeredSections/Grid.js` — same
- `components/centeredSections/LogosGallery.js` — same
- `components/centeredSections/Stats.js` — same

---

## Summary by Priority

### 🔴 High — Delete these files

- `components/SEOUpdater.js`
- `components/LazyImage.js`
- `components/LazyHydration.js`
- `components/ContentWidth.js`
- `lib/gtmOptimization.js`
- ~~`lib/tailwind-utils.ts`~~ ← **Restored** (see section 2)
- `hooks/useOptimizedState.js`
- `lib/performanceUtils.js`
- `test-tw.js`

### 🔴 High — Remove `console.log` before next production deploy

- `components/globalComponents/Footer.js` (debug `testClasses` log)
- `components/ResourceCta.js` (blok dump)
- `components/FormTracking.tsx`
- `components/CookieConsentVideo.js`
- `components/PerformanceMonitor.js`
- `components/GTMPerformanceMonitor.js`

### 🟡 Medium — Fix `package.json`

- Move `npm-check-updates` to `devDependencies`
- Audit whether `clone-deep` is actually needed as a direct dependency

### 🟢 Low — Cleanup

- Delete or update `CORE_WEB_VITALS_OPTIMIZATIONS.md`, `TBT_OPTIMIZATIONS.md`, `REACT_SCHEDULER_OPTIMIZATIONS.md` to reflect actual current state
- Resolve the `MasonryGrid.js` TODO: either finish the form integration or remove the commented block
- Clean up commented-out imports across migrated components
