"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { gameSlice, isFetchedGame } from "@/app/store/reducers/gamesReducer";
import { selectGames } from "@/app/store/selectors/games";

import { useResponsiveContext } from "@/app/providers/Responsive";

import Checkbox from "@/components/form/Checkbox";
import { GameSummary } from "@/components/gameSummary/GameSummary";
import Heading from "@/components/heading/Heading";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Spacer from "@/components/spacer/Spacer";
import Span from "@/components/text/Span";

import { getColorVariant } from "@/utils/color";

const StyledGames = styled(Spacer).withConfig({
  shouldForwardProp: (prop) => true,
})`
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
  const games = useAppSelector(selectGames);
  const responsiveContext = useResponsiveContext();
  const [showingAllGames, setShowingAllGames] = useState<boolean>(false);

  useEffect(() => {
    if (authUser?.sqlId) {
      dispatch(gameSlice.actions.fetchGames(null));
    }
  }, [authUser?.sqlId, dispatch]);

  const gap = responsiveContext?.isDesktop
    ? "large"
    : responsiveContext?.isTablet
      ? "medium"
      : "small";

  return (
    <StyledGames $padding="medium">
      <GridContainer $gap={gap}>
        <GridItem $xsRow={1} $xsCol={12}>
          <FlexContainer $alignItems="center">
            <FlexItem $grow={1}>
              <Heading $variant="h1" $underline>
                Games
              </Heading>
            </FlexItem>
            <FlexItem>
              <FlexContainer $gap="small">
                <Checkbox
                  onChange={(checked) => setShowingAllGames(checked)}
                  checked={showingAllGames}
                />
                <Span>Show {showingAllGames ? "all" : "my"} games</Span>
              </FlexContainer>
            </FlexItem>
          </FlexContainer>
        </GridItem>
        {games &&
          games.filter(isFetchedGame).map((game) => (
            <GridItem key={game.sqlId} $smCol={6} $mdCol={4}>
              <GameSummary game={game} />
            </GridItem>
          ))}
      </GridContainer>
    </StyledGames>
  );
}

export default Games;
