import SharedAPI, {
	AddSharedParams,
	DeleteSharedParams,
	LoadSharedParams,
} from "$api/sharedUser";
import { addToast } from "$stores/utils/toast";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, SagaReturnType, takeEvery } from "redux-saga/effects";
import {
	addSharedUserDone,
	deleteSharedUserDone,
	loadSharedUsersDone,
	sharedUserError,
} from "./sharedUsersSlice";

function* LoadSharedUsers(action: PayloadAction<LoadSharedParams>) {
	try {
		const sharedUser: SagaReturnType<typeof SharedAPI.loadSharedUsers> =
			yield call(SharedAPI.loadSharedUsers, action.payload);

		yield put(loadSharedUsersDone(sharedUser));
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(sharedUserError(error.response?.data));
			yield put(
				addToast({
					title: error.response?.data.msg,
					colorScheme: "red",
				})
			);
		}
	}
}

export function* watchLoadSharedRequest() {
	yield takeEvery("sharedUsers/loadSharedUsersRequested", LoadSharedUsers);
}

function* AddSharedUser(action: PayloadAction<AddSharedParams>) {
	try {
		const newUser: SagaReturnType<typeof SharedAPI.addSharedUser> =
			yield call(SharedAPI.addSharedUser, action.payload);

		yield put(addSharedUserDone(newUser));
		yield put(
			addToast({
				title: "Shared to user Successfully",
				colorScheme: "green",
			})
		);
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(sharedUserError(error.response?.data));
			yield put(
				addToast({
					title: error.response?.data.msg,
					colorScheme: "red",
				})
			);
		}
	}
}

export function* watchAddSharedRequest() {
	yield takeEvery("sharedUsers/addSharedUserRequest", AddSharedUser);
}

function* DeleteSharedUser(action: PayloadAction<DeleteSharedParams>) {
	try {
		const deletedUser: SagaReturnType<typeof SharedAPI.deleteSharedUser> =
			yield call(SharedAPI.deleteSharedUser, action.payload);

		yield put(deleteSharedUserDone(deletedUser));
		yield put(
			addToast({
				title: "Unshared the playlist",
				colorScheme: "green",
			})
		);
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(sharedUserError(error.response?.data));
			yield put(
				addToast({
					title: error.response?.data.msg,
					colorScheme: "red",
				})
			);
		}
	}
}

export function* watchDeleteSharedUserRequest() {
	yield takeEvery("sharedUsers/deleteSharedUserRequest", DeleteSharedUser);
}
