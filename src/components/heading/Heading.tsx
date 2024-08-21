import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { baskerville, overpassMono, rubik } from "@/app/styles/fonts";

const StyledHeading = styled.h1<{
  $color?: string;
  $textTransform?: string;
}>`
  margin-bottom: 0.5em;
  text-decoration: underline;
  color: ${(props) => props.$color || "inherit"};
  text-transform: ${(props) => props.$textTransform || "none"};
`;

interface HeadingProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  $textTransform?: string;
  $color?: string;
  $font?: "mono" | "sans" | "serif";
}

function Heading({
  variant,
  $textTransform,
  $color,
  $font = "mono",
  children,
}: PropsWithChildren<HeadingProps>) {
  const fontClassname =
    $font === "mono"
      ? overpassMono.className
      : $font === "sans"
        ? rubik.className
        : baskerville.className;
  return (
    <StyledHeading
      as={variant}
      $color={$color}
      $textTransform={$textTransform}
      className={fontClassname}
    >
      {children}
    </StyledHeading>
  );
}

export default Heading;
