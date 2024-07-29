import { PropsWithChildren } from "react";
import styled from "styled-components";

interface FlexParentProps {
  $direction?: "row" | "column";
  $justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  $alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  $wrap?: "nowrap" | "wrap" | "wrap-reverse";
  $gap?: "small" | "medium" | "large";
}

const FlexBox = styled.div<FlexParentProps>`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  justify-content: ${(props) => props.$justifyContent || "flex-start"};
  align-items: ${(props) => props.$alignItems || "flex-start"};
  flex-wrap: ${(props) => props.$wrap || "nowrap"};
  gap: ${(props) =>
    props.$gap === "small"
      ? "0.5em"
      : props.$gap === "medium"
        ? "1em"
        : props.$gap === "large"
          ? "2em"
          : "0"};
`;

interface FlexChildProps {
  $grow?: number;
  $shrink?: number;
  $basis?: string;
  $alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch";
}

const FlexItem = styled.div<FlexChildProps>`
  flex-grow: ${(props) => props.$grow || 0};
  flex-shrink: ${(props) => props.$shrink || 1};
  flex-basis: ${(props) => props.$basis || "auto"};
  align-self: ${(props) => props.$alignSelf || "auto"};
`;

export { FlexBox, FlexItem };
