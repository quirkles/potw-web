export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function emailWithoutDomain(value: string): string {
  return value.split("@")[0];
}
