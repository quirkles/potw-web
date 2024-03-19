import z from "zod";
export const createUserResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
})

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

