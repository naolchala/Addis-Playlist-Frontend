import { Flex } from "$components/Layout/Flex";
import { IconButton } from "$components/Layout/IconButton";
import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { getTimeInMinutes } from "$config/utils/dayjs";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { FC } from "react";
import { BiDotsVerticalRounded, BiMusic } from "react-icons/bi";

export const PlaylistImage = styled.img({
	objectFit: "cover",
	width: "220px",
	height: "220px",
	borderRadius: "10px",
});
export const PlaylistHeader = styled.h1({
	fontFamily: fonts.body,
	fontSize: "2.0em",
	// fontWeight: "black",
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
interface ISongCard {
	id: string;
	title: string;
	album?: string;
	artists: string[];
	duration?: string;
	releaseYear: number | null;
	deezerURL?: string;
	addedAt: Date;
	playlistID: string;
}

export const ExampleSong: ISongCard = {
	id: "123",
	title: "Rasputin",
	album: "Rasputin",
	artists: ["Majestic"],
	addedAt: new Date(),
	playlistID: "1234",
	deezerURL: "https://www.deezer.com/track/1242670642",
	releaseYear: 2018,
	duration: "220",
};

export const SongCard: FC<ISongCard> = (props) => {
	return (
		<SongCardContainer href={props.deezerURL}>
			<SongArtContainer>
				<BiMusic />
			</SongArtContainer>
			<Flex
				direction={"row"}
				flex="1"
				alignItems={"center"}
				justifyContent="space-between"
			>
				<Flex direction={"column"}>
					<SongTitle>{props.title}</SongTitle>
					<SongArtist>{props.artists.join(", ")}</SongArtist>
				</Flex>
				<Flex direction={"column"}>
					<small>Album</small>
					<SongProperty>{props.album}</SongProperty>
				</Flex>
				<Flex direction={"column"}>
					<small>Duration</small>
					<SongProperty>
						{getTimeInMinutes(props?.duration || "0")}
					</SongProperty>
				</Flex>
				<Flex direction={"column"}>
					<small>Year</small>
					<SongProperty>{props.releaseYear}</SongProperty>
				</Flex>
				<Flex>
					<IconButton
						icon={<BiDotsVerticalRounded />}
						size="xl"
					></IconButton>
				</Flex>
			</Flex>
		</SongCardContainer>
	);
};

const SongCardContainer = styled.a({
	display: "flex",
	width: "100%",
	alignItems: "center",
	color: "white",
	padding: "10px",
	borderRadius: "4px",
	transition: "all 300ms ease-out",

	":hover": {
		background: colors.whiteAlpha[100],
	},
});
const SongArtContainer = styled.div({
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
const SongTitle = styled.h3({
	fontFamily: fonts.body,
	marginBottom: "3px",
});
const SongArtist = styled.span({
	fontSize: "0.9em",
});
const SongProperty = styled.span({
	fontWeight: "bold",
});
