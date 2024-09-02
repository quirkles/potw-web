import { createSelector } from "reselect";

import {
  gameSelectors,
  isFetchedGame,
} from "@/app/store/reducers/gamesReducer";
import { authUserSelector } from "@/app/store/selectors/authUser";

export const selectGamesForUsers = createSelector(
  [authUserSelector, gameSelectors.getGames],
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
