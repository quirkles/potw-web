import z from "zod";
import {createUserResponseSchema} from "@/app/services/schemas/user";

export const createGamePayloadSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    isPrivate: z.boolean(),
    adminId: z.string(),
})
export type CreateGamePayload = z.infer<typeof createGamePayloadSchema>;

export const createGameResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    isPrivate: z.boolean(),
    admin: createUserResponseSchema,
})

export type CreateGameResponse = z.infer<typeof createGameResponseSchema>;
