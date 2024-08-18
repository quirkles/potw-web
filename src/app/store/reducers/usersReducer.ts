import { createAppSlice } from "@/app/store/createAppSlice";
import { fetchUserByIdRequest } from "@/app/services/user/fetchUserById";
import { fetchGame } from "@/app/services/game/createGame";
import { gameSlice } from "@/app/store/reducers/gamesReducer";

export type TUser = {
  sqlId: string | null;
  firestoreId: string | null;
  email: string | null;
  username: string | null;
  isFetching: boolean | null;
  error: string | null;
};

export type TUsersState = {
  users: {
    [sqlId: string]: TUser;
  };
};

export const usersSlice = createAppSlice({
  name: "usersState",
  initialState: {
    users: {},
  } as TUsersState,
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
            isFetching: true,
            error: null,
          };
        },
        fulfilled: (state, action) => {
          state.users[action.payload.sqlId] = {
            ...([action.payload.sqlId] || {}),
            ...action.payload,
            isFetching: false,
            error: null,
          };
        },
        rejected: (state, action) => {
          state.users[action.meta.arg] = {
            ...(state.users[action.meta.arg] || {}),
            isFetching: false,
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
    state: { usersState: TUsersState },
    sqlId: string,
  ): TUser | null => {
    return state.usersState.users[sqlId] || null;
  },
} as const;
