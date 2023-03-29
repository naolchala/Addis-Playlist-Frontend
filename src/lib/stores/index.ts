import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sharedUsers from "./playlist/sharedUsersSlice";
import songSlice from "./playlist/songSlice";
import playlistSlice from "./playlist/playlistSlice";
import userSlice from "./user/userSlice";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		sharedUsers: sharedUsers,
		songs: songSlice,
		playlist: playlistSlice,
		user: userSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
