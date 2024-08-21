"use client";

import { faker } from "@faker-js/faker";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import InviteUsers from "@/app/home/create/InviteUsers";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { authUserSelectors } from "@/app/store/reducers/authUserReducer";
import {
  createGame,
  gameSelectors,
  updateNewGame,
} from "@/app/store/reducers/gamesReducer";

import { useNotificationsContext } from "@/app/providers/Notifications";
import { useResponsiveContext } from "@/app/providers/Responsive";

import { Game } from "@/app/services/schemas/game";

import Button from "@/components/button/Button";
import Checkbox from "@/components/form/Checkbox";
import Datepicker from "@/components/form/Datepicker";
import PeriodSelect from "@/components/form/PeriodSelect";
import TextEditable from "@/components/form/TextEditable";
import TextArea from "@/components/form/Textarea";
import Heading from "@/components/heading/Heading";
import { FlexBox } from "@/components/layout/Flexbox";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";

import { getColorVariant } from "@/utils/color";
import { addTo } from "@/utils/date";
import { getFakeGameName } from "@/utils/game";

const Styled = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: ${getColorVariant("white")};
  color: ${getColorVariant("black")};
`;

function Create() {
  const dispatch = useAppDispatch();
  const newGame = useAppSelector(gameSelectors.getNewGame);
  const authUser = useAppSelector(authUserSelectors.getAuthUser);

  const { dispatchNotification } = useNotificationsContext();

  const [users, setUsers] = useState<
    { email: string; firestoreId: string | null }[]
  >([]);

  useEffect(() => {
    dispatch(updateNewGame({ name: getFakeGameName(), isPrivate: false }));
  }, [dispatch]);

  const responsiveContext = useResponsiveContext();

  return (
    <Styled>
      <Spacer $margin="medium">
        <Heading variant="h1">Create New Game</Heading>
        <GridContainer>
          <GridItem $lg={6}>
            <div>
              My new game will be called{" "}
              <TextEditable
                text={newGame.name || ""}
                onChange={(newVal) => {
                  dispatch(updateNewGame({ name: newVal }));
                }}
              />
            </div>
            <Spacer $paddingY="small" />
            <div>
              <P>I can sum up my game in a few words:</P>
              <TextArea
                cols={responsiveContext?.isMobile ? 30 : 50}
                value={newGame.description || ""}
                onChange={(e) =>
                  dispatch(
                    updateNewGame({
                      description: e.target.value,
                    }),
                  )
                }
                placeholder="A casual chat and hopefully a place to hear some new music!"
              />
            </div>
            <Spacer $paddingY="small" />
            <div>
              <FlexBox $alignItems="center" $gap="small">
                <Checkbox
                  checked={newGame.isPrivate}
                  onChange={(e) => {
                    dispatch(updateNewGame({ isPrivate: e }));
                  }}
                />
                <P $fontWeight="bold">
                  {newGame.isPrivate ? "Private" : "Public"} Game
                </P>
              </FlexBox>
            </div>
            <small>
              The game will be {newGame.isPrivate ? "private" : "public"},{" "}
              {newGame.isPrivate
                ? "I will invite players to join"
                : "players can request to join freely."}
            </small>
            <Spacer $paddingY="small" />
            <div>
              <FlexBox $alignItems="center" $gap="small">
                <Checkbox
                  checked={newGame.addAdminAsPlayer}
                  onChange={(e) => {
                    dispatch(updateNewGame({ addAdminAsPlayer: e }));
                  }}
                />
                <P $fontWeight="bold">
                  {newGame.addAdminAsPlayer ? "Include me" : "Don't include me"}
                </P>
              </FlexBox>
            </div>
            <small>
              {newGame.addAdminAsPlayer ? "A" : "Don't a"}dd me as a player to
              this game.
            </small>
            <Spacer $paddingY="small" />
            <Heading variant="h4">Start Date</Heading>
            <P>My game will start on:</P>
            <Datepicker
              initialDate={newGame.startDate}
              onChange={(dateString) => {
                dispatch(updateNewGame({ startDate: dateString }));
              }}
            />
            <Spacer $paddingY="small" />
            <div>
              <Heading variant="h4">End Date</Heading>
              <FlexBox $alignItems="center" $gap="small">
                <Checkbox
                  checked={newGame.isOpenEnded}
                  onChange={(e) => {
                    dispatch(updateNewGame({ isOpenEnded: e }));
                  }}
                />
                <P $fontWeight="bold">
                  {newGame.isOpenEnded ? "Open ended game" : "Game has an end"}
                </P>
              </FlexBox>
              <Spacer $paddingY="xSmall" />
              {newGame.isOpenEnded ? (
                <P>
                  Game will continue indefinitely or until you choose to end it
                </P>
              ) : (
                <>
                  <P>My game will end on:</P>
                  <Datepicker
                    initialDate={
                      newGame.endDate || addTo(1, "month", newGame.startDate)
                    }
                    onChange={(dateString) => {
                      dispatch(updateNewGame({ endDate: dateString }));
                    }}
                  />
                </>
              )}
            </div>
            <Spacer $paddingY="small" />
            <Heading variant="h4">Frequency</Heading>
            <P>My game will repeat:</P>
            <Spacer $paddingY="xSmall" />
            <PeriodSelect
              selectedPeriod={newGame.period}
              onChange={(period) => {
                dispatch(
                  updateNewGame({
                    period,
                  }),
                );
              }}
            />
            <Spacer $paddingY="small" />
          </GridItem>
          <GridItem $lg={6}>
            <InviteUsers
              onRemoveUser={(email) => {
                setUsers((state) => state.filter((u) => u.email !== email));
              }}
              emails={users.map((u) => u.email)}
              onAddUser={(user) => {
                setUsers((state) => {
                  if (state.some((u) => u.email === user.email)) {
                    return state;
                  }
                  return state.concat(user);
                });
              }}
            />
          </GridItem>
        </GridContainer>
        <Spacer $paddingY="medium">
          <Button
            buttonText="Create"
            onClick={() =>
              authUser?.sqlId &&
              dispatch(
                createGame({
                  ...newGame,
                  adminId: authUser.sqlId,
                  players: users,
                }),
              )
                .then((game) => {
                  if (game.payload) {
                    setUsers([]);
                    dispatchNotification({
                      durationMs: 10000,
                      title: "Game Created",
                      message: (
                        <p>
                          View your new game{" "}
                          <Link
                            href={`/home/games/${(game.payload as Game).id}`}
                          >
                            here
                          </Link>
                        </p>
                      ),
                      type: "SUCCESS",
                    });
                  }
                })
                .catch((e) => {
                  dispatchNotification({
                    durationMs: 10000,
                    title: "Failed to create game",
                    message: e.message,
                    type: "ERROR",
                  });
                })
            }
          />
        </Spacer>
      </Spacer>
    </Styled>
  );
}

export default Create;
