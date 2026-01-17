export function formatPrice(cents: number): string {
  return `${(cents / 100).toFixed(0)}€`;
}

export function parseJsonArray(jsonString: string): string[] {
  try {
    return JSON.parse(jsonString);
  } catch {
    return [];
  }
}

export function stringifyArray(arr: string[]): string {
  return JSON.stringify(arr);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
