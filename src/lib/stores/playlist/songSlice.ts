import { LoadSongsParameters } from "$api/songs";
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
		},
		loadSongsDone: (state, actions: PayloadAction<SongResponse[]>) => {
			state.songs = actions.payload;
			state.loading = false;
		},
		loadSongsError: (state, actions: PayloadAction<ErrorResponse>) => {
			state.error = actions.payload;
			state.loading = true;
		},
		addSongRequested: (state, action) => state,
		addSongDone(state, action: PayloadAction<SongResponse>) {
			state.songs.push(action.payload);
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
	setCurrentSong,
} = SongSlice.actions;
export default SongSlice.reducer;
