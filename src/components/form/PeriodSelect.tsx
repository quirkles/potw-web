import {ChangeEvent, PropsWithChildren} from "react";
import {
    BasicPeriod,
    DayOfWeek,
    GamePeriod,
    Recurrence
} from "@/app/store/reducers/gamesReducer";

interface PeriodSelectProps {
    onChange?: (period: GamePeriod) => void;
}

interface PeriodOptionProps {
    period: GamePeriod;
    value: string;
    displayText: string;
}

const options: PeriodOptionProps[] = [
    {
        period: {
            recurrence: Recurrence.every,
            dayOfWeek: DayOfWeek.monday
        },
        value: "everyMonday",
        displayText: "Every Monday"
    },
    {
        period: {
            recurrence: Recurrence.every,
            dayOfWeek: DayOfWeek.friday
        },
        value: "everySunday",
        displayText: "Every Friday"
    },
    {
        period: BasicPeriod.biWeekly,
        value: BasicPeriod.biWeekly,
        displayText: "Bi-Weekly"
    },
    {
        period: BasicPeriod.monthly,
        value: BasicPeriod.monthly,
        displayText: "Monthly"
    },
];

export default function PeriodSelect(props: PropsWithChildren<PeriodSelectProps>) {
    const { onChange = () => null } = props;
    function handlePeriodChange(event: ChangeEvent<HTMLSelectElement>) {
        const selectedPeriod = options.find((option) => option.value === event.target.value);
        if (!selectedPeriod) {
            throw new Error(`Could not find period with value: ${event.target.value}`);
        }
        onChange(selectedPeriod?.period);
    }
    return (
        <div>
            <label htmlFor="period">Period:</label>
            <select id="period" name="period" onChange={handlePeriodChange}>
                {
                    options.map((options) => {
                        const {value, displayText} = options;
                        return (
                            <PeriodOption key={value} {...options}/>
                        );
                    })
                }
            </select>
        </div>
    );
}


function PeriodOption(props: PeriodOptionProps) {
    const {period, value, displayText} = props;
    return (
        <option value={value}>{displayText}</option>
    );
}