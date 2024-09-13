import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import { CreateGamePayload } from "@/app/services/schemas/game";
import { gameWithRelationsSchema } from "@/app/services/schemas/withRelations";

export async function createGameRequest(input: CreateGamePayload) {
  return httpService.post({
    body: input,
    responseSchema: gameWithRelationsSchema,
    url: `${getConfig().functionsUrl}/app-game-create`,
  });
}
