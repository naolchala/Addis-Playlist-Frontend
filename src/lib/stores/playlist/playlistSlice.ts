import { SearchParameters } from "$api/playlists";
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
			state.playlists = [];
		},
		setKeyword: (state, action: PayloadAction<string>) => {
			state.keyword = action.payload;
		},
		searchRequested: (state, action: PayloadAction<SearchParameters>) => {
			state.loading = true;
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
			action: PayloadAction<PlaylistResponse>
		) => {
			state.currentPlaylist = action.payload;
		},
		addPlaylist: (state, action: PayloadAction<PlaylistResponse>) => {
			state.playlists.push(action.payload);
		},
		removePlaylist: (state, action: PayloadAction<PlaylistResponse>) => {},
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
} = PlaylistSlice.actions;

export default PlaylistSlice.reducer;
