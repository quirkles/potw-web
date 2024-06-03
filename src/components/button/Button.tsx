'use client';
import styled from "styled-components"
import {D, F, S} from '@mobily/ts-belt'
import {
    ComponentType,
    HTMLAttributes, PropsWithChildren,
} from "react";
import {Color, COLORS} from "@/app/styles/colors";
import {hexToRgbA} from "@/utils/color";
import {func} from "prop-types";
import Link from "next/link";

export const ButtonSize = {
    sm: 'sm',
    med: 'med',
    lg: 'lg',
} as const;

type ButtonSize = typeof ButtonSize[keyof typeof ButtonSize];

const getSizes = F.memoizeWithKey(S.make, (size: ButtonSize) => {
    const base = {
        verticalPadding: 0.35,
        horizontalPadding: 1.2,
        withIconPadding: 3.3,
        fontsize: 17,
        height: 2.8,
        iconHeight: 2.2,
        iconWidth: 2.2,
        iconPadding: 0.5
    }
    let factor = 1;
    switch (size) {
        case ButtonSize.sm:
            factor = 0.8;
            break;
        case ButtonSize.lg:
            factor = 1.5;
            break;
    }
    return D.map(base, (v) => v * factor)
})

const StyledButton = styled.button<{$hasIcon: boolean, $color: Color, $size: ButtonSize}>`
    background: ${props => props.$color};
    color: white;
    font-family: inherit;
    font-size: ${props => getSizes(props.$size).fontsize}px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em ${props => props.$color};
    overflow: hidden;
    position: relative;
    height: ${props => getSizes(props.$size).height}em;
    padding: ${props => getSizes(props.$size).verticalPadding}em ${props => props => getSizes(props.$size)[props.$hasIcon ? 'withIconPadding': 'horizontalPadding']}em ${props => getSizes(props.$size).verticalPadding}em ${props => getSizes(props.$size).horizontalPadding}em;
    cursor: pointer;

    .icon {
        color: ${props => hexToRgbA(props.$color, 0)};
        background: white;
        margin-left: 1em;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: ${props => getSizes(props.$size).iconHeight}em;
        width: ${(props) => props.$hasIcon ? getSizes(props.$size).iconWidth : 0}em;
        border-radius: 0.7em;
        box-shadow: 0.1em 0.1em 0.6em 0.2em ${props => props.$color};
        right: 0.3em;
        transition: all 0.3s;
        padding: ${props => props.$hasIcon ? getSizes(props.$size).iconPadding : 0}em;
        svg {
            width: 1.1em;
            transition: transform 0.3s;
            color: ${props => props.$color};
        }
    }


    &:hover .icon {
        width: calc(100% - 0.6em);
        transform: translateX(${props => props.$hasIcon ? 0.1 : 0}em);
        color: ${props => hexToRgbA(props.$color, 1)};
        svg {
            transform: scale(1.5);
        }
    }

    &:active .icon {
        transform: scale(0.95);
    }
`

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    buttonText: string;
    Icon?: ComponentType;
    color?: Color;
    size?: ButtonSize;
    route?: string;
}

export default function Button(props: ButtonProps) {
    const {
        color = COLORS.blue,
        Icon,
        buttonText,
        route,
        size = ButtonSize.med,
        ...rest
    } = props
    return (
        <StyledButton
            $hasIcon={Boolean(Icon)}
            $color={color}
            $size={size}
            {...rest}
        >
            <Wrapper route={route}>
                {buttonText}
                {
                    <div className="icon">{props.Icon ? <props.Icon/> : props.buttonText }</div>
                }
            </Wrapper>
        </StyledButton>
    );
}

function Wrapper(props: PropsWithChildren<{
    route?: string;
}>){
    let style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    };
    return props.route ? (
        <Link href={props.route} style={style}>
            {props.children}
        </Link>
        ):
        (
        <div style={style}>
            {props.children}
        </div>
    )
}