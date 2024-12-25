import { sqlGameWithRelationsSchema } from "@potw/schemas";

import { getConfig } from "@/config";

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
      return sqlGameWithRelationsSchema.parse(data);
    })
    .catch((e) => {
      console.error(`Error fetching games: ${e}`);
      throw e;
    });
}
