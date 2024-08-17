import z from "zod";
import { createUserResponseSchema } from "@/app/services/schemas/user";

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
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .or(z.null()),
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

export const createGameResponseSchema = createGamePayloadSchema
  .omit({ adminId: true, addAdminAsPlayer: true })
  .merge(
    z.object({
      id: z.string(),
      admin: createUserResponseSchema,
    }),
  );

export type CreateGameResponse = z.infer<typeof createGameResponseSchema>;

const fetchedGameSchema = createGameResponseSchema.omit({ admin: true }).merge(
  z.object({
    id: z.string(),
    players: z.array(z.string()),
    admin: createUserResponseSchema,
  }),
);

export type FetchedGame = z.infer<typeof fetchedGameSchema>;

export const fetchGamesResponseSchema = z.object({
  games: fetchedGameSchema.array(),
});
