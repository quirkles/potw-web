import { styled } from "styled-components";

import { breakpoints } from "@/app/styles/consts";

const gaps = {
  small: "0.5rem",
  medium: "1rem",
  large: "2rem",
};

export const GridContainer = styled.div<{
  $gap?: keyof typeof gaps;
}>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  //grid-auto-rows: minmax(min-content, max-content);
  grid-auto-rows: max-content;
  //grid-template-rows: repeat(8, minmax(min-content, 1fr));
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  grid-gap: ${(props) => gaps[props.$gap || "small"]};
  > * {
    max-height: 100%;
    overflow: auto;
  }
`;

const { xs, sm, md, lg } = breakpoints;

export const GridItem = styled.div<{
  $xsCol?: number;
  $xsRow?: number;
  $smCol?: number;
  $smRow?: number;
  $mdCol?: number;
  $mdRow?: number;
  $lgCol?: number;
  $lgRow?: number;
  $xlCol?: number;
  $xlRow?: number;
}>`
  grid-column: span ${(props) => props.$xsCol || 12};
  grid-row: span ${(props) => props.$xsRow || 1};
  @media (min-width: ${xs}px) {
    grid-column: span ${(props) => props.$smCol || props.$xsCol || 12};
    grid-row: span ${(props) => props.$smRow || props.$xsRow || 1};
  }
  @media (min-width: ${sm}px) {
    grid-column: span
      ${(props) => props.$mdCol || props.$smCol || props.$xsCol || 12};
    grid-row: span
      ${(props) => props.$mdRow || props.$smRow || props.$xsRow || 1};
  }
  @media (min-width: ${md}px) {
    grid-column: span
      ${(props) =>
        props.$lgCol || props.$mdCol || props.$smCol || props.$xsCol || 12};
    grid-row: span
      ${(props) =>
        props.$lgRow || props.$mdRow || props.$smRow || props.$xsRow || 1};
  }
  @media (min-width: ${lg}px) {
    grid-column: span
      ${(props) =>
        props.$xlCol ||
        props.$lgCol ||
        props.$mdCol ||
        props.$smCol ||
        props.$xsCol ||
        12};

    grid-row: span
      ${(props) =>
        props.$xlRow ||
        props.$lgRow ||
        props.$mdRow ||
        props.$smRow ||
        props.$xsRow ||
        1};
  }
`;
