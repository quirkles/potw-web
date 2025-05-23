import { sqlGameSchema } from "@potw/schemas";
import { default as z } from "zod";

export const baseStoreGameSchema = sqlGameSchema.extend({
  admin: z.string(),
  players: z.array(z.string()),
  gameWeeks: z.array(z.string()).optional(),
});

const storeFetchedGameSchema = baseStoreGameSchema.extend({
  fetchStatus: z.literal("fetched"),
});

export type StoreFetchedGame = z.infer<typeof storeFetchedGameSchema>;

const storePendingGameSchema = baseStoreGameSchema.partial().extend({
  fetchStatus: z.literal("pending"),
});

export type StorePendingGame = z.infer<typeof storePendingGameSchema>;

const storeFailedGameSchema = baseStoreGameSchema.partial().extend({
  fetchStatus: z.literal("failed"),
  error: z.string(),
});

export type StoreFailedGame = z.infer<typeof storeFailedGameSchema>;

const storeNewGameSchema = baseStoreGameSchema
  .omit({
    sqlId: true,
    firestoreId: true,
    admin: true,
    players: true,
    createdAt: true,
    updatedAt: true,
    adminSqlId: true,
  })
  .extend({
    fetchStatus: z.enum(["unsaved", "pending", "failed"]),
    addAdminAsPlayer: z.boolean(),
    isOpenEnded: z.boolean(),
  });

export type StoreNewGame = z.infer<typeof storeNewGameSchema>;

const storeGameSchema = z.discriminatedUnion("fetchStatus", [
  storeFetchedGameSchema,
  storePendingGameSchema,
  storeFailedGameSchema,
]);

export type StoreGame = z.infer<typeof storeGameSchema>;
