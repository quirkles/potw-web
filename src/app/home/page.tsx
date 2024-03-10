'use client'

import styled from "styled-components";

import RouteWrapper from "@/components/routeWrapper/RouteWrapper";

const Styled = styled.div`
`

export default function Home() {
    return (
        <RouteWrapper>
            <Styled>
                Home view
            </Styled>
        </RouteWrapper>
    )
}