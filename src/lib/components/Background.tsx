import { colors } from "$config/Theme/colors";
import styled from "@emotion/styled";
import { FC, ReactNode, useEffect, useState } from "react";

interface IBackground {
	children?: ReactNode;
}
const Background: FC<IBackground> = ({ children }) => {
	const [pos, setPos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		window.addEventListener("mousemove", (event) => {
			setPos({ x: event.clientX, y: event.clientY });
		});

		return () => window.removeEventListener("mousemove", () => {});
	}, []);

	return (
		<BackgroundContainer>
			<DecorationCircle x="100px" y="100px" color={colors.yellow[300]} />
			<DecorationCircle
				x="calc(100% - 150px)"
				y="calc(100%)"
				color="#F95738"
			/>
			<DecorationCircle
				x="calc(70%)"
				y="100px"
				size={"200px"}
				color={colors.purple[900]}
			/>
			<DecorationCircle
				color={colors.blue[700]}
				style={{ left: pos.x, top: pos.y }}
			/>
			<BackgroundWrapper>{children}</BackgroundWrapper>
		</BackgroundContainer>
	);
};

const DashboardBackground: FC<IBackground> = ({ children }) => {
	return (
		<BackgroundContainer>
			<DecorationCircle
				x="calc(100% - 150px)"
				y="calc(100%)"
				color="#F95738"
			/>
			<DecorationCircle
				x="calc(70%)"
				y="100px"
				size={"200px"}
				color={colors.purple[900]}
			/>
			<DecorationCircle
				x="50px"
				y="calc(100% - 200px)"
				size={"200px"}
				color={colors.blue[900]}
			/>
			<BackgroundWrapper>{children}</BackgroundWrapper>
		</BackgroundContainer>
	);
};

const BackgroundContainer = styled.div({
	width: "100%",
	height: "100vh",
	overflow: "hidden",
	position: "relative",
	background: colors.background,
	color: colors.textColor,
});

const BackgroundWrapper = styled.div({
	width: "100%",
	height: "100vh",
	backdropFilter: "blur(100px)",
	zIndex: "9",
});

interface DecorationCircleProps {
	color?: string;
	x?: string | number;
	y?: string | number;
	size?: string | number;
}
const DecorationCircle = styled.div((props: DecorationCircleProps) => ({
	position: "absolute",
	display: "block",
	height: props.size || "200px",
	width: props.size || "200px",
	left: props.x || "0px",
	top: props.y || "0px",
	transform: "translate(-50%, -50%)",
	borderRadius: "100%",
	background: props.color || "#fff5",
	transition: "all 300ms linear",
}));

export { Background, DashboardBackground };
