'use client'
import styled from "styled-components";

const StyledUserIdPage = styled.div``

export default function UserIdPage({params}: {params: {id: string}}){
    return (
        <StyledUserIdPage>
            <h1>UserIdPage for {params.id}</h1>
        </StyledUserIdPage>
    );
}