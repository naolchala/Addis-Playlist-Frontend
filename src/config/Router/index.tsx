import { DashboardLayout } from "$pages/dashboard/DashboardLayout";
import { HomeDashboard } from "$pages/dashboard/Home";
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
		],
	},
]);
