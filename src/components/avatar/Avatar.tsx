import Image from "next/image";
import { useRef, MouseEvent } from "react";
import { styled } from "styled-components";

import { BoringAvatar } from "@/components/avatar/BoringAvatar/Avatar";

const sizes = {
  small: 48,
  large: 64,
  xLarge: 96,
} as const;

const Styled = styled.div<{
  $size: keyof typeof sizes;
}>`
  display: inline-block;
  cursor: pointer;
  input {
    display: none;
  }
  img {
    width: ${(props) => sizes[props.$size]}px;
    height: ${(props) => sizes[props.$size]}px;
    border-radius: 50%;
  }
`;

type IAvatarProps = {
  size?: keyof typeof sizes;
  canEdit?: boolean;
  userId?: string;
  onClick?: (e?: MouseEvent) => void;
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
  const { size = "small", onClick } = props;
  let sizePx = sizes[size];
  const inputRef = useRef<HTMLInputElement>(null);
  const openFileSelect = () => {
    if (props.canEdit) {
      inputRef.current?.click();
    }
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.files && e.target.files.length > 0)) {
      console.log("No file selected");
      return;
    }
    const file = e.target.files![0];
    console.log("File selected", file);
  };
  return (
    <Styled $size={size} onClick={openFileSelect}>
      <div onClick={onClick}>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleUpload}
        />
        {"url" in props ? (
          <Image src={props.url} width={sizePx} height={sizePx} alt="User" />
        ) : (
          <BoringAvatar
            name={props.value}
            size={sizePx}
            variant="beam"
            square={false}
          />
        )}
      </div>
    </Styled>
  );
}
