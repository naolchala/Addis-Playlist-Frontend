import { colors } from "$config/Theme/colors";
import styled from "@emotion/styled";

export const AutoCompleteContainer = styled.div({
	display: "none",
	flexDirection: "column",
	background: colors.background,
	width: "100%",
	maxHeight: "400px",
	overflowY: "auto",
	padding: "10px 0",
	boxShadow:
		"rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px",
	position: "absolute",
	top: "calc(100% + 5px)",
	zIndex: "99",
});

export const AutoCompleteField = styled.div({
	"&:focus-within .auto-complete-container": {
		display: "flex",
	},
});
