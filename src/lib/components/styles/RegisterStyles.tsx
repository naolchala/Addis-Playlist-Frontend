import { colors } from "$config/Theme/colors";
import { mediaQuery } from "$config/Theme/sizes";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const RegisterPageContainer = styled.div(
	mediaQuery({
		overflow: "auto",
		display: "flex",
		flexDirection: ["column", null, "row"],
		gap: ["40px", null, "10px"],
		width: "100%",
		height: "100%",
		padding: ["20px", "50px 100px"],
	})
);

export const RegisterIntroSection = styled.div({
	display: "flex",
	flexDirection: "column",
	flex: "1",
});

export const RegisterFormContainer = styled.div(
	mediaQuery({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		flex: "1",
		padding: ["0px", null, "50px"],
	})
);

export const IntroHeader = styled.h2({
	cursor: "pointer",
	fontSize: "4em",
});

export const IntroParagraph = styled.p({
	fontSize: "1.1em",
	marginTop: "2em",
	lineHeight: "1.7em",
});
export const Spacer = styled.div({
	flex: 1,
	display: "block",
});
export const BottomLink = styled(Link)({
	color: colors.orange[200],
	borderBottom: "1px solid " + colors.orange[200],
	alignSelf: "flex-start",
	fontSize: "1.2em",
});

export const Form = styled.form({
	display: "flex",
	flexDirection: "column",
	background: colors.whiteAlpha[100],
	backdropFilter: "blur(10px)",
	border: "1px solid " + colors.whiteAlpha[200],
	borderRadius: "6px",
	padding: "50px 30px",
	gap: "20px",
	boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
});

export const FormHeader = styled.h1({
	marginBottom: "20px",
});
