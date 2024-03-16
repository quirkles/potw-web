'use client'

import styled from "styled-components";
import {useRouter} from "next/navigation";
import {SIZE, Spacer} from "@/components/spacer/Spacer";
import Heading from "@/components/heading/Heading";
import TextEditable from "@/components/form/TextEditable";
import {useState} from "react";

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
    const [gameName, setGameName] = useState("Newgame");
    const goBack = () => {
        router.push("/home/welcome")
    }
    return (
            <Styled>
                <div className="close" onClick={goBack}>
                        X
                </div>
                <Heading variant="h1">
                    Create A New Game
                </Heading>
                <p>
                    My new game will be called <TextEditable text={gameName} onChange={setGameName}/>
                </p>
            </Styled>
    )
}