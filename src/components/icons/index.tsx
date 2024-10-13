import { useState } from "react";
import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";
import { largeBorderRadius } from "@/app/styles/consts";

import { default as AlarmClock } from "./AlarmClock";
import { default as AlbumList } from "./AlbumList.svg";
import { default as ArrowDownCircle } from "./ArrowDownCircle.svg";
import { default as Calendar } from "./Calendar.svg";
import { default as Check } from "./Check.svg";
import { default as Clock } from "./Clock.svg";
import { default as Community } from "./Community.svg";
import { default as Google } from "./Google.svg";
import { default as Login } from "./Login.svg";
import { default as Logout } from "./Logout.svg";
import { default as MultiBubble } from "./MultiBubble.svg";
import { default as Music } from "./Music.svg";
import { default as Spotify } from "./Spotify.svg";
import { default as UserPlus } from "./UserPlus.svg";
import { default as UserX } from "./UserX.svg";

export const Icons = {
  AlarmClock,
  AlbumList,
  ArrowDownCircle,
  Calendar,
  Check,
  Clock,
  Community,
  Google,
  Login,
  Logout,
  MultiBubble,
  Music,
  Spotify,
  UserPlus,
  UserX,
} as const;

export type IconType = keyof typeof Icons;

export const IconTypes = Object.keys(Icons) as (keyof typeof Icons)[];

const sizes = {
  small: "24px",
  medium: "48px",
  large: "96px",
} as const;

interface IIconProps {
  iconType: keyof typeof Icons;
  size?: keyof typeof sizes;
  bgColor?: ColorName;
  color?: ColorName;
  stroke?: ColorName;
  fill?: ColorName | "transparent";
  hoverText?: string;
}

const StyledIcon = styled.div<{
  $size: keyof typeof sizes;
  $color?: ColorName;
  $stroke?: ColorName;
  $bgColor?: ColorName;
  $fill?: ColorName | "transparent" | "none";
}>`
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  background-color: ${({ $bgColor }) =>
    $bgColor ? getColor($bgColor) : undefined};
  padding: 0.25rem;
  border-radius: ${largeBorderRadius};
  color: ${({ $color }) => ($color ? getColor($color) : undefined)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
    color: ${({ $color }) =>
      $color ? getColor($color) : undefined} !important;
    stroke: ${({ $stroke }) =>
      $stroke ? getColor($stroke) : undefined} !important;
    * {
      fill: ${({ $fill = "none" }) =>
        $fill === "none"
          ? "none"
          : getColor($fill === "transparent" ? "white" : $fill)};
      fill-opacity: ${({ $fill }) => ($fill === "transparent" ? "0" : "1")};
    }
  }
  span {
    position: absolute;
    background-color: ${getColor("black")};
    color: ${getColor("white")};
    padding: 0.25rem;
    border-radius: ${largeBorderRadius};
    bottom: 100%;
    left: 5%;
    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid ${getColor("black")};
      top: 100%;
      left: 40%;
      transform: translateX(-50%);
    }
  }
`;

export default function Icon(props: IIconProps) {
  const {
    iconType,
    size = "medium",
    color = "black",
    stroke = "black",
    fill = "transparent",
    bgColor,
    hoverText,
  } = props;
  const IconComponent = Icons[iconType];
  const [isHovered, setIsHovered] = useState(false);
  return (
    <StyledIcon
      $size={size}
      $color={color}
      $stroke={stroke}
      $fill={fill}
      $bgColor={bgColor}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconComponent
        color={getColor(color)}
        stroke={getColor(stroke)}
        fill={fill}
      />
      {hoverText && isHovered && <span>{hoverText}</span>}
    </StyledIcon>
  );
}
