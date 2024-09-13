import { createSelector } from "reselect";

import { RootState } from "@/app/store/store";

import {
  StoreFetchedGameWeek,
  storeGameWeekIsFetched,
} from "@/app/services/schemas/store/gameWeek";

export const selectGameWeekState = (state: RootState) => state.gameWeekState;

export const selectGameWeeksForGame = createSelector(
  [selectGameWeekState, (_, sqlId: string) => sqlId],
  (gameWeekState, gameSqlId): StoreFetchedGameWeek[] => {
    return Object.values(gameWeekState.gameWeeks).filter(
      storeGameWeekIsFetched,
    );
  },
);
