import { Button } from "$components/Layout/Button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	useDialog,
} from "$components/Layout/Dialog/Dialog";
import { Flex } from "$components/Layout/Flex";
import { FormField, FormLabel, Input } from "$components/Layout/FormField";
import { IconButton } from "$components/Layout/IconButton";
import { Menu } from "$components/Layout/Menu/Menu";
import {
	MenuContent,
	MenuItem,
	MenuItemIcon,
} from "$components/Layout/Menu/Menu.styles";
import { Skeleton } from "$components/styles/Dashboard/HomeStyles";
import {
	Divider,
	ExampleSong,
	PlaylistDescription,
	PlaylistHeader,
	PlaylistImage,
	PlaylistProperty,
	SongCard,
} from "$components/styles/Dashboard/PlaylistStyles";
import { DashboardPage } from "$components/styles/DashboardStyles";
import { apiUrl } from "$config/api/api";
import { colors } from "$config/Theme/colors";
import { fonts } from "$config/Theme/fonts";
import { useAppSelector } from "$stores/hooks";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import {
	BiDotsVerticalRounded,
	BiEditAlt,
	BiPlusCircle,
	BiShareAlt,
	BiTrash,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const PlaylistPage = () => {
	const { id } = useParams();
	const [menuOpen, setMenuOpen] = useState(false);
	const { isOpen, onClose, onOpen } = useDialog(false);
	const navigate = useNavigate();
	const currentPlaylist = useAppSelector(
		(state) => state.playlist.currentPlaylist
	);

	return (
		<DashboardPage>
			<Dialog isOpen={isOpen} onClose={onClose}>
				<DialogHeader>
					<DialogTitle>Share Playlist</DialogTitle>
				</DialogHeader>
				<DialogContent>
					<Flex alignItems={"flex-end"} gap="10px">
						<FormField>
							<FormLabel>Email</FormLabel>
							<Input />
						</FormField>
						<Button
							leftIcon={<BiShareAlt />}
							size="sm"
							colorScheme="yellow"
						>
							Share
						</Button>
					</Flex>

					<Flex marginTop="20px" direction={"column"}>
						<FormLabel>Shared With</FormLabel>
						<Flex direction={"column"} gap="10px">
							<SharedUser
								id="123"
								firstName="Naol"
								lastName="Chala"
								email="naolchala6@gmail.com"
								photoURL="https://api.dicebear.com/5.x/initials/svg?seed=Naol%20Chala"
							/>
							<SharedUser
								id="123"
								firstName="Naol"
								lastName="Chala"
								email="naolchala6@gmail.com"
								photoURL="https://api.dicebear.com/5.x/initials/svg?seed=Nal%20Chala"
							/>
						</Flex>
					</Flex>
				</DialogContent>
				<DialogFooter>
					<Button
						onClick={onClose}
						size="sm"
						colorScheme="whiteAlpha"
					>
						Close
					</Button>
				</DialogFooter>
			</Dialog>

			<Flex direction="row" gap={"40px"}>
				<Flex height={"100%"} width="250px">
					<PlaylistImage src={currentPlaylist?.playlistArtURL} />
				</Flex>
				<Flex flex={"1"} direction="column">
					<PlaylistHeader>{currentPlaylist?.label}</PlaylistHeader>
					<Flex
						flexWrap="wrap"
						direction={"row"}
						gap="10px"
						marginBottom={"20px"}
					>
						<PlaylistProperty>
							{currentPlaylist?._count?.Songs} Songs
						</PlaylistProperty>
						<PlaylistProperty>
							{currentPlaylist?.visibility}
						</PlaylistProperty>
					</Flex>
					<PlaylistDescription>
						{currentPlaylist?.desc}
					</PlaylistDescription>
					<Flex direction={"row"} gap="20px">
						<Button
							onClick={() =>
								navigate(`/dashboard/playlist/add-song/${id}`)
							}
							colorScheme="yellow"
							shape="round"
							leftIcon={<BiPlusCircle />}
							glow
						>
							Add music
						</Button>
						<Button
							colorScheme="whiteAlpha"
							shape="round"
							leftIcon={<BiShareAlt />}
							onClick={onOpen}
						>
							Share playlist
						</Button>
						<Menu
							isOpen={menuOpen}
							menuContent={
								<MenuContent>
									<MenuItem
										onClick={() =>
											navigate(
												"/dashboard/playlist/edit/" + id
											)
										}
									>
										<MenuItemIcon>
											<BiEditAlt />
										</MenuItemIcon>
										Edit Playlist
									</MenuItem>
									<MenuItem>
										<MenuItemIcon>
											<BiTrash />
										</MenuItemIcon>
										Delete Playlist
									</MenuItem>
								</MenuContent>
							}
						>
							<IconButton
								icon={<BiDotsVerticalRounded />}
								size="xl"
								onClick={() => setMenuOpen((val) => !val)}
							></IconButton>
						</Menu>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction={"column"} marginTop="40px">
				<PlaylistHeader>Songs</PlaylistHeader>
				<Flex direction={"column"} marginTop="15px" gap="20px">
					{[...Array(10)].map((v, k) => {
						if (k == 0) {
							return (
								<SongCard
									{...ExampleSong}
									suggestion={false}
									showMenu
								/>
							);
						}

						return (
							<>
								<Divider />
								<SongCard
									{...ExampleSong}
									suggestion={false}
									showMenu
								/>
							</>
						);
					})}
				</Flex>
			</Flex>
		</DashboardPage>
	);
};

export interface ISharedUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	photoURL: string;
}

export const SharedUser = (props: ISharedUser) => {
	return (
		<SharedUserContainer>
			<SharedUserAvatar src={props.photoURL} />
			<Flex flex="1" direction={"column"}>
				<SharedUserName>{`${props.firstName} ${props.lastName}`}</SharedUserName>
				<SharedUserEmail>{props.email}</SharedUserEmail>
			</Flex>
			<IconButton icon={<BiTrash />} />
		</SharedUserContainer>
	);
};

const SharedUserContainer = styled.div({
	display: "flex",
	alignItems: "center",
	padding: "16px",
	borderRadius: "6px",
	background: colors.whiteAlpha[50],
});

const SharedUserAvatar = styled.img({
	width: "45px",
	height: "45px",
	borderRadius: "100%",
	marginRight: "15px",
	objectFit: "cover",
});

const SharedUserName = styled.h4({
	fontFamily: fonts.body,
});

const SharedUserEmail = styled.p({
	fontSize: "0.8em",
});
