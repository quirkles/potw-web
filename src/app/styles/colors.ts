import { F, S } from "@mobily/ts-belt";

import { tint } from "@/utils/color.tint";

export type hexString = `#${string}`;

export const BaseColors = {
  blue: "#28A5C2",
  navy: "#2F719A",
  red: "#E73E2C",
  green: "#1CA075",
  yellow: "#F19C13",
  purple: "#cc99cc",
  orange: "#F35E47",
  cyan: "#69BFD7",
  white: "#F9F9F3",
  black: "#000000",
  grey: "#575757",
  lightGrey: "#adadad",
} as const;

export type BaseColorName = keyof typeof BaseColors;

export const baseColors: BaseColorName[] = Object.keys(
  BaseColors,
) as BaseColorName[];

export type BaseColorHex = (typeof BaseColors)[BaseColorName];

type ColorWeights = {
  100: "100";
  200: "200";
  300: "300";
  400: "400";
  500: "500";
  600: "600";
  700: "700";
  800: "800";
  900: "900";
};

type ColorWeight = keyof ColorWeights;

export type ColorWeightName = `${BaseColorName}_${ColorWeight}`;

export type ColorName = ColorWeightName | BaseColorName;

type Colors = {
  [key in ColorName]: hexString;
};

export const Colors: Colors = (
  Object.keys(BaseColors) as BaseColorName[]
).reduce((acc: Colors, key: BaseColorName) => {
  acc[`${key}_100`] = tint(0.8, BaseColors[key]) as hexString;
  acc[`${key}_200`] = tint(0.6, BaseColors[key]) as hexString;
  acc[`${key}_300`] = tint(0.4, BaseColors[key]) as hexString;
  acc[`${key}_400`] = tint(0.2, BaseColors[key]) as hexString;
  acc[`${key}_500`] = BaseColors[key];
  acc[`${key}`] = BaseColors[key];
  acc[`${key}_600`] = tint(-0.2, BaseColors[key]) as hexString;
  acc[`${key}_700`] = tint(-0.4, BaseColors[key]) as hexString;
  acc[`${key}_800`] = tint(-0.6, BaseColors[key]) as hexString;
  acc[`${key}_900`] = tint(-0.6, BaseColors[key]) as hexString;
  return acc;
}, {} as Colors);

function _getColor<T extends keyof Colors>(colorName: T): Colors[T] {
  return Colors[colorName];
}

export const getColor = F.memoizeWithKey(
  (colorName: keyof Colors) => colorName,
  _getColor,
);
