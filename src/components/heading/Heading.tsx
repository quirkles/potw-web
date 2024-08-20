import { PropsWithChildren } from "react";
import { styled } from "styled-components";

const StyledHeading = styled.h1<{
  $color?: string;
  $textTransform?: string;
}>`
  margin-bottom: 0.5em;
  text-decoration: underline;
  color: ${(props) => props.$color || "inherit"};
  text-transform: ${(props) => props.$textTransform || "none"};
`;

interface HeadingProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  $textTransform?: string;
  $color?: string;
}

function Heading(headingProps: PropsWithChildren<HeadingProps>) {
  return (
    <StyledHeading
      as={headingProps.variant}
      $color={headingProps.$color}
      $textTransform={headingProps.$textTransform}
    >
      {headingProps.children}
    </StyledHeading>
  );
}

export default Heading;
