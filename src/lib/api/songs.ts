import { apiUrl, authHeader } from "$config/api/api";
import { DeezerSongResponse, SongResponse } from "$types/songs.types";
import axios from "axios";

export interface LoadSongsParameters {
	token: string;
	playlistID: string;
}
const loadSongs = async (params: LoadSongsParameters) => {
	const songs = await axios
		.post<SongResponse[]>(
			apiUrl + "/songs/get-songs",
			{
				playlistID: params.playlistID,
			},
			authHeader(params.token)
		)
		.then((res) => res.data);

	return songs;
};

const searchAutocomplete = async (title: string) => {
	const songs = await axios
		.get<DeezerSongResponse[]>(apiUrl + `/songs/autocomplete?q=${title}`)
		.then((res) => res.data);

	return songs;
};

const SongsAPI = { loadSongs, searchAutocomplete };
export default SongsAPI;
