import Link from "next/link";
import { styled } from "styled-components";

import { BaseColorName } from "@/app/styles/colors";

import { useAppSelector } from "@/app/store/hooks";
import { StoreFetchedGame } from "@/app/store/reducers/gamesReducer";
import { selectUserBySqlId } from "@/app/store/selectors/users";

import Heading from "@/components/heading/Heading";
import { FlexBox, FlexItem } from "@/components/layout/Flexbox";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";
import Span from "@/components/text/Span";

import { getColor } from "@/utils/color";
import { getPeriodDisplayText } from "@/utils/date";
import {
  getPseudoRandomFromArrayFromUid,
  getPseudoRandomInRangeFromUid,
} from "@/utils/random";

const StyledGameSummary = styled.div<{
  $color: BaseColorName;
  $animationDelayMs: number;
}>`
    height: 100%;
    background-color: ${(props) => getColor(props.$color, "base")};
    padding: 1rem;
    animation: 2s infinite ease-in-out skew;
    animation-delay: -${(props) => props.$animationDelayMs}ms;
    transition: all 2s ease-in-out;
    z-index: 1;
    transform: scale(1);
    &:hover {
        z-index: 2;
        animation: none;
        transform: scale(1.2) skew(0deg, 0deg);
    }

    color: ${(props) => getColor(props.$color, "font")};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .divider {
        width: 100%;
        height: 2px;
        background-color: ${(props) => getColor(props.$color, "base")};
        margin: 1rem 0;
    }
}

@keyframes skew {
    0%, 100% {
        transform: skew(-0.3deg,-0.3deg) scale(0.99);
    }

    50% {
        transform: skew(0.3deg,0.3deg) scale(1.01);
    }
}

`;

interface IGameSummaryProps {
  game: StoreFetchedGame;
}

const includedColors: BaseColorName[] = [
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "yellow",
  "navy",
];

export function GameSummary(props: IGameSummaryProps) {
  const { game } = props;
  const colorName = getPseudoRandomFromArrayFromUid(game.id, includedColors);
  const getAnimationDelay = getPseudoRandomInRangeFromUid(game.id, 500, 0);
  const {
    id,
    name,
    description,
    period,
    startDate,
    endDate,
    isPrivate,
    players,
  } = game;

  const admin = useAppSelector((state) => selectUserBySqlId(state, game.admin));

  const hasGameStarted = new Date(startDate) < new Date();
  const doesGameEnd = !!endDate;
  const hasGameEnded = doesGameEnd && new Date(endDate) < new Date();
  let contrastColor = getColor(colorName, "contrast");
  return (
    <StyledGameSummary $color={colorName} $animationDelayMs={getAnimationDelay}>
      <FlexBox>
        <FlexItem $grow={1}>
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
        </FlexItem>
        <FlexItem>
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
                <Span $noWrap>
                  No end date,{" "}
                  <Span $fontWeight="bold" $color={contrastColor}>
                    ongoing
                  </Span>
                </Span>
              )}
            </Span>
          </FlexBox>
        </FlexItem>
      </FlexBox>
      <div className="divider" />
      <Spacer $marginY="small" />
      <P $fontSize="small" $color={contrastColor}>
        Created by <Span> {admin?.email} </Span>.
      </P>
      <Spacer $marginY="small" />
      <P>
        <Span>
          Game is played{" "}
          <Span $fontWeight="bold" $color={contrastColor}>
            {getPeriodDisplayText(period)}
          </Span>
        </Span>
      </P>
      <Spacer $marginY="small" />
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
