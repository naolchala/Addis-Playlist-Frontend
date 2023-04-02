import { apiUrl, authHeader } from "$config/api/api";
import { IPlaylistFormik } from "$pages/Dashboard/utils/validation-schema";
import { PlaylistType } from "$stores/playlist/playlistSlice";
import { PlaylistResponse } from "$types/playlist.types";
import axios from "axios";

export interface SearchParameters {
	token: string;
	type: PlaylistType;
	keyword?: string;
}
const searchPlaylist = async (params: SearchParameters) => {
	let playlists: PlaylistResponse[];
	if (params.type === "SHARED") {
		playlists = await axios
			.get<PlaylistResponse[]>(
				apiUrl +
					`/playlist/search-shared?keyword=${params.keyword || ""}`,
				{
					headers: {
						authorization: "Bearer " + params.token,
					},
				}
			)
			.then((res) => res.data);
	} else if (params.type === "PRIVATE") {
		playlists = await axios
			.get<PlaylistResponse[]>(
				apiUrl + `/playlist/search?keyword=${params.keyword || ""}`,
				{
					headers: {
						authorization: "Bearer " + params.token,
					},
				}
			)
			.then((res) => res.data);
	} else {
		playlists = await axios
			.get(
				apiUrl +
					`/playlist/search-public?keyword=${params.keyword || ""}`
			)
			.then((res) => res.data);
	}

	return playlists;
};
export interface AddPlaylistParams {
	token: string;
	playlist: IPlaylistFormik;
}

const addPlaylist = async ({ token, playlist }: AddPlaylistParams) => {
	const formData = new FormData();
	let key: keyof typeof playlist;
	for (key in playlist) {
		formData.append(key, playlist[key]);
	}

	const newPlaylist = await axios
		.post<PlaylistResponse>(apiUrl + "/playlist/add", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data);

	return newPlaylist;
};

export interface EditPlaylistParams extends AddPlaylistParams {
	playlistID: string;
}
const editPlaylist = async ({
	token,
	playlist,
	playlistID,
}: EditPlaylistParams) => {
	const { playlistArt, ...datas } = playlist;

	const editedPlaylist = await axios
		.post<PlaylistResponse>(
			apiUrl + "/playlist/update",
			{ id: playlistID, ...datas },
			authHeader(token)
		)
		.then((res) => res.data);

	return editedPlaylist;
};

export interface DeletePlaylistParams {
	token: string;
	playlistID: string;
}
const deletePlaylist = async ({ token, playlistID }: DeletePlaylistParams) => {
	const deletedPlaylist = await axios
		.post<PlaylistResponse>(
			apiUrl + "/playlist/delete",
			{
				id: playlistID,
			},
			authHeader(token)
		)
		.then((res) => res.data);

	return deletedPlaylist;
};

const PlaylistAPI = {
	searchPlaylist,
	addPlaylist,
	editPlaylist,
	deletePlaylist,
};

export default PlaylistAPI;
