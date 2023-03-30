import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode, useState } from "react";

export interface IDialog {
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
}
export const Dialog = ({ children, isOpen, onClose }: IDialog) => {
	if (!isOpen) {
		return <></>;
	}

	return (
		<DialogContainer>
			<DialogOverlay onClick={onClose} />
			<DialogWindow>{children}</DialogWindow>
		</DialogContainer>
	);
};

export const useDialog = (open: boolean) => {
	const [isOpen, setOpen] = useState(open);

	const onClose = () => setOpen(false);
	const onOpen = () => setOpen(true);

	return { isOpen, onClose, onOpen };
};

const FadeIn = keyframes({
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
});

const DialogOverlay = styled.div({
	display: "block",
	position: "fixed",
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	background: "#0008",
});

const DialogContainer = styled.div({
	position: "fixed",
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	display: "flex",
	animation: `${FadeIn} 200ms ease-out`,
	overflow: "hidden",
	justifyContent: "center",
	alignItems: "center",
	padding: "20px",
	zIndex: "999",
});

const DialogWindow = styled.div({
	background: colors.background,
	padding: "20px",
	borderRadius: "20px",
	display: "flex",
	flexDirection: "column",
	minWidth: "450px",
	overflow: "hidden",
	zIndex: 99,
	gap: "20px",
	maxHeight: "100%",
});

export const DialogHeader = styled.div({
	display: "flex",
	marginBottom: "10px",
});

export const DialogTitle = styled.h1({
	fontFamily: fonts.body,
});

export const DialogContent = styled.div({
	display: "flex",
	flexDirection: "column",
	flex: "1",
	overflow: "auto",
	padding: "10px",
});

export const DialogFooter = styled.div({
	display: "flex",
	gap: "16px",
	justifyContent: "flex-end",
});
