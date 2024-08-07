"use client";

import styled from "styled-components";
import { useEffect } from "react";

import Spacer from "@/components/spacer/Spacer";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Loader from "@/components/loader/Loader";

import {
  fetchUserById,
  TUser,
  usersSelectors,
} from "@/app/store/reducers/usersReducer";

const StyledUserIdPage = styled.div`
  height: 100%;
  width: 100%;
`;

function UserIdPage({ params }: { params: { id: string } }) {
  const user = useAppSelector((state) =>
    usersSelectors.getUserBySqlId(state, params.id),
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserById(params.id));
  }, [dispatch, params.id]);
  return (
    <StyledUserIdPage>
      {user && !user.isFetching ? <Loaded user={user} /> : <Loader />}
    </StyledUserIdPage>
  );
}

function Loaded(props: { user: TUser }) {
  const { user } = props;
  return (
    <Spacer $padding="medium">
      <h1>UserIdPage for {user.username}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Spacer>
  );
}

export default UserIdPage;
