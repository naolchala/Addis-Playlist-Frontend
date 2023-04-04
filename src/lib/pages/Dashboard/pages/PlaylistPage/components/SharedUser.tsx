import { Flex } from "$components/Layout/Flex";
import { IconButton } from "$components/Layout/IconButton";
import { Skeleton } from "$components/Layout/Skeleton";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { deleteSharedUserRequest } from "$stores/playlist/sharedUsersSlice";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import {
	SharedUserContainer,
	SharedUserAvatar,
	SharedUserName,
	SharedUserEmail,
} from "./SharedUser.style";

export interface ISharedUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	photoURL: string;
}

export const SharedUser = (props: ISharedUser) => {
	const dispatch = useAppDispatch();
	const [isLoading, setLoading] = useState(false);
	const { user } = useAppSelector((state) => state.user);
	const { currentPlaylist } = useAppSelector((state) => state.playlist);

	const deleteShared = () => {
		setLoading(true);
		dispatch(
			deleteSharedUserRequest({
				token: user?.token || "",
				playlistID: currentPlaylist?.id || "",
				userID: props.id,
				callback() {
					setLoading(false);
				},
			})
		);
	};
	return (
		<SharedUserContainer>
			<SharedUserAvatar src={props.photoURL} />
			<Flex flex="1" direction={"column"}>
				<SharedUserName>{`${props.firstName} ${props.lastName}`}</SharedUserName>
				<SharedUserEmail>{props.email}</SharedUserEmail>
			</Flex>
			<IconButton
				icon={<BiTrash />}
				isLoading={isLoading}
				onClick={deleteShared}
			/>
		</SharedUserContainer>
	);
};

export const SharedUserLoading = () => {
	return (
		<SharedUserContainer>
			<Flex marginRight={"15px"}>
				<Skeleton width="45px" height="45px" borderRadius="100%" />
			</Flex>
			<Flex flex="1" direction={"column"}>
				<Flex marginBottom={"5px"}>
					<Skeleton width="80px" height="8px" />
				</Flex>
				<Skeleton width="100px" height="4px" />
			</Flex>
		</SharedUserContainer>
	);
};
