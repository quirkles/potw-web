import { StoreFetchedGame } from "@/app/services/schemas/store/game";
import { GameWithRelations } from "@/app/services/schemas/withRelations";

import { isDateString, stringAsDateString } from "@/utils/date";

export function gameToStoreGame(game: GameWithRelations): StoreFetchedGame {
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
    admin: game.admin?.sqlId || "N/A",
    players: game.players?.map((player) => player.sqlId || "N/A") || [],
  };
}
