import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import { gameWeekWithRelations } from "@/app/services/schemas/backend/withRelations";

export function fetchOneWithGame(gameWeekId: string) {
  return httpService.get({
    url: `${getConfig().functionsUrl}/app-gameWeeks-fetchOne?gameWeekId=${gameWeekId}`,
    responseSchema: gameWeekWithRelations,
  });
}
