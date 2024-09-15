import z from "zod";

import { withDates } from "@/app/services/schemas/shared";
export const userSchema = z
  .object({
    sqlId: z.string(),
    firestoreId: z.string(),
    email: z.string(),
    username: z.string().or(z.null()),
    aboutMe: z.string().or(z.null()),
    avatarUrl: z.string().or(z.null()),
  })
  .extend(withDates);

export type User = z.infer<typeof userSchema>;

export const userUpdateSchema = userSchema
  .pick({
    sqlId: true,
    username: true,
    aboutMe: true,
    avatarUrl: true,
  })
  .partial();

export type UserUpdate = z.infer<typeof userUpdateSchema>;
