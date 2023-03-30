import { Visibility } from "$types/playlist.types";
import * as yup from "yup";

export interface IPlaylistFormik {
	label: string;
	desc: string;
	visibility: Visibility;
	playlistArt: any;
}

export const playlistSchema = yup.object().shape({
	label: yup.string().required("Please, provide label of the playlist"),
	desc: yup.string(),
	visibility: yup
		.string()
		.oneOf(["PUBLIC", "PRIVATE"], "only public or Private are allowed"),
});

export interface IFormikSong {
	title: string;
	album?: string;
	artist: string;
	releaseYear?: number;
	duration: number;
	deezerURL?: string;
}

export const songSchema = yup.object().shape({
	title: yup.string().required("Please, Enter the title of the song"),
	album: yup.string(),
	artist: yup.string(),
});
