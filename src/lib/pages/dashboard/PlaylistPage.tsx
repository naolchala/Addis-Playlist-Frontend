import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { IconButton } from "$components/Layout/IconButton";
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
import {
	BiDotsVerticalRounded,
	BiPlusCircle,
	BiShareAlt,
} from "react-icons/bi";

export const PlaylistPage = () => {
	return (
		<DashboardPage>
			<Flex direction="row" gap={"40px"}>
				<Flex height={"100%"} width="250px">
					<PlaylistImage src="https://images.unsplash.com/photo-1626358134206-0d1b77d48f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
				</Flex>
				<Flex flex={"1"} direction="column">
					<PlaylistHeader>LO-FI Playlist</PlaylistHeader>
					<Flex
						flexWrap="wrap"
						direction={"row"}
						gap="10px"
						marginBottom={"20px"}
					>
						<PlaylistProperty>40 Songs</PlaylistProperty>
						<PlaylistProperty>Public</PlaylistProperty>
					</Flex>
					<PlaylistDescription>
						Get lost in the laid-back vibes of "The Best Lofi-Hit
						Collections" playlist, packed with the ultimate
						selection of chill beats and nostalgic melodies that
						will have you hooked from the very first track. This
						handpicked collection is the perfect companion for your
						late-night study sessions or lazy weekend afternoons,
						offering a blend of classic and modern lo-fi hits that
						are sure to keep you grooving and relaxed all day long.
						So sit back, turn up the volume, and let the mellow
						beats transport you to a state of pure bliss.
					</PlaylistDescription>
					<Flex direction={"row"} gap="20px">
						<Button
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
						<IconButton
							icon={<BiDotsVerticalRounded />}
							size="xl"
						></IconButton>
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
