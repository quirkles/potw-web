import {PayloadAction} from '@reduxjs/toolkit'
import {CreateGamePayload} from "@/app/services/schemas/game";
import {createGameRequest} from "@/app/services/game/createGame";
import {createAppSlice} from "@/app/store/createAppSlice";

type TGame = {
    id: string,
    name: string,
    description?: string,
    isPrivate: boolean,
    adminId: string,
}

type TNewGame = Omit<TGame, "id" | "adminId"> & {
    status: "unsaved" | "pendingCreate" | "failed",
}

type TGameState = {
    games: TGame[],
    newGame: TNewGame,
}

export const gameSlice = createAppSlice({
    name: 'gameState',
    initialState: {
        games: [],
        newGame: {
            name: "",
            isPrivate: false,
            status: "unsaved"
        }
    } as TGameState,
    reducers: (create) => ({
        updateNewGame: create.reducer((state, action: PayloadAction<Partial<TNewGame>>) => {
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
                        status: "unsaved"
                    };
                },
                rejected: (state) => {
                    state.newGame.status = "failed";
                },
            },
        ),
    }),
})

// Action creators are generated for each case reducer function
export const { updateNewGame, createGame } = gameSlice.actions

export default gameSlice.reducer

export const gameSelectors = {
    getNewGame: (state: {gameState: TGameState}): TNewGame => {
        return state.gameState.newGame;
    }
} as const