import { TSqlGameWeek, TSqlGameWithRelations } from "@potw/schemas";
import { isDateString } from "@potw/type-utils";
import { stringAsDateString } from "@potw/utils";

import { StoreFetchedGame } from "@/app/store/schemas/game";
import {
  StoreFetchedGameWeek,
  storeFetchedGameWeekSchema,
} from "@/app/store/schemas/gameWeek";

export function gameToStoreGame(game: TSqlGameWithRelations): StoreFetchedGame {
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
    gameWeeks: game.gameWeeks?.map((gw) => gw.sqlId),
  };
}

export function gameWeekToStoreGameWeek(
  gameWeek: TSqlGameWeek,
  gameSqlId: string,
): StoreFetchedGameWeek {
  return storeFetchedGameWeekSchema.parse({
    ...gameWeek,
    gameId: gameSqlId,
    fetchStatus: "fetched",
  });
}
