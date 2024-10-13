import { gameWeekToStoreGameWeek } from "src/app/services/backend/game";

import { createAppSlice } from "@/app/store/createAppSlice";
import { gameSlice } from "@/app/store/reducers/gamesReducer";
import {
  fetchGameAction,
  fetchGameWeekWithGameAction,
} from "@/app/store/sharedActions/fetch";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGameWeekWithGameAction.pending, (state, action) => {
      state.gameWeeks[action.meta.arg] = {
        fetchStatus: "pending",
        sqlId: action.meta.arg,
      };
    });
    builder.addCase(fetchGameWeekWithGameAction.fulfilled, (state, action) => {
      state.gameWeeks[action.meta.arg] = gameWeekToStoreGameWeek(
        action.payload,
        action.meta.arg,
      );
    });
    builder.addCase(fetchGameAction.fulfilled, (state, action) => {
      (action.payload.gameWeeks || [])
        .map((gw) => gameWeekToStoreGameWeek(gw, action.payload.sqlId))
        .forEach((gameWeek) => {
          state.gameWeeks[gameWeek.sqlId] = gameWeek;
        });
    });
  },
});

export default gameSlice.reducer;
