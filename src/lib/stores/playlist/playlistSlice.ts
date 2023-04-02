import {
	AddPlaylistParams,
	DeletePlaylistParams,
	EditPlaylistParams,
	SearchParameters,
} from "$api/playlists";
import { PlaylistResponse } from "$types/playlist.types";
import { ErrorResponse } from "$types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlaylistType = "PUBLIC" | "PRIVATE" | "SHARED";

export interface PlaylistStateType {
	loading: boolean;
	playlists: PlaylistResponse[];
	keyword?: string;
	type: PlaylistType;
	error?: any;
	currentPlaylist?: PlaylistResponse;
}

const InitialPlaylistState: PlaylistStateType = {
	loading: false,
	playlists: [],
	keyword: "",
	type: "PRIVATE",
	error: undefined,
	currentPlaylist: undefined,
};

const PlaylistSlice = createSlice({
	name: "playlist",
	initialState: InitialPlaylistState,
	reducers: {
		setType: (state, action: PayloadAction<PlaylistType>) => {
			state.type = action.payload;
		},
		setKeyword: (state, action: PayloadAction<string>) => {
			state.keyword = action.payload;
		},
		searchRequested: (state, action: PayloadAction<SearchParameters>) => {
			state.loading = true;
			state.playlists = [];
			state.error = undefined;
		},
		searchDone: (state, action: PayloadAction<PlaylistResponse[]>) => {
			state.loading = false;
			state.playlists = action.payload;
		},
		searchError: (state, action: PayloadAction<ErrorResponse>) => {
			state.loading = false;
			state.error = action.payload.msg;
		},
		setCurrentPlaylist: (
			state,
			action: PayloadAction<PlaylistResponse | undefined>
		) => {
			state.currentPlaylist = action.payload;
		},
		addPlaylistRequest: (
			state,
			action: PayloadAction<AddPlaylistParams>
		) => {
			state.loading = true;
		},
		addPlaylistDone: (state, action: PayloadAction<PlaylistResponse>) => {
			state.loading = false;
			state.playlists.unshift(action.payload);
			state.error = undefined;
		},
		addPlaylistError: (state, action: PayloadAction<ErrorResponse>) => {
			state.loading = false;
			state.error = action.payload;
		},
		editPlaylistRequest: (
			state,
			action: PayloadAction<EditPlaylistParams>
		) => {
			state.loading = true;
		},
		editPlaylistDone: (state, action: PayloadAction<PlaylistResponse>) => {
			state.loading = false;
			state.playlists = state.playlists.map((playlist) =>
				playlist.id === action.payload.id ? action.payload : playlist
			);
			state.error = undefined;
			state.currentPlaylist = action.payload;
		},
		editPlaylistError: (state, action: PayloadAction<ErrorResponse>) => {
			state.loading = false;
			state.error = action.payload;
		},
		removePlaylistRequest: (
			state,
			action: PayloadAction<DeletePlaylistParams>
		) => {
			state.loading = true;
		},
		removePlaylistDone: (
			state,
			action: PayloadAction<PlaylistResponse>
		) => {
			state.currentPlaylist = undefined;
			state.loading = false;
			state.playlists = state.playlists.filter(
				(playlist) => playlist.id !== action.payload.id
			);
		},
		removePlaylistError: (state, action: PayloadAction<ErrorResponse>) => {
			state.loading = false;
			state.error = action.payload;
		},
		resetPlaylist: (state) => {
			return InitialPlaylistState;
		},
	},
});

export const {
	searchDone,
	searchError,
	searchRequested,
	setType,
	resetPlaylist,
	setCurrentPlaylist,
	addPlaylistRequest,
	addPlaylistDone,
	addPlaylistError,
	editPlaylistDone,
	editPlaylistRequest,
	editPlaylistError,
	removePlaylistDone,
	removePlaylistError,
	removePlaylistRequest,
} = PlaylistSlice.actions;

export default PlaylistSlice.reducer;
