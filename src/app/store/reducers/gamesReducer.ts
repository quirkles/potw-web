import {PayloadAction} from '@reduxjs/toolkit'
import {CreateGamePayload, GameEntity} from "@/app/services/schemas/game";
import {createGameRequest} from "@/app/services/game/createGame";
import {createAppSlice} from "@/app/store/createAppSlice";
import {addTo, DateString, getDateString} from "@/utils/date";
import {RecordToEnum} from "@/utils/typeUtils";

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

type StoreGame = {
    id: string,
    name: string,
    description?: string,
    isPrivate: boolean,
    adminId: string,
    startDate: DateString
    period: GamePeriod,
}

type StoreNewGame = Omit<StoreGame, "id" | "adminId"> & {
    status: "unsaved" | "pendingCreate" | "failed",
    addAdminAsPlayer: boolean,
}

type StoreGameState = {
    games: StoreGame[],
    newGame: StoreNewGame,
}

export const gameSlice = createAppSlice({
    name: 'gameState',
    initialState: {
        games: [],
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
            async (userId: string): Promise<GameEntity[]> => {
                return [];
            },
            {
                pending: (state) => {
                },
                fulfilled: (state, action) => {
                    state.games = Array.prototype.concat.apply(
                        state.games,
                        action.payload
                    )
                },
                rejected: (state) => {
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
    getGamesForUser: (state: {gameState: StoreGameState}, userId: string): StoreGame[] => {
        return []
    }
} as const