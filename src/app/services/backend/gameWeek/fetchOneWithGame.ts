import {
  TSqlGameWeekWithRelations,
  sqlGameWeekWithRelationsSchema,
} from "@potw/schemas";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";

export function fetchOneWithGame(
  gameWeekId: string,
): Promise<TSqlGameWeekWithRelations> {
  return httpService.get({
    url: `${getConfig().functionsUrl}/app-gameWeeks-fetchOne?gameWeekId=${gameWeekId}`,
    responseSchema: sqlGameWeekWithRelationsSchema,
  });
}
