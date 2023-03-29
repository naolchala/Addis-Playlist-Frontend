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
			{isLoading && (
				<ButtonSpinner>
					<BiLoaderAlt />
				</ButtonSpinner>
			)}
			<ButtonContentWrapper isLoading={isLoading}>
				{leftIcon}
				<span style={{ textAlign: "center" }}>{children}</span>
				{rightIcon}
			</ButtonContentWrapper>
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
	position: "relative",
	border: "none",
	borderRadius: props.shape ? shapeToBorderRadius[props.shape] : "3px",
	transition: "all 300ms ease-out",
	textAlign: "center",
	fontSize: buttonSizes[props.size || "md"].fontSize,
	padding: buttonSizes[props.size || "md"].padding,
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

const ButtonContentWrapper = styled.div((props: { isLoading?: boolean }) => ({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	textTransform: "uppercase",
	fontWeight: "bold",
	opacity: props.isLoading ? 0 : 1,

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
	position: "absolute",
	top: "50%",
	left: "50%",
	translate: "-50% -50%",
	display: "grid",
	placeItems: "center",
	animation: `${spin} 500ms linear infinite`,
});
