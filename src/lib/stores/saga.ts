import { all } from "redux-saga/effects";
import { watchSearchRequests } from "./playlist/playlistSaga";
import { watchLogin, watchSignup } from "./user/userSaga";

export function* rootSaga() {
	yield all([watchLogin(), watchSignup(), watchSearchRequests()]);
}
