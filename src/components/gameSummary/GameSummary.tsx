import styled from "styled-components";

import { StoreGame } from "@/app/store/reducers/gamesReducer";
import { BaseColorName, baseColors } from "@/app/styles/colors";
import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

import Heading from "@/components/heading/Heading";
import P from "@/components/text/P";
import Span from "@/components/text/Span";

import { getPeriodDisplayText } from "@/utils/date";
import { getColor } from "@/utils/color";
import { FlexBox, FlexChild } from "@/components/layout/Flexbox";
import Spacer from "@/components/spacer/Spacer";
import Link from "next/link";

const StyledGameSummary = styled.div<{
  $color: BaseColorName;
}>`
  height: 100%;
  background-color: ${(props) => getColor(props.$color, "base")};
  padding: 1rem;
  color: ${(props) => getColor(props.$color, "font")};
  .divider {
      width: 100%;
      height: 2px;
      background-color: ${(props) => getColor(props.$color, "base")};
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
    players,
    admin,
  } = game;
  const { email: adminEmail, username: adminUsername, sqlId: adminId } = admin;
  const hasGameStarted = new Date(startDate) < new Date();
  const doesGameEnd = !!endDate;
  const hasGameEnded = doesGameEnd && new Date(endDate) < new Date();
  let contrastColor = getColor(colorName, "contrast");
  return (
    <StyledGameSummary $color={colorName}>
      <FlexBox>
        <FlexChild $grow={1}>
          <Heading
            variant="h3"
            $color={contrastColor}
            $textTransform="capitalize"
          >
            <Link href={`/home/games/${id}`}>{name}</Link>
          </Heading>
          <P>
            This game is{" "}
            <Span $fontWeight="bold" $color={contrastColor}>
              {isPrivate ? "private" : "open"}
            </Span>
            .
          </P>
        </FlexChild>
        <FlexChild>
          <FlexBox $direction="column" $alignItems="flex-end">
            <Span $textTransform="capitalize" $fontSize="small">
              {hasGameStarted ? "started" : "starts"}:{" "}
              <Span $fontWeight="bold" $color={contrastColor}>
                {startDate}
              </Span>
            </Span>
            <Span $textTransform="capitalize" $fontSize="small">
              {hasGameEnded ? (
                <Span>
                  Ended{" "}
                  <Span $fontWeight="bold" $color={contrastColor}>
                    {endDate}
                  </Span>
                </Span>
              ) : doesGameEnd ? (
                <Span>
                  Ends{" "}
                  <Span $fontWeight="bold" $color={contrastColor}>
                    {endDate}
                  </Span>
                </Span>
              ) : (
                <Span>
                  No end date,{" "}
                  <Span $fontWeight="bold" $color={contrastColor}>
                    ongoing
                  </Span>
                </Span>
              )}
            </Span>
          </FlexBox>
        </FlexChild>
      </FlexBox>
      <div className="divider" />
      <Spacer $marginY="small" />
      <P $fontSize="small" $color={contrastColor}>
        Created by <Span>{adminUsername || adminEmail}</Span>.
      </P>
      <Spacer $marginY="small" />
      <P>
        <Span>
          Game is played{" "}
          <Span $fontWeight="bold" $color={contrastColor}>
            {getPeriodDisplayText(period)}
          </Span>
        </Span>
        <Spacer $marginY="small" />
      </P>
      {description && (
        <Spacer $marginY="medium">
          <P $fontSize="small" $fontWeight="bold">
            Description:
          </P>
          <P>{description}</P>
        </Spacer>
      )}
      <P>
        {players.length} Player{players.length === 1 ? "" : "s"} in this game
      </P>
    </StyledGameSummary>
  );
}
