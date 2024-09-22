import { describe, it, expect } from "@jest/globals";

import { deepMergeWithMap } from "./object";
describe("deepMergeWithMap", () => {
  // Merges two simple objects with non-overlapping keys
  it("should merge two simple objects with non-overlapping keys", () => {
    const target = { a: 1, b: 2 };
    const source = { c: 3, d: 4 };
    const result = deepMergeWithMap(target, source);
    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  // Handles circular references without causing infinite recursion
  it("should handle circular references without causing infinite recursion", () => {
    const target = { a: 1 };
    const source: any = { b: {} };
    source.b["circular"] = source;
    const result = deepMergeWithMap(target, source);
    expect(result).toEqual({
      a: 1,
      b: {
        circular: {
          b: {},
        },
      },
    });
  });

  // Merges two objects with overlapping keys where values are primitives
  it("should merge two objects with overlapping keys where values are primitives", () => {
    const target = { a: 1, b: 2, c: 5 };
    const source = { b: 3, c: 4 };
    const result = deepMergeWithMap(target, source);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  // Merges nested objects correctly without losing any nested structure
  it("should merge two nested objects with overlapping keys when merging two objects with nested structures", () => {
    const target = { a: { x: 1, y: 2 }, b: { z: 3 } };
    const source = { a: { y: 5 }, c: { w: 4 } };
    const result = deepMergeWithMap(target, source);
    expect(result).toEqual({ a: { x: 1, y: 5 }, b: { z: 3 }, c: { w: 4 } });
  });

  // Handles merging when the target object is initially empty
  it("should merge source object into an empty target object", () => {
    const target = {};
    const source = { a: 1, b: 2 };
    const result = deepMergeWithMap(target, source);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  // Merges objects with multiple levels of nesting
  it("should merge two objects with multiple levels of nesting", () => {
    const target = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };
    const source = {
      b: {
        c: 4,
        e: 5,
      },
      f: 6,
    };
    const result = deepMergeWithMap(target, source);
    expect(result).toEqual({
      a: 1,
      b: {
        c: 4,
        d: 3,
        e: 5,
      },
      f: 6,
    });
  });
});
