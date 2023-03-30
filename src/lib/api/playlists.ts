import { apiUrl } from "$config/api/api";
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

const PlaylistAPI = { searchPlaylist };

export default PlaylistAPI;
