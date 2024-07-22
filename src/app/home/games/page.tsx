"use client";

import Link from "next/link";
import { PropsWithChildren, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectGamesForUsers } from "@/app/store/selectors";
import { gameSlice, StoreGame } from "@/app/store/reducers/gamesReducer";

import Spacer from "@/components/spacer/Spacer";

import { getColor } from "@/utils/color";

const StyledGames = styled.div`
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function Games() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.authUser);
  const games = useAppSelector(selectGamesForUsers);

  useEffect(() => {
    if (authUser?.sqlId) {
      dispatch(gameSlice.actions.fetchMyGames(authUser.sqlId as string));
    }
  }, [authUser?.sqlId, dispatch]);

  return (
    <StyledGames>
      <Spacer $padding="medium">
        <h1>Games</h1>
        {games &&
          games.map((game) => <GameListItem game={game} key={game.id} />)}
      </Spacer>
    </StyledGames>
  );
}

const StyledGameItem = styled.div`
  display: flex;
  border: 1px solid ${getColor("black")};
  padding: 1em;
  border-radius: var(--border-radius);
  //justify-content: center;
  align-items: center;
  gap: 1em;
  h3 {
  }
`;

function GameListItem(props: PropsWithChildren<{ game: StoreGame }>) {
  const { game } = props;
  return (
    <StyledGameItem>
      <h3>
        <Link
          href={`games/${game.id}`}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          {game.name}
        </Link>
      </h3>
      <p>{props.game.description}</p>
      <div>
        <h4>
          <Link
            href={`users/${game.admin.sqlId}`}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {game.admin.username || game.admin.email}
          </Link>
        </h4>
      </div>
    </StyledGameItem>
  );
}

export default Games;
