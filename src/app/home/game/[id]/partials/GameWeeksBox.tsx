import Link from "next/link";
import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";
import { defaultBorderRadius } from "@/app/styles/consts";

import { useAppSelector } from "@/app/store/hooks";
import { selectGameWeeksForGame } from "@/app/store/selectors/gameWeeks";

import { StoreFetchedGameWeek } from "@/app/services/schemas/store/gameWeek";

import Heading from "@/components/heading/Heading";
import Icon, { IconType } from "@/components/icons";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";

import { formatDateTime } from "@/utils/date";

const Styled = styled.div`
  background-color: ${getColor("lightGrey_100")};
  border-radius: ${defaultBorderRadius};
  border: 1px solid ${getColor("grey_100")};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type GameWeekBoxParams = {
  color: ColorName;
  gameSqlId: string;
};
export default function GameWeekBox({ gameSqlId, color }: GameWeekBoxParams) {
  const gameWeeks = useAppSelector((state) =>
    selectGameWeeksForGame(state, gameSqlId),
  );
  return (
    <Styled>
      <Spacer $paddingX="medium" $paddingY="small">
        <Heading $variant="h2" $underline $color={color}>
          Game Weeks
        </Heading>
      </Spacer>
      {gameWeeks.map((gameWeek) => (
        <GameWeekItem key={gameWeek.sqlId} gameWeek={gameWeek} />
      ))}
    </Styled>
  );
}

const StyledGameWeekItem = styled.div`
  padding: 1rem 1rem;
  border-radius: ${defaultBorderRadius};
  color: ${getColor("black")};
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid ${getColor("grey_100")};
  &.status-current {
    background-color: ${getColor("blue_100")};
  }
  &.status-overdue {
    background-color: ${getColor("red_100")};
  }
`;

function GameWeekItem({ gameWeek }: { gameWeek: StoreFetchedGameWeek }) {
  const iconType: IconType =
    gameWeek.status === "complete"
      ? "Check"
      : gameWeek.status === "overdue"
        ? "AlarmClock"
        : gameWeek.status === "pending"
          ? "Calendar"
          : "Music";
  return (
    <StyledGameWeekItem className={`status-${gameWeek.status}`}>
      <Icon
        hoverText={gameWeek.status}
        iconType={iconType}
        stroke={
          gameWeek.status === "overdue"
            ? "red"
            : gameWeek.status === "current"
              ? "blue"
              : "black"
        }
      />
      <Link href={`/home/gameweek/${gameWeek.sqlId}`}>
        {formatDateTime(gameWeek.startDateTime, "timeShortMonthDay")}
      </Link>
      <P>{gameWeek.theme || "No theme set"}</P>
    </StyledGameWeekItem>
  );
}
