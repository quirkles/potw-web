import { createSelector } from "reselect";

import { isFetchedGame } from "@/app/store/reducers/gamesReducer";
import { authUserSelector } from "@/app/store/selectors/authUser";
import { RootState } from "@/app/store/store";

export const selectGameState = (state: RootState) => state.gameState;

export const selectGameBySqlId = createSelector(
  [selectGameState, (_, sqlId: string) => sqlId],
  (gameState, sqlId) => {
    return gameState.games[sqlId]?.game;
  },
);

export const selectGamesForUser = createSelector(
  [selectGameState, (_, sqlId?: string) => sqlId],
  (gameState, userId) => {
    return Object.values(gameState.games)
      .filter(({ game }) => {
        if (!userId) {
          return isFetchedGame(game);
        }
        return (
          isFetchedGame(game) &&
          (game.players.includes(userId) || game.admin === userId)
        );
      })
      .map(({ game }) => game);
  },
);

export const selectNewGame = createSelector([selectGameState], (gameState) => {
  return gameState.newGame;
});

export const selectFetchingGameIds = createSelector(
  [selectGameState],
  (gameState) => {
    return gameState.fetchingGamesForUserIds;
  },
);

export const selectGamesForAuthUser = createSelector(
  [authUserSelector, selectGamesForUser],
  (authUser, games) => {
    return authUser && Object.values(games).length
      ? Object.values(games).filter(
          (game) =>
            isFetchedGame(game) &&
            (game.players.includes(authUser?.sqlId as string) ||
              game.admin === authUser?.sqlId),
        )
      : null;
  },
);

export const selectVotesForGame = createSelector(
  [selectGameState, (_, sqlId: string | null) => sqlId],
  (
    gameState,
    sqlId,
  ): {
    [userSqlId: string]: number;
  } => {
    if (!sqlId) {
      return {};
    }
    return ((gameState.games[sqlId] || {})["votes"] || []).reduce(
      (
        acc: {
          [userSqlId: string]: number;
        },
        vote,
      ) => {
        if (acc[vote.userSqlId]) {
          acc[vote.userSqlId] += 1;
        } else {
          acc[vote.userSqlId] = 1;
        }
        return acc;
      },
      {},
    );
  },
);
