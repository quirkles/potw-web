import { createAppSlice } from "@/app/store/createAppSlice";
import { gameSlice } from "@/app/store/reducers/gamesReducer";

import { StoreFetchedUser, StoreUser } from "@/app/services/schemas/store/user";
import { User } from "@/app/services/schemas/backend/user";
import {
  fetchUserByIdRequest,
  updateUserRequest,
} from "@/app/services/backend/user/fetchUserById";
import { userToStoreUser } from "@/app/services/backend/user/transformers";

export type StoreUsersState = {
  users: {
    [sqlId: string]: StoreUser;
  };
};

export const usersSlice = createAppSlice({
  name: "usersState",
  initialState: {
    users: {},
  } as StoreUsersState,
  extraReducers: (builder) => {
    builder.addCase(gameSlice.actions.fetchGame.fulfilled, (state, action) => {
      if (action.payload.admin) {
        state.users[action.payload.admin.sqlId] = {
          ...state.users[action.payload.admin.sqlId],
          ...action.payload.admin,
          status: "fetched",
        } as StoreFetchedUser;
      }
      (action.payload.players || []).forEach((player) => {
        if (player.sqlId) {
          state.users[player.sqlId] = {
            ...state.users[player.sqlId],
            ...player,
            status: "fetched",
          } as StoreFetchedUser;
        }
      });
    });
    builder.addCase(
      gameSlice.actions.fetchGamesForUser.fulfilled,
      (state, action) => {
        for (const game of action.payload) {
          if (game.admin) {
            state.users[game.admin.sqlId] = {
              ...state.users[game.admin.sqlId],
              ...game.admin,
            };
          }
          (game.players || []).forEach((player) => {
            if (player.sqlId) {
              state.users[player.sqlId] = {
                ...state.users[player.sqlId],
                ...player,
              };
            }
          });
        }
      },
    );
    builder.addCase(gameSlice.actions.fetchGames.fulfilled, (state, action) => {
      for (const game of action.payload) {
        if (game.admin) {
          state.users[game.admin.sqlId] = {
            ...state.users[game.admin.sqlId],
            ...game.admin,
          };
        }
        (game.players || []).forEach((player) => {
          if (player.sqlId) {
            state.users[player.sqlId] = {
              ...state.users[player.sqlId],
              ...player,
            };
          }
        });
      }
    });
  },
  reducers: (create) => ({
    fetchUserById: create.asyncThunk(fetchUserByIdRequest, {
      pending: (state, action) => {
        state.users[action.meta.arg] = {
          ...(state.users[action.meta.arg] || {}),
          status: "pending",
        };
      },
      fulfilled: (state, action) => {
        state.users[action.meta.arg] = userToStoreUser(action.payload);
      },
      rejected: (state, action) => {
        state.users[action.meta.arg] = {
          ...(state.users[action.meta.arg] || {}),
          status: "failed",
          error: action.error.message || "Unknown error",
        };
      },
    }),
    updateUserField: create.asyncThunk(
      async <T extends keyof User>(params: {
        userId: string;
        field: T;
        value: User[T];
      }) => {
        return updateUserRequest({
          sqlId: params.userId,
          [params.field]: params.value,
        });
      },
      {
        pending: (state, action) => {},
        fulfilled: (state, action) => {
          if (state.users[action.meta.arg.userId]) {
            state.users[action.meta.arg.userId] = {
              ...state.users[action.meta.arg.userId],
              ...action.payload,
            };
          }
        },
        rejected: (state, action) => {},
      },
    ),
  }),
});

// Action creators are generated for each case reducer function
export const { fetchUserById, updateUserField } = usersSlice.actions;

export default usersSlice.reducer;

export function isFetchedUser(user: StoreUser): user is StoreFetchedUser {
  return user.status === "fetched";
}
