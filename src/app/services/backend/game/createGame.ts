import { sqlGameWithRelationsSchema, TCreateGamePayload } from "@potw/schemas";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";

export async function createGameRequest(input: TCreateGamePayload) {
  return httpService.post({
    body: input,
    responseSchema: sqlGameWithRelationsSchema,
    url: `${getConfig().functionsUrl}/app-game-create`,
  });
}
