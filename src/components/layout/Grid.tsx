import { styled } from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
  grid-gap: 1rem;
`;

export const GridItem = styled.div<{
  $xs?: number;
  $sm?: number;
  $md?: number;
  $lg?: number;
  $xl?: number;
}>`
  grid-column: span ${(props) => props.$xs || 12};
  @media (min-width: 768px) {
    grid-column: span ${(props) => props.$sm || props.$xs || 12};
  }
  @media (min-width: 992px) {
    grid-column: span ${(props) => props.$md || props.$sm || props.$xs || 12};
  }
  @media (min-width: 1200px) {
    grid-column: span
      ${(props) => props.$lg || props.$md || props.$sm || props.$xs || 12};
  }
  @media (min-width: 1400px) {
    grid-column: span
      ${(props) =>
        props.$xl || props.$lg || props.$md || props.$sm || props.$xs || 12};
  }
`;
