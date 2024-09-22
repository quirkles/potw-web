import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { ColorName } from "@/app/styles/colors";

const fontSizes = {
  xs: "0.6rem",
  sm: "0.8rem",
  md: "1rem",
  lg: "1.2rem",
  xl: "1.6rem",
} as const;

type FontSize = keyof typeof fontSizes;

const StyledSmall = styled.small<{
  $color: ColorName;
  $fontSize: FontSize;
  $fontWeight: "light" | "bold" | "normal" | "lighter" | "bolder";
  $fontStyle: "italic" | "normal" | "oblique";
}>`
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => fontSizes[$fontSize]};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  font-style: ${({ $fontStyle }) => $fontStyle};
`;

export function Small({
  $color = "black",
  $fontSize = "sm",
  $fontWeight = "normal",
  $fontStyle = "normal",
  children,
}: PropsWithChildren<{
  $color?: ColorName;
  $fontSize?: FontSize;
  $fontWeight?: "light" | "bold" | "normal" | "lighter" | "bolder";
  $fontStyle?: "italic" | "normal" | "oblique";
}>) {
  return (
    <StyledSmall
      $color={$color}
      $fontSize={$fontSize}
      $fontWeight={$fontWeight}
      $fontStyle={$fontStyle}
    >
      {children}
    </StyledSmall>
  );
}
