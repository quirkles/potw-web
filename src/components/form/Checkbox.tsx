import { styled } from "styled-components";

const StyledLabel = styled.label`
  :root {
    --switch_width: 2em;
    --switch_height: 1em;
    --thumb_color: #e8e8e8;
    --track_color: #e8e8e8;
    --track_active_color: #888;
    --outline_color: #000;
  }
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 2em;
  height: 1em;

  /* Hide default HTML checkbox */

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */

  span {
    box-sizing: border-box;
    border: 2px solid #000;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e8e8e8;
    transition: 0.15s;
    border-radius: 1em;
  }

  span:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 1em;
    width: 1em;
    border: 2px solid #000;
    border-radius: 100%;
    left: -2px;
    bottom: -2px;
    background-color: #e8e8e8;
    transform: translateY(-0.2em);
    box-shadow: 0 0.2em 0 #000;
    transition: 0.15s;
  }

  input:checked + span {
    background-color: #888;
  }

  input:focus-visible + span {
    box-shadow: 0 0 0 2px #888;
  }

  /* Raise thumb when hovered */

  input:hover + span:before {
    transform: translateY(-0.3em);
    box-shadow: 0 0.3em 0 #000;
  }

  input:checked + span:before {
    transform: translateX(calc(2em - 1em)) translateY(-0.2em);
  }

  /* Raise thumb when hovered & checked */

  input:hover:checked + span:before {
    transform: translateX(calc(2em - 1em)) translateY(-0.3em);
    box-shadow: 0 0.3em 0 #000;
  }
`;

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
function Checkbox(props: CheckboxProps) {
  return (
    <StyledLabel>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => {
          props.onChange(e.target.checked);
        }}
      />
      <span />
    </StyledLabel>
  );
}

export default Checkbox;
