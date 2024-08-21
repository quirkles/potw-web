import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";
import { baskerville, overpassMono, rubik } from "@/app/styles/fonts";

interface PProps {
  $textTransform?: "capitalize" | "lowercase" | "uppercase" | "none";
  $fontSize?: "small" | "medium" | "large";
  $fontWeight?: "light" | "normal" | "bold";
  $fontType?: "serif" | "sans" | "mono";
  $color?: ColorName;
}

const StyledP = styled.p<PProps>`
  font-family: ${(props: PProps) => {
    switch (props.$fontType) {
      case "serif":
        return baskerville.style.fontFamily;
      case "sans":
        rubik.style.fontFamily;
      case "mono":
        return overpassMono.style.fontFamily;
      default:
        return overpassMono.style.fontFamily;
    }
  }};
  font-size: ${(props: PProps) => {
    switch (props.$fontSize) {
      case "small":
        return "0.8em";
      case "medium":
        return "1em";
      case "large":
        return "1.2em";
      default:
        return "1em";
    }
  }};
  font-weight: ${(props: PProps) => {
    switch (props.$fontWeight) {
      case "light":
        return "300";
      case "normal":
        return "400";
      case "bold":
        return "700";
      default:
        return "400";
    }
  }};
  text-transform: ${(props: PProps) => props.$textTransform || "none"};
  color: ${(props: PProps) =>
    props.$color ? getColor(props.$color) || "inherit" : "inherit"};
`;
function P(props: PropsWithChildren<PProps>) {
  return <StyledP {...props}>{props.children}</StyledP>;
}

export default P;
