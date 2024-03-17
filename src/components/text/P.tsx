import styled from "styled-components";
import {PropsWithChildren} from "react";


interface PProps {
    $textTransform?: "capitalize" | "lowercase" | "uppercase" | "none";
    $fontSize?: 'small' | 'medium' | 'large';
    $fontWeight?: 'light' | 'normal' | 'bold';
}

const StyledP = styled.p<PProps>`
    font-size: ${(props: PProps) => {
        switch (props.$fontSize) {
            case 'small':
                return '0.8em';
            case 'medium':
                return '1em';
            case 'large':
                return '1.2em';
            default:
                return '1em';
        }
    }};
    font-weight: ${(props: PProps) => {
        switch (props.$fontWeight) {
            case 'light':
                return '300';
            case 'normal':
                return '400';
            case 'bold':
                return '700';
            default:
                return '400';
        }
    }};
    text-transform: ${(props: PProps) => props.$textTransform || 'none'};
`
export default function P(props: PropsWithChildren<PProps>) {
    return <StyledP {...props}>{props.children}</StyledP>;
}
