'use client'
import {styled} from "styled-components";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {authUserSelectors} from "@/app/store/reducers/authUserReducer";
import {fetchMyGames} from "@/app/store/reducers/gamesReducer";
import {useEffect} from "react";

const Styled = styled.div``;

export default function Games() {
    const dispatch = useAppDispatch();
    const authUser = useAppSelector(authUserSelectors.getAuthUser);
    useEffect(() => {
        if (authUser?.sqlId) {
            dispatch(fetchMyGames(authUser.sqlId))
        }
    }, [authUser?.sqlId]);
    console.log(authUser);
    return (
        <Styled>
            Games
        </Styled>
    )
}