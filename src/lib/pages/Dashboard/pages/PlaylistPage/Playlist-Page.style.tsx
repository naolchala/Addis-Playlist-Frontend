import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { ISongCard } from "$pages/Dashboard/components/Songs/SongItem";
import styled from "@emotion/styled";

export const PlaylistImage = styled.img({
	objectFit: "cover",
	width: "220px",
	height: "220px",
	borderRadius: "10px",
});
export const PlaylistHeader = styled.h1({
	fontFamily: fonts.body,
	fontSize: "2.0em",
	marginBottom: "10px",
});
export const PlaylistProperty = styled.span({
	textTransform: "uppercase",
	padding: "4px 10px",
	background: colors.whiteAlpha[300],
	borderRadius: "10px",
	fontSize: "0.9em",
	fontWeight: "bold",
});
export const PlaylistDescription = styled.p({
	lineHeight: "1.5em",
	fontSize: ".91em",
	marginBottom: "40px",
});

export const ExampleSong: ISongCard = {
	id: "123",
	title: "Rasputin",
	album: "Rasputin",
	artist: "Majestic",
	addedAt: new Date().toDateString(),
	playlistID: "1234",
	deezerURL: "https://www.deezer.com/track/1242670642",
	releaseYear: 2018,
	duration: 220,
};

export const Divider = styled.div({
	display: "block",
	height: "1px",
	background: colors.whiteAlpha[200],
});
