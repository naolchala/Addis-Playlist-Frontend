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
	id?: string;
	title: string;
	album?: string;
	artist?: string;
	duration?: number;
	releaseYear?: number;
	deezerURL?: string;
	addedAt?: string;
	playlistID?: string;
	suggestion?: boolean;
	cover?: string;
}

export const SongItem = (props: ISongCard) => {
	const [isOpen, setOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<SongCardContainer>
			{props.cover ? (
				<SongArtImage src={props.cover}></SongArtImage>
			) : (
				<SongArtContainer>
					<BiMusic></BiMusic>
				</SongArtContainer>
			)}
			<Flex direction={"row"} flex="1" alignItems={"center"} gap="3px">
				<Flex direction={"column"} flex="3">
					<SongTitle
						href={props.suggestion ? undefined : props.deezerURL}
						target="_blank"
					>
						{props.title}
					</SongTitle>
					<SongArtist>{props.artist}</SongArtist>
				</Flex>

				<Flex direction={"column"} flex="2">
					<small>Album</small>
					<SongProperty>{props.album}</SongProperty>
				</Flex>

				<Flex direction={"column"} flex="1">
					<small>Duration</small>
					<SongProperty>
						{getTimeInMinutes(props?.duration || 0)}
					</SongProperty>
				</Flex>
				{props.releaseYear && (
					<Flex direction={"column"} flex="1">
						<small>Year</small>
						<SongProperty>{props.releaseYear}</SongProperty>
					</Flex>
				)}
				{!props.suggestion && (
					<Flex>
						<Menu
							isOpen={isOpen}
							menuContent={
								<MenuContent>
									<MenuItem
										onClick={() =>
											navigate(
												`/dashboard/playlist/edit-song/${props.id}`
											)
										}
									>
										<MenuItemIcon>
											<BiEditAlt />
										</MenuItemIcon>
										Edit Song
									</MenuItem>
									<MenuItem>
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
