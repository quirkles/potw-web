import {PayloadAction} from '@reduxjs/toolkit'
import {
    CreateGamePayload,
    CreateGameResponse,
    FetchedGame
} from "@/app/services/schemas/game";
import {createGameRequest, fetchGamesForUser} from "@/app/services/game/createGame";
import {createAppSlice} from "@/app/store/createAppSlice";
import {addTo, DateString, getDateString, isDateString} from "@/utils/date";
import {RecordToEnum} from "@/utils/typeUtils";
import {CreateUserResponse} from "@/app/services/schemas/user";

export const BasicPeriod = {
    "daily": "daily",
    "weekly": "weekly",
    "monthly": "monthly",
    "biWeekly": "biWeekly",
} as const

export type BasicPeriod = RecordToEnum<typeof BasicPeriod>

const CustomPeriodUnit = {
    "day": "day",
    "week": "week",
    "month": "month",
} as const

type CustomPeriodUnit = keyof typeof CustomPeriodUnit

export type CustomPeriod = {
    quantity: number,
    unit: CustomPeriodUnit
}

export const DayOfWeek = {
    "sunday": "sunday",
    "monday": "monday",
    "tuesday": "tuesday",
    "wednesday": "wednesday",
    "thursday": "thursday",
    "friday": "friday",
    "saturday": "saturday",
} as const

export type DayOfWeek = RecordToEnum<typeof DayOfWeek>

export const Recurrence = {
    "every": "every",
    "everyOther": "everyOther",
} as const

export type Recurrence = RecordToEnum<typeof Recurrence>


type CustomRecurring = {
    recurrence: Recurrence,
    dayOfWeek: DayOfWeek
}
export type GamePeriod = BasicPeriod | CustomPeriod | CustomRecurring

export type StoreGame = {
    id: string,
    name: string,
    description?: string,
    isPrivate: boolean,
    admin: CreateUserResponse,
    startDate: DateString
    period: GamePeriod,
    players: string[],
}

type StoreNewGame = Omit<StoreGame, "id" | "adminId" | "players" | "admin"> & {
    status: "unsaved" | "pendingCreate" | "failed",
    addAdminAsPlayer: boolean,
}

type StoreGameState = {
    games: {
        [gameId: string]: StoreGame
    },
    newGame: StoreNewGame,
}

export const gameSlice = createAppSlice({
    name: 'gameState',
    initialState: {
        games: {},
        newGame: {
            name: "",
            isPrivate: false,
            status: "unsaved",
            addAdminAsPlayer: true,
            period: "weekly",
            startDate: addTo(7, "day", getDateString()),
        }
    } as StoreGameState,
    reducers: (create) => ({
        updateNewGame: create.reducer((state, action: PayloadAction<Partial<StoreNewGame>>) => {
            console.log("updateNewGame", action.payload)
            state.newGame = {...state.newGame, ...action.payload}
        }),
        createGame: create.asyncThunk(
            async (createGamePayload: CreateGamePayload) => {
                return createGameRequest(createGamePayload);
            },
            {
                pending: (state) => {
                    state.newGame.status = "pendingCreate";
                },
                fulfilled: (state, action) => {
                    state.newGame = {
                        name: "",
                        isPrivate: false,
                        status: "unsaved",
                        addAdminAsPlayer: true,
                        period: "weekly",
                        startDate: addTo(7, "day", getDateString()),
                    };
                },
                rejected: (state) => {
                    state.newGame.status = "failed";
                },
            },
        ),
        fetchMyGames: create.asyncThunk(
            async (userId: string) => {
                return fetchGamesForUser(userId)
            },
            {
                pending: (state) => {
                    console.log("fetchMyGames pending")
                },
                fulfilled: (state, action) => {
                    action.payload.forEach((game) => {
                        if(isFetchGameStoreGame(game)) {
                            state.games[game.id] = {
                                ...(state.games[game.id] || {}),
                                ...(game as StoreGame)
                            };
                        }
                    })
                },
                rejected: (state) => {
                    console.log("fetchMyGames rejected")
                },
            },
        )
    }),
})

// Action creators are generated for each case reducer function
export const { updateNewGame, createGame, fetchMyGames } = gameSlice.actions

export default gameSlice.reducer

export const gameSelectors = {
    getNewGame: (state: {gameState: StoreGameState}): StoreNewGame => {
        return state.gameState.newGame;
    },
    getGames: (state: {gameState: StoreGameState}): {[key: string]: StoreGame} => {
        return state.gameState.games;
    }
} as const

function isFetchGameStoreGame(game: FetchedGame | StoreGame): game is StoreGame {
    return isDateString(game.startDate);
}