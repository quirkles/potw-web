import { func } from "prop-types";
import z from "zod";

const timeStringRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const timeStringSchema = z.string().regex(timeStringRegex);

type TimeString = z.infer<typeof timeStringSchema>;

export function isTimeString(time: string | TimeString): time is TimeString {
  return timeStringSchema.safeParse(time).success;
}
interface TimepickerProps {
  value: TimeString;
  onChange: (time: TimeString) => void;
}
export default function Timepicker(props: TimepickerProps) {
  return (
    <input
      type="time"
      value={props.value}
      onChange={(e) => {
        const time = e.target.value;
        if (timeStringSchema.safeParse(time).success) {
          props.onChange(time);
        }
      }}
    />
  );
}
