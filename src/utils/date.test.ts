import { test, it, expect, describe } from "@jest/globals";

import { isDateString } from "@/utils/date";

describe("dates", () => {
  describe("isDateString", () => {
    test('should return true for valid date strings in the format of "YYYY-MM-DD"', () => {
      // Arrange
      const date = "2024-01-01";

      // Act
      const result = isDateString(date);

      // Assert
      expect(result).toBe(true);
    });
    test("should return false for valid date strings missing leading 0s", () => {
      // Arrange
      const date = "2024-1-1";

      // Act
      const result = isDateString(date);

      // Assert
      expect(result).toBe(false);
    });
    it("should return false for date strings with invalid month", () => {
      // Arrange
      const date = "2024-13-01";

      // Act
      const result = isDateString(date);

      // Assert
      expect(result).toBe(false);
    });
    it("should return false for date strings with invalid format", () => {
      // Arrange
      const date = "2024-13-01";

      // Act
      const result = isDateString(date);

      // Assert
      expect(result).toBe(false);
    });
    it("should return false for date strings with invalid separators", () => {
      // Arrange
      const date = "2024/01/01";

      // Act
      const result = isDateString(date);

      // Assert
      expect(result).toBe(false);
    });
  });
});
