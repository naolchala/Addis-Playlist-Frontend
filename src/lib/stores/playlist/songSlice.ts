import { AddSongParams, LoadSongsParameters } from "$api/songs";
import { SongResponse } from "$types/songs.types";
import { ErrorResponse } from "$types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SongStateType {
	loading: boolean;
	songs: SongResponse[];
	error?: ErrorResponse;
	currentSong?: SongResponse;
}

const InitialSongState: SongStateType = {
	loading: false,
	songs: [],
};

const SongSlice = createSlice({
	name: "song",
	initialState: InitialSongState,
	reducers: {
		loadSongsRequested: (
			state,
			action: PayloadAction<LoadSongsParameters>
		) => {
			state.loading = true;
			state.songs = [];
			state.error = undefined;
		},
		loadSongsDone: (state, actions: PayloadAction<SongResponse[]>) => {
			state.songs = actions.payload;
			state.loading = false;
		},
		loadSongsError: (state, actions: PayloadAction<ErrorResponse>) => {
			state.error = actions.payload;
			state.loading = false;
		},
		addSongRequested: (state, action: PayloadAction<AddSongParams>) => {
			state.loading = true;
		},
		addSongDone(state, action: PayloadAction<SongResponse>) {
			state.songs.push(action.payload);
			state.loading = false;
			state.error = undefined;
		},
		addSongError: (state, action: PayloadAction<ErrorResponse>) => {
			state.error = action.payload;
			state.loading = false;
		},
		setCurrentSong: (
			state,
			actions: PayloadAction<SongResponse | undefined>
		) => {
			state.currentSong = actions.payload;
		},
	},
});

export const {
	loadSongsDone,
	loadSongsError,
	loadSongsRequested,
	addSongRequested,
	addSongDone,
	addSongError,
	setCurrentSong,
} = SongSlice.actions;
export default SongSlice.reducer;
