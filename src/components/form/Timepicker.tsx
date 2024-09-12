import { styled } from "styled-components";
import z from "zod";

import { getColor } from "@/app/styles/colors";

export const timeStringRegex = /^([01][0-9]|2[0123]):[0-5][0-9]:00$/;

const timeStringSchema = z.string().regex(timeStringRegex);

type TimeString = z.infer<typeof timeStringSchema>;

export function isTimeString(time: string | TimeString): time is TimeString {
  return timeStringSchema.safeParse(time).success;
}
interface TimepickerProps {
  value: TimeString;
  onChange?: (time: TimeString) => void;
}

const StyledInput = styled.input`
  border: 1px solid ${getColor("black")};
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
  margin-right: 0.25rem;
`;

export default function Timepicker(props: TimepickerProps) {
  const {
    value,
    onChange = () => {
      /* noop */
    },
  } = props;
  return (
    <StyledInput
      type="time"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
