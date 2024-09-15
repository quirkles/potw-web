import z from "zod";

import { gameSchema } from "@/app/services/schemas/backend/game";

export const baseStoreGameSchema = gameSchema.extend({
  admin: z.string(),
  players: z.array(z.string()),
  gameWeeks: z.array(z.string()),
});

const storeFetchedGameSchema = baseStoreGameSchema.extend({
  status: z.literal("fetched"),
});

export type StoreFetchedGame = z.infer<typeof storeFetchedGameSchema>;

const storePendingGameSchema = baseStoreGameSchema.partial().extend({
  status: z.literal("pending"),
});

export type StorePendingGame = z.infer<typeof storePendingGameSchema>;

const storeFailedGameSchema = baseStoreGameSchema.partial().extend({
  status: z.literal("failed"),
  error: z.string(),
});

export type StoreFailedGame = z.infer<typeof storeFailedGameSchema>;

const storeNewGameSchema = baseStoreGameSchema
  .omit({
    sqlId: true,
    admin: true,
    players: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    status: z.enum(["unsaved", "pending", "failed"]),
    addAdminAsPlayer: z.boolean(),
    isOpenEnded: z.boolean(),
  });

export type StoreNewGame = z.infer<typeof storeNewGameSchema>;

const storeGameSchema = z.discriminatedUnion("status", [
  storeFetchedGameSchema,
  storePendingGameSchema,
  storeFailedGameSchema,
]);

export type StoreGame = z.infer<typeof storeGameSchema>;
