import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { mediaQuery } from "$config/Theme/sizes";
import styled from "@emotion/styled";

export const SongCardContainer = styled.div(
	mediaQuery({
		display: "flex",
		minWidth: "700px",
		width: "100%",
		alignItems: "center",
		color: "white",
		padding: "10px",
		borderRadius: "4px",
		transition: "all 300ms ease-out",

		":hover": {
			background: colors.whiteAlpha[100],
		},
	})
);
export const SongArtContainer = styled.div({
	borderRadius: "4px",
	border: "2px solid " + colors.blue[800],
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "50px",
	height: "50px",
	fontSize: "1.6em",
	background: colors.blue[900] + "aa",
	color: colors.blue[100],
	marginRight: "20px",
});

export const SongArtImage = styled.img({
	width: "50px",
	height: "50px",
	marginRight: "20px",
	borderRadius: "4px",
	objectFit: "cover",
});

export const SongTitle = styled.a({
	fontFamily: fonts.body,
	fontWeight: "bold",
	color: "white",
	fontSize: "1.1em",
	marginBottom: "3px",
});

export const SongArtist = styled.span({
	fontSize: "0.9em",
});

export const SongProperty = styled.span({
	fontWeight: "bold",
});
