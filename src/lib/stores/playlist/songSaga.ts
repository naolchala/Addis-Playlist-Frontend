import SongsAPI, {
	AddSongParams,
	DeleteSongParams,
	EditSongParams,
	LoadSongsParameters,
} from "$api/songs";
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
	deleteSongDone,
	editSongDone,
	loadSongsDone,
	songsError,
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
			yield put(songsError());
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
			yield put(songsError());
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

function* EditSong(action: PayloadAction<EditSongParams>) {
	try {
		const editedSong: SagaReturnType<typeof SongsAPI.editSong> = yield call(
			SongsAPI.editSong,
			action.payload
		);

		yield put(editSongDone(editedSong));
		yield put(
			addToast({
				colorScheme: "green",
				title: "Song Updated Successfully",
			})
		);
		const router: ReturnType<typeof createBrowserRouter> = yield getContext(
			"router"
		);

		router.navigate(-1);
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(songsError());
			yield put(
				addToast({
					title: error.response?.data.msg,
					colorScheme: "red",
				})
			);
		}
	}
}

export function* watchEditSongRequest() {
	yield takeEvery("song/editSongRequest", EditSong);
}

function* DeleteSong(action: PayloadAction<DeleteSongParams>) {
	try {
		const deletedSong: SagaReturnType<typeof SongsAPI.deleteSong> =
			yield call(SongsAPI.deleteSong, action.payload);

		yield put(deleteSongDone(deletedSong));

		yield put(
			addToast({
				colorScheme: "green",
				title: "Song Removed Successfully",
			})
		);
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(songsError());
			yield put(
				addToast({
					title: error.response?.data.msg,
					colorScheme: "red",
				})
			);
		}
	} finally {
		if (action.payload.callback) {
			action.payload.callback();
		}
	}
}

export function* watchDeleteSongRequest() {
	yield takeEvery("song/deleteSongRequest", DeleteSong);
}
