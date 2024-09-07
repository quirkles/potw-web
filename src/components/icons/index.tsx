import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";
import { largeBorderRadius } from "@/app/styles/consts";

import { default as Calendar } from "./Calendar.svg";
import { default as Community } from "./Community.svg";
import { default as GoogleSvg } from "./Google.svg";
import { default as LoginSvg } from "./Login.svg";
import { default as LogoutSvg } from "./Logout.svg";
import { default as MusicSvg } from "./Music.svg";
import { default as SpotifySvg } from "./Spotify.svg";
import { default as UserPlus } from "./UserPlus.svg";
import { default as UserX } from "./UserX.svg";

export const Icons = {
  GoogleSvg,
  LoginSvg,
  LogoutSvg,
  MusicSvg,
  SpotifySvg,
  Community,
  UserPlus,
  UserX,
  Calendar,
} as const;

export const iconTypes = Object.keys(Icons) as (keyof typeof Icons)[];

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
}

const StyledIcon = styled.div<{
  $size: keyof typeof sizes;
  $color?: ColorName;
  $bgColor?: ColorName;
}>`
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  color: ${({ $color }) => ($color ? getColor($color) : undefined)};
  background-color: ${({ $bgColor }) =>
    $bgColor ? getColor($bgColor) : undefined};
  padding: 0.25rem;
  border-radius: ${largeBorderRadius};
  color: ${({ $color }) => ($color ? getColor($color) : undefined)};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: 100%;
    stroke: ${({ $color }) => ($color ? getColor($color) : undefined)};
    * {
      fill: ${({ $color }) =>
        $color ? getColor($color) : undefined} !important;
    }
  }
`;

export default function Icon(props: IIconProps) {
  const { iconType, size = "medium", color, bgColor } = props;
  const IconComponent = Icons[iconType];
  return (
    <StyledIcon $size={size} $color={color} $bgColor={bgColor}>
      <IconComponent />
    </StyledIcon>
  );
}
