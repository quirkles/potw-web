import z from "zod";

import { userSchema } from "@/app/services/schemas/user";

export const baseStoreUserSchema = userSchema.extend({
  gamesAsAdmin: z.array(z.string()),
  gamesAsParticipant: z.array(z.string()),
  picks: z.array(z.string()),
});

const storeFetchedUserSchema = baseStoreUserSchema.extend({
  status: z.literal("fetched"),
});

export type StoreFetchedUser = z.infer<typeof storeFetchedUserSchema>;

const storePendingUserSchema = baseStoreUserSchema.partial().extend({
  status: z.literal("pending"),
});

export type StorePendingUser = z.infer<typeof storePendingUserSchema>;

const storeFailedUserSchema = baseStoreUserSchema.partial().extend({
  status: z.literal("failed"),
  error: z.string(),
});

export type StoreFailedUser = z.infer<typeof storeFailedUserSchema>;

const storeNewUserSchema = baseStoreUserSchema
  .omit({
    sqlId: true,
    games: true,
  })
  .extend({
    status: z.enum(["unsaved", "pending", "failed"]),
  });

export type StoreNewUser = z.infer<typeof storeNewUserSchema>;

const storeUserSchema = z.discriminatedUnion("status", [
  storeFetchedUserSchema,
  storePendingUserSchema,
  storeFailedUserSchema,
]);

export type StoreUser = z.infer<typeof storeUserSchema>;
