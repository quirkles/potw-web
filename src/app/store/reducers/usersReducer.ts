import { createAppSlice } from "@/app/store/createAppSlice";
import { gameSlice } from "@/app/store/reducers/gamesReducer";

import { User } from "@/app/services/schemas/user";
import { fetchUserByIdRequest } from "@/app/services/user/fetchUserById";

export type StoreUser = User & {
  fetchState: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
};

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
        };
      }
      action.payload.players.forEach((player) => {
        if (player.sqlId) {
          state.users[player.sqlId] = {
            ...state.users[player.sqlId],
            ...player,
          };
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
          game.players.forEach((player) => {
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
  },
  reducers: (create) => ({
    fetchUserById: create.asyncThunk(
      async (userId: string) => {
        return fetchUserByIdRequest(userId);
      },
      {
        pending: (state, action) => {
          state.users[action.meta.arg] = {
            ...(state.users[action.meta.arg] || {}),
            fetchState: "pending",
            error: null,
          };
        },
        fulfilled: (state, action) => {
          state.users[action.payload.sqlId] = {
            ...([action.payload.sqlId] || {}),
            ...action.payload,
            fetchState: "fulfilled",
            error: null,
          };
        },
        rejected: (state, action) => {
          state.users[action.meta.arg] = {
            ...(state.users[action.meta.arg] || {}),
            fetchState: "rejected",
            error: action.error.message || "Unknown error",
          };
        },
      },
    ),
  }),
});

// Action creators are generated for each case reducer function
export const { fetchUserById } = usersSlice.actions;

export default usersSlice.reducer;

export const usersSelectors = {
  getUserBySqlId: (
    state: { usersState: StoreUsersState },
    sqlId: string,
  ): StoreUser | null => {
    return state.usersState.users[sqlId] || null;
  },
} as const;
