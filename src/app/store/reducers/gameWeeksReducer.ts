import { gameWeekToStoreGameWeek } from "src/app/services/backend/game";

import { createAppSlice } from "@/app/store/createAppSlice";
import { gameSlice } from "@/app/store/reducers/gamesReducer";

import { fetchOneWithGame } from "@/app/services/backend/gameWeek/fetchOneWithGame";
import { StoreFetchedGame, StoreGame } from "@/app/services/schemas/store/game";
import { StoreGameWeek } from "@/app/services/schemas/store/gameWeek";

type StoreGameWeekState = {
  gameWeeks: {
    [gameId: string]: StoreGameWeek;
  };
};

export const gameWeeksSlice = createAppSlice({
  name: "gameWeekState",
  initialState: {
    gameWeeks: {},
  } as StoreGameWeekState,
  reducers: (create) => ({
    fetchOneWithGame: create.asyncThunk(fetchOneWithGame, {
      pending: (state, action) => {
        state.gameWeeks[action.meta.arg] = {
          status: "pending",
          sqlId: action.meta.arg,
        };
      },
      fulfilled: (state, action) => {
        state.gameWeeks[action.meta.arg] = gameWeekToStoreGameWeek(
          action.payload,
          action.meta.arg,
        );
      },
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(gameSlice.actions.fetchGame.fulfilled, (state, action) => {
      (action.payload.gameWeeks || [])
        .map((gw) => gameWeekToStoreGameWeek(gw, action.payload.sqlId))
        .forEach((gameWeek) => {
          state.gameWeeks[gameWeek.sqlId] = gameWeek;
        });
    });
  },
});

export default gameSlice.reducer;
