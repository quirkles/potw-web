import { getConfig } from "@/config";

import { Game, gameSchema } from "@/app/services/schemas/backend/game";
import {
  GameWithRelations,
  gameWithRelationsSchema,
} from "@/app/services/schemas/backend/withRelations";

export async function fetchGame(gameId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return fetch(`${getConfig().functionsUrl}/app-game-fetchOne?gameId=${gameId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch games");
      }
      return res.json();
    })
    .then((data) => {
      return gameWithRelationsSchema.parse(data);
    })
    .catch((e) => {
      console.error(`Error fetching games: ${e}`);
      throw e;
    });
}
