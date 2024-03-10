import {PropsWithChildren, useEffect, useState} from "react";
import styled from "styled-components";
import {COLORS} from "@/app/styles/colors";
import {SIZE, Spacer} from "@/components/spacer/Spacer";

const StyledWrapper = styled.div<{
    $position: 'up' | 'down' | 'in-view';
}>`
    transform: translateY(${props => props.$position === "up" ? "-100%" : props.$position === "down" ? "100%" : "0"});
    height: 100%;
    background-color: ${COLORS.white};
    color: ${COLORS.black};
    z-index: ${props => props.$position === "in-view" ? 10 : 5};
    transition: all 0.3s ease-in-out;
`
export default function RouteWrapper(props: PropsWithChildren<{}>) {
    const [position, setPosition] = useState<"up" | "down" | "in-view">("down")
    useEffect(() => {
        setPosition("in-view");
        return () => {
            setPosition("up");
        }
    }, []);
    return (
        <StyledWrapper $position={position}>
            <Spacer $padding={SIZE.medium}>
                {props.children}
            </Spacer>
        </StyledWrapper>
    )
}
