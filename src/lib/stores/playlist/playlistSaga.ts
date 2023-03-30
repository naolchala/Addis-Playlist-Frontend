import PlaylistAPI, { SearchParameters } from "$api/playlists";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, SagaReturnType, takeEvery } from "redux-saga/effects";
import { searchDone, searchError } from "./playlistSlice";

function* SearchPlaylists(action: PayloadAction<SearchParameters>) {
	try {
		const playlists: SagaReturnType<typeof PlaylistAPI.searchPlaylist> =
			yield call(PlaylistAPI.searchPlaylist, action.payload);

		yield put(searchDone(playlists));
	} catch (error) {
		if (error instanceof AxiosError) {
			yield put(searchError(error.response?.data));
		}
	}
}

export function* watchSearchRequests() {
	yield takeEvery("playlist/searchRequested", SearchPlaylists);
}
