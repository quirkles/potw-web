import { sqlVoteSchema } from "@potw/schemas";
import { default as z } from "zod";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";

export async function fetchAllVotesForGame(gameSqlId: string) {
  return httpService.get({
    url: `${getConfig().functionsUrl}/app-game-fetchAllGameVotes?gameId=${gameSqlId}`,
    responseSchema: z.array(sqlVoteSchema),
  });
}
