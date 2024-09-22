import z from "zod";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import { gameVoteSchema } from "@/app/services/schemas/backend/gameVotes";

export async function fetchAllVotesForGame(gameSqlId: string) {
  return httpService.get({
    url: `${getConfig().functionsUrl}/app-game-fetchAllGameVotes?gameId=${gameSqlId}`,
    responseSchema: z.array(gameVoteSchema),
  });
}
