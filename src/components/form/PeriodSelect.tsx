import styled from "styled-components";
import {ChangeEvent, PropsWithChildren} from "react";
import {
    BasicPeriod,
    DayOfWeek,
    GamePeriod,
    Recurrence
} from "@/app/store/reducers/gamesReducer";
import ArrowDownCircle from "@/components/icons/ArrowDownCircle.svg";
import {COLORS} from "@/app/styles/colors";

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

const Styled = styled.div`
    display: inline-block;
    position: relative;
    select {
        cursor: pointer;
        outline: none;
        appearance: none;
        padding: 0.5em 2.5em 0.5em 1em;
        border-radius: 0.9rem;
        //border: 1px solid ${COLORS.black};
        background-color: ${COLORS.white};
        color: ${COLORS.black};
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        }
    }
    svg {
        position: absolute;
        right: 0.5em;
        top: 50%;
        transform: translateY(-50%);
    }
`;

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
        <Styled>
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
            <ArrowDownCircle/>
        </Styled>
    );
}


function PeriodOption(props: PeriodOptionProps) {
    const {period, value, displayText} = props;
    return (
        <option value={value}>{displayText}</option>
    );
}