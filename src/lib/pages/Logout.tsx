import { resetPlaylist } from "$stores/playlist/playlistSlice";
import { logout } from "$stores/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export const Logout = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(logout());
		dispatch(resetPlaylist());
	}, []);
	return <Navigate to="/auth/login/"></Navigate>;
};
