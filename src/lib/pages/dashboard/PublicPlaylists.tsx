import { Flex } from "$components/Layout/Flex";
import {
	PlaylistCard,
	PlaylistGrid,
	PlaylistLoadingCard,
	SearchField,
	SectionSubtitle,
	SectionTitle,
} from "$components/styles/Dashboard/HomeStyles";
import { DashboardPage } from "$components/styles/DashboardStyles";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { setType } from "$stores/playlist/playlistSlice";
import { useEffect } from "react";

export const PublicDashboard = () => {
	const dispatch = useAppDispatch();
	const playlists = useAppSelector((state) => state.playlist);

	useEffect(() => {
		dispatch(setType("PUBLIC"));
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
						<SectionTitle>Community</SectionTitle>
						<SectionSubtitle>
							Discover a world of music waiting to be explored!
						</SectionSubtitle>
					</Flex>
					<SearchField />
				</Flex>
				<PlaylistGrid>
					{!playlists.loading
						? playlists.playlists.map((playlist) => (
								<PlaylistCard
									playlist={playlist}
									key={playlist.id}
								/>
						  ))
						: [...Array(6)].map((v, k) => (
								<PlaylistLoadingCard key={k} />
						  ))}
				</PlaylistGrid>
			</section>
		</DashboardPage>
	);
};
