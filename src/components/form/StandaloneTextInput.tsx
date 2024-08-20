import { styled } from "styled-components";

import { getColor } from "@/utils/color";

const StyledTextInput = styled.div`
  position: relative;
  width: 196px;

  input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    z-index: 10;
    color: white;
  }

  span {
    position: absolute;
    left: 0;
    padding: 20px 10px 10px;
    font-size: 1em;
    color: #8f8f8f;
    letter-spacing: 00.05em;
    transition: 0.5s;
    pointer-events: none;
  }

  input:valid ~ span,
  input:focus ~ span {
    color: ${getColor("blue")};
    transform: translateX(-10px) translateY(-34px);
    font-size: 0.75em;
  }

  i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: ${getColor("blue")};
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
  }

  input:valid ~ i,
  input:focus ~ i {
    height: 44px;
  }
`;

interface StandaloneTextInputProps {
  value: string;
  hint: string;
  onChange: (value: string) => void;
}

function StandaloneTextInput(props: StandaloneTextInputProps) {
  return (
    <StyledTextInput>
      <input
        required={true}
        type="text"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      />
      <span>{props.hint}</span>
      <i></i>
    </StyledTextInput>
  );
}

export default StandaloneTextInput;
