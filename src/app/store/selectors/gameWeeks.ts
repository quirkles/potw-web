import { createSelector } from "reselect";

import { gameWeeksSlice } from "@/app/store/reducers/gameWeeksReducer";
import { RootState } from "@/app/store/store";

import {
  StoreFetchedGameWeek,
  storeGameWeekIsFetched,
} from "@/app/services/schemas/store/gameWeek";

export const selectGameWeekState = (state: RootState) => state.gameWeekState;

export const selectGameWeekBySqlId = createSelector(
  [selectGameWeekState, (_, sqlId: string) => sqlId],
  (gameWeeksState, gameSqlId): StoreFetchedGameWeek | null => {
    const gameWeek = gameWeeksState.gameWeeks[gameSqlId];
    if (gameWeek && storeGameWeekIsFetched(gameWeek)) {
      return gameWeek;
    }
    return null;
  },
);

export const selectGameWeeksForGame = createSelector(
  [selectGameWeekState, (_, sqlId: string) => sqlId],
  (gameWeekState, gameSqlId): StoreFetchedGameWeek[] => {
    return Object.values(gameWeekState.gameWeeks).filter(
      storeGameWeekIsFetched,
    );
  },
);
