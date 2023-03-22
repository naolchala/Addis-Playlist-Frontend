import { GlobalStyle } from "$components/GlobalStyle";
import { routerConfig } from "$config/Router";
import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Global styles={GlobalStyle}></Global>
		<RouterProvider router={routerConfig}></RouterProvider>
	</React.StrictMode>
);
