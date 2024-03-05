'use client';
import styled from "styled-components"
import {
    ComponentType,
    HTMLAttributes,
} from "react";
import {Color, COLORS} from "@/app/styles/colors";
import {hexToRgbA} from "@/utils/color";

const StyledButton = styled.button<{$hasIcon: boolean, $color: Color}>`
    background: ${props => props.$color};
    color: white;
    font-family: inherit;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em ${props => props.$color};
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding: 0.35em ${props => props.$hasIcon ? "3.3" : "1.2"}em 0.35em 1.2em;
    cursor: pointer;

    .icon {
        color: ${props => hexToRgbA(props.$color, 0)};
        background: white;
        margin-left: 1em;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.2em;
        width: ${(props) => props.$hasIcon ? 2.2 : 0}em;
        border-radius: 0.7em;
        box-shadow: 0.1em 0.1em 0.6em 0.2em ${props => props.$color};
        right: 0.3em;
        transition: all 0.3s;
        padding: ${props => props.$hasIcon ? 0.5 : 0}em;
        .icon svg {
            width: 1.1em;
            transition: transform 0.3s;
            color: ${props => props.$color};
        }
    }


    &:hover .icon {
        width: calc(100% - 0.6em);
        transform: translateX(${props => props.$hasIcon ? 0.1 : 0}em);
        color: ${props => hexToRgbA(props.$color, 1)};
    }

    &:active .icon {
        transform: scale(0.95);
    }
`

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    buttonText: string;
    Icon?: ComponentType,
    color?: Color
}

export default function Button(props: ButtonProps) {
    const {color = COLORS.blue, Icon, buttonText, ...rest} = props
    return (
        <StyledButton
            $hasIcon={Boolean(Icon)}
            $color={color}
            {...rest}
        >
            {buttonText}
            {
                <div className="icon">{props.Icon ? <props.Icon/> : props.buttonText }</div>
            }
        </StyledButton>
    );
}
