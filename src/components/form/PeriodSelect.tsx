import {
  TPeriodString,
  transformPeriodStringToPeriod,
  transformPeriodToPeriodString,
} from "@potw/schemas";
import { RecordToEnum } from "@potw/type-utils";
import { ChangeEvent, PropsWithChildren } from "react";
import { styled } from "styled-components";

import ArrowDownCircle from "@/components/icons/ArrowDownCircle.svg";

import { getColorVariant, hexToRgbA } from "@/utils/color";

const BasicPeriod = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  biWeekly: "biWeekly",
} as const;

type BasicPeriod = RecordToEnum<typeof BasicPeriod>;

const CustomPeriodUnit = {
  day: "day",
  week: "week",
  month: "month",
} as const;

type CustomPeriodUnit = keyof typeof CustomPeriodUnit;

type CustomPeriod = {
  quantity: number;
  unit: CustomPeriodUnit;
};

const DayOfWeek = {
  sunday: "sunday",
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
} as const;

type DayOfWeek = RecordToEnum<typeof DayOfWeek>;

const Recurrence = {
  every: "every",
  everyOther: "everyOther",
} as const;

type Recurrence = RecordToEnum<typeof Recurrence>;

type CustomRecurring = {
  recurrence: Recurrence;
  dayOfWeek: DayOfWeek;
};
type GamePeriod = BasicPeriod | CustomPeriod | CustomRecurring;

interface PeriodSelectProps {
  selectedPeriod: TPeriodString;
  onChange?: (period: TPeriodString) => void;
}

interface PeriodOptionProps {
  period: GamePeriod;
  value: string;
  displayText: string;
}

const options: Omit<PeriodOptionProps, "selected">[] = [
  {
    period: {
      recurrence: Recurrence.every,
      dayOfWeek: DayOfWeek.monday,
    },
    value: "everyMonday",
    displayText: "Every Monday",
  },
  {
    period: {
      recurrence: Recurrence.every,
      dayOfWeek: DayOfWeek.friday,
    },
    value: "everySunday",
    displayText: "Every Friday",
  },
  {
    period: BasicPeriod.biWeekly,
    value: BasicPeriod.biWeekly,
    displayText: "Bi-Weekly",
  },
  {
    period: BasicPeriod.weekly,
    value: BasicPeriod.weekly,
    displayText: "Weekly",
  },
  {
    period: BasicPeriod.monthly,
    value: BasicPeriod.monthly,
    displayText: "Monthly",
  },
];

function isEqual(period1: GamePeriod, period2: GamePeriod): boolean {
  if (typeof period1 === "string" && typeof period2 === "string") {
    return period1 === period2;
  }
  if (typeof period1 === "object" && typeof period2 === "object") {
    return JSON.stringify(period1) === JSON.stringify(period2);
  }
  return false;
}

const Styled = styled.div`
  display: inline-block;

  > div {
    display: flex;
    position: relative;
    overflow: hidden;
    align-items: center;
    background-color: ${getColorVariant("black")};
    color: ${getColorVariant("white")};
    height: 2.8em;
    padding: 0.35em 0em 0.35em 1.2em;
    border-radius: 0.9em;
    border: none;

    select {
      cursor: pointer;
      outline: none;
      appearance: none;
      border: none;
    }

    &:hover .icon {
      svg {
        animation: pulse-animation 1s infinite;
      }
    }

    .icon {
      color: ${(props) => hexToRgbA(getColorVariant("white"), 0)};
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4em;
      width: 4em;
      border-radius: 0.7em;
      right: 0.3em;
      padding: 1em;

      svg {
        transition: all 0.5s;
        width: 1.1em;
        stroke: ${getColorVariant("white")};
      }
    }
  }
  @keyframes pulse-animation {
    0% {
      scale: 1;
    }
    80% {
      scale: 1.2;
    }
    100% {
      scale: 1;
    }
  }
`;

function PeriodSelect(props: PropsWithChildren<PeriodSelectProps>) {
  const { onChange = () => null, selectedPeriod } = props;

  const selectedOption = options.find((option) =>
    isEqual(option.period, transformPeriodStringToPeriod(selectedPeriod)),
  );

  function handlePeriodChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedPeriod = options.find(
      (option) => option.value === event.target.value,
    );
    if (!selectedPeriod) {
      throw new Error(
        `Could not find period with value: ${event.target.value}`,
      );
    }
    onChange(transformPeriodToPeriodString(selectedPeriod?.period));
  }

  return (
    <Styled>
      <div>
        <select
          id="period"
          name="period"
          onChange={handlePeriodChange}
          value={selectedOption?.value}
        >
          {options.map((options) => {
            const { value, period } = options;
            return <PeriodOption key={value} {...options} />;
          })}
        </select>
        <div className="icon">
          <ArrowDownCircle />
        </div>
      </div>
    </Styled>
  );
}

function PeriodOption(props: PeriodOptionProps) {
  const { value, displayText } = props;
  return <option value={value}>{displayText}</option>;
}

export default PeriodSelect;
