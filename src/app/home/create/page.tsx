'use client'

import styled from "styled-components";
import {useRouter} from "next/navigation";
import RouteWrapper from "@/components/routeWrapper/RouteWrapper";
import {SIZE, Spacer} from "@/components/spacer/Spacer";

const Styled = styled.div`
    .close {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        font-size: large;
        font-weight: bold;
    }
`

export default function Create() {
    let router = useRouter();
    const goBack = () => {
        router.push("/home/welcome")
    }
    return (
        <RouteWrapper>
            <Styled>
                <div className="close" onClick={goBack}>
                    <Spacer $padding={SIZE.small}>
                        X
                    </Spacer>
                </div>
                <h1>
                    Create Game!
                </h1>
            </Styled>
        </RouteWrapper>
    )
}