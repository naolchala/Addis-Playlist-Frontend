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

export const PlaylistPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const [isMenu, setMenu] = useState(false);
	const { onClose, onOpen, isOpen } = useDialog(false);
	const { currentPlaylist } = useAppSelector((state) => state.playlist);
	const { user } = useAppSelector((state) => state.user);

	useEffect(() => {
		dispatch(
			loadSongsRequested({
				playlistID: currentPlaylist?.id || "",
				token: user?.token || "",
			})
		);
	}, [currentPlaylist?.id, user?.token]);

	const removePlaylist = () => {
		dispatch(
			removePlaylistRequest({
				token: user?.token || "",
				playlistID: currentPlaylist?.id || "",
			})
		);
	};

	return (
		<DashboardPage>
			<ShareDialog isOpen={isOpen} onClose={onClose} />
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
						{currentPlaylist?.userID === user?.id && (
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
						)}
					</Flex>
				</Flex>
			</Flex>
			<Flex direction={"column"} marginTop="40px">
				<PlaylistHeader>Songs</PlaylistHeader>
				<SongsContainer />
			</Flex>
		</DashboardPage>
	);
};
