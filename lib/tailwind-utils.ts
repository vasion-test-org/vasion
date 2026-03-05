/**
 * Tailwind CSS v4 conversion utilities.
 *
 * Used when converting styled-components vw/px values to Tailwind class numbers.
 * Tailwind JIT generates any class automatically: number × 0.25rem = size.
 *
 * Formula: px / 4 = Tailwind class number
 * Example: 200px / 4 = 50 → `w-50`
 *
 * Viewport widths per breakpoint:
 *   Mobile  (base): 480px
 *   Tablet  (md):  1024px
 *   Desktop (lg):  1600px
 *   Full    (xl):  direct px values
 */

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'fullWidth';

const VIEWPORT_WIDTHS: Record<Breakpoint, number> = {
  mobile: 480,
  tablet: 1024,
  desktop: 1600,
  fullWidth: 1600,
};

/**
 * Convert a vw value at a given viewport width to px.
 *
 * @example
 * vwToPx(12.5, 1600) // → 200 (desktop)
 * vwToPx(19.531, 1024) // → 200 (tablet)
 * vwToPx(41.667, 480)  // → 200 (mobile)
 */
export function vwToPx(vw: number, viewportWidth: number): number {
  return (vw * viewportWidth) / 100;
}

/**
 * Convert a vw value at a given viewport width to rem (base 16px).
 *
 * @example
 * vwToRem(12.5, 1600)  // → 12.5 (desktop) — use `w-50` (200/4)
 * vwToRem(19.531, 1024) // → 12.5 (tablet)
 * vwToRem(41.667, 480)  // → 12.5 (mobile)
 */
export function vwToRem(vw: number, viewportWidth: number): number {
  return vwToPx(vw, viewportWidth) / 16;
}

/**
 * Convert px to the Tailwind class number (px / 4).
 *
 * @example
 * pxToTailwind(200) // → 50  → use `w-50`
 * pxToTailwind(1304) // → 326 → use `w-326`
 */
export function pxToTailwind(px: number): number {
  return px / 4;
}

/**
 * Convert a vw value at a named breakpoint to its Tailwind class number.
 * Combines vwToPx → pxToTailwind in one call.
 *
 * @example
 * vwToTailwind(12.5, 'desktop')  // → 50  → `w-50`
 * vwToTailwind(19.531, 'tablet') // → 50  → `w-50`
 * vwToTailwind(41.667, 'mobile') // → 50  → `w-50`
 */
export function vwToTailwind(vw: number, breakpoint: Breakpoint): number {
  const px = vwToPx(vw, VIEWPORT_WIDTHS[breakpoint]);
  return pxToTailwind(px);
}

/**
 * Detect whether a vw value produces the same px at all breakpoints.
 * If true, a single base Tailwind class is sufficient (no responsive prefixes needed).
 *
 * @example
 * detectBreakpoint(12.5, 19.531, 41.667) // → { same: true, px: 200, tailwind: 50 }
 * detectBreakpoint(88.806, 124.902, 353.738) // → { same: false, values: { desktop: 355, tablet: 320, mobile: 425 } }
 */
export function detectBreakpoint(
  desktopVw: number,
  tabletVw: number,
  mobileVw: number
):
  | { same: true; px: number; tailwind: number }
  | { same: false; values: Record<'desktop' | 'tablet' | 'mobile', { px: number; tailwind: number }> } {
  const desktopPx = Math.round(vwToPx(desktopVw, 1600));
  const tabletPx = Math.round(vwToPx(tabletVw, 1024));
  const mobilePx = Math.round(vwToPx(mobileVw, 480));

  if (desktopPx === tabletPx && tabletPx === mobilePx) {
    return {
      same: true,
      px: desktopPx,
      tailwind: pxToTailwind(desktopPx),
    };
  }

  return {
    same: false,
    values: {
      desktop: { px: desktopPx, tailwind: pxToTailwind(desktopPx) },
      tablet: { px: tabletPx, tailwind: pxToTailwind(tabletPx) },
      mobile: { px: mobilePx, tailwind: pxToTailwind(mobilePx) },
    },
  };
}
