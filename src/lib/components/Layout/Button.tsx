import { colorSchemes } from "$config/Theme/colors";
import { buttonSizes } from "$config/Theme/sizes";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";

export const Button: FC<IButton> = ({
	children,
	leftIcon,
	rightIcon,
	...props
}) => {
	return (
		<ButtonContainer {...props}>
			{leftIcon}
			<span>{children}</span>
			{rightIcon}
		</ButtonContainer>
	);
};
const shapeToBorderRadius = {
	round: "100px",
	circle: "100%",
	rectangle: "4px",
};

interface ButtonContainerProps {
	glow?: boolean;
	shape?: keyof typeof shapeToBorderRadius;
	colorScheme?: keyof typeof colorSchemes;
	size?: keyof typeof buttonSizes;
}

interface IButton
	extends ButtonContainerProps,
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		> {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	children?: ReactNode;
}

const ButtonContainer = styled.button((props: ButtonContainerProps) => ({
	display: "flex",
	alignItems: "center",
	fontSize: buttonSizes[props.size || "md"].fontSize,
	gap: "10px",
	padding: buttonSizes[props.size || "md"].padding,
	textTransform: "uppercase",
	fontWeight: "bold",
	border: "none",
	borderRadius: props.shape ? shapeToBorderRadius[props.shape] : "3px",
	transition: "all 300ms ease-out",
	background: props.colorScheme
		? colorSchemes[props.colorScheme].background
		: colorSchemes["default"].background,

	color: props.colorScheme
		? colorSchemes[props.colorScheme].color
		: colorSchemes["default"].color,

	boxShadow: props.glow
		? `${
				colorSchemes[props.colorScheme || "default"].background
		  }5a 0px 3px 18px;`
		: undefined,

	":hover": {
		background: colorSchemes[props.colorScheme || "default"].hover,
		boxShadow: props.glow
			? `${
					colorSchemes[props.colorScheme || "default"].background
			  }7a 0px 5px 24px;`
			: undefined,
	},
}));
