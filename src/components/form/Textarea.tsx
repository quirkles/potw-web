import { ChangeEventHandler, FocusEventHandler } from "react";
import { styled } from "styled-components";

import { getColorVariant } from "@/utils/color";

const StyledTextArea = styled.textarea`
  outline: none;
  background-image: linear-gradient(
    to right top,
    ${getColorVariant("yellow")},
    ${getColorVariant("white")}
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  padding: 0.5em;
  color: ${getColorVariant("black")};
  &::placeholder {
    color: ${getColorVariant("blue")};
  }
`;

interface TextareaProps {
  value: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  rows?: number;
  cols?: number;
}

function TextArea(props: TextareaProps) {
  return (
    <StyledTextArea
      rows={props.rows || 5}
      cols={props.cols || 50}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder || ""}
    />
  );
}

export default TextArea;
