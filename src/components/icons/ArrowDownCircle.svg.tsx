export default function ArrowDownCircle({
  size = "medium",
  color,
  stroke,
  fill = "none",
}: {
  size?: "small" | "medium" | "large";
  color?: string;
  stroke?: string;
  fill?: string;
}) {
  const width = size === "small" ? 16 : size === "medium" ? 24 : 32;
  const height = size === "small" ? 16 : size === "medium" ? 24 : 32;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      color={color}
    >
      <path
        d="M12 8V16M12 16L15.5 12.5M12 16L8.5 12.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={stroke}
        fill={fill}
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={stroke}
        fill={fill}
      />
    </svg>
  );
}
