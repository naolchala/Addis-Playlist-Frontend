import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { useAppDispatch } from "$stores/hooks";
import { setKeyword } from "$stores/playlist/playlistSlice";
import styled from "@emotion/styled";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

export const SectionTitle = styled.h2({
	fontSize: "2.1em",
	fontFamily: fonts.body,
	color: colors.whiteAlpha[900],
});

export const SectionSubtitle = styled.p({
	fontSize: "1.1em",
});

export const Select = styled.select({
	background: colors.whiteAlpha[300],
	padding: "10px 20px",
	borderRadius: "40px",
	color: "white",
	textTransform: "uppercase",
	fontWeight: "bold",
	outline: "none",
	border: "none",
});

export const SearchFieldContainer = styled.div({
	display: "flex",
	alignItems: "center",
	padding: "4px",
	background: colors.whiteAlpha[100],
	border: "1px solid " + colors.whiteAlpha[200],
	borderRadius: "50px",

	"& *": {
		transition: "all 300ms ease-out",
	},
});

export const SearchInput = styled.input({
	flex: "1",
	background: "transparent",
	border: "none",
	color: "white",
	outline: "none",
	fontSize: "1.1em",
	padding: "0 20px",
});

export const SearchButton = styled.button({
	display: "grid",
	placeItems: "center",
	background: "transparent",
	padding: "10px",
	borderRadius: "100%",
	color: "white",
	border: "none",
	fontSize: "1.5em",

	":hover": {
		background: colors.whiteAlpha[100],
	},
});

export const SearchField = () => {
	const [keyword, setCurrentKeyword] = useState("");
	const dispatch = useAppDispatch();

	const search = () => {
		dispatch(setKeyword(keyword));
	};

	return (
		<SearchFieldContainer>
			<SearchInput
				placeholder="Search Playlist"
				value={keyword}
				onChange={(e) => setCurrentKeyword(e.target.value)}
				name="keyword"
			></SearchInput>
			<SearchButton onClick={search}>
				<BiSearchAlt />
			</SearchButton>
		</SearchFieldContainer>
	);
};

const HeaderContainer = styled.div({
	display: "flex",
});
