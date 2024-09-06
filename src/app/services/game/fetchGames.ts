import z from "zod";

import { getConfig } from "@/config";

import { gameSchema } from "@/app/services/schemas/game";
import {
  GameWithRelations,
  gameWithRelationsSchema,
} from "@/app/services/schemas/withRelations";

export async function fetchGames(): Promise<GameWithRelations[]> {
  return fetch(`${getConfig().functionsUrl}/app-game-fetch`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch games");
      }
      return res.json();
    })
    .then((data) => {
      return z.array(gameWithRelationsSchema).parse(data.games);
    })
    .catch((e) => {
      console.error(`Error fetching games: ${e}`);
      throw e;
    });
}
