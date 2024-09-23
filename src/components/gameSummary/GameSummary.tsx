import { Icons } from "@storybook/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

import { BaseColorName, gameColors } from "@/app/styles/colors";

import { useAppSelector } from "@/app/store/hooks";
import { selectUserBySqlId } from "@/app/store/selectors/users";

import { useResponsiveContext } from "@/app/providers/Responsive";

import { StoreFetchedGame } from "@/app/services/schemas/store/game";

import { Avatar } from "@/components/avatar/Avatar";
import HorizontalDivider from "@/components/divider/HorizontalDivider";
import Heading from "@/components/heading/Heading";
import Icon from "@/components/icons";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";
import Span from "@/components/text/Span";

import { getColorVariant } from "@/utils/color";
import { getPeriodDisplayTextFromPeriodString } from "@/utils/period";
import {
  getPseudoRandomFromArrayFromUid,
  getPseudoRandomInRangeFromUid,
} from "@/utils/random";

const StyledGameSummary = styled.div<{
  $color: BaseColorName;
  $animationDelayMs: number;
}>`
    height: 100%;
    width: 100%;
    transition: all 0.2s ease-in-out;
    transform: scale(1);
    position: relative;
    background-color: ${getColorVariant("white", "base")};
    &:hover {
        opacity: 1;
        z-index: 2;
        animation: none;
        transform: scale(1.05) skew(0deg, 0deg);
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
  const colorName = getPseudoRandomFromArrayFromUid(game.sqlId, gameColors);
  const router = useRouter();
  const getAnimationDelay = getPseudoRandomInRangeFromUid(game.sqlId, 500, 0);
  const {
    sqlId,
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
  const navigateToUserPage = (userId: string) => {
    router.push(`/home/users/${userId}`);
  };
  return (
    <StyledGameSummary $color={colorName} $animationDelayMs={getAnimationDelay}>
      <FlexContainer $direction="column" $alignItems="stretch">
        <FlexItem className="header" $grow={1}>
          <Heading $variant="h3" $textTransform="capitalize" $font="sans">
            <Link href={`/home/game/${sqlId}`}>{name}</Link>
          </Heading>
        </FlexItem>
        <FlexItem className="body">
          <FlexContainer
            $direction="column"
            $gap="medium"
            $alignItems="stretch"
          >
            <FlexItem>
              <FlexContainer $wrap="wrap" $rowGap="medium">
                {admin?.sqlId && (
                  <FlexItem>
                    <FlexContainer $direction="column" $gap="medium">
                      <Avatar
                        value={admin.email || ""}
                        size={responsive?.isDesktop ? "xLarge" : "large"}
                        onClick={() => {
                          navigateToUserPage(admin.sqlId as string);
                        }}
                      />
                      <P>
                        Created by{" "}
                        <Link href={`/home/user/${admin.sqlId}`}>
                          {admin?.email}
                        </Link>
                      </P>
                    </FlexContainer>
                  </FlexItem>
                )}
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
              </FlexContainer>
            </FlexItem>
            <FlexItem>
              <HorizontalDivider $color={colorName} />
            </FlexItem>
            <FlexItem>
              {description && (
                <>
                  <P $fontWeight="bold">Description:</P>
                  <P>{description}</P>
                </>
              )}
              <FlexContainer $gap="small" $alignItems="center">
                <Icon iconType="Community" size="small"></Icon>
                <P>
                  <Span $color={colorName}>{players.length}</Span> Player
                  {players.length === 1 ? "" : "s"} in this game
                </P>
              </FlexContainer>
              <FlexContainer $gap="small" $alignItems="center">
                <Icon iconType="Calendar" size="small"></Icon>
                <P>
                  <Span>
                    Game is played{" "}
                    <Span $fontWeight="bold" $color={colorName}>
                      {getPeriodDisplayTextFromPeriodString(period)}
                    </Span>
                  </Span>
                </P>
              </FlexContainer>
              <FlexContainer $gap="small" $alignItems="center">
                <Icon
                  iconType={isPrivate ? "UserX" : "UserPlus"}
                  size="small"
                ></Icon>
                <P>This game is </P>
                <Span $fontWeight="bold" $color={isPrivate ? "red" : "green"}>
                  {isPrivate ? "private" : "open"}
                </Span>
                <Spacer $marginY="small" />
              </FlexContainer>
            </FlexItem>
          </FlexContainer>
        </FlexItem>
      </FlexContainer>
    </StyledGameSummary>
  );
}
