import { Flex } from "$components/Layout/Flex";
import {
	SongItem,
	SongItemLoading,
} from "$pages/Dashboard/components/Songs/SongItem";
import { useAppSelector } from "$stores/hooks";
import React from "react";
import { Divider } from "../Playlist-Page.style";

export const SongsContainer = () => {
	const { loading, error, songs } = useAppSelector((state) => state.songs);

	if (loading) {
		return (
			<Flex direction={"column"} marginTop="15px" gap="20px">
				{[...Array(4)].map((v, k) => (
					<React.Fragment key={k}>
						<SongItemLoading />
						<Divider />
					</React.Fragment>
				))}
			</Flex>
		);
	}

	if (error) {
		return <div>{error.msg}</div>;
	}

	return (
		<Flex direction={"column"} marginTop="15px" gap="20px">
			{songs.map((song, index) => (
				<>
					{index > 0 && <Divider />}
					<SongItem song={song} key={song.id} />
				</>
			))}
		</Flex>
	);
};
