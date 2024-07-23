import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
  gap: 1rem;
`;

export const GridItem = styled.div<{
  $xs?: number;
  $sm?: number;
  $md?: number;
  $lg?: number;
  $xl?: number;
}>`
  grid-column: span
    ${(props) =>
      props.$xs || props.$sm || props.$md || props.$lg || props.$xl || 12};
  @media (min-width: 768px) {
    grid-column: span
      ${(props) => props.$sm || props.$md || props.$lg || props.$xl || 12};
  }
  @media (min-width: 992px) {
    grid-column: span ${(props) => props.$md || props.$lg || props.$xl || 12};
  }
  @media (min-width: 1200px) {
    grid-column: span ${(props) => props.$lg || props.$xl || 12};
  }
  @media (min-width: 1400px) {
    grid-column: span ${(props) => props.$xl || 12};
  }
`;