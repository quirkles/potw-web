import {
  CreateGamePayload,
  Game,
  gameSchema,
} from "@/app/services/schemas/game";
import { getConfig } from "@/config";

export async function createGameRequest(
  input: CreateGamePayload,
): Promise<Game> {
  return fetch(`${getConfig().functionsUrl}/app-game-create`, {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to create game: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Validating data", data);
      return gameSchema.parse(data);
    })
    .catch((e) => {
      console.error(`Error creating game: ${e}`);
      throw e;
    });
}
