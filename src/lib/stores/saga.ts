import { all } from "redux-saga/effects";
import {
	watchAddPlaylistRequest,
	watchDeletePlaylistRequest,
	watchEditPlaylistRequest,
	watchSearchRequests,
} from "./playlist/playlistSaga";
import {
	watchAddSongRequest,
	watchLoadSongsRequest,
} from "./playlist/songSaga";
import { watchLogin, watchSignup } from "./user/userSaga";

export function* rootSaga() {
	yield all([
		watchLogin(),
		watchSignup(),
		watchSearchRequests(),
		watchLoadSongsRequest(),
		watchAddPlaylistRequest(),
		watchEditPlaylistRequest(),
		watchDeletePlaylistRequest(),
		watchAddSongRequest(),
	]);
}
