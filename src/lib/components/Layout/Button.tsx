import { colorSchemes } from "$config/Theme/colors";
import { buttonSizes } from "$config/Theme/sizes";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import { BiLoader, BiLoaderAlt } from "react-icons/bi";

export const Button: FC<IButton> = ({
	children,
	leftIcon,
	rightIcon,
	isLoading,
	...props
}) => {
	return (
		<ButtonContainer {...props} disabled={isLoading}>
			{isLoading ? (
				<ButtonSpinner>
					<BiLoaderAlt />
				</ButtonSpinner>
			) : (
				<>
					{leftIcon}
					<span style={{ textAlign: "center" }}>{children}</span>
					{rightIcon}
				</>
			)}
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
	isLoading?: boolean;
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
	textAlign: "center",
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

	["span"]: {
		textAlign: "center",
		flex: "1",
	},
}));

const spin = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

const ButtonSpinner = styled.span({
	display: "grid",
	placeItems: "center",
	animation: `${spin} 500ms linear infinite`,
});
