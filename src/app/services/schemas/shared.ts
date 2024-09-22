import z from "zod";

import { validDateTimeString } from "@/app/services/schemas/backend/utils";

export const withDates = {
  createdAt: validDateTimeString(),
  updatedAt: validDateTimeString(),
};

export const withIds = {
  sqlId: z.string(),
  firestoreId: z.string(),
};
