import { timestampToDateField } from "@potw/schemas";
import { default as z } from "zod";

export const gameJoinRequestSchema = z.object({
  status: z.enum(["accepted", "rejected", "pending"]),
  requesteeId: z.string(),
  createdAt: timestampToDateField,
  updatedAt: timestampToDateField,
});

export type GameJoinRequest = z.infer<typeof gameJoinRequestSchema>;
