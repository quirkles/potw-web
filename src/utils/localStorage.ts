export function safeSetLocalStorage(key: string, value: string) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, value);
  }
}

export function safeGetLocalStorage(key: string): string | null {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
}
