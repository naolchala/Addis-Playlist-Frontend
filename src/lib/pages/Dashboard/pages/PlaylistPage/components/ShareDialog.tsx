import { Button } from "$components/Layout/Button";
import {
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogContent,
	DialogFooter,
	IDialog,
} from "$components/Layout/Dialog/Dialog";
import { Flex } from "$components/Layout/Flex";
import { FormField, FormLabel, Input } from "$components/Layout/FormField";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import {
	addSharedUserRequest,
	loadSharedUsersRequested,
} from "$stores/playlist/sharedUsersSlice";
import { useEffect, useState } from "react";
import { BiShareAlt } from "react-icons/bi";
import { SharedUser, SharedUserLoading } from "./SharedUser";

export const ShareDialog = ({ isOpen, onClose, closeOnOverlay }: IDialog) => {
	const dispatch = useAppDispatch();
	const { loading, error, sharedUsers } = useAppSelector(
		(state) => state.sharedUsers
	);
	const { currentPlaylist } = useAppSelector((state) => state.playlist);
	const { user } = useAppSelector((state) => state.user);
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (user && currentPlaylist) {
			dispatch(
				loadSharedUsersRequested({
					token: user?.token || "",
					playlistID: currentPlaylist?.id || "",
				})
			);
		}
	}, [currentPlaylist?.id]);

	const share = () => {
		dispatch(
			addSharedUserRequest({
				email,
				playlistID: currentPlaylist?.id || "",
				token: user?.token || "",
			})
		);
	};

	return (
		<Dialog
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlay={closeOnOverlay}
		>
			<DialogHeader>
				<DialogTitle>Share Playlist</DialogTitle>
			</DialogHeader>
			<DialogContent>
				<Flex alignItems={"flex-end"} gap="10px">
					<FormField>
						<FormLabel>Email</FormLabel>
						<Input
							disabled={loading.add}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormField>
					<Button
						leftIcon={<BiShareAlt />}
						size="sm"
						colorScheme="yellow"
						isLoading={loading.add}
						onClick={share}
					>
						Share
					</Button>
				</Flex>

				{sharedUsers.length > 0 && (
					<Flex marginTop="20px" direction={"column"}>
						<FormLabel>Shared With</FormLabel>
						<Flex direction={"column"} gap="10px">
							{loading.load
								? [...Array(3)].map((v, k) => (
										<SharedUserLoading key={k} />
								  ))
								: sharedUsers.map((sharedUser) => (
										<SharedUser
											{...sharedUser}
											key={sharedUser.id}
										/>
								  ))}
						</Flex>
					</Flex>
				)}
			</DialogContent>
			<DialogFooter>
				<Button onClick={onClose} size="sm" colorScheme="whiteAlpha">
					Close
				</Button>
			</DialogFooter>
		</Dialog>
	);
};
