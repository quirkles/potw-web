import z from "zod";

import { gameSchema } from "@/app/services/schemas/backend/game";
import { gameWeekSchema } from "@/app/services/schemas/backend/gameWeek";
import { pickSchema } from "@/app/services/schemas/backend/pick";
import { userSchema } from "@/app/services/schemas/backend/user";

export const userWithRelationsSchema = userSchema.extend({
  gamesAsAdmin: z.array(gameSchema).optional(),
  gamesAsParticipant: z.array(gameSchema).optional(),
  picks: z
    .array(
      z.object({
        sqlId: z.string(),
      }),
    )
    .optional(),
});

export type UserWithRelations = z.infer<typeof userWithRelationsSchema>;

export const gameWithRelationsSchema = gameSchema.extend({
  admin: userSchema.optional(),
  players: z.array(userSchema).optional(),
  gameWeeks: z.array(gameWeekSchema).optional(),
});

export type GameWithRelations = z.infer<typeof gameWithRelationsSchema>;

export const gameWeekWithRelations = gameWeekSchema.extend({
  game: gameSchema.optional(),
  picks: z.array(pickSchema).optional(),
});
