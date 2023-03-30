// export const apiUrl = "https://addis-playlist-backend.netlify.app/api";
export const apiUrl = "http://localhost:3000/api";
export const authHeader = (token: string) => ({
	headers: { authorization: `Bearer ${token}` },
});
