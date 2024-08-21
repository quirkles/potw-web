import { styled } from "styled-components";

import { getColorVariant } from "@/utils/color";

const Styles = styled.div`
    --speed-of-animation: 0.9s;
    --gap: 6px;
    --first-color: ${getColorVariant("blue")};
    --second-color: ${getColorVariant("yellow")};
    --third-color: ${getColorVariant("purple")};
    --fourth-color: ${getColorVariant("red")};
    --fifth-color: ${getColorVariant("green")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10em;
    height: 100%;
    > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        gap: 1em;
        background-color: ${getColorVariant("black")};
        padding: 4rem;
        border-radius: 1rem;

        span {
            width: 1.5em;
            height: 7.5em;
            background: var(--first-color);
            animation: scale var(--speed-of-animation) ease-in-out infinite;
        }

        span:nth-child(2) {
            background: var(--second-color);
            animation-delay: -0.8s;
        }

        span:nth-child(3) {
            background: var(--third-color);
            animation-delay: -0.7s;
        }

        span:nth-child(4) {
            background: var(--fourth-color);
            animation-delay: -0.6s;
        }

        span:nth-child(5) {
            background: var(--fifth-color);
            animation-delay: -0.5s;
        }
    }

    @keyframes scale {
        0%, 40%, 100% {
            transform: scaleY(0.05);
        }

        20% {
            transform: scaleY(1);
        }
`;

function Loader() {
  return (
    <Styles>
      <div>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div>...Loading...hang tight...</div>
    </Styles>
  );
}

export default Loader;
