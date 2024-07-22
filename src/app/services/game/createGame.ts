import {
  CreateGamePayload,
  CreateGameResponse,
  createGameResponseSchema,
  FetchedGame,
  fetchGamesResponseSchema,
} from "@/app/services/schemas/game";
import { getConfig } from "@/config";

export async function createGameRequest(
  input: CreateGamePayload,
): Promise<CreateGameResponse> {
  return fetch(`${getConfig().functionsUrl}/app-game-create`, {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create game");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Validating data", data);
      return createGameResponseSchema.parse(data);
    })
    .catch((e) => {
      console.error(`Error creating game: ${e}`);
      throw e;
    });
}

export async function fetchGamesForUser(
  userId: string,
): Promise<FetchedGame[]> {
  return fetch(`${getConfig().functionsUrl}/app-game-fetch?userId=${userId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch games");
      }
      return res.json();
    })
    .then((data) => {
      return fetchGamesResponseSchema.parse(data).games;
    })
    .catch((e) => {
      console.error(`Error fetching games: ${e}`);
      throw e;
    });
}
