"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { gameSlice, isFetchedGame } from "@/app/store/reducers/gamesReducer";
import { selectGamesForUsers } from "@/app/store/selectors";

import { useResponsiveContext } from "@/app/providers/Responsive";

import { GameSummary } from "@/components/gameSummary/GameSummary";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Spacer from "@/components/spacer/Spacer";

import { getColorVariant } from "@/utils/color";

const StyledGames = styled.div`
  background-color: ${getColorVariant("white")};
  color: ${getColorVariant("black")};
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
  const responsiveContext = useResponsiveContext();

  useEffect(() => {
    if (authUser?.sqlId) {
      dispatch(gameSlice.actions.fetchGamesForUser(authUser.sqlId as string));
    }
  }, [authUser?.sqlId, dispatch]);

  const gap = responsiveContext?.isDesktop
    ? "large"
    : responsiveContext?.isTablet
      ? "medium"
      : "small";

  return (
    <StyledGames>
      <Spacer $padding="medium">
        <GridContainer $gap={gap}>
          {games &&
            games.filter(isFetchedGame).map((game) => (
              <GridItem key={game.id} $smCol={6} $mdCol={4}>
                <GameSummary game={game} />
              </GridItem>
            ))}
        </GridContainer>
      </Spacer>
    </StyledGames>
  );
}

export default Games;
