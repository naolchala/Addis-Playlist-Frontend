import { AddSong } from "$pages/dashboard/AddSong";
import { CreatePlaylist } from "$pages/dashboard/CreatePlaylist";
import { DashboardLayout } from "$pages/dashboard/DashboardLayout";
import { HomeDashboard } from "$pages/dashboard/Home";
import { PlaylistPage } from "$pages/dashboard/PlaylistPage";
import { PublicDashboard } from "$pages/dashboard/PublicPlaylists";
import { SharedDashboard } from "$pages/dashboard/SharedPlaylists";
import { LandingPage } from "$pages/LandingPage";
import { LoginPage } from "$pages/Login";
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
		],
	},
]);
