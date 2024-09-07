import z from "zod";

import { gameSchema } from "@/app/services/schemas/game";
import { userSchema } from "@/app/services/schemas/user";

const userWithRelationsSchema = userSchema.extend({
  gamesAsAdmin: z.array(gameSchema).optional(),
  gamesAsParticipant: z.array(gameSchema).optional(),
  picks: z.array(z.object({})).optional(),
});

export type UserWithRelations = z.infer<typeof userWithRelationsSchema>;

export const gameWithRelationsSchema = gameSchema.extend({
  admin: userSchema.optional(),
  players: z.array(userSchema).optional(),
});

export type GameWithRelations = z.infer<typeof gameWithRelationsSchema>;