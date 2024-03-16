'use client'

import styled from "styled-components";
import {useRouter} from "next/navigation";
import {SIZE, Spacer} from "@/components/spacer/Spacer";
import Heading from "@/components/heading/Heading";
import TextEditable from "@/components/form/TextEditable";
import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";

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
    const [gameName, setGameName] = useState("");

    useEffect(() => {
        let s = `${faker.color.human()}-${faker.animal.type()}-${faker.location.country()}`.toLowerCase().replace(/\s/g, '-').replace(/,/g, '');
        setGameName(s);
    }, []);
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
                <Spacer $paddingY="small"/>
                <div>
                    My new game will be called <TextEditable text={gameName} onChange={setGameName}/>
                </div>
            </Styled>
    )
}