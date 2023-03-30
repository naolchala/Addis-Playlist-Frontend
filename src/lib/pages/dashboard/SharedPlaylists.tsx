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
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { setType } from "$stores/playlist/playlistSlice";
import { PlaylistResponse } from "$types/playlist.types";
import axios from "axios";
import { useEffect, useState } from "react";

export const SharedDashboard = () => {
	const dispatch = useAppDispatch();
	const playlists = useAppSelector((state) => state.playlist);

	useEffect(() => {
		dispatch(setType("SHARED"));
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
