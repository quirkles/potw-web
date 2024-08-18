import { createSelector } from "reselect";
import { authUserSelectors } from "@/app/store/reducers/authUserReducer";
import {
  gameSelectors,
  isFetchedGame,
} from "@/app/store/reducers/gamesReducer";

export const selectGamesForUsers = createSelector(
  [authUserSelectors.getAuthUser, gameSelectors.getGames],
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
