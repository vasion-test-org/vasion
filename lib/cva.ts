import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './cn';

export { cva, type VariantProps };

/**
 * Combines CVA variants with additional classes using cn()
 * Use this when you need to merge CVA output with extra Tailwind classes
 *
 * @example
 * const buttonVariants = cva('base-classes', {
 *   variants: {
 *     size: { sm: 'text-sm', lg: 'text-lg' },
 *     color: { primary: 'bg-purple', secondary: 'bg-grey-100' }
 *   },
 *   defaultVariants: { size: 'sm', color: 'primary' }
 * });
 *
 * // In component:
 * <button className={cn(buttonVariants({ size, color }), className)}>
 */

/**
 * Example button variants using CVA
 * Copy this pattern for your own component variants
 */
export const buttonVariants = cva(
  // Base styles applied to all variants
  [
    'inline-flex items-center justify-center',
    'font-archivo rounded-md font-semibold',
    'transition-colors duration-200',
    'focus:ring-2 focus:ring-offset-2 focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      // Visual style variants
      variant: {
        primary: [
          'bg-purple text-white',
          'hover:bg-purple-dark',
          'focus:ring-purple-border',
        ],
        secondary: [
          'border-purple-border text-purple border-2 bg-transparent',
          'hover:bg-purple-100',
          'focus:ring-purple-border',
        ],
        orange: ['bg-orange text-white', 'hover:bg-orange-dark', 'focus:ring-orange-500'],
        ghost: ['text-txt-primary bg-transparent', 'hover:bg-grey-50', 'focus:ring-grey-400'],
        link: [
          'text-purple bg-transparent underline-offset-4',
          'hover:underline',
          'focus:ring-purple-border',
        ],
      },
      // Size variants
      size: {
        sm: 'text-body-sm px-3 py-1.5',
        md: 'text-body-md px-4 py-2',
        lg: 'text-body-lg px-6 py-3',
        xl: 'text-body-xl px-8 py-4',
      },
      // Full width option
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    // Default values if not specified
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// Export the type for props
export type ButtonVariants = VariantProps<typeof buttonVariants>;
