import {
    CreateGamePayload,
    createGamePayloadSchema,
    CreateGameResponse, createGameResponseSchema
} from "@/app/services/schemas/game";
import {getConfig} from "@/config";

export async function createGameRequest(input: CreateGamePayload):Promise<CreateGameResponse>{
    return fetch(`${getConfig().functionsUrl}/app-game-create`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create game");
        }
        return res.json();
    }).then((data) =>  createGameResponseSchema.parse(data))
}