import z from "zod";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import { gameSchema } from "@/app/services/schemas/backend/game";
import { gameWeekSchema } from "@/app/services/schemas/backend/gameWeek";

export function fetchOneWithGame(gameWeekId: string) {
  return httpService.get({
    url: `${getConfig().functionsUrl}/app-gameWeeks-fetchOne?gameWeekId=${gameWeekId}`,
    responseSchema: z.object({
      gameWeek: gameWeekSchema,
      game: gameSchema,
    }),
  });
}
