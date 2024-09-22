import z from "zod";

import { withDates } from "@/app/services/schemas/shared";

export const potwCommentSchema = z
  .object({
    firestoreId: z.string(),
    title: z.string().nullable(),
    content: z.string(),
    taggedUserFirestoreIds: z.array(z.string()),
    replyCommentFirestoreIds: z.array(z.string()),
    parentCommentFirestoreId: z.string().nullable(),
    authorFirestoreId: z.string(),
    authorSqlId: z.string(),
  })
  .extend(withDates);

export type PotwComment = z.infer<typeof potwCommentSchema>;
