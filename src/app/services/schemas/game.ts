import z from "zod";

import { withDates } from "@/app/services/schemas/shared";
import { userSchema } from "@/app/services/schemas/user";
import {
  validDateString,
  validDateTimeString,
} from "@/app/services/schemas/utils";

const periodSchema = z.union([
  z.literal("daily"),
  z.literal("biWeekly"),
  z.literal("weekly"),
  z.literal("monthly"),
  z.object({
    quantity: z.number(),
    unit: z.union([z.literal("day"), z.literal("week"), z.literal("month")]),
  }),
  z.object({
    recurrence: z.union([z.literal("every"), z.literal("everyOther")]),
    dayOfWeek: z.union([
      z.literal("sunday"),
      z.literal("monday"),
      z.literal("tuesday"),
      z.literal("wednesday"),
      z.literal("thursday"),
      z.literal("friday"),
      z.literal("saturday"),
    ]),
  }),
]);

export const createGamePayloadSchema = z.object({
  name: z.string(),
  description: z.string().or(z.null()),
  isPrivate: z.boolean(),
  adminId: z.string(),
  startDate: validDateTimeString(),
  endDate: validDateString().or(z.null()),
  addAdminAsPlayer: z.boolean(),
  period: periodSchema,
  players: z.array(
    z.object({
      email: z.string(),
      firestoreId: z.string().or(z.null()),
    }),
  ),
});
export type CreateGamePayload = z.infer<typeof createGamePayloadSchema>;

export const gameSchema = createGamePayloadSchema
  .omit({
    adminId: true,
    addAdminAsPlayer: true,
  })
  .extend({
    id: z.string(),
    players: z.array(userSchema),
    admin: userSchema,
    ...withDates,
  });

export type Game = z.infer<typeof gameSchema>;
