import { createSelector } from "reselect";

import { RootState } from "@/app/store/store";

import {
  StoreFetchedGameWeek,
  StoreGameWeek,
  storeGameWeekIsFetched,
} from "@/app/services/schemas/store/gameWeek";

export const selectGameWeekState = (state: RootState) => state.gameWeekState;

export const selectGameWeekBySqlId = createSelector(
  [selectGameWeekState, (_, sqlId: string) => sqlId],
  (gameWeeksState, gameSqlId): StoreGameWeek | null => {
    return gameWeeksState.gameWeeks[gameSqlId] || null;
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
