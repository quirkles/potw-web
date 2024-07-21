import styled from "styled-components";
import {PropsWithChildren} from "react";

const StyledHeading = styled.h1`
    margin-bottom: 0.5em;
    text-decoration: underline;
`;

interface HeadingProps {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Heading(headingProps: PropsWithChildren<HeadingProps>) {
    return (
        <StyledHeading as={headingProps.variant}>
            {headingProps.children}
        </StyledHeading>
    )
}