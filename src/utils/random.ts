export function getPseudoRandomInRangeFromUid(
  uid: string,
  max: number,
  min = 0,
) {
  if (uid.trim() === "" || max <= min) {
    throw new Error(
      "Invalid input. `uid` must be a non-empty string and `max` must be greater than `min`.",
    );
  }
  const seed = uid
    .toLowerCase()
    .replace(/[^0-9a-z]/g, "")
    .split("")
    .reduce((acc, char) => acc + parseInt(char, 36), 0);

  return Math.floor(seed % (max - min + 1)) + min;
}

export function getPseudoRandomFromArrayFromUid<T>(uid: string, array: T[]): T {
  if (uid.trim() === "" || array.length === 0) {
    throw new Error(
      "Invalid input. `uid` must be a non-empty string and `array` must be a non-empty array.",
    );
  }
  const index = getPseudoRandomInRangeFromUid(uid, array.length - 1);
  return array[index];
}
