import Link from "next/link";
import { styled } from "styled-components";

import { BaseColorName, gameColors } from "@/app/styles/colors";

import { useAppSelector } from "@/app/store/hooks";
import { StoreFetchedGame } from "@/app/store/reducers/gamesReducer";
import { selectUserBySqlId } from "@/app/store/selectors/users";

import { useResponsiveContext } from "@/app/providers/Responsive";

import { Avatar } from "@/components/avatar/Avatar";
import Divider from "@/components/divider/Divider";
import Heading from "@/components/heading/Heading";
import { FlexBox, FlexItem } from "@/components/layout/Flexbox";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";
import Span from "@/components/text/Span";

import { getColorVariant } from "@/utils/color";
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
    transition: all 0.2s ease-in-out;
    z-index: 1;
    transform: scale(1);
    position: relative;
    &:hover {
        opacity: 1;
        z-index: 2;
        animation: none;
        transform: scale(1.3) skew(0deg, 0deg);
    }

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    > * {
        top: 0;
        left: 0;
        > * {
            padding: 1rem;
        }
    }
    
    .header {
        background-color: ${(props) => getColorVariant(props.$color, "base")};
        color: ${(props) => getColorVariant(props.$color, "font")};
    }
    .body {
        background-color: ${getColorVariant("white", "base")};
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

export function GameSummary(props: IGameSummaryProps) {
  const { game } = props;
  const responsive = useResponsiveContext();
  const colorName = getPseudoRandomFromArrayFromUid(game.id, gameColors);
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
  return (
    <StyledGameSummary $color={colorName} $animationDelayMs={getAnimationDelay}>
      <FlexBox $direction="column" $alignItems="stretch">
        <FlexItem className="header" $grow={1}>
          <Heading variant="h3" $textTransform="capitalize" $font="sans">
            <Link href={`/home/games/${id}`}>{name}</Link>
          </Heading>
        </FlexItem>
        <FlexItem className="body">
          <FlexBox $direction="column" $gap="medium" $alignItems="stretch">
            <FlexItem>
              <FlexBox>
                <FlexItem>
                  <FlexBox $direction="column" $gap="medium">
                    <Avatar
                      value={admin.email || ""}
                      size={responsive?.isDesktop ? "xLarge" : "large"}
                    />
                    <P>
                      Created by <Span>{admin?.email}</Span>
                    </P>
                  </FlexBox>
                </FlexItem>
                <FlexItem>
                  <P $textTransform="capitalize" $fontSize="small">
                    {hasGameStarted ? "started" : "starts"}:{" "}
                    <Span $fontWeight="bold" $color={colorName}>
                      {startDate}
                    </Span>
                  </P>
                  <P $textTransform="capitalize" $fontSize="small">
                    {hasGameEnded ? (
                      <Span>
                        Ended{""}
                        <Span $fontWeight="bold" $color={colorName}>
                          {endDate}
                        </Span>
                      </Span>
                    ) : doesGameEnd ? (
                      <Span>
                        Ends{""}
                        <Span $fontWeight="bold" $color={colorName}>
                          {endDate}
                        </Span>
                      </Span>
                    ) : (
                      <Span $noWrap>
                        No end date{""}
                        <Span $fontWeight="bold" $color={colorName}>
                          (ongoing).
                        </Span>
                      </Span>
                    )}
                  </P>
                </FlexItem>
              </FlexBox>
            </FlexItem>
            <FlexItem>
              <Divider $color={colorName} />
            </FlexItem>
            <FlexItem>
              {description && (
                <>
                  <P $fontWeight="bold">Description:</P>
                  <P>{description}</P>
                </>
              )}
              <P>
                <Span $color={colorName}>{players.length}</Span> Player
                {players.length === 1 ? "" : "s"} in this game
              </P>
              <P>
                <Span>
                  Game is played{" "}
                  <Span $fontWeight="bold" $color={colorName}>
                    {getPeriodDisplayText(period)}
                  </Span>
                </Span>
              </P>
              <P>
                This game is{" "}
                <Span $fontWeight="bold" $color={"green"}>
                  {isPrivate ? "private" : "open"}
                </Span>
              </P>
              <Spacer $marginY="small" />
            </FlexItem>
          </FlexBox>
        </FlexItem>
      </FlexBox>
    </StyledGameSummary>
  );
}
