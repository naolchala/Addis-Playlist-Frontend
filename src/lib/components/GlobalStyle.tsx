import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { css } from "@emotion/react";

export const GlobalStyle = css`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: ${fonts.body};
	}

	body {
		margin: 0;
		width: 100%;
		height: 100vh;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: ${fonts.header};
	}

	a {
		text-decoration: none;
		color: ${colors.blue};
	}
`;
