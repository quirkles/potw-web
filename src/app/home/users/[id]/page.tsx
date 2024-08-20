"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchUserById,
  StoreUser,
  usersSelectors,
} from "@/app/store/reducers/usersReducer";

import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";

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

function Loaded(props: { user: StoreUser }) {
  const { user } = props;
  return (
    <Spacer $padding="medium">
      <h1>UserIdPage for {user.username}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Spacer>
  );
}

export default UserIdPage;
