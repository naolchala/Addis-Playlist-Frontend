import { Flex } from "$components/Layout/Flex";
import { Skeleton } from "$components/Layout/Skeleton";
import { colors } from "$config/Theme/colors";
import { cardSizes } from "$config/Theme/sizes";
import { relativeDateFormat } from "$config/utils/dayjs";
import { useAppDispatch } from "$stores/hooks";
import { setCurrentPlaylist } from "$stores/playlist/playlistSlice";
import { PlaylistResponse } from "$types/playlist.types";
import { BsStarFill } from "react-icons/bs";
import {
	PlaylistCardContainer,
	PlaylistCardLabel,
	PlaylistCardChips,
	PlaylistDate,
} from "./PlaylistCard.style";

export const PlaylistLoadingCard = () => (
	<Skeleton height={cardSizes.playlistCard} borderRadius="10px" />
);

export const PlaylistCard = ({ playlist }: { playlist: PlaylistResponse }) => {
	const dispatch = useAppDispatch();

	return (
		<PlaylistCardContainer
			onClick={() => dispatch(setCurrentPlaylist(playlist))}
			bgurl={playlist.playlistArtURL}
			to={`/dashboard/playlist/${playlist.id}`}
		>
			<Flex direction={"column"} gap="4px">
				<PlaylistCardLabel>
					{playlist.label}
					{playlist.favorite && (
						<BsStarFill fill={colors.yellow[300]} />
					)}
				</PlaylistCardLabel>
				<Flex gap={"10px"} margin="5px 0">
					<PlaylistCardChips>
						{playlist._count?.Songs}{" "}
						{(playlist._count?.Songs || 0) > 1 ? "Songs" : "Song"}
					</PlaylistCardChips>
					<PlaylistCardChips>
						{playlist.visibility}{" "}
					</PlaylistCardChips>
				</Flex>
				<PlaylistDate>
					Created {relativeDateFormat(playlist.createdAt)}
				</PlaylistDate>
			</Flex>
		</PlaylistCardContainer>
	);
};
