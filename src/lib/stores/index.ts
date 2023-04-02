import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sharedUsers from "./playlist/sharedUsersSlice";
import songSlice from "./playlist/songSlice";
import playlistSlice from "./playlist/playlistSlice";
import userSlice from "./user/userSlice";
import toastSlice from "./utils/toast";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./saga";
import { routerConfig } from "$config/Router";

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.setContext({
	router: routerConfig,
});

const store = configureStore({
	reducer: {
		sharedUsers: sharedUsers,
		songs: songSlice,
		playlist: playlistSlice,
		user: userSlice,
		toast: toastSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
