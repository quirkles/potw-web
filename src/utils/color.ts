import {
  BaseColorName,
  ColorName,
  colors,
  hexString,
} from "@/app/styles/colors";
import { F } from "@mobily/ts-belt";

export function hexToRgbA(hex: hexString, opacity: number = 1): string {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},${opacity})`;
  }
  throw new Error("Bad Hex");
}

type ColorObject = Record<"r" | "g" | "b" | "a", number>;

// adapted to TS from https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
const colorConfig: {
  [baseColor in BaseColorName]: {
    baseColor: BaseColorName;
    accentBaseColor: BaseColorName;
    contrastBaseColor: ColorName | BaseColorName;
    fontBaseColor: BaseColorName;
  };
} = {
  black: {
    accentBaseColor: "lightGrey",
    baseColor: "black",
    contrastBaseColor: "white",
    fontBaseColor: "white",
  },
  navy: {
    accentBaseColor: "blue",
    baseColor: "black",
    contrastBaseColor: "cyan",
    fontBaseColor: "white",
  },
  cyan: {
    accentBaseColor: "green",
    baseColor: "cyan",
    contrastBaseColor: "navy",
    fontBaseColor: "white",
  },
  grey: {
    accentBaseColor: "black",
    baseColor: "grey",
    contrastBaseColor: "green_700",
    fontBaseColor: "white",
  },
  lightGrey: {
    accentBaseColor: "grey",
    baseColor: "lightGrey",
    contrastBaseColor: "blue_700",
    fontBaseColor: "white",
  },
  orange: {
    accentBaseColor: "red",
    baseColor: "orange",
    contrastBaseColor: "yellow",
    fontBaseColor: "white",
  },
  purple: {
    accentBaseColor: "blue",
    baseColor: "purple",
    contrastBaseColor: "navy",
    fontBaseColor: "white",
  },
  red: {
    accentBaseColor: "orange",
    baseColor: "red",
    contrastBaseColor: "blue",
    fontBaseColor: "white",
  },
  white: {
    accentBaseColor: "lightGrey",
    baseColor: "white",
    contrastBaseColor: "black",
    fontBaseColor: "white",
  },
  blue: {
    baseColor: "blue",
    accentBaseColor: "green",
    contrastBaseColor: "yellow",
    fontBaseColor: "white",
  },
  green: {
    baseColor: "green",
    accentBaseColor: "blue",
    contrastBaseColor: "purple_700",
    fontBaseColor: "white",
  },
  yellow: {
    baseColor: "yellow",
    accentBaseColor: "red",
    contrastBaseColor: "blue",
    fontBaseColor: "white",
  },
};

export const getColorConfig = F.memoizeWithKey(
  F.identity,
  (baseColor: BaseColorName) => colorConfig[baseColor],
);

export const getColor = (
  baseColor: BaseColorName,
  variant: "base" | "accent" | "contrast" | "font" = "base",
): hexString => {
  const color = getColorConfig(baseColor);
  const colorKey:
    | "baseColor"
    | "accentBaseColor"
    | "contrastBaseColor"
    | "fontBaseColor" =
    variant === "base"
      ? "baseColor"
      : variant === "accent"
        ? "accentBaseColor"
        : variant === "font"
          ? "fontBaseColor"
          : "contrastBaseColor";
  const colorVariant = color[colorKey];
  return colors[colorVariant] as hexString;
};
