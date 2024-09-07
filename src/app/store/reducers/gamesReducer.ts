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
import {
  createGamePayloadSchema,
  Game,
  PeriodString,
} from "@/app/services/schemas/game";

import { addTo, DateString, getDateString } from "@/utils/date";
import { getFakeGameName } from "@/utils/game";
import { RecordToEnum } from "@/utils/typeUtils";

export const BasicPeriod = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  biWeekly: "biWeekly",
} as const;

export type BasicPeriod = RecordToEnum<typeof BasicPeriod>;

const CustomPeriodUnit = {
  day: "day",
  week: "week",
  month: "month",
} as const;

type CustomPeriodUnit = keyof typeof CustomPeriodUnit;

export type CustomPeriod = {
  quantity: number;
  unit: CustomPeriodUnit;
};

export const DayOfWeek = {
  sunday: "sunday",
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
} as const;

export type DayOfWeek = RecordToEnum<typeof DayOfWeek>;

export const Recurrence = {
  every: "every",
  everyOther: "everyOther",
} as const;

export type Recurrence = RecordToEnum<typeof Recurrence>;

type CustomRecurring = {
  recurrence: Recurrence;
  dayOfWeek: DayOfWeek;
};
export type GamePeriod = BasicPeriod | CustomPeriod | CustomRecurring;

export type StoreFetchedGame = {
  status: "fetched";
  sqlId: string;
  name: string;
  description: string | null;
  isPrivate: boolean;
  admin: string;
  startDate: DateString;
  endDate: DateString | null;
  period: PeriodString;
  players: string[];
};
type StoreFetchingGame = {
  status: "fetching";
  id: string;
};
type StoreFailedGame = {
  status: "failed";
  id: string;
  error: string;
};
export type StoreGame = StoreFetchedGame | StoreFetchingGame | StoreFailedGame;

type StoreNewGame = Omit<
  StoreFetchedGame,
  "sqlId" | "adminId" | "players" | "admin" | "status"
> & {
  status: "unsaved" | "pendingCreate" | "failed";
  addAdminAsPlayer: boolean;
  isOpenEnded: boolean;
};

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
          state.newGame.status = "pendingCreate";
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
          status: existing?.status || "fetching",
          id: action.meta.arg,
        } as StoreFetchedGame | StoreFetchingGame;
      },
      fulfilled: (state, action) => {
        const game = action.payload;
        state.games[game.sqlId] = gameToStoreGame(game);
      },
      rejected: (state, action) => {
        state.games[action.meta.arg] = {
          status: "failed",
          id: action.meta.arg,
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

export const gameSelectors = {
  getNewGame: (state: { gameState: StoreGameState }): StoreNewGame => {
    return state.gameState.newGame;
  },
  getGames: (state: {
    gameState: StoreGameState;
  }): { [key: string]: StoreGame } => {
    return state.gameState.games;
  },
  getGame: (
    state: {
      gameState: StoreGameState;
    },
    gameId: string,
  ): StoreGame | null => {
    return state.gameState.games[gameId] || null;
  },
} as const;

export function isFetchedGame(game: StoreGame): game is StoreFetchedGame {
  return game.status === "fetched";
}
