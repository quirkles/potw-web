import z from "zod";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import {
  GameWithRelations,
  gameWithRelationsSchema,
} from "@/app/services/schemas/backend/withRelations";

export async function fetchGames(): Promise<GameWithRelations[]> {
  return httpService
    .get({
      url: `${getConfig().functionsUrl}/app-game-fetch`,
      responseSchema: z.object({
        games: z.array(gameWithRelationsSchema),
      }),
    })
    .then((response) => response.games);
}
