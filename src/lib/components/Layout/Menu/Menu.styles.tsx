import { colors } from "$config/Theme/colors";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const MenuContainer = styled.div({
	position: "relative",
});

export const SlideIn = keyframes({
	from: {
		opacity: 0,
		top: "calc(100% + 10px)",
	},
	to: {
		opacity: 1,
		top: "100%",
	},
});

export const MenuContent = styled.div({
	zIndex: "999999",
	position: "absolute",
	width: "max-content",
	display: "flex",
	flexDirection: "column",
	padding: "10px 0",
	right: "0",
	background: colors.background,
	border: "1px solid " + colors.whiteAlpha[200],
	borderRadius: "5px",
	animation: `${SlideIn} 200ms ease-out`,
	boxShadow:
		"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
});

export const MenuItem = styled.div({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	padding: "10px",
	cursor: "pointer",
	transition: "all 200ms ease-out",

	":hover": {
		background: colors.whiteAlpha[200],
	},
});

export const MenuItemIcon = styled.span({
	fontSize: "1.1em",
	display: "grid",
	placeItems: "center",
	marginRight: "10px",
});
