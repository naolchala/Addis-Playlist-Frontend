import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import styled from "@emotion/styled";

export const SharedUserContainer = styled.div({
	display: "flex",
	alignItems: "center",
	padding: "16px",
	borderRadius: "6px",
	background: colors.whiteAlpha[50],
});

export const SharedUserAvatar = styled.img({
	width: "45px",
	height: "45px",
	borderRadius: "100%",
	marginRight: "15px",
	objectFit: "cover",
});

export const SharedUserName = styled.h4({
	fontFamily: fonts.body,
});

export const SharedUserEmail = styled.p({
	fontSize: "0.8em",
});
