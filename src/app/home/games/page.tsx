"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { gameSlice, isFetchedGame } from "@/app/store/reducers/gamesReducer";
import {
  selectFetchingGameIds,
  selectGames,
} from "@/app/store/selectors/games";

import { useResponsiveContext } from "@/app/providers/Responsive";

import Checkbox from "@/components/form/Checkbox";
import { GameSummary } from "@/components/gameSummary/GameSummary";
import Heading from "@/components/heading/Heading";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";
import Span from "@/components/text/Span";

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
  const fetchingGameIds = useAppSelector(selectFetchingGameIds);
  const [hasDoneInitialFetch, setHasDoneInitialFetch] =
    useState<boolean>(false);

  const responsiveContext = useResponsiveContext();
  const [isShowingAllGames, setIsShowingAllGames] = useState<boolean>(true);

  const games = useAppSelector((state) =>
    selectGames(state, isShowingAllGames ? undefined : authUser?.sqlId),
  );

  const handleToggleShowAllGames = (checked: boolean) => {
    if (checked && !fetchingGameIds.includes("all")) {
      dispatch(gameSlice.actions.fetchGames(null));
    } else if (authUser?.sqlId && !fetchingGameIds.includes(authUser.sqlId)) {
      dispatch(gameSlice.actions.fetchGamesForUser(authUser.sqlId));
    }
    setIsShowingAllGames(checked);
  };

  useEffect(() => {
    if (hasDoneInitialFetch) {
      return;
    }
    if (isShowingAllGames && !fetchingGameIds.includes("all")) {
      setHasDoneInitialFetch(true);
      dispatch(gameSlice.actions.fetchGames(null));
    } else if (authUser?.sqlId && !fetchingGameIds.includes(authUser.sqlId)) {
      setHasDoneInitialFetch(true);
      dispatch(gameSlice.actions.fetchGamesForUser(authUser.sqlId));
    }
  }, [
    authUser?.sqlId,
    dispatch,
    fetchingGameIds,
    hasDoneInitialFetch,
    isShowingAllGames,
  ]);

  const gap = responsiveContext?.isDesktop
    ? "large"
    : responsiveContext?.isTablet
      ? "medium"
      : "small";

  return (
    <StyledGames>
      <Spacer $padding="medium">
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
                  <Span>Show {isShowingAllGames ? "all" : "my"} games</Span>
                  <Checkbox
                    onChange={(checked) => handleToggleShowAllGames(checked)}
                    checked={isShowingAllGames}
                  />
                </FlexContainer>
              </FlexItem>
            </FlexContainer>
          </GridItem>
          {games?.length > 0 &&
            games.filter(isFetchedGame).map((game) => (
              <GridItem key={game.sqlId} $smCol={6} $mdCol={4}>
                <GameSummary game={game} />
              </GridItem>
            ))}
          {games?.length === 0 && (
            <GridItem $xsCol={12}>
              {authUser?.sqlId &&
              fetchingGameIds.includes(
                isShowingAllGames ? "all" : authUser?.sqlId,
              ) ? (
                <Loader />
              ) : (
                <Span>No games found.</Span>
              )}
            </GridItem>
          )}
        </GridContainer>
      </Spacer>
    </StyledGames>
  );
}

export default Games;
