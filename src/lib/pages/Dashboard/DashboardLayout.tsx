import { Background, DashboardBackground } from "$components/Background";
import {
	DashboardContainer,
	DashboardOutletContainer,
	DashboardSideNav,
	SideNavItem,
	SideNavTitle,
} from "./Dashboard.styles";
import { Spacer } from "$pages/Auth/Auth.style";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { searchRequested } from "$stores/playlist/playlistSlice";
import { useEffect } from "react";
import {
	BiAddToQueue,
	BiHomeAlt,
	BiLogOutCircle,
	BiShareAlt,
	BiWorld,
} from "react-icons/bi";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastProvider } from "$components/Layout/Toast/ToastProvider";

export const DashboardLayout = () => {
	const user = useAppSelector((state) => state.user);
	const playlist = useAppSelector((state) => state.playlist);
	const dispatch = useAppDispatch();
	const route = useNavigate();

	useEffect(() => {
		if (!user.user) {
			route("/auth/login/");
		}
	}, [user.user]);

	useEffect(() => {
		if (user.user) {
			dispatch(
				searchRequested({
					keyword: playlist.keyword,
					type: playlist.type,
					token: user.user?.token || "",
				})
			);
		}
	}, [playlist.type, playlist.keyword]);

	return (
		<DashboardBackground>
			<DashboardContainer>
				<DashboardSideNav>
					<SideNavTitle>
						<div>Addis</div>
						<div>Playlist</div>
					</SideNavTitle>
					<SideNavItem
						to={"/dashboard/"}
						label="Home"
						icon={<BiHomeAlt />}
					/>
					<SideNavItem
						to={"/dashboard/create-playlist"}
						label="Create Playlist"
						icon={<BiAddToQueue />}
					/>
					<SideNavItem
						to={"/dashboard/shared"}
						label="Shared with me"
						icon={<BiShareAlt />}
					/>
					<SideNavItem
						to={"/dashboard/public"}
						label="Public Playlists"
						icon={<BiWorld />}
					/>
					<Spacer />

					<SideNavItem
						to={"/logout"}
						label="Logout"
						icon={<BiLogOutCircle />}
					/>
				</DashboardSideNav>
				<DashboardOutletContainer>
					<Outlet></Outlet>
				</DashboardOutletContainer>
				<ToastProvider />
			</DashboardContainer>
		</DashboardBackground>
	);
};
