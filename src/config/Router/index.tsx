import { LoginPage } from "$pages/Auth/Login";
import { Register } from "$pages/Auth/Register";
import { DashboardLayout } from "$pages/Dashboard/DashboardLayout";
import { AddSong } from "$pages/Dashboard/pages/AddSong/AddSong";
import { CreatePlaylist } from "$pages/Dashboard/pages/CreatePlaylist/CreatePlaylist";
import { HomeDashboard } from "$pages/Dashboard/pages/Home";
import { PlaylistPage } from "$pages/Dashboard/pages/PlaylistPage/Playlist-Page";
import { PublicDashboard } from "$pages/Dashboard/pages/Public-Playlists";
import { SharedDashboard } from "$pages/Dashboard/pages/Shared-Playlists";
import { LandingPage } from "$pages/LandingPage/LandingPage";
import { Logout } from "$pages/Logout";
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
				element: <CreatePlaylist isEdit />,
			},
			{
				path: "/dashboard/playlist/edit-song/:id",
				element: <AddSong isEdit />,
			},
		],
	},
]);
