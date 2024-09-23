"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import AdminBox from "@/app/home/game/[id]/partials/AdminBox";
import GameWeekBox from "@/app/home/game/[id]/partials/GameWeeksBox";
import UsersBox from "@/app/home/game/[id]/partials/UsersBox";
import { gameColors, getColor } from "@/app/styles/colors";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectGameBySqlId } from "@/app/store/selectors/games";
import { selectUserBySqlId } from "@/app/store/selectors/users";
import { fetchGameAction } from "@/app/store/sharedActions/fetch";

import { StoreFetchedGame, StoreGame } from "@/app/services/schemas/store/game";

import CommentBox from "@/components/commentBox/CommentBox";
import Heading from "@/components/heading/Heading";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";

import { getPseudoRandomFromArrayFromUid } from "@/utils/random";

const Styled = styled.div`
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  > * {
    flex-grow: 1;
  }
`;

function GamePage({ params }: { params: { id: string } }) {
  const { id: gameId } = params;
  const dispatch = useAppDispatch();
  const game: StoreGame | null = useAppSelector((state) =>
    selectGameBySqlId(state, gameId),
  );

  useEffect(() => {
    if (gameId) {
      dispatch(fetchGameAction(gameId as string));
    }
  }, [gameId, dispatch]);
  if (game?.status === "fetched") {
    return <FetchedGame game={game} />;
  }
  return (
    <Styled>
      <Spacer $padding="medium">
        {game?.status === "pending" && <Loader />}
        {game?.status === "failed" && <h1>Error</h1>}
      </Spacer>
    </Styled>
  );
}

export default GamePage;

const StyledGame = styled.div<{
  $color: string;
}>`
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 2rem;

  background-color: ${getColor("white")};
  color: ${getColor("black")};
`;

function FetchedGame({ game }: { game: StoreFetchedGame }) {
  const gameColor = getPseudoRandomFromArrayFromUid(game.sqlId, gameColors);
  const admin = useAppSelector((state) => selectUserBySqlId(state, game.admin));
  return (
    <StyledGame $color={gameColor}>
      <GridContainer>
        <GridItem $xsCol={12}>
          <Heading $variant="h1" $color={gameColor} $underline>
            {game.name}
          </Heading>
          {game.description && <P>{game.description}</P>}
        </GridItem>
        <GridItem $mdCol={4}>
          {admin && admin.status === "fetched" && (
            <AdminBox admin={admin} color={gameColor} game={game} />
          )}
        </GridItem>
        <GridItem $mdCol={8} $mdRow={12}>
          <CommentBox resourcePath={`games/${game.firestoreId}`} />
        </GridItem>
        <GridItem $mdCol={4}>
          <Spacer $marginTop="xSmall" />
          <Heading $variant="h3" $font="serif">
            Standings
          </Heading>
          <UsersBox color={gameColor} userIds={game.players} />
        </GridItem>
        <GridItem $mdCol={4}>
          <Spacer $marginTop="xSmall" />
          <Heading $variant="h3" $font="serif">
            Rounds
          </Heading>
          <GameWeekBox color={gameColor} gameSqlId={game.sqlId} />
        </GridItem>
      </GridContainer>
    </StyledGame>
  );
}
