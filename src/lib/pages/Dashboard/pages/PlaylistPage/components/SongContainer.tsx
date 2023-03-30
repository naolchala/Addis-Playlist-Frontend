import { Flex } from "$components/Layout/Flex";
import {
	SongItem,
	SongItemLoading,
} from "$pages/Dashboard/components/Songs/SongItem";
import { useAppSelector } from "$stores/hooks";
import { Divider } from "../Playlist-Page.style";

export const SongsContainer = () => {
	const { loading, error, songs } = useAppSelector((state) => state.songs);

	if (loading) {
		return (
			<Flex direction={"column"} marginTop="15px" gap="20px">
				{[...Array(4)].map((v, k) => (
					<>
						<SongItemLoading />
						<Divider />
					</>
				))}
			</Flex>
		);
	}

	if (error) {
		return <div>{error.msg}</div>;
	}

	return (
		<Flex direction={"column"} marginTop="15px" gap="20px">
			{songs.map((song) => (
				<>
					<SongItem {...song} />
					<Divider />
				</>
			))}
		</Flex>
	);
};
