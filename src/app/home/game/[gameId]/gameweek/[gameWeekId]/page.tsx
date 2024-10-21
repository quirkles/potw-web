"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import { gameColors, getColor } from "@/app/styles/colors";
import { defaultBorderRadius } from "@/app/styles/consts";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectGameWeekBySqlId } from "@/app/store/selectors/gameWeeks";
import { selectGameBySqlId } from "@/app/store/selectors/games";
import {
  fetchGameAction,
  fetchGameWeekWithGameAction,
} from "@/app/store/sharedActions/fetch";

import { StoreGame } from "@/app/services/schemas/store/game";
import { StoreFetchedGameWeek } from "@/app/services/schemas/store/gameWeek";

import CommentBox from "@/components/commentBox/CommentBox";
import { Box } from "@/components/layout/Box";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";

import { formatDateTime } from "@/utils/date";
import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

const Styled = styled.div`
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  > * {
    flex-grow: 1;
  }
`;

export default function GameWeek({
  params,
}: {
  params: { gameWeekId: string; gameId: string };
}) {
  const { gameWeekId, gameId } = params;

  const gameWeek = useAppSelector((state) =>
    selectGameWeekBySqlId(state, gameWeekId),
  );
  const game: StoreGame | null = useAppSelector((state) =>
    selectGameBySqlId(state, gameWeekId),
  );

  const dispatch = useAppDispatch();

  const { fetchStatus: gameWeekFetchStatus = "none" } = gameWeek || {};

  useEffect(() => {
    // If the gameWeek is pending or errored return right away
    if (
      gameWeekFetchStatus === "pending" ||
      gameWeekFetchStatus === "failed" ||
      gameWeekFetchStatus === "fetched"
    ) {
      return;
    }
    dispatch(fetchGameWeekWithGameAction(gameWeekId as string));
  }, [gameWeekFetchStatus, dispatch, gameWeekId]);

  if (gameWeek?.fetchStatus === "fetched") {
    return <FetchedGameWeek gameWeek={gameWeek}></FetchedGameWeek>;
  }

  return (
    <Styled>
      <Spacer $padding="medium">
        {gameWeek?.fetchStatus === "pending" && <Loader />}
        {gameWeek?.fetchStatus === "failed" && <h1>Error</h1>}
      </Spacer>
    </Styled>
  );
}

function BoxWithSpacer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      $backgroundColor="lightGrey_100"
      $borderRadius={defaultBorderRadius}
      $border={`1px solid ${getColor("grey_100")}`}
    >
      <Spacer $paddingX="small" $paddingY="small">
        {children}
      </Spacer>
    </Box>
  );
}

const StyledGameWeek = styled.div`
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 2rem;
`;
function FetchedGameWeek({ gameWeek }: { gameWeek: StoreFetchedGameWeek }) {
  const gameWeekColor = getPseudoRandomFromArrayFromUid(
    gameWeek.sqlId,
    gameColors,
  );

  const dispatch = useAppDispatch();
  const game: StoreGame | null = useAppSelector((state) =>
    selectGameBySqlId(state, gameWeek.gameId),
  );

  const { fetchStatus: gameFetchStatus } = game || {};

  useEffect(() => {
    if (
      gameWeek.gameId &&
      gameFetchStatus !== "fetched" &&
      gameFetchStatus !== "pending" &&
      gameFetchStatus !== "failed"
    ) {
      dispatch(fetchGameAction(gameWeek.gameId as string));
    }
  }, [gameWeek.gameId, gameFetchStatus, dispatch]);

  return (
    <StyledGameWeek>
      <GridContainer>
        <GridItem>
          <BoxWithSpacer>
            <P>{formatDateTime(gameWeek.startDateTime, "timeShortMonthDay")}</P>
            <P>{gameWeek.theme || "No theme set"}</P>
          </BoxWithSpacer>
        </GridItem>
        <GridItem $mdCol={8}>
          <BoxWithSpacer>
            <CommentBox resourcePath={`gameWeeks/${gameWeek.firestoreId}`} />
          </BoxWithSpacer>
        </GridItem>
      </GridContainer>
    </StyledGameWeek>
  );
}
