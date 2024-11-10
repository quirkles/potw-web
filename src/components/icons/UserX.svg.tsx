export default function UserX({
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
        d="M18.6213 12.1213L20.7426 10M22.864 7.87868L20.7426 10M20.7426 10L18.6213 7.87868M20.7426 10L22.864 12.1213"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
