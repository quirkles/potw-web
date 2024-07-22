import styled from "styled-components";

import { StoreGame } from "@/app/store/reducers/gamesReducer";
import { BaseColorName, BaseColors } from "@/app/styles/colors";
import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

import Heading from "@/components/heading/Heading";
import P from "@/components/text/P";
import Span from "@/components/text/Span";

import { getPeriodDisplayText } from "@/utils/date";
import { getColor } from "@/utils/color";

const StyledGameSummary = styled.div<{
  $color: BaseColorName;
}>`
  background-color: ${(props) => getColor(props.$color, "base", "500")};
  padding: 1rem;
  color: ${(props) => getColor(props.$color, "contrast", "500")};
  .divider {
      width: 100%;
      height: 2px;
      background-color: ${(props) => getColor(props.$color, "base", "700")};
    }
  }
`;

interface IGameSummaryProps {
  game: StoreGame;
}

export function GameSummary(props: IGameSummaryProps) {
  const { game } = props;
  const colorName = getPseudoRandomFromArrayFromUid(
    game.id,
    Object.keys(BaseColors) as BaseColorName[],
  );
  console.log("colorName", colorName);
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
  return (
    <StyledGameSummary $color={colorName}>
      <Heading variant="h2">
        <Span $textTransform="capitalize">{name}</Span>
      </Heading>
      <div className="divider" />
      {description && <P>{description}</P>}
      <P $fontSize="small">Created by {adminUsername || adminEmail}.</P>
      <P>
        <Span $fontWeight="bold">Played: </Span>
        <Span>Game is played {getPeriodDisplayText(period)}</Span>
      </P>
    </StyledGameSummary>
  );
}
