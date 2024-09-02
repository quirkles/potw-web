import { StoreFetchedGame } from "@/app/store/reducers/gamesReducer";

import { Game } from "@/app/services/schemas/game";

import { isDateString, stringAsDateString } from "@/utils/date";

export function gameToStoreGame(game: Game): StoreFetchedGame {
  if (!isDateString(game.startDate)) {
    throw new Error(
      "Invalid date string in gameToStoreGame: " + game.startDate,
    );
  }
  return {
    ...game,
    sqlId: game.id,
    status: "fetched",
    startDate: game.startDate,
    endDate: stringAsDateString(game.endDate),
    admin: game.admin.sqlId,
    players: game.players.map((player) => player.sqlId),
  };
}
