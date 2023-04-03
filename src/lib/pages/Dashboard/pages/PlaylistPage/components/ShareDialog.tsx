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
import { loadSharedUsersRequested } from "$stores/playlist/sharedUsersSlice";
import { useEffect } from "react";
import { BiShareAlt } from "react-icons/bi";
import { SharedUser, SharedUserLoading } from "./SharedUser";

export const ShareDialog = ({ isOpen, onClose, closeOnOverlay }: IDialog) => {
	const dispatch = useAppDispatch();
	const { loading, error, sharedUsers } = useAppSelector(
		(state) => state.sharedUsers
	);
	const { currentPlaylist } = useAppSelector((state) => state.playlist);
	const { user } = useAppSelector((state) => state.user);

	useEffect(() => {
		dispatch(
			loadSharedUsersRequested({
				token: user?.token || "",
				playlistID: currentPlaylist?.id || "",
			})
		);
	}, [currentPlaylist?.id]);

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
						{loading.load
							? [...Array(3)].map((v, k) => (
									<SharedUserLoading key={k} />
							  ))
							: sharedUsers.map((sharedUser) => (
									<SharedUser {...sharedUser} />
							  ))}
					</Flex>
				</Flex>
			</DialogContent>
			<DialogFooter>
				<Button onClick={onClose} size="sm" colorScheme="whiteAlpha">
					Close
				</Button>
			</DialogFooter>
		</Dialog>
	);
};
