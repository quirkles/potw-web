import { TTimeString } from "@potw/type-utils";
import { styled } from "styled-components";

import { getColor } from "@/app/styles/colors";

interface TimepickerProps {
  value: TTimeString;
  onChange?: (time: TTimeString) => void;
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
