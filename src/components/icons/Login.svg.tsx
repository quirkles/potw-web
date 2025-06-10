export default function LoginSvg({
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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      color={color}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M11.6801 14.62L14.2401 12.06L11.6801 9.5"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={stroke}
          fill={fill}
          color={color}
        ></path>
        <path
          d="M4 12.0601H14.17"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={stroke}
          fill={fill}
        ></path>
        <path
          d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={stroke}
          fill={fill}
        ></path>
      </g>
    </svg>
  );
}
