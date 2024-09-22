export default function keyMirror<T extends readonly string[]>(
  keys: T,
): { [K in T[number]]: K } {
  return keys.reduce(
    (acc: { [K in T[number]]: K }, key: string) => {
      acc[key as T[number]] = key;
      return acc;
    },
    {} as { [K in T[number]]: K },
  );
}

function isObject(item: any): boolean {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

export function deepMergeWithMap<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
>(target: T, source: U, visited = new Map<any, any>()): T & U {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          target[key] = {} as T[Extract<keyof U, string>];
        }
        // Check if the source object has already been visited
        if (!visited.has(source[key])) {
          visited.set(source[key], {});
          deepMergeWithMap(
            target[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
            visited,
          );
        } else {
          target[key] = visited.get(source[key]);
        }
      } else {
        target[key] = source[key] as (T & U)[Extract<keyof U, string>];
      }
    }
  }
  return target as T & U;
}
