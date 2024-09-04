import z from "zod";

import { withDates } from "@/app/services/schemas/shared";
export const userSchema = z
  .object({
    sqlId: z.string(),
    firestoreId: z.string(),
    email: z.string(),
    username: z.string().or(z.null()),
  })
  .extend(withDates);

export type User = z.infer<typeof userSchema>;
