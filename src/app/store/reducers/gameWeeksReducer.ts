import { createAppSlice } from "@/app/store/createAppSlice";
import { gameSlice } from "@/app/store/reducers/gamesReducer";

import { gameWeekToStoreGameWeek } from "@/app/services/game";
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
  reducers: () => ({}),
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

export function isFetchedGame(game: StoreGame): game is StoreFetchedGame {
  return game.status === "fetched";
}
