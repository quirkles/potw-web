"use client";

import { useEffect } from "react";
import styled from "styled-components";

import {
  gameSelectors,
  gameSlice,
  StoreGame,
} from "@/app/store/reducers/gamesReducer";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";

import { getPseudoRandomFromArrayFromUid } from "@/utils/random";
import { getColor } from "@/utils/color";

const Styled = styled.div<{
  $seed?: string;
}>`
    max-height: 100%;
    height: 100%;
    width: 100%;
  background-color: ${(props) =>
    props.$seed
      ? getPseudoRandomFromArrayFromUid(props.$seed, [
          getColor("red"),
          getColor("blue"),
          getColor("green"),
          getColor("cyan"),
          getColor("yellow"),
        ])
      : "black"};
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
  return (
    <Styled $seed={game?.id}>
      <Spacer $padding={game?.status === "fetching" ? "xLarge" : "medium"}>
        {game?.status === "fetching" && <Loader />}
        {game?.status === "failed" && <h1>Error</h1>}
        {game?.status === "fetched" && (
          <>
            <h1>{game.name}</h1>
          </>
        )}
      </Spacer>
    </Styled>
  );
}

export default GamePage;
