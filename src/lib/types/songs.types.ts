export interface SongResponse {
	id: string;
	title: string;
	album?: string;
	artist: string;
	duration?: number;
	releaseYear?: number;
	deezerURL?: string;
	addedAt: string;
	playlistID: string;
}
