"use client";

import Link from "next/link";
import { PropsWithChildren, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectGamesForUsers } from "@/app/store/selectors";
import { gameSlice, StoreGame } from "@/app/store/reducers/gamesReducer";

import Spacer from "@/components/spacer/Spacer";

import { getColor } from "@/utils/color";
import { GameSummary } from "@/components/gameSummary/GameSummary";
import { GridContainer, GridItem } from "@/components/layout/Grid";

const StyledGames = styled.div`
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  max-height: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

function Games() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.authUser);
  const games = useAppSelector(selectGamesForUsers);

  useEffect(() => {
    if (authUser?.sqlId) {
      dispatch(gameSlice.actions.fetchMyGames(authUser.sqlId as string));
    }
  }, [authUser?.sqlId, dispatch]);

  return (
    <StyledGames>
      <Spacer $padding="medium">
        <GridContainer>
          {games &&
            games.map((game) => (
              <GridItem key={game.id} $sm={6}>
                <GameSummary game={game} />
              </GridItem>
            ))}
        </GridContainer>
      </Spacer>
    </StyledGames>
  );
}

export default Games;
