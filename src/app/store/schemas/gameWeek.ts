import { sqlGameWeekSchema } from "@potw/schemas";
import z from "zod";

export const baseStoreGameWeekSchema = sqlGameWeekSchema.extend({});

export const storeFetchedGameWeekSchema = baseStoreGameWeekSchema.extend({
  gameId: z.string(),
  fetchStatus: z.literal("fetched"),
  theme: z.string().nullable().optional().default(null),
  // poll that allows users to vote on the theme
  themePoll: z
    .record(
      // the theme
      z.string(),
      z.object({
        // array of user id voted for the theme
        votes: z.array(z.string()),
      }),
    )
    .nullable()
    .optional()
    .default(null),
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
