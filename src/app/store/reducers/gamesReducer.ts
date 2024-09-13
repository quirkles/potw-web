import { PayloadAction } from "@reduxjs/toolkit";
import { ZodError } from "zod";

import { createAppSlice } from "@/app/store/createAppSlice";

import {
  createGameRequest,
  fetchGame as fetchGameRequest,
  fetchGamesForUser as fetchGamesForUserRequest,
  fetchGames as fetchGamesRequest,
} from "@/app/services/game";
import { gameToStoreGame } from "@/app/services/game/transformers";
import { createGamePayloadSchema, Game } from "@/app/services/schemas/game";
import {
  StoreFetchedGame,
  StoreGame,
  StoreNewGame,
} from "@/app/services/schemas/store/game";

import { addTo, getDateString } from "@/utils/date";
import { getFakeGameName } from "@/utils/game";

type StoreGameState = {
  games: {
    [gameId: string]: StoreGame;
  };
  fetchingGamesForUserIds: string[];
  newGame: StoreNewGame;
};

export const gameSlice = createAppSlice({
  name: "gameState",
  initialState: {
    games: {},
    fetchingGamesForUserIds: [],
    newGame: {
      name: "",
      isPrivate: false,
      status: "unsaved",
      addAdminAsPlayer: true,
      period: "weekly",
      startDate: addTo(7, "day", getDateString()),
      description: null,
      endDate: null,
      isOpenEnded: true,
      regularScheduledStartTimeUtc: "17:00",
      gameWeeks: [],
    },
  } as StoreGameState,
  reducers: (create) => ({
    updateNewGame: create.reducer(
      (state, action: PayloadAction<Partial<StoreNewGame>>) => {
        state.newGame = { ...state.newGame, ...action.payload };
      },
    ),
    createGame: create.asyncThunk(
      async (
        createGamePayload: StoreNewGame & {
          adminId: string;
          players: {
            email: string;
            firestoreId: string | null;
          }[];
        },
      ): Promise<Game> => {
        if (createGamePayload.isOpenEnded) {
          createGamePayload.endDate = null;
        }
        let validatedPayload;
        try {
          validatedPayload = createGamePayloadSchema.parse(createGamePayload);
        } catch (e) {
          console.error((e as ZodError).issues);
          console.error("Invalid payload passed to create game", e);
          throw e;
        }
        return createGameRequest(validatedPayload);
      },
      {
        pending: (state) => {
          state.newGame.status = "pending";
        },
        fulfilled: (state) => {
          state.newGame = {
            name: getFakeGameName(),
            isPrivate: false,
            status: "unsaved",
            addAdminAsPlayer: true,
            isOpenEnded: true,
            description: null,
            period: "weekly",
            startDate: addTo(7, "day", getDateString()),
            endDate: null,
            regularScheduledStartTimeUtc: "17:00",
            gameWeeks: [],
          };
        },
        rejected: (state, action) => {
          state.newGame.status = "failed";
          throw new Error(action.error.message);
        },
      },
    ),
    fetchGame: create.asyncThunk(fetchGameRequest, {
      pending: (state, action) => {
        const existing = state.games[action.meta.arg];
        state.games[action.meta.arg] = {
          ...(existing || {}),
          status: "pending",
          sqlId: action.meta.arg,
        };
      },
      fulfilled: (state, action) => {
        const game = action.payload;
        state.games[game.sqlId] = gameToStoreGame(game);
      },
      rejected: (state, action) => {
        state.games[action.meta.arg] = {
          status: "failed",
          sqlId: action.meta.arg,
          error: action.error.message || "Unknown error",
        };
      },
    }),
    fetchGamesForUser: create.asyncThunk(
      (sqlId: string) => {
        return fetchGamesForUserRequest(sqlId);
      },
      {
        pending: (state, action) => {
          state.fetchingGamesForUserIds.push(action.meta.arg);
        },
        fulfilled: (state, action) => {
          state.fetchingGamesForUserIds = state.fetchingGamesForUserIds.filter(
            (id) => id !== action.meta.arg,
          );
          action.payload.forEach((game) => {
            state.games[game.sqlId] = gameToStoreGame(game);
          });
        },
        rejected: (state, action) => {
          state.fetchingGamesForUserIds = state.fetchingGamesForUserIds.filter(
            (id) => id !== action.meta.arg,
          );
          console.log("fetchMyGames rejected");
        },
      },
    ),
    fetchGames: create.asyncThunk(() => fetchGamesRequest(), {
      pending: (state) => {
        state.fetchingGamesForUserIds.push("all");
      },
      fulfilled: (state, action) => {
        state.fetchingGamesForUserIds = state.fetchingGamesForUserIds.filter(
          (id) => id !== "all",
        );
        action.payload.forEach((game) => {
          state.games[game.sqlId] = gameToStoreGame(game);
        });
      },
      rejected: (state) => {
        state.fetchingGamesForUserIds = state.fetchingGamesForUserIds.filter(
          (id) => id !== "all",
        );
        console.log("fetchMyGames rejected");
      },
    }),
  }),
});

// Action creators are generated for each case reducer function
export const { updateNewGame, createGame, fetchGamesForUser, fetchGames } =
  gameSlice.actions;

export default gameSlice.reducer;

export function isFetchedGame(game: StoreGame): game is StoreFetchedGame {
  return game.status === "fetched";
}
