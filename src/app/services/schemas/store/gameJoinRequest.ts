import z from "zod";

import { timestampToDate } from "@/app/services/schemas/shared";

export const gameJoinRequestSchema = z.object({
  status: z.enum(["accepted", "rejected", "pending"]),
  requesteeId: z.string(),
  createdAt: timestampToDate,
  updatedAt: timestampToDate,
});

export type GameJoinRequest = z.infer<typeof gameJoinRequestSchema>;
