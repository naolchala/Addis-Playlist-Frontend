import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { cardSizes } from "$config/Theme/sizes";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

interface PlaylistCardContainerProps {
	bgurl?: string;
}
export const PlaylistCardContainer = styled(NavLink)(
	(props: PlaylistCardContainerProps) => ({
		color: "white",
		background: `url(${props.bgurl}), linear-gradient(#00000069 10%, ${colors.background} 70%)`,
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

export const PlaylistCardLabel = styled.h3({
	fontFamily: fonts.body,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexWrap: "wrap",
});

export const PlaylistCardChips = styled.span({
	fontSize: "0.8em",
	textTransform: "uppercase",
	padding: "2px 5px",
	borderRadius: "4px",
	marginTop: "5px",
	fontWeight: "bold",
	background: colors.whiteAlpha[400],
});

export const PlaylistDate = styled.span({
	fontSize: "0.8em",
	marginTop: "10px",
});
