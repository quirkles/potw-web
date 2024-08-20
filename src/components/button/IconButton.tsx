import { ComponentType } from "react";
import { styled } from "styled-components";

import { getColor } from "@/utils/color";

const StyledIconButton = styled.button`
  font-family: inherit;
  font-size: 20px;
  background: ${getColor("blue")};
  color: white;
  padding: 0.5em 0.8em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;

  span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  svg {
    color: #fff;
    stroke: white;
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  &:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }
`;

interface IconButtonProps {
  Icon: ComponentType;
  onClick: () => void;
}
function IconButton(props: IconButtonProps) {
  return (
    <StyledIconButton onClick={props.onClick}>
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <props.Icon />
        </div>
      </div>
    </StyledIconButton>
  );
}

export default IconButton;
