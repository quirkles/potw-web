import { Game } from "@/app/services/schemas/game";
import { StoreFetchedGame } from "@/app/store/reducers/gamesReducer";
import { isDateString, stringAsDateString } from "@/utils/date";

export function gameToStoreGame(game: Game): StoreFetchedGame {
  if (!isDateString(game.startDate)) {
    throw new Error(
      "Invalid date string in gameToStoreGame: " + game.startDate,
    );
  }
  return {
    ...game,
    status: "fetched",
    startDate: game.startDate,
    endDate: stringAsDateString(game.endDate),
    admin: game.admin.sqlId,
    players: game.players.map((player) => player.sqlId),
  };
}
