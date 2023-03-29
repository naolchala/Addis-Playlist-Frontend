import { all } from "redux-saga/effects";
import { watchLogin, watchSignup } from "./user/userSaga";

export function* rootSaga() {
	yield all([watchLogin(), watchSignup()]);
}
