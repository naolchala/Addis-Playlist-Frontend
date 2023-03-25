import { colors, colorSchemes } from "$config/Theme/colors";
import { buttonSizes } from "$config/Theme/sizes";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";

interface IconButtonProps {
	glow?: boolean;
	colorScheme?: keyof typeof colorSchemes;
	size?: keyof typeof buttonSizes;
}

interface IIconButton
	extends IconButtonProps,
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		> {
	icon: ReactNode;
}

const IconButtonContainer = styled.button((props: IconButtonProps) => ({
	width: buttonSizes[props.size || "md"].iconBtnSize,
	height: buttonSizes[props.size || "md"].iconBtnSize,
	background: colorSchemes[props.colorScheme || "whiteAlpha"].background,
	color: colorSchemes[props.colorScheme || "whiteAlpha"].color,
	fontSize: buttonSizes[props.size || "md"].fontSize,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "100%",
	border: "none",
	transition: "all 200ms ease-in-out",

	":hover": {
		background: colorSchemes[props.colorScheme || "whiteAlpha"].hover,
	},
}));

export const IconButton: FC<IIconButton> = ({ icon, ...props }) => {
	return <IconButtonContainer {...props}>{icon}</IconButtonContainer>;
};
