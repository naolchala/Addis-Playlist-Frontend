import { Button } from "$components/Layout/Button";
import { useDialog } from "$components/Layout/Dialog/Dialog";
import { Flex } from "$components/Layout/Flex";
import { IconButton } from "$components/Layout/IconButton";
import { Menu } from "$components/Layout/Menu/Menu";
import {
	MenuContent,
	MenuItem,
	MenuItemIcon,
} from "$components/Layout/Menu/Menu.styles";
import {
	PlaylistDescription,
	PlaylistHeader,
	PlaylistImage,
	PlaylistProperty,
} from "./Playlist-Page.style";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { loadSongsRequested } from "$stores/playlist/songSlice";
import { useEffect, useState } from "react";
import {
	BiDotsVerticalRounded,
	BiEditAlt,
	BiPlusCircle,
	BiShareAlt,
	BiTrash,
} from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { ShareDialog } from "./components/ShareDialog";
import { SongsContainer } from "./components/SongContainer";
import { DashboardPage } from "$pages/Dashboard/Dashboard.styles";
import { removePlaylistRequest } from "$stores/playlist/playlistSlice";
import { LoadingDialog } from "./components/LoadingDialog";

export const PlaylistPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const [isMenu, setMenu] = useState(false);
	const { onClose, onOpen, isOpen } = useDialog(false);
	const { currentPlaylist } = useAppSelector((state) => state.playlist);
	const { user } = useAppSelector((state) => state.user);
	const {
		onClose: deletingOnClose,
		isOpen: deletingIsOpen,
		onOpen: deletingOnOpen,
	} = useDialog(false);

	useEffect(() => {
		if (user && currentPlaylist) {
			dispatch(
				loadSongsRequested({
					playlistID: currentPlaylist?.id || "",
					token: user?.token || "",
				})
			);
		}
	}, [currentPlaylist?.id, user?.token]);

	const removePlaylist = () => {
		deletingOnOpen();
		dispatch(
			removePlaylistRequest({
				token: user?.token || "",
				playlistID: currentPlaylist?.id || "",
			})
		);
	};

	return (
		<DashboardPage>
			<LoadingDialog isOpen={deletingIsOpen} onClose={deletingOnClose} />
			<ShareDialog
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlay={true}
			/>
			<Flex direction={["column", "column", "row"]} gap={"40px"}>
				<Flex
					height={"100%"}
					width="250px"
					alignItems={"center"}
					justifyContent="center"
				>
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
					{currentPlaylist?.userID === user?.id && (
						<Flex direction={["column", "row"]} gap="20px">
							<Button
								onClick={() =>
									navigate(
										`/dashboard/playlist/add-song/${id}`
									)
								}
								colorScheme="yellow"
								shape="round"
								leftIcon={<BiPlusCircle />}
								glow
							>
								Add music
							</Button>
							<Flex alignItems="center" gap="10px">
								<Button
									colorScheme="whiteAlpha"
									shape="round"
									leftIcon={<BiShareAlt />}
									onClick={onOpen}
								>
									Share playlist
								</Button>
								<Menu
									isOpen={isMenu}
									menuContent={
										<MenuContent>
											<MenuItem
												onClick={() =>
													navigate(
														"/dashboard/playlist/edit/" +
															id
													)
												}
											>
												<MenuItemIcon>
													<BiEditAlt />
												</MenuItemIcon>
												Edit Playlist
											</MenuItem>
											<MenuItem onClick={removePlaylist}>
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
										onClick={() => setMenu((val) => !val)}
									></IconButton>
								</Menu>
							</Flex>
						</Flex>
					)}
				</Flex>
			</Flex>
			<Flex direction={"column"} marginTop="40px">
				<PlaylistHeader>Songs</PlaylistHeader>
				<SongsContainer />
			</Flex>
		</DashboardPage>
	);
};
