import { colors, colorSchemes } from "$config/Theme/colors";
import { buttonSizes } from "$config/Theme/sizes";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { ButtonSpinner } from "./Button";
import { Flex } from "./Flex";

interface IconButtonProps {
	glow?: boolean;
	colorScheme?: keyof typeof colorSchemes;
	size?: keyof typeof buttonSizes;
	isLoading?: boolean;
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
	position: "relative",
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

export const IconButton: FC<IIconButton> = ({ isLoading, icon, ...props }) => {
	return (
		<IconButtonContainer {...props} disabled={isLoading}>
			<Flex style={{ opacity: isLoading ? 0 : 1 }}>{icon}</Flex>
			{isLoading && (
				<ButtonSpinner>
					<BiLoaderAlt />
				</ButtonSpinner>
			)}
		</IconButtonContainer>
	);
};
