type ClassValue = string | false | null | undefined;

/** Joins class names, skipping any that are empty or switched off. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
