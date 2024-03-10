'use client'

import styled from "styled-components";

import RouteWrapper from "@/components/routeWrapper/RouteWrapper";

const Styled = styled.div`
`

export default function Home() {
    return (
        <RouteWrapper>
            <Styled>
                Welcome to pick of the week!
            </Styled>
        </RouteWrapper>
    )
}