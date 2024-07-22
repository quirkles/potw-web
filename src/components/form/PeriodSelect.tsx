import styled from "styled-components";
import { ChangeEvent, PropsWithChildren } from "react";
import {
  BasicPeriod,
  DayOfWeek,
  GamePeriod,
  Recurrence,
} from "@/app/store/reducers/gamesReducer";
import ArrowDownCircle from "@/components/icons/ArrowDownCircle.svg";
import { getColor, hexToRgbA } from "@/utils/color";

interface PeriodSelectProps {
  selectedPeriod: GamePeriod;
  onChange?: (period: GamePeriod) => void;
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
    background-color: ${getColor("black")};
    color: ${getColor("white")};
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
      color: ${(props) => hexToRgbA(getColor("white"), 0)};
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
        stroke: ${getColor("white")};
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

export default function PeriodSelect(
  props: PropsWithChildren<PeriodSelectProps>,
) {
  const { onChange = () => null, selectedPeriod } = props;

  const selectedOption = options.find((option) =>
    isEqual(option.period, selectedPeriod),
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
    onChange(selectedPeriod?.period);
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
