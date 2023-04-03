import { AddSharedParams, LoadSharedParams } from "$api/sharedUser";
import { ErrorResponse, SharedUserResponse } from "$types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SharedUsersStateType {
	loading: {
		load: boolean;
		add: boolean;
		remove: boolean;
	};
	sharedUsers: SharedUserResponse[];
	error?: ErrorResponse;
}

const InitialSharedUsersStates: SharedUsersStateType = {
	loading: {
		load: false,
		add: false,
		remove: false,
	},
	sharedUsers: [],
	error: undefined,
};

const SharedUsersSlice = createSlice({
	name: "sharedUsers",
	initialState: InitialSharedUsersStates,
	reducers: {
		loadSharedUsersRequested: (
			state,
			action: PayloadAction<LoadSharedParams>
		) => {
			state.loading.load = true;
		},
		loadSharedUsersDone: (
			state,
			action: PayloadAction<SharedUserResponse[]>
		) => {
			state.sharedUsers = action.payload;
			state.loading.load = false;
		},
		loadSharedUsersError: (state, action: PayloadAction<ErrorResponse>) => {
			state.error = action.payload;
			state.loading.load = false;
		},
		addSharedUserRequest: (
			state,
			action: PayloadAction<AddSharedParams>
		) => {
			state.loading.add = true;
		},
		addSharedUserDone: (
			state,
			action: PayloadAction<SharedUserResponse>
		) => {
			state.loading.add = false;
			state.sharedUsers.unshift(action.payload);
		},
	},
});

export const {
	loadSharedUsersDone,
	loadSharedUsersError,
	loadSharedUsersRequested,
	addSharedUserDone,
	addSharedUserRequest,
} = SharedUsersSlice.actions;
export default SharedUsersSlice.reducer;
