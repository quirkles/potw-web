"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import AdminBox from "@/app/home/games/[id]/partials/AdminBox";
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

import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

const Styled = styled.div`
  max-height: 100%;
  height: 100%;
  width: 100%;
  background-color: ${getColor("white")};
  color: ${getColor("black")};
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
  return (
    <Styled>
      <Spacer $padding={game?.status === "fetching" ? "xLarge" : "medium"}>
        {game?.status === "fetching" && <Loader />}
        {game?.status === "failed" && <h1>Error</h1>}
        {game?.status === "fetched" && <FetchedGame game={game} />}
      </Spacer>
    </Styled>
  );
}

export default GamePage;

const StyledGame = styled.div<{
  $color: string;
}>``;

function FetchedGame({ game }: { game: StoreFetchedGame }) {
  const gameColor = getPseudoRandomFromArrayFromUid(game.id, gameColors);
  const admin = useAppSelector((state) => selectUserBySqlId(state, game.admin));

  return (
    <StyledGame $color={gameColor}>
      <Heading variant="h1" $color={gameColor} $underline>
        {game.name}
      </Heading>
      <GridContainer>
        <GridItem $md={4}>
          {admin && <AdminBox admin={admin} color={gameColor} game={game} />}
        </GridItem>
        <GridItem $md={8}>
          {game.description && <p>{game.description}</p>}
        </GridItem>
      </GridContainer>
    </StyledGame>
  );
}
