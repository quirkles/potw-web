import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { hexString } from "@/app/styles/colors";
import { baskerville, overpassMono, rubik } from "@/app/styles/fonts";

interface SpanProps {
  $textTransform?: "capitalize" | "lowercase" | "uppercase" | "none";
  $fontSize?: "small" | "medium" | "large";
  $fontWeight?: "light" | "normal" | "bold";
  $fontType?: "serif" | "sans" | "mono";
  $color?: hexString;
}

const StyledSpan = styled.span<SpanProps>`
  font-family: ${(props: SpanProps) => {
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
  font-size: ${(props: SpanProps) => {
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
  font-weight: ${(props: SpanProps) => {
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
  text-transform: ${(props: SpanProps) => props.$textTransform || "none"};
  color: ${(props: SpanProps) => props.$color || "inherit"};
`;
export default function Span(props: PropsWithChildren<SpanProps>) {
  return <StyledSpan {...props}>{props.children}</StyledSpan>;
}
