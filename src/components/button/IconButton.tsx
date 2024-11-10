import { ComponentType } from "react";
import { styled } from "styled-components";

import { ColorName, Colors, getColor } from "@/app/styles/colors";

import { getColorVariant } from "@/utils/color";

const StyledIconButton = styled.button<{
  $size?: "small" | "medium" | "large";
  $color?: ColorName;
}>`
  font-family: inherit;
  font-size: ${({ $size = "medium" }) =>
    $size === "small" ? "0.8em" : $size === "medium" ? "1em" : "1.2em"};
  background: ${({ $color = "blue" }) => getColor($color)};
  color: white;
  padding: ${({ $size = "medium" }) =>
    $size === "small" ? "0.5em" : $size === "medium" ? "0.8em" : "1em"};
  display: flex;
  align-items: center;
  border: none;
  border-radius: ${({ $size = "medium" }) =>
    $size === "small" ? "0.5em" : $size === "medium" ? "0.8em" : "1em"};
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
  Icon: ComponentType<{
    size?: "small" | "medium" | "large";
    color?: string;
    stroke?: string;
    fill?: string;
  }>;
  onClick: () => void;
  $size?: "small" | "medium" | "large";
  $color?: ColorName;
}
function IconButton(props: IconButtonProps) {
  return (
    <StyledIconButton
      onClick={props.onClick}
      $size={props.$size}
      $color={props.$color}
    >
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <props.Icon size={props.$size} />
        </div>
      </div>
    </StyledIconButton>
  );
}

export default IconButton;
