import z from "zod";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import {
  GameWithRelations,
  gameWithRelationsSchema,
} from "@/app/services/schemas/withRelations";

export async function fetchGamesForUser(
  userId: string,
): Promise<GameWithRelations[]> {
  return httpService
    .get({
      url: `${getConfig().functionsUrl}/app-game-fetch?userId=${userId}`,
      responseSchema: z.object({
        games: z.array(gameWithRelationsSchema),
      }),
    })
    .then((response) => response.games);
}
