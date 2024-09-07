import { PropsWithChildren } from "react";
import { styled } from "styled-components";

export const SIZE = {
  none: "none",
  xSmall: "xSmall",
  small: "small",
  medium: "medium",
  large: "large",
  xLarge: "xLarge",
} as const;

export type SIZE = keyof typeof SIZE;

interface SpacerProps {
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
}

const values: {
  [size in keyof typeof SIZE]: `${number}em`;
} = {
  none: "0em",
  xSmall: "0.5em",
  small: "1em",
  medium: "2em",
  large: "3em",
  xLarge: "4em",
};

const SpacerStyle = styled.div<SpacerProps>`
  max-height: 100%;
  padding-top: ${(props) =>
    values[
      props.$paddingTop || props.$paddingY || props.$padding || SIZE.none
    ]};
  padding-bottom: ${(props) =>
    values[
      props.$paddingBottom || props.$paddingY || props.$padding || SIZE.none
    ]};
  padding-left: ${(props) =>
    values[
      props.$paddingLeft || props.$paddingX || props.$padding || SIZE.none
    ]};
  padding-right: ${(props) =>
    values[
      props.$paddingRight || props.$paddingX || props.$padding || SIZE.none
    ]};
  margin-top: ${(props) =>
    values[props.$marginTop || props.$marginY || props.$margin || SIZE.none]};
  margin-bottom: ${(props) =>
    values[
      props.$marginBottom || props.$marginY || props.$margin || SIZE.none
    ]};
  margin-left: ${(props) =>
    values[props.$marginLeft || props.$marginX || props.$margin || SIZE.none]};
  margin-right: ${(props) =>
    values[props.$marginRight || props.$marginX || props.$margin || SIZE.none]};
`;

function Spacer(props: PropsWithChildren<SpacerProps>) {
  return <SpacerStyle {...props}>{props.children}</SpacerStyle>;
}

export default Spacer;
