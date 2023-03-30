import { colors } from "$config/Theme/colors";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export interface SkeletonProps {
	width?: string;
	height?: string;
	borderRadius?: string;
}

export const SkeletonKeyframes = keyframes({
	from: {
		background: colors.whiteAlpha[50],
	},
	"50%": {
		background: colors.whiteAlpha[400],
	},
	to: {
		background: colors.whiteAlpha[50],
	},
});

export const Skeleton = styled.div((props: SkeletonProps) => ({
	width: props.width,
	height: props.height,
	display: "block",
	animation: `${SkeletonKeyframes} 3s ease-out infinite`,
	animationFillMode: "backwards",
	borderRadius: props.borderRadius || "10px",
}));
