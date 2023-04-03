import styled from "@emotion/styled";
import { BiLoaderAlt } from "react-icons/bi";
import { spin } from "./Button";

export const Spinner = () => {
	return (
		<SpinnerContainer>
			<BiLoaderAlt />
		</SpinnerContainer>
	);
};
export const SpinnerContainer = styled.div({
	animation: `${spin} 1s  linear infinite backwards`,
	display: "grid",
	placeItems: "center",
});
