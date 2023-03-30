import { Flex } from "$components/Layout/Flex";
import { SearchField, SectionSubtitle, SectionTitle } from "./Home.style";
import { useAppDispatch } from "$stores/hooks";
import { setType } from "$stores/playlist/playlistSlice";
import { useEffect } from "react";
import { PlaylistsContainer } from "../components/Playlist/PlaylistsContainer";
import { DashboardPage } from "../Dashboard.styles";

export const HomeDashboard = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setType("PRIVATE"));
	}, []);

	return (
		<DashboardPage>
			<Flex alignSelf={"flex-end"}></Flex>
			<section>
				<Flex
					justifyContent={"space-between"}
					alignItems="center"
					marginBottom={"30px"}
				>
					<Flex direction="column" gap={"5px"}>
						<SectionTitle>Your Playlists</SectionTitle>
						<SectionSubtitle>
							Here are your private playlists. enjoy!
						</SectionSubtitle>
					</Flex>
					<SearchField />
				</Flex>
				<PlaylistsContainer />
			</section>
		</DashboardPage>
	);
};
