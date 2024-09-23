"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import InviteUsers from "@/app/home/create/InviteUsers";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { createGame, updateNewGame } from "@/app/store/reducers/gamesReducer";
import { authUserSelector } from "@/app/store/selectors/authUser";
import { selectNewGame } from "@/app/store/selectors/games";

import { useNotificationsContext } from "@/app/providers/Notifications";

import { Game } from "@/app/services/schemas/backend/game";

import Button from "@/components/button/Button";
import Checkbox from "@/components/form/Checkbox";
import Datepicker from "@/components/form/Datepicker";
import PeriodSelect from "@/components/form/PeriodSelect";
import TextEditable from "@/components/form/TextEditable";
import TextArea from "@/components/form/Textarea";
import Timepicker from "@/components/form/Timepicker";
import Heading from "@/components/heading/Heading";
import { FlexContainer } from "@/components/layout/FlexContainer";
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
  const newGame = useAppSelector(selectNewGame);
  const authUser = useAppSelector(authUserSelector);

  const { dispatchNotification } = useNotificationsContext();

  const [users, setUsers] = useState<
    { email: string; firestoreId: string | null }[]
  >([]);

  useEffect(() => {
    dispatch(updateNewGame({ name: getFakeGameName(), isPrivate: false }));
  }, [dispatch]);

  return (
    <Styled>
      <Spacer $margin="medium">
        <Heading $variant="h1">Create New Game</Heading>
        <GridContainer>
          <GridItem $lgCol={6}>
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
              <FlexContainer $alignItems="center" $gap="small">
                <Checkbox
                  checked={newGame.isPrivate}
                  onChange={(e) => {
                    dispatch(updateNewGame({ isPrivate: e }));
                  }}
                />
                <P $fontWeight="bold">
                  {newGame.isPrivate ? "Private" : "Public"} Game
                </P>
              </FlexContainer>
            </div>
            <small>
              The game will be {newGame.isPrivate ? "private" : "public"},{" "}
              {newGame.isPrivate
                ? "I will invite players to join"
                : "players can request to join freely."}
            </small>
            <Spacer $paddingY="small" />
            <div>
              <FlexContainer $alignItems="center" $gap="small">
                <Checkbox
                  checked={newGame.addAdminAsPlayer}
                  onChange={(e) => {
                    dispatch(updateNewGame({ addAdminAsPlayer: e }));
                  }}
                />
                <P $fontWeight="bold">
                  {newGame.addAdminAsPlayer ? "Include me" : "Don't include me"}
                </P>
              </FlexContainer>
            </div>
            <small>
              {newGame.addAdminAsPlayer ? "A" : "Don't a"}dd me as a player to
              this game.
            </small>
            <Spacer $paddingY="small" />
            <Heading $variant="h4">Start Date</Heading>
            <P>My game will start on:</P>
            <Datepicker
              initialDate={newGame.startDate}
              onChange={(dateString) => {
                dispatch(updateNewGame({ startDate: dateString }));
              }}
            />
            <Spacer $paddingY="small" />
            <Heading $variant="h4">End Date</Heading>
            <FlexContainer $alignItems="center" $gap="small">
              <Checkbox
                checked={newGame.isOpenEnded}
                onChange={(e) => {
                  dispatch(updateNewGame({ isOpenEnded: e }));
                }}
              />
              <P $fontWeight="bold">
                {newGame.isOpenEnded ? "Open ended game" : "Game has an end"}
              </P>
            </FlexContainer>
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
            <Spacer $paddingY="small" />
            <Heading $variant="h4">Frequency</Heading>
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
            <Heading $variant="h4">Start Time</Heading>
            <P>
              My game will start at this time. This can be changed week to week.
            </P>
            <Spacer $paddingY="xSmall" />
            <Timepicker
              value={newGame.regularScheduledStartTimeUtc}
              onChange={(time) => {
                dispatch(
                  updateNewGame({
                    regularScheduledStartTimeUtc: `${time}:00`,
                  }),
                );
              }}
            />
            <Spacer $paddingY="small" />
          </GridItem>
          <GridItem $lgCol={6}>
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
                            href={`/home/game/${(game.payload as Game).sqlId}`}
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
