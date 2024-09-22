import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";

export const Colors = styled.div<{
  $color?: ColorName;
  $backgroundColor?: ColorName;
}>`
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? getColor($backgroundColor) : "inherit"};
  color: ${({ $color }) => ($color ? getColor($color) : "inherit")};
`;
