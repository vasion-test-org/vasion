import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for conditionally joining Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @example
 * // Basic usage
 * cn('px-4 py-2', 'bg-purple-DEFAULT')
 * // => 'px-4 py-2 bg-purple-DEFAULT'
 *
 * @example
 * // Conditional classes
 * cn('base-class', isActive && 'active-class', isDisabled && 'opacity-50')
 *
 * @example
 * // Override conflicting classes (tailwind-merge handles this)
 * cn('px-4', 'px-6')
 * // => 'px-6' (later class wins)
 *
 * @example
 * // Object syntax
 * cn({ 'bg-red-500': hasError, 'bg-green-500': !hasError })
 *
 * @example
 * // Array syntax
 * cn(['px-4', 'py-2'], condition && ['hover:bg-purple-500'])
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
