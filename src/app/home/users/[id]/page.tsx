"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import { BaseColorName, gameColors, getColor } from "@/app/styles/colors";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchUserById,
  StoreUser,
  updateUserField,
  usersSelectors,
} from "@/app/store/reducers/usersReducer";
import { authUserSelector } from "@/app/store/selectors/authUser";

import { useNotificationsContext } from "@/app/providers/Notifications";
import { useResponsiveContext } from "@/app/providers/Responsive";

import { User, UserUpdate } from "@/app/services/schemas/user";
import { updateUserRequest } from "@/app/services/user/fetchUserById";

import { Avatar } from "@/components/avatar/Avatar";
import TextEditable from "@/components/form/TextEditable";
import Heading from "@/components/heading/Heading";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Loader from "@/components/loader/Loader";
import P from "@/components/text/P";

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
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authUserSelector);

  const { dispatchNotification } = useNotificationsContext();

  const responsive = useResponsiveContext();

  const canEdit = authUser?.sqlId === user.sqlId;
  const userColor = getPseudoRandomFromArrayFromUid(user.sqlId, gameColors);

  const handleTextFieldChange =
    (fieldName: keyof UserUpdate) => (text: string) => {
      dispatch(
        updateUserField({ userId: user.sqlId, field: fieldName, value: text }),
      ).then((result) => {
        if (result.meta.requestStatus === "rejected") {
          dispatchNotification({
            message: "Update failed",
            type: "ERROR",
          });
        }
        if (result.meta.requestStatus === "fulfilled") {
          dispatchNotification({
            message: "Updated!",
            type: "SUCCESS",
          });
        }
      });
    };
  return (
    <StyledFetchedUser $color={userColor}>
      <GridContainer>
        <GridItem $mdCol={1}>
          <Avatar
            value={user.email || ""}
            size={responsive?.isDesktop ? "xLarge" : "large"}
            canEdit={canEdit}
            userId={user.sqlId}
          />
        </GridItem>
        <GridItem $mdCol={11}>
          <Heading variant="h1">
            {canEdit ? (
              <TextEditable
                text={user.username || user.email}
                onBlur={handleTextFieldChange("username")}
              />
            ) : (
              <P>{user.username || user.email}</P>
            )}
          </Heading>
        </GridItem>
        <GridItem>
          <Heading variant="h3">
            joined: {formatDateTime(user.createdAt, "long")}
          </Heading>
        </GridItem>
      </GridContainer>
    </StyledFetchedUser>
  );
}

export default UserIdPage;
