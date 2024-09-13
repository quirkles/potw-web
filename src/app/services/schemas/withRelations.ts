import z from "zod";

import { gameSchema } from "@/app/services/schemas/game";
import { gameWeekSchema } from "@/app/services/schemas/gameWeek";
import { userSchema } from "@/app/services/schemas/user";

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
