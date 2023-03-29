import { GlobalStyle } from "$components/GlobalStyle";
import { routerConfig } from "$config/Router";
import { store } from "$stores/index";
import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<Global styles={GlobalStyle}></Global>
			<RouterProvider router={routerConfig}></RouterProvider>
		</Provider>
	</React.StrictMode>
);
