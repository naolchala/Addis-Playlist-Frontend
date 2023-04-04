import { Flex } from "$components/Layout/Flex";
import {
	HeaderContainer,
	SearchField,
	SectionSubtitle,
	SectionTitle,
} from "./Home.style";
import { useAppDispatch } from "$stores/hooks";
import { setType } from "$stores/playlist/playlistSlice";
import { useEffect } from "react";
import { PlaylistsContainer } from "../components/Playlist/PlaylistsContainer";
import { DashboardPage } from "../Dashboard.styles";

export const PublicDashboard = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setType("PUBLIC"));
	}, []);

	return (
		<DashboardPage>
			<Flex alignSelf={"flex-end"}></Flex>
			<section>
				<HeaderContainer>
					<Flex direction="column" gap={"5px"}>
						<SectionTitle>Community</SectionTitle>
						<SectionSubtitle>
							Discover a world of music waiting to be explored!
						</SectionSubtitle>
					</Flex>
					<SearchField />
				</HeaderContainer>
				<PlaylistsContainer />
			</section>
		</DashboardPage>
	);
};
