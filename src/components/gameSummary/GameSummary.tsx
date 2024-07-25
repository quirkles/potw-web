import styled from "styled-components";

import { StoreGame } from "@/app/store/reducers/gamesReducer";
import { BaseColorName, baseColors, BaseColors } from "@/app/styles/colors";
import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

import Heading from "@/components/heading/Heading";
import P from "@/components/text/P";
import Span from "@/components/text/Span";

import { getPeriodDisplayText } from "@/utils/date";
import { getColor } from "@/utils/color";
import { FlexBox, FlexChild } from "@/components/layout/Flexbox";

const StyledGameSummary = styled.div<{
  $color: BaseColorName;
}>`
  height: 100%;
  background-color: ${(props) => getColor(props.$color, "base", "500")};
  padding: 1rem;
  color: ${(props) => getColor(props.$color, "font", "500")};
  .divider {
      width: 100%;
      height: 2px;
      background-color: ${(props) => getColor(props.$color, "base", "700")};
      margin: 1rem 0;
    }
  }
`;

interface IGameSummaryProps {
  game: StoreGame;
}

const excludedColors: BaseColorName[] = ["white", "black"];

export function GameSummary(props: IGameSummaryProps) {
  const { game } = props;
  const colorName = getPseudoRandomFromArrayFromUid(
    game.id,
    baseColors.filter((c) => !excludedColors.includes(c)) as BaseColorName[],
  );
  const {
    id,
    name,
    description,
    period,
    startDate,
    endDate,
    isPrivate,
    admin,
  } = game;
  const { email: adminEmail, username: adminUsername, sqlId: adminId } = admin;
  const hasGameStarted = new Date(startDate) < new Date();
  const doesGameEnd = !!endDate;
  const hasGameEnded = doesGameEnd && new Date(endDate) < new Date();
  return (
    <StyledGameSummary $color={colorName}>
      <FlexBox>
        <FlexChild $grow={1}>
          <Span $textTransform="capitalize">{name}</Span>
        </FlexChild>
        <FlexChild>
          <FlexBox $direction="column" $alignItems="flex-end">
            <Span $textTransform="capitalize" $fontSize="small">
              {hasGameStarted ? "started" : "starts"}: {startDate}
            </Span>
            <Span $textTransform="capitalize" $fontSize="small">
              {hasGameEnded
                ? `Ended ${endDate}`
                : doesGameEnd
                  ? `Ends ${endDate}`
                  : "No end date, ongoing"}
            </Span>
          </FlexBox>
        </FlexChild>
      </FlexBox>
      <div className="divider" />
      <P $fontSize="small">Created by {adminUsername || adminEmail}.</P>
      <P>
        <Span>
          Game is played{" "}
          <Span $fontWeight="bold">{getPeriodDisplayText(period)}</Span>
        </Span>
      </P>
      {description && <P>{description}</P>}
    </StyledGameSummary>
  );
}
