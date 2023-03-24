export type Visibility = "PUBLIC" | "PRIVATE";

export interface PlaylistResponse {
	id: string;
	label: string;
	desc?: string;
	visibility: Visibility;
	playlistArtURL?: string;
	favorite: boolean;
	createdAt: string;
	userID: string;
	_count?: {
		SharedPlaylist: 0;
		Songs: 0;
	};
}
