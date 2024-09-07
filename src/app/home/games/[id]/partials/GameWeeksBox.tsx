import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";

import { FlexContainer } from "@/components/layout/FlexContainer";

const Styled = styled(FlexContainer)<{
  $color: ColorName;
}>`
  padding: 2rem;
  border: 2px solid ${(props) => getColor(props.$color)};
  color: ${(props) => getColor(props.$color)};
  height: 100%;
`;

type GameWeekBoxParams = {
  color: ColorName;
};
export default function GameWeekBox({ color }: GameWeekBoxParams) {
  return <Styled $color={color}>Game weeks box</Styled>;
}
