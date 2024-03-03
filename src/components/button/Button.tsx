'use client';
import styled from "styled-components"
import {
    ComponentType,
    HTMLProps,
} from "react";

const StyledButton = styled.button<{$hasIcon: boolean}>`
    background: #a370f0;
    color: white;
    font-family: inherit;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding: 0.35em ${props => props.$hasIcon ? "3.3" : "1.2"}em 0.35em 1.2em;
    cursor: pointer;

    .icon {
        background: white;
        margin-left: 1em;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.2em;
        width: 2.2em;
        border-radius: 0.7em;
        box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
        right: 0.3em;
        transition: all 0.3s;
        padding: 0.5em;
        .icon svg {
            width: 1.1em;
            transition: transform 0.3s;
            color: #7b52b9;
        }
    }


    &:hover .icon {
        width: calc(100% - 0.6em);
        transform: translateX(0.1em);
    }

    &:active .icon {
        transform: scale(0.95);
    }
`

interface ButtonProps extends HTMLProps<HTMLButtonElement>{
    buttonText: string;
    Icon?: ComponentType
}

export default function Button(props: ButtonProps) {
    return (
        <StyledButton $hasIcon={Boolean(props.Icon)}>
            {props.buttonText}
            {
                props.Icon ? <div className="icon"><props.Icon/></div> : null
            }
        </StyledButton>
    );
}
