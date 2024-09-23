import Link from "next/link";
import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";

import { useAppSelector } from "@/app/store/hooks";
import { selectGameWeeksForGame } from "@/app/store/selectors/gameWeeks";

import { StoreFetchedGameWeek } from "@/app/services/schemas/store/gameWeek";

import { FlexContainer } from "@/components/layout/FlexContainer";

import { formatDateTime } from "@/utils/date";

const Styled = styled.div<{
  $color: ColorName;
}>`
  color: ${(props) => getColor(props.$color)};
  height: 100%;
  width: 100%;
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
      <FlexContainer $direction="column" $alignItems="stretch">
        {gameWeeks.map((gameWeek) => (
          <GameWeekItem key={gameWeek.sqlId} gameWeek={gameWeek} />
        ))}
      </FlexContainer>
    </Styled>
  );
}

const StyledGameWeekItem = styled.div`
  padding: 1rem 1rem;
  border-bottom: 1px solid ${getColor("grey_300")};
`;

function GameWeekItem({ gameWeek }: { gameWeek: StoreFetchedGameWeek }) {
  return (
    <StyledGameWeekItem>
      <Link href={`/home/gameweek/${gameWeek.sqlId}`}>
        {formatDateTime(gameWeek.startDateTime, "timeShortMonthDay")} -{" "}
        {gameWeek.theme || "No theme set"}
      </Link>
    </StyledGameWeekItem>
  );
}
