import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";

export const Box = styled.div<{
  $backgroundColor?: ColorName;
  $borderRadius?: string;
  $border?: string;
}>`
  background-color: ${(props) =>
    props.$backgroundColor ? getColor(props.$backgroundColor) : "transparent"};
  border-radius: ${(props) => props.$borderRadius};
  border: ${(props) => props.$border};
`;
