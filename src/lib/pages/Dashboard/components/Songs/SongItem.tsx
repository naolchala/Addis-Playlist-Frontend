import { Flex } from "$components/Layout/Flex";
import { IconButton } from "$components/Layout/IconButton";
import { Menu } from "$components/Layout/Menu/Menu";
import {
	MenuContent,
	MenuItem,
	MenuItemIcon,
} from "$components/Layout/Menu/Menu.styles";
import { Skeleton } from "$components/Layout/Skeleton";
import { getTimeInMinutes } from "$config/utils/dayjs";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { deleteSongRequest, setCurrentSong } from "$stores/playlist/songSlice";
import { SongResponse } from "$types/songs.types";
import { useState } from "react";
import {
	BiMusic,
	BiEditAlt,
	BiTrash,
	BiDotsVerticalRounded,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
	SongCardContainer,
	SongArtImage,
	SongArtContainer,
	SongTitle,
	SongArtist,
	SongProperty,
} from "./SongItem.style";

export interface ISongCard {
	song: SongResponse;
	suggestion?: boolean;
	cover?: string;
}

export const SongItem = ({ song, cover, suggestion }: ISongCard) => {
	const { user } = useAppSelector((state) => state.user);
	const { deleting } = useAppSelector((state) => state.songs);
	const [isOpen, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const remove = () => {
		setIsLoading(true);
		setOpen(false);
		dispatch(
			deleteSongRequest({
				id: song.id || "",
				token: user?.token || "",
				callback() {
					setIsLoading(false);
				},
			})
		);
	};

	return (
		<SongCardContainer>
			{cover ? (
				<SongArtImage src={cover}></SongArtImage>
			) : (
				<SongArtContainer>
					<BiMusic></BiMusic>
				</SongArtContainer>
			)}
			<Flex flex="1" alignItems={"center"} gap="3px">
				<Flex direction={"column"} flex="3">
					<SongTitle
						href={suggestion ? undefined : song.deezerURL}
						target="_blank"
					>
						{song.title.length > 40
							? song.title.slice(0, 40) + "..."
							: song.title}
					</SongTitle>
					<SongArtist>{song.artist}</SongArtist>
				</Flex>

				<Flex direction={"column"} flex="2">
					<small>Album</small>
					<SongProperty>
						{song.album && song.album.length > 40
							? song.album.slice(0, 40) + "..."
							: song.album}
					</SongProperty>
				</Flex>

				<Flex direction={"column"} flex="1">
					<small>Duration</small>
					<SongProperty>
						{getTimeInMinutes(song?.duration || 0)}
					</SongProperty>
				</Flex>
				{song.releaseYear && (
					<Flex direction={"column"} flex="1">
						<small>Year</small>
						<SongProperty>{song.releaseYear}</SongProperty>
					</Flex>
				)}
				{!suggestion && (
					<Flex>
						<Menu
							isOpen={isOpen}
							menuContent={
								<MenuContent>
									<MenuItem
										onClick={() => {
											dispatch(setCurrentSong(song));
											navigate(
												`/dashboard/playlist/edit-song/${song.id}`
											);
										}}
									>
										<MenuItemIcon>
											<BiEditAlt />
										</MenuItemIcon>
										Edit Song
									</MenuItem>
									<MenuItem onClick={remove}>
										<MenuItemIcon>
											<BiTrash />
										</MenuItemIcon>
										Delete Song
									</MenuItem>
								</MenuContent>
							}
						>
							<IconButton
								icon={<BiDotsVerticalRounded />}
								size="xl"
								onClick={() => setOpen((val) => !val)}
								isLoading={isLoading}
							></IconButton>
						</Menu>
					</Flex>
				)}
			</Flex>
		</SongCardContainer>
	);
};

export const SongItemLoading = () => {
	return (
		<SongCardContainer>
			<Flex marginRight={"10px"}>
				<Skeleton width="30px" height="30px" borderRadius="4px" />
			</Flex>

			<Flex direction={"row"} flex="1" alignItems={"center"} gap="3px">
				<Flex direction={"column"} flex="3">
					<Flex marginBottom={"5px"}>
						<Skeleton width="70px" height="8px" />
					</Flex>
					<Skeleton width="70px" height="5px" />
				</Flex>

				<Flex direction={"column"} flex="2">
					<Skeleton width="70px" height="5px" />
				</Flex>

				<Flex direction={"column"} flex="1">
					<Skeleton width="70px" height="5px" />
				</Flex>

				<Flex direction={"column"} flex="1">
					<Skeleton width="70px" height="5px" />
				</Flex>
			</Flex>
		</SongCardContainer>
	);
};
