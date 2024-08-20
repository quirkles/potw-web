import z from "zod";

import { getConfig } from "@/config";

import { Game, gameSchema } from "@/app/services/schemas/game";

export async function fetchGamesForUser(userId: string): Promise<Game[]> {
  return fetch(`${getConfig().functionsUrl}/app-game-fetch?userId=${userId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch games");
      }
      return res.json();
    })
    .then((data) => {
      return z.array(gameSchema).parse(data.games);
    })
    .catch((e) => {
      console.error(`Error fetching games: ${e}`);
      throw e;
    });
}
