import { ErrorResponse, UserResponse } from "$types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginParameters, SignupParameters } from "../../api/user";

export interface UserStateType {
	loading: boolean;
	error?: ErrorResponse;
	user?: UserResponse;
}

const InitialUserState: UserStateType = {
	loading: false,
	error: undefined,
	user: undefined,
};

const UserSlice = createSlice({
	name: "user",
	initialState: InitialUserState,
	reducers: {
		loginRequest: (state, action: PayloadAction<LoginParameters>) => {
			state.loading = true;
		},
		loginDone: (state, action: PayloadAction<UserResponse>) => {
			state.user = action.payload;
			state.loading = false;
		},
		loginError: (state, action: PayloadAction<ErrorResponse>) => {
			state.error = action.payload;
			state.loading = false;
		},
		signUpRequest: (state, action: PayloadAction<SignupParameters>) => {
			state.loading = true;
		},
		logout: (state, action) => {
			state.user = undefined;
		},
	},
});

export const { loginDone, loginError, loginRequest, signUpRequest, logout } =
	UserSlice.actions;
export default UserSlice.reducer;
