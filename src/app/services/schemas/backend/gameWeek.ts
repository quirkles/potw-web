import { z } from "zod";

import { withIds } from "@/app/services/schemas/shared";

export const gameWeekSchema = z
  .object({
    startDateTime: z.string(),
    theme: z.string().nullable(),
    meetingLink: z.string().nullable(),
    status: z.enum(["complete", "overdue", "pending", "current"]),
  })
  .extend(withIds);

export type GameWeek = z.infer<typeof gameWeekSchema>;
