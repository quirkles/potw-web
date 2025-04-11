import {
  sqlGameWithRelationsSchema,
  TSqlGameWithRelations,
} from "@potw/schemas";
import { default as z } from "zod";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";

export async function fetchGamesForUser(
  userId: string,
): Promise<TSqlGameWithRelations[]> {
  return httpService
    .get({
      url: `${getConfig().functionsUrl}/app-game-fetch?userId=${userId}`,
      responseSchema: z.object({
        games: z.array(sqlGameWithRelationsSchema),
      }),
    })
    .then((response) => response.games);
}
