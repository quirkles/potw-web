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

import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";

import { formatDateTime } from "@/utils/date";
import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

const StyledUserIdPage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function UserIdPage({ params }: { params: { id: string } }) {
  const user = useAppSelector((state) =>
    usersSelectors.getUserBySqlId(state, params.id),
  );
  const dispatch = useAppDispatch();

  const userFetchState = user?.fetchState || "idle";

  useEffect(() => {
    if (userFetchState === "idle") {
      dispatch(fetchUserById(params.id));
    }
    return;
  }, [dispatch, params.id, userFetchState]);

  switch (userFetchState) {
    case "rejected":
      return (
        <StyledUserIdPage>
          <Heading variant="h1">Error fetching User!</Heading>
          <Heading variant={"h3"}>Please try again later.</Heading>
        </StyledUserIdPage>
      );
    case "fulfilled":
      return <FetchedUser user={user as StoreUser} />;
    case "idle":
    case "pending":
    default:
      return (
        <StyledUserIdPage>
          <Loader />
        </StyledUserIdPage>
      );
  }
}

const StyledFetchedUser = styled.div<{
  $color: BaseColorName;
}>`
  max-height: 100%;
  height: 100%;
  width: 100%;

  padding: 2rem;

  background-color: ${getColor("white")};
  color: ${(props) => getColor(props.$color)};
`;

function FetchedUser(props: { user: StoreUser }) {
  const { user } = props;
  const userColor = getPseudoRandomFromArrayFromUid(user.sqlId, gameColors);
  const authUser = useAppSelector(authUserSelector);
  return (
    <StyledFetchedUser $color={userColor}>
      <Heading variant="h1">{user.username}</Heading>
      <Heading variant="h3">
        joined: {formatDateTime(user.createdAt, "short")}
      </Heading>
    </StyledFetchedUser>
  );
}

export default UserIdPage;
