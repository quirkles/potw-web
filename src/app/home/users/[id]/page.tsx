"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import { BaseColorName, gameColors, getColor } from "@/app/styles/colors";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchUserById,
  StoreUser,
  usersSelectors,
} from "@/app/store/reducers/usersReducer";
import { authUserSelector } from "@/app/store/selectors/authUser";

import Loader from "@/components/loader/Loader";

import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

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
      {user && !user.isFetching ? <FetchedUser user={user} /> : <Loader />}
    </StyledUserIdPage>
  );
}

const StyledFetchedUser = styled.div<{
  $color: BaseColorName;
}>`
  max-height: 100%;
  height: 100%;
  width: 100%;

  padding: 2rem;

  color: ${getColor("white")};
  color: ${(props) => getColor(props.$color)};
`;

function FetchedUser(props: { user: StoreUser }) {
  const { user } = props;
  const userColor = getPseudoRandomFromArrayFromUid(user.sqlId, gameColors);
  const authUser = useAppSelector(authUserSelector);
  return (
    <StyledFetchedUser $color={userColor}>
      <h1>{user.username}</h1>
    </StyledFetchedUser>
  );
}

export default UserIdPage;
