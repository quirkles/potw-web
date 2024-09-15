import { validDateTimeString } from "@/app/services/schemas/backend/utils";

export const withDates = {
  createdAt: validDateTimeString(),
  updatedAt: validDateTimeString(),
};
