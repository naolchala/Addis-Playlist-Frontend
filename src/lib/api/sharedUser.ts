import { apiUrl, authHeader } from "$config/api/api";
import { SharedUserResponse } from "$types/user.types";
import axios from "axios";

export interface LoadSharedParams {
	token: string;
	playlistID: string;
}

const loadSharedUsers = async ({ token, playlistID }: LoadSharedParams) => {
	const sharedUsers = await axios
		.post<SharedUserResponse[]>(
			apiUrl + "/playlist/shared-users",
			{
				playlistID,
			},
			authHeader(token)
		)
		.then((res) => res.data);

	return sharedUsers;
};

export interface AddSharedParams {
	token: string;
	playlistID: string;
	email: string;
}
const addSharedUser = async ({ token, playlistID, email }: AddSharedParams) => {
	const newUser = await axios
		.post<SharedUserResponse>(
			apiUrl + "/playlist/share-playlist",
			{ playlistID, email },
			authHeader(token)
		)
		.then((res) => res.data);

	return newUser;
};

const SharedAPI = { addSharedUser, loadSharedUsers };
export default SharedAPI;
