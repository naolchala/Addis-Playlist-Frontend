import { mediaQuery } from "$config/Theme/sizes";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { Property } from "csstype";

interface BaseStyleProps extends CSSProperties {}

type Modify<T, R> = Omit<T, keyof R> & R;

type FlexProps = Modify<
	CSSProperties,
	{
		direction?: Property.FlexDirection | Property.FlexDirection[];
	}
>;

const BaseStyles = (props: BaseStyleProps) =>
	css({
		width: props.width,
	});

export const Flex = styled.div((props: FlexProps) => {
	const { children, theme, ...pops } = props as any;

	return mediaQuery({
		...pops,
		display: "flex",
		flexDirection: props.direction || "row",
		alignItems: props.alignItems || undefined,
	});
});
