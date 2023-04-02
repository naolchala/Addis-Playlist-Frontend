import PlaylistAPI, {
	AddPlaylistParams,
	DeletePlaylistParams,
	EditPlaylistParams,
	SearchParameters,
} from "$api/playlists";
import { addToast } from "$stores/utils/toast";
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
	addPlaylistDone,
	addPlaylistError,
	editPlaylistDone,
	editPlaylistError,
	removePlaylistDone,
	removePlaylistError,
	searchDone,
	searchError,
	setCurrentPlaylist,
} from "./playlistSlice";

function* SearchPlaylists(action: PayloadAction<SearchParameters>) {
	try {
		const playlists: SagaReturnType<typeof PlaylistAPI.searchPlaylist> =
			yield call(PlaylistAPI.searchPlaylist, action.payload);

		yield put(searchDone(playlists));
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(searchError(error.response?.data));
			yield put(
				addToast({
					colorScheme: "red",
					title: error.response?.data.msg,
				})
			);
		}
	}
}

export function* watchSearchRequests() {
	yield takeEvery("playlist/searchRequested", SearchPlaylists);
}

function* AddPlaylist(action: PayloadAction<AddPlaylistParams>) {
	try {
		const newPlaylist: SagaReturnType<typeof PlaylistAPI.addPlaylist> =
			yield call(PlaylistAPI.addPlaylist, action.payload);

		yield put(addPlaylistDone(newPlaylist));
		const router: ReturnType<typeof createBrowserRouter> = yield getContext(
			"router"
		);

		router.navigate(-1);
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(addPlaylistError(error.response?.data));
			yield put(
				addToast({
					colorScheme: "red",
					title: error.response?.data.msg,
				})
			);
		}
	}
}
export function* watchAddPlaylistRequest() {
	yield takeEvery("playlist/addPlaylistRequest", AddPlaylist);
}

function* EditPlaylist(action: PayloadAction<EditPlaylistParams>) {
	try {
		const newPlaylist: SagaReturnType<typeof PlaylistAPI.editPlaylist> =
			yield call(PlaylistAPI.editPlaylist, action.payload);

		yield put(editPlaylistDone(newPlaylist));
		const router: ReturnType<typeof createBrowserRouter> = yield getContext(
			"router"
		);
		yield put(
			addToast({
				colorScheme: "green",
				title: "Playlist Updated Successfully",
			})
		);

		router.navigate(-1);
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(editPlaylistError(error.response?.data));
			yield put(
				addToast({
					colorScheme: "red",
					title: error.response?.data.msg,
				})
			);
		}
	}
}

export function* watchEditPlaylistRequest() {
	yield takeEvery("playlist/editPlaylistRequest", EditPlaylist);
}

function* DeletePlaylist(action: PayloadAction<DeletePlaylistParams>) {
	try {
		const deletedPlaylist: SagaReturnType<
			typeof PlaylistAPI.deletePlaylist
		> = yield call(PlaylistAPI.deletePlaylist, action.payload);

		yield put(removePlaylistDone(deletedPlaylist));
		const router: ReturnType<typeof createBrowserRouter> = yield getContext(
			"router"
		);
		yield put(
			addToast({
				colorScheme: "green",
				title: "Playlist Deleted Successfully",
			})
		);

		router.navigate(-1);
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(removePlaylistError(error.response?.data));
			yield put(
				addToast({
					colorScheme: "red",
					title: error.response?.data.msg,
				})
			);
		}
	}
}
export function* watchDeletePlaylistRequest() {
	yield takeEvery("playlist/removePlaylistRequest", DeletePlaylist);
}
