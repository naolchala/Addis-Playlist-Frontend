import { AddSong } from "$pages/dashboard/AddSong";
import { CreatePlaylist } from "$pages/dashboard/CreatePlaylist";
import { DashboardLayout } from "$pages/dashboard/DashboardLayout";
import { EditPlaylist } from "$pages/dashboard/EditPlaylist";
import { EditSong } from "$pages/dashboard/EditSong";
import { HomeDashboard } from "$pages/dashboard/Home";
import { PlaylistPage } from "$pages/dashboard/PlaylistPage";
import { PublicDashboard } from "$pages/dashboard/PublicPlaylists";
import { SharedDashboard } from "$pages/dashboard/SharedPlaylists";
import { LandingPage } from "$pages/LandingPage";
import { LoginPage } from "$pages/Login";
import { Logout } from "$pages/Logout";
import { Register } from "$pages/Register";
import { createBrowserRouter } from "react-router-dom";

export const routerConfig = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/auth/register",
		element: <Register />,
	},
	{
		path: "/auth/login",
		element: <LoginPage />,
	},
	{
		path: "/logout",
		element: <Logout />,
	},
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		children: [
			{
				path: "/dashboard/",
				element: <HomeDashboard />,
			},
			{
				path: "/dashboard/create-playlist",
				element: <CreatePlaylist />,
			},
			{
				path: "/dashboard/shared",
				element: <SharedDashboard />,
			},
			{
				path: "/dashboard/public",
				element: <PublicDashboard />,
			},
			{
				path: "/dashboard/playlist/:id",
				element: <PlaylistPage />,
			},
			{
				path: "/dashboard/playlist/add-song/:id",
				element: <AddSong />,
			},
			{
				path: "/dashboard/playlist/edit/:id",
				element: <EditPlaylist />,
			},
			{
				path: "/dashboard/playlist/edit-song/:id",
				element: <EditSong />,
			},
		],
	},
]);
