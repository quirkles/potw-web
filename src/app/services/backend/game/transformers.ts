import { GameWeek } from "@/app/services/schemas/backend/gameWeek";
import { GameWithRelations } from "@/app/services/schemas/backend/withRelations";
import { StoreFetchedGame } from "@/app/services/schemas/store/game";
import {
  StoreFetchedGameWeek,
  storeFetchedGameWeekSchema,
} from "@/app/services/schemas/store/gameWeek";

import { isDateString, stringAsDateString } from "@/utils/date";

export function gameToStoreGame(game: GameWithRelations): StoreFetchedGame {
  if (!isDateString(game.startDate)) {
    throw new Error(
      "Invalid date string in gameToStoreGame: " + game.startDate,
    );
  }
  return {
    ...game,
    fetchStatus: "fetched",
    startDate: game.startDate,
    endDate: stringAsDateString(game.endDate),
    admin: game.admin?.sqlId || "N/A",
    players: game.players?.map((player) => player.sqlId || "N/A") || [],
    gameWeeks: game.gameWeeks?.map((gw) => gw.sqlId) || [],
  };
}

export function gameWeekToStoreGameWeek(
  gameWeek: GameWeek,
  gameSqlId: string,
): StoreFetchedGameWeek {
  return storeFetchedGameWeekSchema.parse({
    ...gameWeek,
    gameId: gameSqlId,
    fetchStatus: "fetched",
  });
}
