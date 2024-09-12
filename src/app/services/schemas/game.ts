import z from "zod";

import { withDates } from "@/app/services/schemas/shared";
import {
  validDateString,
  validDateTimeString,
} from "@/app/services/schemas/utils";

import { isTimeString } from "@/components/form/Timepicker";

import { isDateString } from "@/utils/date";

const recurrence = z.union([z.literal("every"), z.literal("everyOther")]);
export type Recurrence = z.infer<typeof recurrence>;

let dayOfWeek = z.union([
  z.literal("sunday"),
  z.literal("monday"),
  z.literal("tuesday"),
  z.literal("wednesday"),
  z.literal("thursday"),
  z.literal("friday"),
  z.literal("saturday"),
]);
export type DayOfWeek = z.infer<typeof dayOfWeek>;

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
    recurrence: recurrence,
    dayOfWeek: dayOfWeek,
  }),
]);

export type Period = z.infer<typeof periodSchema>;

export const allPeriodStrings = [
  "daily",
  "biWeekly",
  "weekly",
  "monthly",
  "every-sunday",
  "every-monday",
  "every-tuesday",
  "every-wednesday",
  "every-thursday",
  "every-friday",
  "every-saturday",
  "everyOther-sunday",
  "everyOther-monday",
  "everyOther-tuesday",
  "everyOther-wednesday",
  "everyOther-thursday",
  "everyOther-friday",
  "everyOther-saturday",
] as const;
export const periodStringSchema = z.union([
  z.enum(allPeriodStrings),
  z.string().regex(/^[0-9]+-(day|week|month)$/),
]);

export type PeriodString = z.infer<typeof periodStringSchema>;

export const createGamePayloadSchema = z.object({
  name: z.string(),
  description: z.string().or(z.null()),
  isPrivate: z.boolean(),
  adminId: z.string(),
  startDate: validDateTimeString(),
  endDate: validDateString().or(z.null()),
  addAdminAsPlayer: z.boolean(),
  period: periodStringSchema,
  regularScheduledStartTimeUtc: z.string().refine(isTimeString),
  players: z.array(
    z.object({
      email: z.string(),
      firestoreId: z.string().or(z.null()),
    }),
  ),
});
export type CreateGamePayload = z.infer<typeof createGamePayloadSchema>;

export const gameSchema = z
  .object({
    sqlId: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    startDate: z.string().refine(isDateString),
    endDate: z.string().refine(isDateString).nullable(),
    regularScheduledStartTimeUtc: z.string().refine(isTimeString),
    period: periodStringSchema,
    isPrivate: z.boolean(),
  })
  .extend(withDates);

export type Game = z.infer<typeof gameSchema>;
