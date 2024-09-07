import { styled } from "styled-components";

import { FlexContainer } from "@/components/layout/FlexContainer";

import { getColorVariant } from "@/utils/color";

const Styles = styled.div`
  --speed-of-animation: 1s;
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
  gap: 5em;
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
  .loader-text {
    > span {
      animation: jump 1000ms ease-in-out infinite;
      font-size: 2em;
      color: ${getColorVariant("black")};
      &:nth-child(1) {
        animation-delay: 0ms;
      }
      &:nth-child(2) {
        animation-delay: 100ms;
      }
      &:nth-child(3) {
        animation-delay: 200ms;
      }
      &:nth-child(4) {
        animation-delay: 300ms;
      }
      &:nth-child(5) {
        animation-delay: 400ms;
      }
      &:nth-child(6) {
        animation-delay: 500ms;
      }
      &:nth-child(7) {
        animation-delay: 600ms;
      }
      &:nth-child(8) {
        animation-delay: 700ms;
      }
      &:nth-child(9) {
        animation-delay: 800ms;
      }
      &:nth-child(10) {
        animation-delay: 900ms;
    }
  }

  @keyframes scale {
    0%,
    40%,
    100% {
      transform: scaleY(0.05);
    }

    20% {
      transform: scaleY(1);
    }
  }

  @keyframes jump {
    0%,
    22% {
      //scale: 1;
      transform: translateY(0);
    }

    11% {
      //scale: 3;
      transform: translateY(-20px);
    }
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
      <FlexContainer className="loader-text" $gap="medium">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </FlexContainer>
    </Styles>
  );
}

export default Loader;
