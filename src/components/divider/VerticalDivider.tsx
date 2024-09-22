import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { ColorName, Colors } from "@/app/styles/colors";

export const SIZE = {
  none: "none",
  xSmall: "xSmall",
  small: "small",
  medium: "medium",
  large: "large",
  xLarge: "xLarge",
} as const;

export type SIZE = keyof typeof SIZE;

interface DividerProps {
  $padding?: keyof typeof SIZE;
  $paddingX?: keyof typeof SIZE;
  $paddingY?: keyof typeof SIZE;
  $paddingTop?: keyof typeof SIZE;
  $paddingBottom?: keyof typeof SIZE;
  $paddingLeft?: keyof typeof SIZE;
  $paddingRight?: keyof typeof SIZE;
  $margin?: keyof typeof SIZE;
  $marginX?: keyof typeof SIZE;
  $marginY?: keyof typeof SIZE;
  $marginTop?: keyof typeof SIZE;
  $marginBottom?: keyof typeof SIZE;
  $marginLeft?: keyof typeof SIZE;
  $marginRight?: keyof typeof SIZE;
  $width?: keyof typeof SIZE;
  $color?: ColorName;
}

const spaceValues: {
  [size in keyof typeof SIZE]: `${number}em`;
} = {
  none: "0em",
  xSmall: "0.5em",
  small: "1em",
  medium: "2em",
  large: "3em",
  xLarge: "4em",
};

const widthValues: {
  [size in keyof typeof SIZE]: `${number}px`;
} = {
  none: "0px",
  xSmall: "0.5px",
  small: "1px",
  medium: "1.5px",
  large: "2px",
  xLarge: "4px",
};

const DividerStyle = styled.div<DividerProps>`
  padding-top: ${(props) =>
    spaceValues[
      props.$paddingTop || props.$paddingY || props.$padding || SIZE.none
    ]};
  padding-bottom: ${(props) =>
    spaceValues[
      props.$paddingBottom || props.$paddingY || props.$padding || SIZE.none
    ]};
  padding-left: ${(props) =>
    spaceValues[
      props.$paddingLeft || props.$paddingX || props.$padding || SIZE.none
    ]};
  padding-right: ${(props) =>
    spaceValues[
      props.$paddingRight || props.$paddingX || props.$padding || SIZE.none
    ]};
  margin-top: ${(props) =>
    spaceValues[
      props.$marginTop || props.$marginY || props.$margin || SIZE.none
    ]};
  margin-bottom: ${(props) =>
    spaceValues[
      props.$marginBottom || props.$marginY || props.$margin || SIZE.none
    ]};
  margin-left: ${(props) =>
    spaceValues[
      props.$marginLeft || props.$marginX || props.$margin || SIZE.none
    ]};
  margin-right: ${(props) =>
    spaceValues[
      props.$marginRight || props.$marginX || props.$margin || SIZE.none
    ]};
  > div {
    height: 100%;
    width: ${(props) => widthValues[props.$width || SIZE.medium]};
    background-color: ${(props) => Colors[props.$color || "lightGrey"]};
  }
`;

function VerticalDivider(props: PropsWithChildren<DividerProps>) {
  return (
    <DividerStyle {...props}>
      <div />
    </DividerStyle>
  );
}

export default VerticalDivider;
