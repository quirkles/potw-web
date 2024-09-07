import { createSelector } from "reselect";

import {
  gameSelectors,
  isFetchedGame,
} from "@/app/store/reducers/gamesReducer";
import { authUserSelector } from "@/app/store/selectors/authUser";
import { RootState } from "@/app/store/store";

export const selectGameState = (state: RootState) => state.gameState;

export const selectGames = createSelector(
  [selectGameState, (_, sqlId?: string) => sqlId],
  (gameState, userId) => {
    return Object.values(gameState.games).filter((game) => {
      if (!userId) {
        return isFetchedGame(game);
      }
      return (
        isFetchedGame(game) &&
        (game.players.includes(userId) || game.admin === userId)
      );
    });
  },
);

export const selectFetchingGameIds = createSelector(
  [selectGameState],
  (gameState) => {
    return gameState.fetchingGamesForUserIds;
  },
);

export const selectGamesForAuthUser = createSelector(
  [authUserSelector, selectGames],
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
