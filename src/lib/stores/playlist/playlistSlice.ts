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
	type: "PUBLIC",
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
		searchRequested: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.keyword = action.payload;
		},
		searchDone: (state, action: PayloadAction<PlaylistResponse[]>) => {
			state.loading = false;
			state.playlists = action.payload;
		},
		searchError: (state, action: PayloadAction<ErrorResponse>) => {
			state.loading = false;
			state.error = action.payload.msg;
		},

		addPlaylist: (state, action: PayloadAction<PlaylistResponse>) => {
			state.playlists.push(action.payload);
		},

		removePlaylist: (state, action: PayloadAction<PlaylistResponse>) => {},
	},
});

export const { searchDone, searchError, searchRequested, setType } =
	PlaylistSlice.actions;

export default PlaylistSlice.reducer;
