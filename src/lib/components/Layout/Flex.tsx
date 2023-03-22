import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CSSProperties } from "react";

interface BaseStyleProps extends CSSProperties {}

interface FlexProps extends CSSProperties {
	// direction?: Property.FlexDirection;
}

const BaseStyles = (props: BaseStyleProps) =>
	css({
		width: props.width,
	});

export const Flex = styled.div((props: FlexProps) => ({
	...BaseStyles,
	display: "flex",
	flexDirection: props.flexDirection || "row",
}));
