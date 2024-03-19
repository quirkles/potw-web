'use client'

import styled from "styled-components";
import {useRouter} from "next/navigation";
import {Spacer} from "@/components/spacer/Spacer";
import Heading from "@/components/heading/Heading";
import TextEditable from "@/components/form/TextEditable";
import {useEffect, useState} from "react";
import {faker, ne} from "@faker-js/faker";
import Checkbox from "@/components/form/Checkbox";
import {COLORS} from "@/app/styles/colors";
import {FlexBox} from "@/components/layout/Flexbox";
import P from "@/components/text/P";
import Button from "@/components/button/Button";
import TextArea from "@/components/form/Textarea";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {
    createGame,
    gameSelectors,
    updateNewGame
} from "@/app/store/reducers/gamesReducer";
import {authUserSelectors} from "@/app/store/reducers/authUserReducer";

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

    const dispatch = useAppDispatch();
    const newGame = useAppSelector(gameSelectors.getNewGame);
    const authUser = useAppSelector(authUserSelectors.getAuthUser);


    useEffect(() => {
        const initialName = `${faker.color.human()}-${faker.commerce.product()}-${faker.science.chemicalElement().name}`.toLowerCase().replace(/\s/g, '-').replace(/,/g, '');
        dispatch(updateNewGame({name: initialName, isPrivate: false}));
    }, [dispatch]);
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
                    My new game will be called <TextEditable
                        text={newGame.name || ""}
                        onChange={() => {
                            dispatch(updateNewGame({name: newGame.name}))
                        }}
                />
                </div>
                <Spacer $paddingY="small"/>
                <div>
                    <P>I can sum up my game in a few words:</P>
                    <TextArea
                        value={newGame.description || ""}
                        onChange={(e) => dispatch(updateNewGame({
                            description: e.target.value
                        }))}
                        placeholder="A casual chat and hopefully a place to hear some new music!"
                    />
                </div>
                <Spacer $paddingY="small"/>
                <div>
                    <FlexBox $alignItems="center" $gap="small">
                        <Checkbox
                            checked={newGame.isPrivate} onChange={(e) => {
                            dispatch(updateNewGame({isPrivate: e}))
                        }}/>
                        <P $fontWeight="bold">{newGame.isPrivate ? 'Private' : 'Public'} Game</P>
                    </FlexBox>
                </div>
                <small>
                    The game will
                    be {newGame.isPrivate ? 'private' : 'public'}, {newGame.isPrivate ? 'I will invite players to join' : 'players can request to join freely.'}
                </small>
                <Spacer $paddingY="small"/>
                <Button buttonText="Create" onClick={() => authUser?.sqlId && dispatch(createGame({
                    ...newGame,
                    adminId: authUser.sqlId
                }))}/>
            </Spacer>
        </Styled>
    )
}