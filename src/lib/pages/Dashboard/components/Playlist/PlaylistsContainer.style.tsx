import styled from "@emotion/styled";

export const PlaylistGrid = styled.div({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
	gap: "40px 20px",
	padding: "20px 0",
});
