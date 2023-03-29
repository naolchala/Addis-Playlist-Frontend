import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, SagaReturnType, takeEvery } from "redux-saga/effects";
import UserApi, { LoginParameters, SignupParameters } from "$api/user";
import { loginDone, loginError, signUpRequest } from "./userSlice";
import { AxiosError } from "axios";

function* Login(action: PayloadAction<LoginParameters>) {
	try {
		let user: SagaReturnType<typeof UserApi.login> = yield call(
			UserApi.login,
			action.payload
		);

		yield put(loginDone(user));
	} catch (e) {
		if (e instanceof AxiosError) {
			yield put(loginError(e.response?.data));
		}
	}
}

function* SignUp(action: PayloadAction<SignupParameters>) {
	try {
		let user: SagaReturnType<typeof UserApi.signUp> = yield call(
			UserApi.signUp,
			action.payload
		);
		yield put(loginDone(user));
	} catch (e) {
		if (e instanceof AxiosError) {
			yield put(loginError(e.response?.data));
		}
	}
}

export function* watchLogin() {
	yield takeEvery("user/loginRequest", Login);
}
export function* watchSignup() {
	yield takeEvery("user/signUpRequest", SignUp);
}
