import {
	AddSharedParams,
	DeleteSharedParams,
	LoadSharedParams,
} from "$api/sharedUser";
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
		sharedUserError: (state, action: PayloadAction<ErrorResponse>) => {
			state.error = action.payload;
			state.loading = {
				add: false,
				load: false,
				remove: false,
			};
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
		deleteSharedUserRequest: (
			state,
			action: PayloadAction<DeleteSharedParams>
		) => {
			state.loading.remove = true;
		},
		deleteSharedUserDone: (
			state,
			action: PayloadAction<SharedUserResponse>
		) => {
			state.sharedUsers = state.sharedUsers.filter(
				(user) => user.id != action.payload.id
			);
			state.loading.remove = false;
		},
	},
});

export const {
	loadSharedUsersDone,
	sharedUserError,
	loadSharedUsersRequested,
	addSharedUserDone,
	addSharedUserRequest,
	deleteSharedUserDone,
	deleteSharedUserRequest,
} = SharedUsersSlice.actions;
export default SharedUsersSlice.reducer;
