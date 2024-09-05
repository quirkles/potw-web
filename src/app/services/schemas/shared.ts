import { validDateTimeString } from "@/app/services/schemas/utils";

export const withDates = {
  createdAt: validDateTimeString(),
  updatedAt: validDateTimeString(),
};
