import React from "react";
import { default as styled } from "styled-components";

import { ColorName } from "@/app/styles/colors";

interface BadgeProps {
  text: string | number;
  onClick?: () => void;

  $color: ColorName;
  $size?: "small" | "medium" | "large";
  $fullWidth?: boolean;
  $cursor?: "pointer" | "default";
}

const StyledBadge = styled.span<Omit<BadgeProps, "text" | "onClick">>`
  cursor: ${(props) => (props.$cursor ? props.$cursor : "default")};

  display: flex;

  justify-content: center;
  align-items: center;

  ${(props) => (props.$fullWidth ? "width: 100%;" : "")}

  padding: ${(props) =>
    props.$size === "small"
      ? "0.25rem 0.5rem"
      : props.$size === "medium"
        ? "0.5rem 1rem"
        : "0.75rem 1.5rem"};

  border-radius: 9999px;

  background-color: ${(props) => props.$color};

  color: white;

  line-height: 1rem;
`;

export function Badge({
  text,
  $color,
  $fullWidth,
  $size = "medium",
  $cursor = "default",
  onClick,
}: BadgeProps) {
  return (
    <StyledBadge
      $color={$color}
      $size={$size}
      $fullWidth={$fullWidth}
      $cursor={$cursor}
      onClick={onClick}
    >
      {text}
    </StyledBadge>
  );
}
