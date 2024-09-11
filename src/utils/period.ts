import { Period, PeriodString } from "@/app/services/schemas/game";

export const periodStringToPeriod = (periodString: PeriodString): Period => {
  if (
    periodString === "daily" ||
    periodString === "biWeekly" ||
    periodString === "weekly" ||
    periodString === "monthly"
  ) {
    return periodString as "daily" | "biWeekly" | "weekly" | "monthly";
  } else if (periodString.startsWith("every")) {
    const [recurrence, dayOfWeek] = periodString.split("-");
    return {
      recurrence: recurrence as "every" | "everyOther",
      dayOfWeek: dayOfWeek as
        | "sunday"
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday",
    };
  } else {
    const [quantity, unit] = periodString.split("-");
    return {
      quantity: Number(quantity),
      unit: unit as "day" | "week" | "month",
    };
  }
};

export const periodToPeriodString = (period: Period): PeriodString => {
  if (typeof period === "string") {
    return period;
  } else if ("recurrence" in period) {
    return `${period.recurrence}-${period.dayOfWeek}`;
  } else if ("quantity" in period) {
    return `${period.quantity}-${period.unit}`;
  }
  throw new Error("Invalid period");
};

export function getPeriodDisplayTextFromPeriodString(
  periodString: PeriodString,
): string {
  return getPeriodDisplayText(periodStringToPeriod(periodString));
}

export function getPeriodDisplayText(period: Period): string {
  if (typeof period === "string") {
    switch (period) {
      case "daily":
        return "Daily";
      case "weekly":
        return "Weekly";
      case "monthly":
        return "Monthly";
      case "biWeekly":
        return "Bi-weekly";
    }
  }
  if ("quantity" in period) {
    switch (period.unit) {
      case "day":
        return `Every ${period.quantity} days`;
      case "week":
        return `Every ${period.quantity} weeks`;
      case "month":
        return `Every ${period.quantity} months`;
    }
  }
  switch (period.recurrence) {
    case "every":
      return `Every ${period.dayOfWeek}`;
    case "everyOther":
      return `Every other ${period.dayOfWeek}`;
  }
}
