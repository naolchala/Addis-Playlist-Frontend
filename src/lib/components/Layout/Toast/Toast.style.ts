import { colorSchemes } from "$config/Theme/colors";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const slideLeft = keyframes({
	from: {
		left: "100%",
		opacity: "0",
	},
	to: {
		left: "0",
		opacity: "1",
	},
});

export const ToastListContainer = styled.div({
	position: "fixed",
	display: "flex",
	flexDirection: "column",
	bottom: "20px",
	right: "20px",
	zIndex: "99999999",
});

export interface ToastContainerProps {
	colorScheme?: keyof typeof colorSchemes;
}

export const ToastContainer = styled.div((props: ToastContainerProps) => ({
	position: "relative",
	padding: "10px",
	marginBottom: "5px",
	borderRadius: "5px",
	background: colorSchemes[props.colorScheme || "default"].background,
	color: colorSchemes[props.colorScheme || "default"].color,
	animation: `${slideLeft} 200ms ease-out`,
}));

export const ToastTitle = styled.span({
	fontWeight: "bold",
});
export const ToastDesc = styled.span({
	fontSize: "0.8em",
});
