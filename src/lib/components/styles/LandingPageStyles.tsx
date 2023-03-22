import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { mediaQuery } from "$config/Theme/sizes";
import styled from "@emotion/styled";

export const LandingPageContainer = styled.div({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	height: "100%",
	overflowY: "auto",
});

export const Navbar = styled.div(
	mediaQuery({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		margin: "20px 0",
		padding: "8px",
		background: "#fff2",
		backdropFilter: "blur(10px)",
		gap: ["10px", "30px"],
		borderRadius: "100px",
		border: "1px solid #fff3",
	})
);
interface NavbarItemProps {
	primary?: boolean;
}
export const NavbarItem = styled.a((props: NavbarItemProps) => ({
	padding: props.primary ? "8px 30px" : "8px 20px",
	textTransform: "uppercase",
	fontWeight: "bold",
	color: props.primary ? colors.background : colors.textColor,
	fontSize: ".8rem",
	background: props.primary ? colors.yellow[300] : undefined,
	borderRadius: "100px",
	transition: "all 300ms ease",
	boxShadow: props.primary
		? `${colors.yellow[300]}aa 0px 2px 14px;`
		: undefined,

	":hover": {
		background: props.primary ? colors.yellow[300] : "#fff1",
		boxShadow: props.primary
			? `${colors.yellow[300]}aa 0px 4px 24px;`
			: undefined,
	},
}));

export const HeroSection = styled.div({
	flex: "1",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center",
});

export const HeroHeader = styled.h1(
	mediaQuery({
		fontSize: ["4em", "7em"],
		fontWeight: "bold",
		transition: "all 200ms ease-out",
	})
);

export const HighlightedHeader = styled.span({
	background: colors.textGradient,
	fontFamily: fonts.header[0],
	fontStyle: "italic",
	backgroundClip: "text",
	WebkitTextFillColor: "transparent",
});

export const HeroSubtitle = styled.p(
	mediaQuery({
		textTransform: "uppercase",
		width: ["90%", "80%", "60%"],
		fontSize: [".9em", "1em", "1.2em"],
		lineHeight: "1.8em",
		marginTop: ".8em",
	})
);

export const HeroButtonsContainer = styled.div(
	mediaQuery({
		marginTop: "5em",
		display: "flex",
		flexDirection: ["column", "column", "row"],
		gap: "30px",
	})
);
