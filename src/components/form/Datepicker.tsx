import {useRef, useState} from "react";
import styled from "styled-components";
import {DateString} from "@/utils/date";

const StyledDatepicker = styled.div`
    border-bottom: 1px dashed blue;
    cursor: pointer;
    display: inline-block;
    input {
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin: 0;
        padding-inline: 0;
        border: none;
        outline: none;
        background-color: transparent;
        &::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
    }
`

interface DatepickerProps {
     initialDate: DateString;
     onChange?: (date: DateString) => void;
}

export default function Datepicker(props: DatepickerProps) {
    const {
        onChange = () => {},
    } = props;
    const [date, setDate] = useState<string>(props.initialDate);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <StyledDatepicker>
            <input
                ref={inputRef}
                type="date"
                value={date}
                onChange={
                    (e) => {
                        setDate(e.target.value);
                        onChange(e.target.value as DateString);
                    }
                }
            />
        </StyledDatepicker>
    )
}