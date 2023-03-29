import { ErrorResponse, SharedUsersResponse } from "$types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SharedUsersStateType {
	loading: boolean;
	sharedUsers: SharedUsersResponse[];
	error?: ErrorResponse;
}

const InitialSharedUsersStates: SharedUsersStateType = {
	loading: false,
	sharedUsers: [],
	error: undefined,
};

const SharedUsersSlice = createSlice({
	name: "sharedUsers",
	initialState: InitialSharedUsersStates,
	reducers: {
		loadSharedUsersRequested: (state, action) => {
			state.loading = true;
		},

		loadSharedUsersDone: (
			state,
			action: PayloadAction<SharedUsersResponse[]>
		) => {
			state.sharedUsers = action.payload;
			state.loading = false;
		},
		loadSharedUsersError: (state, action: PayloadAction<ErrorResponse>) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	loadSharedUsersDone,
	loadSharedUsersError,
	loadSharedUsersRequested,
} = SharedUsersSlice.actions;
export default SharedUsersSlice.reducer;
