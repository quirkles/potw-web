import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import { CreateGamePayload } from "@/app/services/schemas/backend/game";
import { gameWithRelationsSchema } from "@/app/services/schemas/backend/withRelations";

export async function createGameRequest(input: CreateGamePayload) {
  return httpService.post({
    body: input,
    responseSchema: gameWithRelationsSchema,
    url: `${getConfig().functionsUrl}/app-game-create`,
  });
}
