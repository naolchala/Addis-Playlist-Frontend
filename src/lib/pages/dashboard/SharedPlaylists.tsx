import { Flex } from "$components/Layout/Flex";
import {
	PlaylistCard,
	PlaylistGrid,
	PlaylistLoadingCard,
	SearchField,
	SectionSubtitle,
	SectionTitle,
	Select,
} from "$components/styles/Dashboard/HomeStyles";
import { DashboardPage } from "$components/styles/DashboardStyles";
import { apiUrl } from "$config/api/api";
import { PlaylistResponse } from "$types/playlist.types";
import axios from "axios";
import { useEffect, useState } from "react";

export const SharedDashboard = () => {
	const [loading, setLoading] = useState(false);
	const [playlists, setPlaylists] = useState([] as PlaylistResponse[]);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${apiUrl}/playlist/search-public`)
			.then((res) => setPlaylists(res.data))
			.finally(() => setLoading(false));
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
						<SectionTitle>Shared with you</SectionTitle>
						<SectionSubtitle>
							Discover playlists others have shared with you
						</SectionSubtitle>
					</Flex>
					<SearchField />
				</Flex>
				<PlaylistGrid>
					{!loading
						? playlists.map((playlist) => (
								<PlaylistCard {...playlist} key={playlist.id} />
						  ))
						: [...Array(6)].map((v, k) => (
								<PlaylistLoadingCard key={k} />
						  ))}
				</PlaylistGrid>
			</section>
		</DashboardPage>
	);
};
