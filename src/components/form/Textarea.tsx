import { ChangeEventHandler } from "react";
import { styled } from "styled-components";

import { getColor } from "@/utils/color";

const StyledTextArea = styled.textarea`
  outline: none;
  background-image: linear-gradient(
    to right top,
    ${getColor("yellow")},
    ${getColor("white")}
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  padding: 0.5em;
  color: ${getColor("black")};
  &::placeholder {
    color: ${getColor("blue")};
  }
`;

interface TextareaProps {
  value: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
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
      placeholder={props.placeholder || ""}
    />
  );
}

export default TextArea;
