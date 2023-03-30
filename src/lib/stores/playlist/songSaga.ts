import SongsAPI, { LoadSongsParameters } from "$api/songs";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, SagaReturnType, takeEvery } from "redux-saga/effects";
import { loadSongsDone, loadSongsError } from "./songSlice";

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
		}
	}
}

export function* watchLoadSongsRequest() {
	yield takeEvery("song/loadSongsRequested", LoadSongs);
}
