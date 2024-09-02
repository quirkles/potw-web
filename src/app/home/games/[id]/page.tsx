"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import AdminBox from "@/app/home/games/[id]/partials/AdminBox";
import GameWeekBox from "@/app/home/games/[id]/partials/GameWeeksBox";
import UsersBox from "@/app/home/games/[id]/partials/UsersBox";
import { gameColors, getColor } from "@/app/styles/colors";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  gameSelectors,
  gameSlice,
  StoreFetchedGame,
  StoreGame,
} from "@/app/store/reducers/gamesReducer";
import { selectUserBySqlId } from "@/app/store/selectors/users";

import Heading from "@/components/heading/Heading";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";

import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

const Styled = styled.div`
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  > * {
    flex-grow: 1;
  }
`;

function GamePage({ params }: { params: { id: string } }) {
  const { id: gameId } = params;
  const dispatch = useAppDispatch();
  const game: StoreGame | null = useAppSelector((state) =>
    gameSelectors.getGame(state, gameId),
  );

  useEffect(() => {
    if (gameId) {
      dispatch(gameSlice.actions.fetchGame(gameId as string));
    }
  }, [gameId, dispatch]);
  if (game?.status === "fetched") {
    return <FetchedGame game={game} />;
  }
  return (
    <Styled>
      <Spacer $padding={game?.status === "fetching" ? "xLarge" : "medium"}>
        {game?.status === "fetching" && <Loader />}
        {game?.status === "failed" && <h1>Error</h1>}
      </Spacer>
    </Styled>
  );
}

export default GamePage;

const StyledGame = styled.div<{
  $color: string;
}>`
  max-height: 100%;
  height: 100%;
  width: 100%;

  padding: 2rem;

  background-color: ${getColor("white")};
  color: ${getColor("black")};
`;

function FetchedGame({ game }: { game: StoreFetchedGame }) {
  const gameColor = getPseudoRandomFromArrayFromUid(game.id, gameColors);
  console.log("gamecolor", gameColor);
  const admin = useAppSelector((state) => selectUserBySqlId(state, game.admin));

  return (
    <StyledGame $color={gameColor}>
      <GridContainer>
        <GridItem $xsCol={12}>
          <Heading variant="h1" $color={gameColor} $underline>
            {game.name}
          </Heading>
          {game.description && <P>{game.description}</P>}
        </GridItem>
        <GridItem $mdCol={4}>
          {admin && <AdminBox admin={admin} color={gameColor} game={game} />}
        </GridItem>
        <GridItem $mdCol={8} $mdRow={2}>
          <GameWeekBox color={gameColor} />
        </GridItem>
        <GridItem $mdCol={4}>
          <UsersBox color={gameColor} userIds={game.players} />
        </GridItem>
      </GridContainer>
    </StyledGame>
  );
}
