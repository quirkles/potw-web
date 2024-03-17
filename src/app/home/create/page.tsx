'use client'

import styled from "styled-components";
import {useRouter} from "next/navigation";
import {Spacer} from "@/components/spacer/Spacer";
import Heading from "@/components/heading/Heading";
import TextEditable from "@/components/form/TextEditable";
import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";
import Checkbox from "@/components/form/Checkbox";
import {COLORS} from "@/app/styles/colors";
import {FlexBox} from "@/components/layout/Flexbox";
import P from "@/components/text/P";

const Styled = styled.div`
    background-color: ${COLORS.white};
    color: ${COLORS.black};
    height: 100%;

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
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        let s = `${faker.color.human()}-${faker.commerce.product()}-${faker.science.chemicalElement().name}`.toLowerCase().replace(/\s/g, '-').replace(/,/g, '');
        setGameName(s);
    }, []);
    const goBack = () => {
        router.push("/home/welcome")
    }
    return (
        <Styled>
            <Spacer $padding="medium">
                <div className="close" onClick={goBack}>
                    X
                </div>
                <Heading variant="h1">
                    Create A New Game
                </Heading>
                <Spacer $paddingY="small"/>
                <div>
                    My new game will be called <TextEditable text={gameName}
                                                             onChange={setGameName}/>
                </div>
                <Spacer $paddingY="small"/>
                <div>
                    <FlexBox $alignItems="center" $gap="small">
                        <Checkbox checked={isPrivate} onChange={(e) => {
                            setIsPrivate(e)
                        }}/>
                        <P $fontWeight="bold">{isPrivate ? 'Private' : 'Public'} Game</P>
                    </FlexBox>
                </div>
                <small>
                    The game will
                    be {isPrivate ? 'private' : 'public'}, {isPrivate ? 'I will invite players to join' : 'players can request to join freely.'}
                </small>
            </Spacer>
        </Styled>
    )
}