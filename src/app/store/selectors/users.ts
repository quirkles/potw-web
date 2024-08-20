import { createSelector } from "@reduxjs/toolkit";

import { StoreUser } from "@/app/store/reducers/usersReducer";
import { RootState } from "@/app/store/store";

const usersSelector = (state: RootState) => state.usersState;

export const selectUserBySqlId = createSelector(
  [usersSelector, (_, sqlId: string) => sqlId],
  (usersState, sqlId): StoreUser => {
    return usersState.users[sqlId] || null;
  },
);
