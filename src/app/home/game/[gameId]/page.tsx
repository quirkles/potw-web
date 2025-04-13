"use client";

import Link from "next/link";
import { use, useEffect } from "react";
import { styled } from "styled-components";

import { useGameJoinRequests } from "@/app/home/game/[gameId]/hooks/useGameJoinRequests";
import { useRequestToJoinGame } from "@/app/home/game/[gameId]/hooks/useRequestToJoinGame";
import AdminBox from "@/app/home/game/[gameId]/partials/AdminBox";
import GameWeekBox from "@/app/home/game/[gameId]/partials/GameWeeksBox";
import UsersBox from "@/app/home/game/[gameId]/partials/UsersBox";
import { gameColors, getColor } from "@/app/styles/colors";
import { defaultBorderRadius } from "@/app/styles/consts";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { StoreFetchedGame } from "@/app/store/schemas/game";
import { authUserSelector } from "@/app/store/selectors/authUser";
import { selectGameBySqlId } from "@/app/store/selectors/games";
import { selectUserBySqlId } from "@/app/store/selectors/users";
import { fetchGameAction } from "@/app/store/sharedActions/fetch";

import Button, { ButtonSize } from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import CommentBox from "@/components/commentBox/CommentBox";
import Heading from "@/components/heading/Heading";
import UserPlus from "@/components/icons/UserPlus.svg";
import UserX from "@/components/icons/UserX.svg";
import { Box } from "@/components/layout/Box";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";
import { Small } from "@/components/text/Small";
import Span from "@/components/text/Span";

import { getPseudoRandomFromArrayFromString } from "@/utils/random";

const Styled = styled.div`
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  > * {
    flex-grow: 1;
  }
`;

function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId: gameId } = use(params);
  const dispatch = useAppDispatch();

  const game = useAppSelector((state) => selectGameBySqlId(state, gameId));

  let { fetchStatus } = game || {};

  if (fetchStatus === "fetched" && !game?.gameWeeks) {
    // This is a hack-y way to force a refetch if the game has only been partially fetched, eg from the games page
    fetchStatus = undefined;
  }

  useEffect(() => {
    if (
      gameId &&
      fetchStatus !== "fetched" &&
      fetchStatus !== "pending" &&
      fetchStatus !== "failed"
    ) {
      dispatch(fetchGameAction(gameId as string));
    }
  }, [gameId, fetchStatus, dispatch]);

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

const StyledGame = styled.div`
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 2rem;
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
  const gameColor = getPseudoRandomFromArrayFromString(game.sqlId, gameColors);
  const admin = useAppSelector((state) => selectUserBySqlId(state, game.admin));
  const authUser = useAppSelector(authUserSelector);

  const { requestToJoinGame, currentRequestStatus } = useRequestToJoinGame(
    game.firestoreId,
    authUser?.firestoreId as string,
  );

  const { respondToJoinRequest, joinRequests } = useGameJoinRequests(
    game.firestoreId,
  );

  const { startDate, endDate } = game;

  const hasGameStarted = new Date(startDate) < new Date();
  const doesGameEnd = !!endDate;
  const hasGameEnded = doesGameEnd && new Date(endDate) < new Date();

  return (
    <StyledGame>
      <GridContainer>
        <GridItem $xsCol={12}>
          <BoxWithSpacer>
            <FlexContainer $direction="column" $gap="small">
              <FlexItem>
                <Heading $variant="h1" $color={gameColor} $underline>
                  {game.name}
                </Heading>
              </FlexItem>
              <FlexItem>
                {game.description && (
                  <FlexContainer>
                    <Small $color="grey">about:</Small>
                    <P>{game.description}</P>
                  </FlexContainer>
                )}
              </FlexItem>
              <FlexItem>
                <P $textTransform="capitalize" $fontSize="small">
                  {hasGameStarted ? "started" : "starts"}:{"  "}
                  <Span $fontWeight="bold" $color={gameColor}>
                    {startDate}
                  </Span>
                </P>
                <P $textTransform="capitalize" $fontSize="small">
                  {hasGameEnded ? (
                    <Span>
                      Ended:{""}
                      <Span $fontWeight="bold" $color={gameColor}>
                        {endDate}
                      </Span>
                    </Span>
                  ) : doesGameEnd ? (
                    <Span>
                      Ends:{" "}
                      <Span $fontWeight="bold" $color={gameColor}>
                        {endDate}
                      </Span>
                    </Span>
                  ) : (
                    <Span $noWrap>
                      No end date{""}
                      <Span $fontWeight="bold" $color={gameColor}>
                        (ongoing).
                      </Span>
                    </Span>
                  )}
                </P>
              </FlexItem>
            </FlexContainer>
          </BoxWithSpacer>
        </GridItem>
        <GridItem $mdCol={4}>
          <FlexContainer $direction="column" $gap="small" $alignItems="stretch">
            {admin && admin.status === "fetched" && (
              <BoxWithSpacer>
                <AdminBox admin={admin} color={gameColor} game={game} />
              </BoxWithSpacer>
            )}
            {admin.firestoreId === authUser?.firestoreId ? (
              <BoxWithSpacer>
                <FlexContainer
                  $alignItems="flex-start"
                  $direction="column"
                  $gap="small"
                >
                  {joinRequests.length > 0 ? (
                    joinRequests.map((r) => (
                      <FlexContainer
                        key={r.requesteeId}
                        $gap="small"
                        $width="100%"
                        $alignItems="center"
                      >
                        <FlexItem $grow={1}>
                          <Link href={`/home/user/${r.requesteeSqlId}`}>
                            {r.requesteeEmail}
                          </Link>
                        </FlexItem>
                        <IconButton
                          $size="small"
                          onClick={() => {
                            respondToJoinRequest(r.requesteeId, "accepted");
                          }}
                          Icon={UserPlus}
                          $color="green"
                        ></IconButton>
                        <IconButton
                          $color="red"
                          $size="small"
                          onClick={() => {
                            respondToJoinRequest(r.requesteeId, "rejected");
                          }}
                          Icon={UserX}
                        ></IconButton>
                      </FlexContainer>
                    ))
                  ) : (
                    <P>No Pending Requests</P>
                  )}
                </FlexContainer>
              </BoxWithSpacer>
            ) : (
              !game.players.includes(authUser?.sqlId as string) && (
                <BoxWithSpacer>
                  <FlexContainer $alignItems="center" $justifyContent="center">
                    {currentRequestStatus === "pending" && (
                      <P $color="grey">Request pending</P>
                    )}
                    {currentRequestStatus === null && (
                      <Button
                        size={ButtonSize.sm}
                        buttonText="Request to join"
                        onClick={requestToJoinGame}
                      ></Button>
                    )}
                  </FlexContainer>
                </BoxWithSpacer>
              )
            )}
          </FlexContainer>
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
