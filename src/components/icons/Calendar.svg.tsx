export default function Calendar({
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
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <path
        d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7 2V6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
