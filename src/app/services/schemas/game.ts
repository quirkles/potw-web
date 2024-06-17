import z from "zod";
import {createUserResponseSchema} from "@/app/services/schemas/user";

const periodSchema = z.union([
    z.literal('daily'),
    z.literal('biWeekly'),
    z.literal('weekly'),
    z.literal('monthly'),
    z.object({
        quantity: z.number(),
        unit: z.union([z.literal('day'), z.literal('week'), z.literal('month')]),
    }),
    z.object({
        recurrence: z.union([z.literal('every'), z.literal('everyOther')]),
        dayOfWeek: z.union([
            z.literal('sunday'),
            z.literal('monday'),
            z.literal('tuesday'),
            z.literal('wednesday'),
            z.literal('thursday'),
            z.literal('friday'),
            z.literal('saturday'),
        ]),
    }),
]);

export const createGamePayloadSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    isPrivate: z.boolean(),
    adminId: z.string(),
    startDate: z.string(),
    addAdminAsPlayer: z.boolean(),
    period: periodSchema,
})
export type CreateGamePayload = z.infer<typeof createGamePayloadSchema>;

export const createGameResponseSchema = createGamePayloadSchema
    .omit({adminId: true}).merge(z.object({
        id: z.string(),
        admin: createUserResponseSchema,
    }));

export type GameEntity = z.infer<typeof createGameResponseSchema>;
