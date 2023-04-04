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
		},
		loadSongsDone: (state, actions: PayloadAction<SongResponse[]>) => {
			state.songs = actions.payload;
			state.loading = false;
		},
		addSongRequested: (state, action: PayloadAction<AddSongParams>) => {
			state.loading = true;
		},
		addSongDone(state, action: PayloadAction<SongResponse>) {
			state.songs.push(action.payload);
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
		songsError: (state) => {
			state.loading = false;
			state.deleting = false;
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
	loadSongsRequested,
	addSongRequested,
	addSongDone,
	editSongRequest,
	editSongDone,
	deleteSongDone,
	deleteSongRequest,
	setCurrentSong,
	songsError,
} = SongSlice.actions;
export default SongSlice.reducer;
