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
 *     color: { primary: 'bg-purple-DEFAULT', secondary: 'bg-grey-100' }
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
    'rounded-md font-archivo font-semibold',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      // Visual style variants
      variant: {
        primary: [
          'bg-purple-DEFAULT text-white',
          'hover:bg-purple-dark',
          'focus:ring-purple-border',
        ],
        secondary: [
          'bg-transparent border-2 border-purple-border text-purple-DEFAULT',
          'hover:bg-purple-100',
          'focus:ring-purple-border',
        ],
        orange: [
          'bg-orange-DEFAULT text-white',
          'hover:bg-orange-dark',
          'focus:ring-orange-500',
        ],
        ghost: [
          'bg-transparent text-txt-primary',
          'hover:bg-grey-50',
          'focus:ring-grey-400',
        ],
        link: [
          'bg-transparent text-purple-DEFAULT underline-offset-4',
          'hover:underline',
          'focus:ring-purple-border',
        ],
      },
      // Size variants
      size: {
        sm: 'px-3 py-1.5 text-body-sm',
        md: 'px-4 py-2 text-body-md',
        lg: 'px-6 py-3 text-body-lg',
        xl: 'px-8 py-4 text-body-xl',
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
