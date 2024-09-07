import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";
import { baskerville, overpassMono, rubik } from "@/app/styles/fonts";

const StyledHeading = styled.h1<{
  $color?: ColorName;
  $textTransform?: string;
  $underline: boolean;
}>`
  margin-bottom: 0.5em;
  text-decoration: underline;
  color: ${(props) => (props.$color ? getColor(props.$color) : "inherit")};
  text-transform: ${(props) => props.$textTransform || "none"};
  text-decoration: ${(props) => (props.$underline ? "underline" : "none")};
`;

interface HeadingProps {
  $variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  $textTransform?: string;
  $color?: ColorName;
  $font?: "mono" | "sans" | "serif";
  $underline?: boolean;
}

function Heading({
  $variant,
  $textTransform,
  $color,
  $font = "mono",
  children,
  $underline = false,
}: PropsWithChildren<HeadingProps>) {
  const fontClassname =
    $font === "mono"
      ? overpassMono.className
      : $font === "sans"
        ? rubik.className
        : baskerville.className;
  return (
    <StyledHeading
      as={$variant}
      $color={$color}
      $textTransform={$textTransform}
      className={fontClassname}
      $underline={$underline}
    >
      {children}
    </StyledHeading>
  );
}

export default Heading;
