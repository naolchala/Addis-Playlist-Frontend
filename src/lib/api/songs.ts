import { apiUrl, authHeader } from "$config/api/api";
import { IFormikSong } from "$pages/Dashboard/utils/validation-schema";
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

export interface AddSongParams {
	token: string;
	playlistID: string;
	song: IFormikSong;
}

const addSong = async (params: AddSongParams) => {
	const { token, playlistID, song } = params;
	const newSong = await axios
		.post<SongResponse>(
			apiUrl + "/songs/add",
			{ playlistID, ...song },
			authHeader(token)
		)
		.then((res) => res.data);
	return newSong;
};

export interface EditSongParams extends Omit<AddSongParams, "playlistID"> {
	songID: string;
}

const editSong = async (params: EditSongParams) => {
	const { token, songID, song } = params;
	const editedSong = await axios
		.post<SongResponse>(
			apiUrl + "/songs/update",
			{ id: songID, ...song },
			authHeader(token)
		)
		.then((res) => res.data);
	return editedSong;
};

export interface DeleteSongParams {
	token: string;
	id: string;
}
const deleteSong = async (params: DeleteSongParams) => {
	const deletedSong = await axios
		.post<SongResponse>(
			apiUrl + "/songs/delete",
			{ id: params.id },
			authHeader(params.token)
		)
		.then((res) => res.data);
	return deletedSong;
};

const SongsAPI = {
	loadSongs,
	searchAutocomplete,
	addSong,
	editSong,
	deleteSong,
};
export default SongsAPI;
