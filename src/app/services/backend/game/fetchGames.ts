import {
  sqlGameWithRelationsSchema,
  TSqlGameWithRelations,
} from "@potw/schemas";
import z from "zod";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";

export async function fetchGames(): Promise<TSqlGameWithRelations[]> {
  return httpService
    .get({
      url: `${getConfig().functionsUrl}/app-game-fetch`,
      responseSchema: z.object({
        games: z.array(sqlGameWithRelationsSchema),
      }),
    })
    .then((response) => response.games);
}
