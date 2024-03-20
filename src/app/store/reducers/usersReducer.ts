import {createAppSlice} from "@/app/store/createAppSlice";
import {fetchUserByIdRequest} from "@/app/services/user/fetchUserById";

type TUser = {
    sqlId?: string,
    firestoreId?: string,
    email?: string,
    username?: string,
    isFetching?: boolean,
    error?: string,
}

type TUsersState = {
    users: {
        [sqlId: string]: TUser,
    }
}

export const usersSlice = createAppSlice({
    name: 'usersState',
    initialState: {
        users: {}
    } as TUsersState,
    reducers: (create) => ({
        fetchUserById: create.asyncThunk(
            async (userId: string) => {
                return fetchUserByIdRequest(userId);
            },
            {
                pending: (state, action) => {
                    state.users[action.meta.arg] = {
                        isFetching: true
                    }
                },
                fulfilled: (state, action) => {
                    state.users[action.payload.sqlId] = action.payload;
                },
                rejected: (state, action) => {
                    state.users[action.meta.arg] = {
                        isFetching: false,
                        error: action.error.message
                    }
                },
            },
        ),
    }),
})

// Action creators are generated for each case reducer function
export const { fetchUserById } = usersSlice.actions

export default usersSlice.reducer

export const usersSelectors = {
    getUserBySqlId: (state: {usersState: TUsersState}, sqlId: string): TUser => {
        return state.usersState.users[sqlId];
    }
} as const