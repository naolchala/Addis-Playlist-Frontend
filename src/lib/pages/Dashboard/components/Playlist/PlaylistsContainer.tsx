import { useAppSelector } from "$stores/hooks";
import { PlaylistCard, PlaylistLoadingCard } from "./PlaylistCard";
import { PlaylistGrid } from "./PlaylistsContainer.style";

export const PlaylistsContainer = () => {
	const { loading, playlists, error } = useAppSelector(
		(state) => state.playlist
	);

	if (loading) {
		return (
			<PlaylistGrid>
				{[...Array(6)].map((v, k) => (
					<PlaylistLoadingCard key={k} />
				))}
			</PlaylistGrid>
		);
	}

	if (error) {
		return <div>{error.msg}</div>;
	}

	return (
		<PlaylistGrid>
			{playlists.map((playlist) => (
				<PlaylistCard playlist={playlist} key={playlist.id} />
			))}
		</PlaylistGrid>
	);
};
