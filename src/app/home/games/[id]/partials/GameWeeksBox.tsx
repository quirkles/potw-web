import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";

import { useAppSelector } from "@/app/store/hooks";
import { selectGameWeeksForGame } from "@/app/store/selectors/gameWeeks";

import { StoreFetchedGameWeek } from "@/app/services/schemas/store/gameWeek";

import { FlexContainer } from "@/components/layout/FlexContainer";

import { formatDateTime } from "@/utils/date";
import Link from "next/link";

const Styled = styled(FlexContainer)<{
  $color: ColorName;
}>`
  border: 2px solid ${(props) => getColor(props.$color)};
  color: ${(props) => getColor(props.$color)};
  height: 100%;
`;

type GameWeekBoxParams = {
  color: ColorName;
  gameSqlId: string;
};
export default function GameWeekBox({ color, gameSqlId }: GameWeekBoxParams) {
  const gameWeeks = useAppSelector((state) =>
    selectGameWeeksForGame(state, gameSqlId),
  );
  return (
    <Styled $color={color}>
      <FlexContainer $direction="column">
        {gameWeeks.map((gameWeek) => (
          <GameWeekItem key={gameWeek.sqlId} gameWeek={gameWeek} />
        ))}
      </FlexContainer>
    </Styled>
  );
}

const StyledGameWeekItem = styled.div`
  padding: 1rem 1rem;
`;

function GameWeekItem({ gameWeek }: { gameWeek: StoreFetchedGameWeek }) {
  return (
    <StyledGameWeekItem>
      <Link href={`/home/gameweek/${gameWeek.sqlId}`}>
        {formatDateTime(gameWeek.startDateTime, "timeMonthDay")} -{" "}
        {gameWeek.theme || "No theme set"}
      </Link>
    </StyledGameWeekItem>
  );
}
