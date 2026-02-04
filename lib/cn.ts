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

/**
 * Expands variant group syntax into standard Tailwind classes
 * Transforms `md:(pb-5 mb-10)` into `md:pb-5 md:mb-10`
 *
 * @param classString - String containing variant groups
 * @returns Expanded class string
 *
 * @example
 * expandVariantGroups('flex md:(pb-5 mb-10) lg:(p-8 gap-4)')
 * // => 'flex md:pb-5 md:mb-10 lg:p-8 lg:gap-4'
 *
 * @example
 * expandVariantGroups('hover:(bg-purple text-white) focus:(ring-2 outline-none)')
 * // => 'hover:bg-purple hover:text-white focus:ring-2 focus:outline-none'
 */
export function expandVariantGroups(classString: string): string {
  // Match pattern: variant:(class1 class2 class3)
  // Supports nested variants like sm:hover:(class1 class2)
  const variantGroupRegex = /([a-zA-Z0-9-]+:?)+\(([^)]+)\)/g;

  return classString.replace(variantGroupRegex, (match, _variant, classes) => {
    // Extract the full variant prefix (everything before the parenthesis)
    const variantPrefix = match.slice(0, match.indexOf('('));
    // Split classes by whitespace and prefix each with the variant
    const classList = classes.trim().split(/\s+/);
    return classList.map((cls: string) => `${variantPrefix}${cls}`).join(' ');
  });
}

/**
 * Tagged template literal for Tailwind classes with variant group support
 * Combines expandVariantGroups with tailwind-merge for clean syntax
 *
 * @example
 * // Basic usage with variant groups
 * tw`flex md:(pb-5 mb-10) lg:(p-8 gap-4)`
 * // => 'flex md:pb-5 md:mb-10 lg:p-8 lg:gap-4'
 *
 * @example
 * // With interpolation
 * tw`flex ${isActive ? 'bg-purple' : 'bg-grey-100'} md:(p-4 gap-2)`
 *
 * @example
 * // Hover/focus states
 * tw`bg-white hover:(bg-purple text-white) focus:(ring-2 ring-purple-border)`
 */
export function tw(
  strings: TemplateStringsArray,
  ...values: (string | number | boolean | undefined | null)[]
): string {
  // Combine template literal parts
  const combined = strings.reduce((result, str, i) => {
    const value = values[i];
    // Filter out falsy values except 0
    const valueStr = value === 0 ? '0' : value ? String(value) : '';
    return result + str + valueStr;
  }, '');

  // Expand variant groups and merge with tailwind-merge
  return twMerge(expandVariantGroups(combined));
}
