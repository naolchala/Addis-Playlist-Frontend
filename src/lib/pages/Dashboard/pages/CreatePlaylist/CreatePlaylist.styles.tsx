import { colors } from "$config/Theme/colors";
import styled from "@emotion/styled";

export const FileUploadLabel = styled.label({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	color: colors.blue[700],
	border: "2px solid " + colors.whiteAlpha[200],
	height: "250px",
	borderRadius: "4px",
	gap: "20px",
	textAlign: "center",
	textTransform: "uppercase",
});

export const FileUploadImage = styled.img({
	width: "200px",
	height: "200px",
	borderRadius: "10px",
	objectFit: "cover",
});
