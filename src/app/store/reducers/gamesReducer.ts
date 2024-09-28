import { PayloadAction } from "@reduxjs/toolkit";
import { ZodError } from "zod";

import {
  createGameRequest,
  fetchGamesForUser as fetchGamesForUserRequest,
  fetchGames as fetchGamesRequest,
} from "src/app/services/backend/game";

import { createAppSlice } from "@/app/store/createAppSlice";
import {
  fetchAllVotesForGameAction,
  fetchGameAction,
  fetchGameWeekWithGameAction,
} from "@/app/store/sharedActions/fetch";

import { gameToStoreGame } from "@/app/services/backend/game/transformers";
import {
  createGamePayloadSchema,
  Game,
} from "@/app/services/schemas/backend/game";
import { GameVote } from "@/app/services/schemas/backend/gameVotes";
import {
  StoreFetchedGame,
  StoreGame,
  StoreNewGame,
} from "@/app/services/schemas/store/game";

import { addTo, getDateString } from "@/utils/date";
import { getFakeGameName } from "@/utils/game";

type StoreGameState = {
  games: {
    [gameId: string]: {
      game: StoreGame;
      votes: GameVote[];
    };
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
      regularScheduledStartTimeUtc: "17:00:00",
      gameWeeks: [],
    },
  } as StoreGameState,
  extraReducers: (builder) => {
    builder.addCase(fetchGameAction.pending, (state, action) => {
      const existing = state.games[action.meta.arg];
      state.games[action.meta.arg] = {
        ...(existing || {}),
        game: {
          status: "pending",
          sqlId: action.meta.arg,
        },
      };
    });
    builder.addCase(fetchGameAction.fulfilled, (state, action) => {
      const game = action.payload;
      if (!state.games[game.sqlId]) {
        state.games[game.sqlId] = { votes: [], game: gameToStoreGame(game) };
      } else {
        state.games[game.sqlId]["game"] = gameToStoreGame(game);
      }
    });
    builder.addCase(fetchGameAction.rejected, (state, action) => {
      if (!state.games[action.meta.arg]) {
        state.games[action.meta.arg] = {
          votes: [],
          game: {
            status: "failed",
            sqlId: action.meta.arg,
            error: action.error.message || "Unknown error",
          },
        };
      } else {
        state.games[action.meta.arg]["game"] = {
          status: "failed",
          sqlId: action.meta.arg,
          error: action.error.message || "Unknown error",
        };
      }
    });
    builder.addCase(fetchGameWeekWithGameAction.fulfilled, (state, action) => {
      const game = action.payload.game;
      if (!game) {
        return;
      }
      if (state.games[action.meta.arg]) {
        state.games[action.meta.arg]["game"] = gameToStoreGame(game);
      } else {
        state.games[action.meta.arg] = {
          votes: [],
          game: gameToStoreGame(game),
        };
      }
    });
    builder.addCase(fetchAllVotesForGameAction.fulfilled, (state, action) => {
      state.games[action.meta.arg]["votes"] = action.payload;
    });
  },
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
            regularScheduledStartTimeUtc: "17:00:00",
            gameWeeks: [],
          };
        },
        rejected: (state, action) => {
          state.newGame.status = "failed";
          throw new Error(action.error.message);
        },
      },
    ),
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
            if (state.games[game.sqlId]) {
              state.games[game.sqlId]["game"] = gameToStoreGame(game);
            } else {
              state.games[game.sqlId] = {
                votes: [],
                game: gameToStoreGame(game),
              };
            }
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
          if (state.games[game.sqlId]) {
            state.games[game.sqlId]["game"] = gameToStoreGame(game);
          } else {
            state.games[game.sqlId] = {
              votes: [],
              game: gameToStoreGame(game),
            };
          }
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
export const { updateNewGame, createGame, fetchGamesForUser } =
  gameSlice.actions;

export default gameSlice.reducer;

export function isFetchedGame(game: StoreGame): game is StoreFetchedGame {
  return game.status === "fetched";
}
