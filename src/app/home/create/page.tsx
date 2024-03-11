'use client'

import styled from "styled-components";
import {useRouter} from "next/navigation";
import {SIZE, Spacer} from "@/components/spacer/Spacer";

const Styled = styled.div`
    .close {
        position: absolute;
        top: 2em;
        right: 2em;
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
            <Styled>
                <div className="close" onClick={goBack}>
                        X
                </div>
                <h1>
                    Create Game
                </h1>
            </Styled>
    )
}