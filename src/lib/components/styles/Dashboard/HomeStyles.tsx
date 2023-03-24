import { Flex } from "$components/Layout/Flex";
import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { cardSizes } from "$config/Theme/sizes";
import { relativeDateFormat } from "$config/utils/dayjs";
import { PlaylistResponse } from "$types/playlist.types";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const SectionTitle = styled.h2({
	fontSize: "2.1em",
	fontFamily: fonts.body,
	color: colors.whiteAlpha[900],
});

export const SectionSubtitle = styled.p({
	fontSize: "1.1em",
});

export const PlaylistGrid = styled.div({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
	gap: "40px 20px",
	padding: "20px 0",
});

interface PlaylistCardContainerProps {
	bgUrl?: string;
}
const PlaylistCardContainer = styled(NavLink)(
	(props: PlaylistCardContainerProps) => ({
		color: "white",
		background: `url(${props.bgUrl}), linear-gradient(#00000069 10%, ${colors.background} 70%)`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundBlendMode: "multiply",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		height: cardSizes.playlistCard,
		padding: "20px",
		borderRadius: "7px",
		boxShadow:
			"rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
		cursor: "pointer",
		position: "relative",
		top: "0px",
		transition: "all 300ms ease-out",

		":hover": {
			top: "-10px",
			boxShadow:
				"rgba(15, 15, 28, 0.264) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
		},
	})
);

const PlaylistCardLabel = styled.h3({
	fontFamily: fonts.body,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexWrap: "wrap",
});

const PlaylistCardChips = styled.span({
	fontSize: "0.8em",
	textTransform: "uppercase",
	padding: "2px 5px",
	borderRadius: "4px",
	marginTop: "5px",
	fontWeight: "bold",
	background: colors.whiteAlpha[400],
});

const PlaylistDate = styled.span({
	fontSize: "0.8em",
	marginTop: "10px",
});

export const SkeletonKeyframes = keyframes({
	from: {
		background: colors.whiteAlpha[50],
	},
	"50%": {
		background: colors.whiteAlpha[400],
	},
	to: {
		background: colors.whiteAlpha[50],
	},
});

interface SkeletonProps {
	width?: string;
	height?: string;
	borderRadius?: string;
}

export const Skeleton = styled.div((props: SkeletonProps) => ({
	width: props.width,
	height: props.height,
	display: "block",
	animation: `${SkeletonKeyframes} 3s ease-out infinite`,
	animationFillMode: "backwards",
	borderRadius: props.borderRadius || "10px",
}));

export const PlaylistLoadingCard = () => (
	<Skeleton height={cardSizes.playlistCard} borderRadius="10px" />
);

export const PlaylistCard: FC<PlaylistResponse> = (props) => {
	return (
		<PlaylistCardContainer
			bgUrl={props.playlistArtURL}
			to={`/dashboard/playlist/${props.id}`}
		>
			<Flex direction={"column"} gap="4px">
				<PlaylistCardLabel>
					{props.label}
					{props.favorite && <BsStarFill fill={colors.yellow[300]} />}
				</PlaylistCardLabel>
				<Flex gap={"10px"} margin="5px 0">
					<PlaylistCardChips>
						{props._count?.Songs}{" "}
						{(props._count?.Songs || 0) > 1 ? "Songs" : "Song"}
					</PlaylistCardChips>
					<PlaylistCardChips>{props.visibility} </PlaylistCardChips>
				</Flex>
				<PlaylistDate>
					Created {relativeDateFormat(props.createdAt)}
				</PlaylistDate>
			</Flex>
		</PlaylistCardContainer>
	);
};

export const Select = styled.select({
	background: colors.whiteAlpha[300],
	padding: "10px 20px",
	borderRadius: "40px",
	color: "white",
	textTransform: "uppercase",
	fontWeight: "bold",
	outline: "none",
	border: "none",
});

export const SearchFieldContainer = styled.div({
	display: "flex",
	alignItems: "center",
	padding: "4px",
	background: colors.whiteAlpha[100],
	border: "1px solid " + colors.whiteAlpha[200],
	borderRadius: "50px",

	"& *": {
		transition: "all 300ms ease-out",
	},
});

export const SearchInput = styled.input({
	flex: "1",
	background: "transparent",
	border: "none",
	color: "white",
	outline: "none",
	fontSize: "1.1em",
	padding: "0 20px",
});

export const SearchButton = styled.button({
	display: "grid",
	placeItems: "center",
	background: "transparent",
	padding: "10px",
	borderRadius: "100%",
	color: "white",
	border: "none",
	fontSize: "1.5em",

	":hover": {
		background: colors.whiteAlpha[100],
	},
});

export const SearchField = () => {
	return (
		<SearchFieldContainer>
			<SearchInput placeholder="Search Playlist"></SearchInput>
			<SearchButton>
				<BiSearchAlt />
			</SearchButton>
		</SearchFieldContainer>
	);
};
