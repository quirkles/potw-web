import z from "zod";
export const userSchema = z.object({
  sqlId: z.string(),
  firestoreId: z.string(),
  email: z.string(),
  username: z.string().or(z.null()),
});

export type User = z.infer<typeof userSchema>;
