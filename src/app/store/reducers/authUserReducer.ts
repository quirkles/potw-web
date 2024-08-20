import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Maybe } from "@/utils/typeUtils";

type IAuthUser = Maybe<
  Partial<{
    email: string;
    firestoreId: string;
    sqlId: string;
  }>
>;

export const authUserSlice = createSlice({
  name: "authUser",
  initialState: {} as IAuthUser,
  reducers: {
    initializeAuthUser: (
      state: IAuthUser,
      action: PayloadAction<IAuthUser>,
    ) => {
      const { email, firestoreId, sqlId } = action?.payload || {};
      state = state || {};
      if (firestoreId) {
        state.firestoreId = firestoreId;
      }
      if (sqlId) {
        state.sqlId = sqlId;
      }
      if (email) {
        state.email = email;
      }
    },
    setAuthUserField: <T extends keyof IAuthUser>(
      state: IAuthUser,
      action: PayloadAction<{ field: T; value: IAuthUser[T] }>,
    ) => {
      if (state !== null) {
        state[action.payload.field] = action.payload.value;
      } else {
        state = { [action.payload.field]: action.payload.value };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { initializeAuthUser, setAuthUserField } = authUserSlice.actions;

export default authUserSlice.reducer;

export const authUserSelectors = {
  getAuthUser: (state: { authUser: IAuthUser }): IAuthUser => {
    return state.authUser;
  },
} as const;
