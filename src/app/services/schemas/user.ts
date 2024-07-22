import z from "zod";
export const createUserResponseSchema = z.object({
  sqlId: z.string(),
  firestoreId: z.string(),
  email: z.string(),
  username: z.string().or(z.null()),
});

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

export const findUserByIdResponseSchema = z.object({
  sqlId: z.string(),
  firestoreId: z.string(),
  email: z.string(),
  username: z.string().or(z.null()),
});

export type FindUserByIdResponse = z.infer<typeof findUserByIdResponseSchema>;
