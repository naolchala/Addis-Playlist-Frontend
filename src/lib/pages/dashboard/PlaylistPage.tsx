import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
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
import axios from "axios";
import { useEffect, useState } from "react";
import {
	BiDotsVerticalRounded,
	BiEditAlt,
	BiPlusCircle,
	BiShareAlt,
	BiTrash,
} from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

export const PlaylistPage = () => {
	const { id } = useParams();
	const [detail, setDetail] = useState({} as any);
	const [loading, setLoading] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		axios
			.post(`${apiUrl}/playlist`, {
				playlistID: id,
			})
			.then((res) => setDetail(res.data))
			.finally(() => setLoading(false));
	}, [id]);

	return (
		<DashboardPage>
			<Flex direction="row" gap={"40px"}>
				<Flex height={"100%"} width="250px">
					<PlaylistImage src="https://images.unsplash.com/photo-1626358134206-0d1b77d48f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
				</Flex>
				<Flex flex={"1"} direction="column">
					<PlaylistHeader>
						{loading ? (
							<Skeleton height="40px" width="200px" />
						) : (
							detail?.label
						)}
					</PlaylistHeader>
					<Flex
						flexWrap="wrap"
						direction={"row"}
						gap="10px"
						marginBottom={"20px"}
					>
						{loading ? (
							<>
								<Skeleton height="20px" width="70px" />
								<Skeleton height="20px" width="80px" />
							</>
						) : (
							<>
								<PlaylistProperty>
									{detail._count?.Songs} Songs
								</PlaylistProperty>
								<PlaylistProperty>
									{detail?.visibility}
								</PlaylistProperty>
							</>
						)}
					</Flex>
					<PlaylistDescription>
						{loading ? (
							<>
								{[...Array(4)].map((v, k) => (
									<Flex marginBottom={"5px"}>
										<Skeleton height="10px" width="80%" />
									</Flex>
								))}
							</>
						) : (
							detail?.desc
						)}
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
						>
							Share playlist
						</Button>
						<Menu
							isOpen={menuOpen}
							menuContent={
								<MenuContent>
									<MenuItem>
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
							return <SongCard {...ExampleSong} />;
						}

						return (
							<>
								<Divider />
								<SongCard {...ExampleSong} />
							</>
						);
					})}
				</Flex>
			</Flex>
		</DashboardPage>
	);
};
