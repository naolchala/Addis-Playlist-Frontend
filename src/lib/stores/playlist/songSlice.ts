import { DeletePlaylistParams } from "$api/playlists";
import {
	AddSongParams,
	DeleteSongParams,
	EditSongParams,
	LoadSongsParameters,
} from "$api/songs";
import { SongResponse } from "$types/songs.types";
import { ErrorResponse } from "$types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SongStateType {
	deleting: boolean;
	loading: boolean;
	songs: SongResponse[];
	error?: ErrorResponse;
	currentSong?: SongResponse;
}

const InitialSongState: SongStateType = {
	deleting: false,
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
		editSongRequest: (state, action: PayloadAction<EditSongParams>) => {
			state.loading = true;
		},
		editSongDone: (state, action: PayloadAction<SongResponse>) => {
			state.loading = false;
			state.songs = state.songs.map((song) =>
				song.id === action.payload.id ? action.payload : song
			);
		},
		deleteSongRequest: (state, action: PayloadAction<DeleteSongParams>) => {
			state.deleting = true;
		},
		deleteSongDone: (state, action: PayloadAction<SongResponse>) => {
			state.deleting = false;
			state.songs = state.songs.filter(
				(song) => song.id != action.payload.id
			);
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
	editSongRequest,
	editSongDone,
	deleteSongDone,
	deleteSongRequest,
	setCurrentSong,
} = SongSlice.actions;
export default SongSlice.reducer;
