import { createSelector } from "@reduxjs/toolkit";

import { isFetchedUser } from "@/app/store/reducers/usersReducer";
import { RootState } from "@/app/store/store";

import { StoreFetchedUser, StoreUser } from "@/app/services/schemas/store/user";

const usersSelector = (state: RootState) => state.usersState;

export const selectUserBySqlId = createSelector(
  [usersSelector, (_, sqlId: string) => sqlId],
  (usersState, sqlId): StoreUser => {
    return usersState.users[sqlId] || null;
  },
);

export const selectUsersBySqlIds = createSelector(
  [usersSelector, (_, sqlIds: string[]) => sqlIds],
  (usersState, sqlIds): StoreUser[] => {
    return sqlIds.map((sqlId) => usersState.users[sqlId]);
  },
);

export const selectFetchedUsersBySqlIds = createSelector(
  [selectUsersBySqlIds],
  (users): StoreFetchedUser[] => {
    return users.filter(isFetchedUser);
  },
);
