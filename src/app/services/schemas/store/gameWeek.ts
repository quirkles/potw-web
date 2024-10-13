import z from "zod";

import { gameWeekSchema } from "@/app/services/schemas/backend/gameWeek";

export const baseStoreGameWeekSchema = gameWeekSchema.extend({});

export const storeFetchedGameWeekSchema = baseStoreGameWeekSchema.extend({
  gameId: z.string(),
  fetchStatus: z.literal("fetched"),
});

export type StoreFetchedGameWeek = z.infer<typeof storeFetchedGameWeekSchema>;

const storePendingGameWeekSchema = baseStoreGameWeekSchema.partial().extend({
  fetchStatus: z.literal("pending"),
});

export type StorePendingGameWeek = z.infer<typeof storePendingGameWeekSchema>;

const storeFailedGameWeekSchema = baseStoreGameWeekSchema.extend({
  fetchStatus: z.literal("failed"),
});

export type StoreFailedGameWeek = z.infer<typeof storeFailedGameWeekSchema>;

export const storeGameWeekSchema = z.discriminatedUnion("fetchStatus", [
  storeFetchedGameWeekSchema,
  storePendingGameWeekSchema,
  storeFailedGameWeekSchema,
]);

export type StoreGameWeek = z.infer<typeof storeGameWeekSchema>;

export function storeGameWeekIsFetched(
  gameWeek: StoreGameWeek,
): gameWeek is StoreFetchedGameWeek {
  return gameWeek.fetchStatus === "fetched";
}
