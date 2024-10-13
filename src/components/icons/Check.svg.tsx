export default function Check({
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
      width={width}
      height={height}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <path
        d="M7 12.5L10 15.5L17 8.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}