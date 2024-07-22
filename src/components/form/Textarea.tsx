import styled from "styled-components";
import { ChangeEventHandler } from "react";
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
    color: ${getColor("green")};
  }
`;

interface TextareaProps {
  value: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  cols?: number;
}

export default function TextArea(props: TextareaProps) {
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
