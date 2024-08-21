import Avvvatars from "avvvatars-react";
import Image from "next/image";
import { styled } from "styled-components";

import { getColorVariant } from "@/utils/color";

const sizes = {
  small: 32,
  large: 48,
  xLarge: 64,
} as const;

const Styled = styled.div<{
  $size: keyof typeof sizes;
}>`
  display: inline-block;
  border-radius: 50%;
  border: 2px solid ${getColorVariant("black", "base")};
  img {
    width: ${(props) => sizes[props.$size]}px;
    height: ${(props) => sizes[props.$size]}px;
    border-radius: 50%;
  }
`;

type IAvatarProps = {
  size?: keyof typeof sizes;
} & (
  | {
      url: string;
    }
  | {
      initials?: string;
      value: string;
    }
);

export function Avatar(props: IAvatarProps) {
  const { size = "small" } = props;
  let sizePx = sizes[size];
  return (
    <Styled $size={size}>
      {"url" in props ? (
        <Image src={props.url} width={sizePx} height={sizePx} alt="User" />
      ) : (
        <Avvvatars value={props.value} size={sizePx} />
      )}
    </Styled>
  );
}
