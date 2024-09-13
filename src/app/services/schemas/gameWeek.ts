import { z } from "zod";

export const gameWeekSchema = z.object({
  sqlId: z.string(),
  startDateTime: z.string(),
  theme: z.string().nullable(),
  meetingLink: z.string().nullable(),
});

export type GameWeek = z.infer<typeof gameWeekSchema>;
