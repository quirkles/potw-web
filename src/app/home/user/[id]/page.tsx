'use client'
import styled from "styled-components";
import {Spacer} from "@/components/spacer/Spacer";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {fetchUserById, usersSelectors} from "@/app/store/reducers/usersReducer";
import {useEffect} from "react";

const StyledUserIdPage = styled.div``

export default function UserIdPage({params}: {params: {id: string}}){
    const user = useAppSelector(state => usersSelectors.getUserBySqlId(state, params.id))
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUserById(params.id))
    }, [dispatch, params.id]);
    return (
        <StyledUserIdPage>
            <Spacer $padding="medium">
                <h1>UserIdPage for {params.id}</h1>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </Spacer>
        </StyledUserIdPage>
    );
}