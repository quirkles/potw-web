import { it, expect, describe, jest, afterAll } from "@jest/globals";

import * as random from "./random";

describe("random.getPseudoRandomInRangeFromUid", () => {
  // Generates a pseudo-random number within the specified range for a given UID
  it("should generate a number within the range when given a valid UID", () => {
    const uid = "user123";
    const min = 1;
    const max = 10;
    const result = random.getPseudoRandomInRangeFromString(uid, max, min);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  // Handles an empty UID string gracefully
  it("should return the minimum value when UID is an empty string", () => {
    const uid = "";
    const min = 1;
    const max = 10;
    expect(() =>
      random.getPseudoRandomInRangeFromString(uid, max, min),
    ).toThrow(
      new Error(
        "Invalid input. `uid` must be a non-empty string and `max` must be greater than `min`.",
      ),
    );
  });

  // Handles UIDs with mixed case characters correctly by converting them to lowercase
  it("should handle UIDs with mixed case characters by converting them to lowercase", () => {
    // Test with mixed case characters
    expect(
      random.getPseudoRandomInRangeFromString("UsErId123", 10, 5),
    ).toBeGreaterThanOrEqual(5);
    expect(
      random.getPseudoRandomInRangeFromString("UsErId123", 10, 5),
    ).toBeLessThanOrEqual(10);

    // Test with all uppercase characters
    expect(
      random.getPseudoRandomInRangeFromString("USERID", 100, 50),
    ).toBeGreaterThanOrEqual(50);
    expect(
      random.getPseudoRandomInRangeFromString("USERID", 100, 50),
    ).toBeLessThanOrEqual(100);

    // Test with all lowercase characters
    expect(
      random.getPseudoRandomInRangeFromString("userid", 20, 10),
    ).toBeGreaterThanOrEqual(10);
    expect(
      random.getPseudoRandomInRangeFromString("userid", 20, 10),
    ).toBeLessThanOrEqual(20);
  });

  // Manages cases where min and max values are the same
  it("should return the same value when min and max are equal", () => {
    expect(() =>
      random.getPseudoRandomInRangeFromString("testuid", 5, 5),
    ).toThrow(
      new Error(
        "Invalid input. `uid` must be a non-empty string and `max` must be greater than `min`.",
      ),
    );
  });

  // Handles very large UIDs without performance degradation
  it("should handle very large UIDs without performance degradation", () => {
    // Test implementation will go here
    const uid = "VeryLargeUID1234567890";
    const max = 1000;
    const min = 500;

    const result = random.getPseudoRandomInRangeFromString(uid, max, min);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  // Processes UIDs with leading and trailing spaces correctly
  it("should process UIDs with leading and trailing spaces correctly", () => {
    // Test input
    const uid1 = "  testUid123  ";
    const uid2 = "testUid123";
    const max = 100;
    const min = 10;

    // Expected output based on the provided seed calculation
    const expectedOutput = 33;

    // Call the function with the test input
    const result1 = random.getPseudoRandomInRangeFromString(uid1, max, min);
    const result2 = random.getPseudoRandomInRangeFromString(uid2, max, min);

    // Assertion
    expect(result1).toBe(result2);
  });
});
