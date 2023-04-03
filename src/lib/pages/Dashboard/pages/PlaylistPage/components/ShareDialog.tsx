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
import { useAppSelector } from "$stores/hooks";
import { BiShareAlt } from "react-icons/bi";
import { SharedUser, SharedUserLoading } from "./SharedUser";

export const ShareDialog = ({ isOpen, onClose, closeOnOverlay }: IDialog) => {
	const { loading, error, sharedUsers } = useAppSelector(
		(state) => state.sharedUsers
	);

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
						{loading ? (
							[...Array(3)].map((v, k) => (
								<SharedUserLoading key={k} />
							))
						) : (
							<>
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
							</>
						)}
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
