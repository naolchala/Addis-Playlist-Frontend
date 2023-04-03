import SongsAPI, { AddSongParams, LoadSongsParameters } from "$api/songs";
import toast, { addToast } from "$stores/utils/toast";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { createBrowserRouter } from "react-router-dom";
import {
	call,
	getContext,
	put,
	SagaReturnType,
	takeEvery,
} from "redux-saga/effects";
import {
	addSongDone,
	addSongError,
	loadSongsDone,
	loadSongsError,
} from "./songSlice";

function* LoadSongs(action: PayloadAction<LoadSongsParameters>) {
	try {
		const songs: SagaReturnType<typeof SongsAPI.loadSongs> = yield call(
			SongsAPI.loadSongs,
			action.payload
		);

		yield put(loadSongsDone(songs));
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(loadSongsError(error.response?.data));
			yield put(
				addToast({
					title: error.response?.data.msg,
					colorScheme: "red",
				})
			);
		}
	}
}

export function* watchLoadSongsRequest() {
	yield takeEvery("song/loadSongsRequested", LoadSongs);
}

function* AddSong(action: PayloadAction<AddSongParams>) {
	try {
		const newSong: SagaReturnType<typeof SongsAPI.addSong> = yield call(
			SongsAPI.addSong,
			action.payload
		);

		yield put(addSongDone(newSong));
		yield put(
			addToast({ colorScheme: "green", title: "Song Added Successfully" })
		);
		const router: ReturnType<typeof createBrowserRouter> = yield getContext(
			"router"
		);
		router.navigate(-1);
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(addSongError(error.response?.data));
			yield put(
				addToast({
					title: error.response?.data.msg,
					colorScheme: "red",
				})
			);
		}
	}
}

export function* watchAddSongRequest() {
	yield takeEvery("song/addSongRequested", AddSong);
}
