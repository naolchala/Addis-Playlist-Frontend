import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { mediaQuery } from "$config/Theme/sizes";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

export const DashboardContainer = styled.div({
	width: "100%",
	height: "100%",
	display: "flex",
	gap: "20px",
});
export const DashboardSideNav = styled.div(
	mediaQuery({
		width: "300px",
		display: "flex",
		flexDirection: "column",
		borderRight: "1px solid " + colors.whiteAlpha[50],
		padding: "20px",
		gap: "10px",
		position: ["fixed", "fixed", "relative"],
		background: [colors.background, colors.background, "transparent"],
		height: "100%",
		zIndex: "9999",
		left: ["-100%", "-100%", "0"],
	})
);

export const SideNavTitle = styled.h1({
	fontFamily: fonts.header,
	textTransform: "uppercase",
	fontWeight: "900",
	marginBottom: "20px",

	"& :last-child": {
		color: colors.yellow[300],
	},
});

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
const SideNavItemIcon = styled.span({
	marginRight: "15px",
	display: "grid",
	placeItems: "center",
	fontSize: "1.4rem",
});
const SideNavItemLabel = styled.span({
	textTransform: "uppercase",
	fontWeight: "600",
});

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

export const DashboardPage = styled.div({
	display: "flex",
	flexDirection: "column",
	padding: "40px",
});
