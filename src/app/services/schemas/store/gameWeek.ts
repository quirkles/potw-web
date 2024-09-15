import z from "zod";

import { gameWeekSchema } from "@/app/services/schemas/backend/gameWeek";

export const baseStoreGameWeekSchema = gameWeekSchema.extend({});

const storeFetchedGameWeekSchema = baseStoreGameWeekSchema.extend({
  gameId: z.string(),
  status: z.literal("fetched"),
});

export type StoreFetchedGameWeek = z.infer<typeof storeFetchedGameWeekSchema>;

const storePendingGameWeekSchema = baseStoreGameWeekSchema.partial().extend({
  status: z.literal("pending"),
});

export type StorePendingGameWeek = z.infer<typeof storePendingGameWeekSchema>;

const storeFailedGameWeekSchema = baseStoreGameWeekSchema.extend({
  status: z.literal("failed"),
});

export type StoreFailedGameWeek = z.infer<typeof storeFailedGameWeekSchema>;

export const storeGameWeekSchema = z.discriminatedUnion("status", [
  storeFetchedGameWeekSchema,
  storePendingGameWeekSchema,
  storeFailedGameWeekSchema,
]);

export type StoreGameWeek = z.infer<typeof storeGameWeekSchema>;

export function storeGameWeekIsFetched(
  gameWeek: StoreGameWeek,
): gameWeek is StoreFetchedGameWeek {
  return gameWeek.status === "fetched";
}
