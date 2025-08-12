/**
 * Utility function for combining class names
 * A simple implementation of clsx/classnames functionality
 */

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}