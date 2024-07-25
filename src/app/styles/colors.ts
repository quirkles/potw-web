import { tint } from "@/utils/color.tint";

export type hexString = `#${string}`;

export const BaseColors = {
  blue: "#6699cc",
  red: "#f2777a",
  green: "#99cc99",
  yellow: "#ffcc66",
  purple: "#cc99cc",
  orange: "#f99157",
  cyan: "#66cccc",
  white: "#FFFFFF",
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

type ColorName = `${BaseColorName}_${ColorWeight}`;

type Colors = {
  [key in ColorName]: hexString;
};

export const colors: Colors = (
  Object.keys(BaseColors) as BaseColorName[]
).reduce((acc: Colors, key: BaseColorName) => {
  acc[`${key}_100`] = tint(0.8, BaseColors[key]) as hexString;
  acc[`${key}_200`] = tint(0.6, BaseColors[key]) as hexString;
  acc[`${key}_300`] = tint(0.4, BaseColors[key]) as hexString;
  acc[`${key}_400`] = tint(0.2, BaseColors[key]) as hexString;
  acc[`${key}_500`] = BaseColors[key];
  acc[`${key}_600`] = tint(-0.2, BaseColors[key]) as hexString;
  acc[`${key}_700`] = tint(-0.4, BaseColors[key]) as hexString;
  acc[`${key}_800`] = tint(-0.6, BaseColors[key]) as hexString;
  acc[`${key}_900`] = tint(-0.6, BaseColors[key]) as hexString;
  return acc;
}, {} as Colors);
