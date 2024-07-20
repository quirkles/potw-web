'use client'

import styled from "styled-components";
import {useRouter} from "next/navigation";
import {Spacer} from "@/components/spacer/Spacer";
import Heading from "@/components/heading/Heading";
import TextEditable from "@/components/form/TextEditable";
import {useEffect} from "react";
import {faker} from "@faker-js/faker";
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
import Datepicker from "@/components/form/Datepicker";
import PeriodSelect from "@/components/form/PeriodSelect";

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

function getFakeGameName() {
    return `${faker.color.human()}-${faker.commerce.product()}-${faker.science.chemicalElement().name}`.toLowerCase().replace(/\s/g, '-').replace(/,/g, '');
}

export default function Create() {
    let router = useRouter();

    const dispatch = useAppDispatch();
    const newGame = useAppSelector(gameSelectors.getNewGame);
    const authUser = useAppSelector(authUserSelectors.getAuthUser);


    useEffect(() => {
        dispatch(updateNewGame({name: getFakeGameName(), isPrivate: false}));
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
                        onChange={(newVal) => {
                            dispatch(updateNewGame({name: newVal}))
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
                <div>
                    <FlexBox $alignItems="center" $gap="small">
                        <Checkbox
                            checked={newGame.addAdminAsPlayer} onChange={(e) => {
                            dispatch(updateNewGame({addAdminAsPlayer: e}))
                        }}/>
                        <P $fontWeight="bold">{newGame.addAdminAsPlayer ? 'Include me' : 'Don\'t include me'}</P>
                    </FlexBox>
                </div>
                <small>
                    {newGame.addAdminAsPlayer ? 'A' : 'Don\'t a'}dd me as a player to this game.
                </small>
                <Spacer $paddingY="small"/>
                <P>My game will start on:</P>
                <Datepicker initialDate={newGame.startDate}/>
                <Spacer $paddingY="small"/>
                <P>My game will repeat:</P>
                <Spacer $paddingY="xSmall"/>
                <PeriodSelect
                    selectedPeriod={newGame.period}
                    onChange={(period) => {
                        dispatch(updateNewGame({
                            period
                        }))
                }}/>
                <Spacer $paddingY="small"/>
                <Button buttonText="Create" onClick={() => authUser?.sqlId && dispatch(createGame({
                    ...newGame,
                    adminId: authUser.sqlId
                })).then(() => {
                    dispatch(updateNewGame({name: getFakeGameName()}))
                })}/>
            </Spacer>
        </Styled>
    )
}