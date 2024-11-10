"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { BaseColorName, gameColors, getColor } from "@/app/styles/colors";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchGamesForUser,
  isFetchedGame,
} from "@/app/store/reducers/gamesReducer";
import {
  fetchUserById,
  updateUserField,
} from "@/app/store/reducers/usersReducer";
import { authUserSelector } from "@/app/store/selectors/authUser";
import { selectGamesForUser } from "@/app/store/selectors/games";
import { selectUserBySqlId } from "@/app/store/selectors/users";

import { useNotificationsContext } from "@/app/providers/Notifications";
import { useResponsiveContext } from "@/app/providers/Responsive";

import { uploadFile } from "@/app/services/file/upload";
import { UserUpdate } from "@/app/services/schemas/backend/user";
import { StoreFetchedUser } from "@/app/services/schemas/store/user";

import { Avatar } from "@/components/avatar/Avatar";
import TextEditable from "@/components/form/TextEditable";
import TextArea from "@/components/form/Textarea";
import { GameSummary } from "@/components/gameSummary/GameSummary";
import Heading from "@/components/heading/Heading";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";
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
  const user = useAppSelector((state) => selectUserBySqlId(state, params.id));
  const dispatch = useAppDispatch();

  const doesUserExist = !!user;

  useEffect(() => {
    if (!doesUserExist) {
      dispatch(fetchUserById(params.id));
    }
    return;
  }, [dispatch, params.id, doesUserExist]);

  switch (user?.status) {
    case "failed":
      return (
        <StyledUserIdPage>
          <Heading $variant="h1">Error fetching User!</Heading>
          <Heading $variant={"h3"}>Please try again later.</Heading>
        </StyledUserIdPage>
      );
    case "fetched":
      return <FetchedUser user={user as StoreFetchedUser} />;
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
  overflow: hidden;

  padding: 2rem;

  background-color: ${getColor("white")};
  color: ${(props) => getColor(props.$color)};

  > * {
    height: 100%;
    overflow: auto;
    > * {
      height: 100%;
      overflow: auto;
    }
  }
`;

function FetchedUser(props: { user: StoreFetchedUser }) {
  const { user } = props;
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authUserSelector);
  const games = useAppSelector((state) =>
    selectGamesForUser(state, user.sqlId),
  );
  const responsiveContext = useResponsiveContext();
  const [aboutMe, setAboutMe] = useState(user.aboutMe || "");

  const { dispatchNotification } = useNotificationsContext();

  const responsive = useResponsiveContext();

  const canEdit = authUser?.sqlId === user.sqlId;
  const userColor = getPseudoRandomFromArrayFromUid(user.sqlId, gameColors);

  useEffect(() => {
    if (user.sqlId) {
      dispatch(fetchGamesForUser(user.sqlId));
    }
  }, [user.sqlId, dispatch]);

  const handleTextFieldChange =
    (fieldName: keyof UserUpdate) => (text: string) => {
      dispatch(
        updateUserField({ userId: user.sqlId, field: fieldName, value: text }),
      )
        .then((result) => {
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
        })
        .catch((e) => {
          dispatchNotification({
            message: "Update failed",
            type: "ERROR",
          });
        });
    };
  return (
    <StyledFetchedUser $color={userColor}>
      <GridContainer $gap="small">
        <GridItem $mdCol={6}>
          <Spacer $paddingX="small">
            <FlexContainer $direction="column">
              <Avatar
                value={user.email || ""}
                url={user.avatarUrl || undefined}
                size={responsive?.isDesktop ? "xLarge" : "large"}
                canEdit={canEdit}
                userId={user.sqlId}
                onFileChange={(file) => {
                  const extension = file.type.split("/")[1];
                  uploadFile(
                    file,
                    `user_files/${user.sqlId}_avatar.${extension}`,
                  ).then((url) => {
                    handleTextFieldChange("avatarUrl")(url);
                  });
                }}
              />
              <Heading $variant="h2">
                {canEdit ? (
                  <TextEditable
                    text={user.username || user.email}
                    onBlur={handleTextFieldChange("username")}
                  />
                ) : (
                  <P>{user.username || user.email}</P>
                )}
              </Heading>
              <Heading $variant="h3">
                joined: {formatDateTime(user.createdAt, "long")}
              </Heading>
              <Heading $variant="h2">Bio</Heading>
              {canEdit ? (
                <TextArea
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  onBlur={() => {
                    if (user.aboutMe !== aboutMe) {
                      handleTextFieldChange("aboutMe")(aboutMe);
                    }
                  }}
                  placeholder="Tell the world about yourself!"
                />
              ) : (
                <P>{user.aboutMe || "No bio yet"}</P>
              )}
            </FlexContainer>
          </Spacer>
        </GridItem>
        <GridItem $mdCol={6}>
          <Spacer $paddingX="small">
            <FlexContainer $direction="column" $gap="medium">
              <Heading $variant="h2">Games</Heading>
              {games.filter(isFetchedGame).map((game) => (
                <GameSummary game={game} key={game.sqlId} />
              ))}
            </FlexContainer>
          </Spacer>
        </GridItem>
      </GridContainer>
    </StyledFetchedUser>
  );
}

export default UserIdPage;
