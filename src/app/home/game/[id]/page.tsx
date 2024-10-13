"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import AdminBox from "@/app/home/game/[id]/partials/AdminBox";
import GameWeekBox from "@/app/home/game/[id]/partials/GameWeeksBox";
import UsersBox from "@/app/home/game/[id]/partials/UsersBox";
import { gameColors, getColor } from "@/app/styles/colors";
import { defaultBorderRadius } from "@/app/styles/consts";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectGameBySqlId } from "@/app/store/selectors/games";
import { selectUserBySqlId } from "@/app/store/selectors/users";
import { fetchGameAction } from "@/app/store/sharedActions/fetch";

import { StoreFetchedGame, StoreGame } from "@/app/services/schemas/store/game";

import CommentBox from "@/components/commentBox/CommentBox";
import Heading from "@/components/heading/Heading";
import { Box } from "@/components/layout/Box";
import { FlexContainer } from "@/components/layout/FlexContainer";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";
import { Small } from "@/components/text/Small";

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
  if (game?.fetchStatus === "fetched") {
    return <FetchedGame game={game} />;
  }
  return (
    <Styled>
      <Spacer $padding="medium">
        {game?.fetchStatus === "pending" && <Loader />}
        {game?.fetchStatus === "failed" && <h1>Error</h1>}
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

function BoxWithSpacer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      $backgroundColor="lightGrey_100"
      $borderRadius={defaultBorderRadius}
      $border={`1px solid ${getColor("grey_100")}`}
    >
      <Spacer $paddingX="small" $paddingY="small">
        {children}
      </Spacer>
    </Box>
  );
}

function FetchedGame({ game }: { game: StoreFetchedGame }) {
  const gameColor = getPseudoRandomFromArrayFromUid(game.sqlId, gameColors);
  const admin = useAppSelector((state) => selectUserBySqlId(state, game.admin));
  return (
    <StyledGame $color={gameColor}>
      <GridContainer>
        <GridItem $xsCol={12}>
          <BoxWithSpacer>
            <FlexContainer $direction="column" $gap="small">
              <Heading $variant="h1" $color={gameColor} $underline>
                {game.name}
              </Heading>
              {game.description && (
                <>
                  <Small $color="grey">about:</Small>
                  <P>{game.description}</P>
                </>
              )}
            </FlexContainer>
          </BoxWithSpacer>
        </GridItem>
        <GridItem $mdCol={4}>
          {admin && admin.status === "fetched" && (
            <BoxWithSpacer>
              <AdminBox admin={admin} color={gameColor} game={game} />
            </BoxWithSpacer>
          )}
        </GridItem>
        <GridItem $mdCol={8}>
          <GameWeekBox color={gameColor} gameSqlId={game.sqlId} />
        </GridItem>
        <GridItem $mdCol={4}>
          <UsersBox color={gameColor} userIds={game.players} />
        </GridItem>
        <GridItem $mdCol={8}>
          <BoxWithSpacer>
            <CommentBox resourcePath={`games/${game.firestoreId}`} />
          </BoxWithSpacer>
        </GridItem>
      </GridContainer>
    </StyledGame>
  );
}
