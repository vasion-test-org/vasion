/**
 * Tailwind CSS Conversion Utilities
 * Helpers for converting styled-components values to Tailwind
 *
 * Based on pxvwconverter (https://github.com/RJWadley/pxvwconverter)
 * The vw value is relative to viewport width, so the SAME pixel value
 * requires DIFFERENT vw values at each breakpoint.
 *
 * Example: 200px target
 * - Desktop (1600px): 12.5vw × 1600 / 100 = 200px
 * - Tablet (1024px): 19.531vw × 1024 / 100 = 200px
 * - Mobile (480px): 41.667vw × 480 / 100 = 200px
 *
 * All three convert to the same 12.5rem (200px / 16)
 */

// Breakpoint reference widths (from styles/media.js and pxVwConverter settings)
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 1024,
  desktop: 1600,
  styled: 1600, // Default for base styles
} as const;

/**
 * Convert vw to px at a specific viewport width
 * Formula: px = vw × (viewportWidth / 100)
 *
 * @param vw - The viewport width value (e.g., 12.5 for 12.5vw)
 * @param viewportWidth - The viewport width for this breakpoint
 * @returns px value as a number
 *
 * @example
 * vwToPx(12.5, 1600) // Desktop: 12.5vw = 200px
 * vwToPx(19.531, 1024) // Tablet: 19.531vw = 200px
 * vwToPx(41.667, 480) // Mobile: 41.667vw = 200px
 */
export function vwToPx(vw: number, viewportWidth: number = BREAKPOINTS.desktop): number {
  return vw * (viewportWidth / 100);
}

/**
 * Convert vw to rem at a specific viewport width
 * Formula: rem = vw × (viewportWidth / 100) / 16
 *
 * IMPORTANT: Pass the correct viewport width for the breakpoint!
 * - In ${media.desktop} block → use 1600
 * - In ${media.tablet} block → use 1024
 * - In ${media.mobile} block → use 480
 *
 * @param vw - The viewport width value (e.g., 12.5 for 12.5vw)
 * @param viewportWidth - The viewport width for this breakpoint
 * @returns rem value as a number
 *
 * @example
 * // All these produce the same 12.5rem (200px) because the vw
 * // values are calibrated for their respective viewports:
 * vwToRem(12.5, 1600) // Desktop: 12.5vw → 200px → 12.5rem
 * vwToRem(19.531, 1024) // Tablet: 19.531vw → 200px → 12.5rem
 * vwToRem(41.667, 480) // Mobile: 41.667vw → 200px → 12.5rem
 */
export function vwToRem(vw: number, viewportWidth: number = BREAKPOINTS.desktop): number {
  const px = vwToPx(vw, viewportWidth);
  const rem = px / 16;
  return Math.round(rem * 1000) / 1000; // Round to 3 decimal places
}

/**
 * Convert px to rem
 * @param px - Pixel value
 * @returns rem value
 */
export function pxToRem(px: number): number {
  return px / 16;
}

/**
 * Convert rem to px
 * @param rem - Rem value
 * @returns px value
 */
export function remToPx(rem: number): number {
  return rem * 16;
}

/**
 * Get the closest Tailwind spacing value for a given rem/px value
 * ALWAYS returns a standard Tailwind value - never arbitrary values
 *
 * @param value - The value in rem or px
 * @param unit - Whether the input is 'rem' or 'px'
 * @returns Tailwind spacing key (e.g., "4", "8", "96")
 */
export function getClosestTailwindSpacing(value: number, unit: 'rem' | 'px' = 'rem'): string {
  const remValue = unit === 'px' ? value / 16 : value;

  // Standard Tailwind spacing scale (key: rem value)
  const spacingScale: Record<string, number> = {
    '0': 0,
    '0.5': 0.125,
    '1': 0.25,
    '1.5': 0.375,
    '2': 0.5,
    '2.5': 0.625,
    '3': 0.75,
    '3.5': 0.875,
    '4': 1,
    '5': 1.25,
    '6': 1.5,
    '7': 1.75,
    '8': 2,
    '9': 2.25,
    '10': 2.5,
    '11': 2.75,
    '12': 3,
    '14': 3.5,
    '16': 4,
    '20': 5,
    '24': 6,
    '28': 7,
    '32': 8,
    '36': 9,
    '40': 10,
    '44': 11,
    '48': 12,
    '52': 13,
    '56': 14,
    '60': 15,
    '64': 16,
    '72': 18,
    '80': 20,
    '96': 24,
    // Custom spacing from tailwind.config.js
    '4.5': 1.125,
    '13': 3.25,
    '15': 3.75,
    '18': 4.5,
    '22': 5.5,
    '25': 6.25,
    '30': 7.5,
    '37': 9.25,
    '50': 12.5,
    '75': 18.75,
    '100': 25,
    '150': 37.5,
  };

  // For values not in the scale, Tailwind JIT generates them automatically
  // Formula: number * 0.25rem = size (e.g., w-326 = 326 * 0.25rem = 81.5rem = 1304px)

  // Find closest match - ALWAYS return a Tailwind value, never arbitrary
  let closestKey = '0';
  let closestDiff = Infinity;

  for (const [key, rem] of Object.entries(spacingScale)) {
    const diff = Math.abs(rem - remValue);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestKey = key;
    }
  }

  return closestKey;
}

/**
 * Convert a vw value to the closest Tailwind class
 * ALWAYS returns a standard Tailwind class - never arbitrary values
 *
 * @param vw - The vw value (e.g., 9.5 for 9.5vw)
 * @param property - The CSS property type ('width', 'height', 'padding', 'margin', 'gap')
 * @param viewport - The reference viewport width
 * @returns Tailwind class string (e.g., "w-37", "p-10")
 *
 * @example
 * vwToTailwindClass(9.5, 'width') // "w-37" (closest to 9.5rem)
 * vwToTailwindClass(2.5, 'padding') // "p-10" (closest to 2.5rem = 40px)
 */
export function vwToTailwindClass(
  vw: number,
  property: 'width' | 'height' | 'padding' | 'margin' | 'gap' | 'fontSize',
  viewport: number = BREAKPOINTS.desktop
): string {
  const rem = vwToRem(vw, viewport);
  const spacing = getClosestTailwindSpacing(rem);

  const prefixes: Record<string, string> = {
    width: 'w',
    height: 'h',
    padding: 'p',
    margin: 'm',
    gap: 'gap',
    fontSize: 'text',
  };

  const prefix = prefixes[property];
  return `${prefix}-${spacing}`;
}

/**
 * Convert px to vw at a specific viewport width
 * Useful for understanding what vw value produces a pixel size
 * Formula: vw = px / viewportWidth × 100
 *
 * @param px - The pixel value
 * @param viewportWidth - The viewport width for this breakpoint
 * @returns vw value as a number
 *
 * @example
 * // What vw gives 200px at each breakpoint?
 * pxToVw(200, 1600) // Desktop: 12.5vw
 * pxToVw(200, 1024) // Tablet: 19.531vw
 * pxToVw(200, 480) // Mobile: 41.667vw
 */
export function pxToVw(px: number, viewportWidth: number = BREAKPOINTS.desktop): number {
  return Math.round((px / viewportWidth) * 100 * 1000) / 1000;
}

/**
 * Detect breakpoint from styled-components media query context
 * Returns the viewport width to use for vw calculations
 *
 * @param code - The code snippet containing media query context
 * @returns The viewport width for the detected breakpoint
 *
 * @example
 * detectBreakpoint('${media.tablet} { width: 10vw; }') // 1024
 * detectBreakpoint('${media.mobile} { width: 10vw; }') // 480
 * detectBreakpoint('width: 10vw;') // 1600 (default/desktop)
 */
export function detectBreakpoint(code: string): number {
  if (code.includes('media.mobile') || code.includes('mobile')) return BREAKPOINTS.mobile;
  if (code.includes('media.tablet') || code.includes('tablet')) return BREAKPOINTS.tablet;
  if (code.includes('media.desktop') || code.includes('desktop')) return BREAKPOINTS.desktop;
  return BREAKPOINTS.styled; // Default
}

/**
 * Quick reference: Same pixel value requires different vw at each breakpoint
 *
 * Example: 200px
 * - Desktop (1600px): 12.5vw
 * - Tablet (1024px): 19.531vw
 * - Mobile (480px): 41.667vw
 * - All convert to 12.5rem (200px / 16)
 * - Closest Tailwind: w-50 (12.5rem = 200px)
 */
export const VW_CONVERSION_EXAMPLES = {
  // Target: 200px = 12.5rem = Tailwind "50"
  '200px': {
    desktop: '12.5vw',
    tablet: '19.531vw',
    mobile: '41.667vw',
    rem: '12.5rem',
    tailwind: '50',
  },
  // Target: 100px = 6.25rem = Tailwind "25"
  '100px': {
    desktop: '6.25vw',
    tablet: '9.766vw',
    mobile: '20.833vw',
    rem: '6.25rem',
    tailwind: '25',
  },
  // Target: 80px = 5rem = Tailwind "20"
  '80px': {
    desktop: '5vw',
    tablet: '7.813vw',
    mobile: '16.667vw',
    rem: '5rem',
    tailwind: '20',
  },
  // Target: 40px = 2.5rem = Tailwind "10"
  '40px': {
    desktop: '2.5vw',
    tablet: '3.906vw',
    mobile: '8.333vw',
    rem: '2.5rem',
    tailwind: '10',
  },
} as const;
