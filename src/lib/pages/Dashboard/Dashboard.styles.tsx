import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { mediaQuery } from "$config/Theme/sizes";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

export const DashboardContainer = styled.div(
	mediaQuery({
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: ["column-reverse", "row", "row"],
		gap: "20px",
	})
);
export const DashboardSideNav = styled.div(
	mediaQuery({
		display: "flex",
		flexDirection: ["row", "column", "column"],
		borderRight: "1px solid " + colors.whiteAlpha[50],
		padding: ["10px", "15px", "20px"],
		borderRadius: ["5px", "0"],
		gap: "10px",
		position: ["fixed", "relative", "relative"],
		height: ["auto", "auto", "100%"],
		zIndex: "9999",
		overflow: "hidden",
		left: ["50%", "0px"],
		bottom: ["10px", "0"],
		transform: ["translateX(-50%)", "translateX(0)"],
		background: [colors.background + "ca", "transparent"],
	})
);

export const SideNavTitle = styled.h1(
	mediaQuery({
		fontFamily: fonts.header,
		textTransform: "uppercase",
		fontWeight: "900",
		marginBottom: "20px",
		display: ["none", "none", "block"],

		"& :last-child": {
			color: colors.yellow[300],
		},
	})
);

const SideNavItemContainer = styled(NavLink)({
	padding: "14px",
	display: "flex",
	alignItems: "center",
	color: "white",
	borderRadius: "3px",
	transition: "all 200ms ease-out",

	":hover": {
		background: colors.whiteAlpha[200],
	},

	"&.active": {
		background: colors.whiteAlpha[300],
	},
});
const SideNavItemIcon = styled.span(
	mediaQuery({
		marginRight: ["0", "0", "15px"],
		display: "grid",
		placeItems: "center",
		fontSize: "1.4rem",
	})
);
const SideNavItemLabel = styled.span(
	mediaQuery({
		display: ["none", "none", "block"],
		textTransform: "uppercase",
		fontWeight: "600",
	})
);

interface ISideNav {
	label: string;
	to: string;
	icon: ReactNode;
}

export const SideNavItem: FC<ISideNav> = ({ label, to, icon }) => {
	return (
		<SideNavItemContainer to={to}>
			<SideNavItemIcon>{icon}</SideNavItemIcon>
			<SideNavItemLabel>{label}</SideNavItemLabel>
		</SideNavItemContainer>
	);
};

export const DashboardOutletContainer = styled.div({
	overflow: "auto",
	flex: "1",
});

export const DashboardPage = styled.div(
	mediaQuery({
		display: "flex",
		flexDirection: "column",
		padding: ["20px", "20px", "40px"],
		paddingBottom: ["100px", "100px", "40px"],
	})
);
