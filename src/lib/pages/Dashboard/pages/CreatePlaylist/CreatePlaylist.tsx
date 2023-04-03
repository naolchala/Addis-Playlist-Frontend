import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormikFormField, FormikTextArea } from "$components/Layout/FormField";
import { SectionSubtitle, SectionTitle } from "../Home.style";
import { useFormik } from "formik";
import { BiAddToQueue, BiSave } from "react-icons/bi";
import { VisibilityField, PlaylistArtField } from "./components/FormElements";
import { playlistSchema } from "$pages/Dashboard/utils/validation-schema";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { DashboardPage } from "$pages/Dashboard/Dashboard.styles";
import { useEffect } from "react";
import {
	addPlaylistRequest,
	editPlaylistRequest,
	setCurrentPlaylist,
} from "$stores/playlist/playlistSlice";
import { Visibility } from "$types/playlist.types";

interface CreatePlaylistType {
	isEdit?: boolean;
}

export const CreatePlaylist = ({ isEdit }: CreatePlaylistType) => {
	const dispatch = useAppDispatch();
	const { currentPlaylist, loading } = useAppSelector(
		(state) => state.playlist
	);
	const { user } = useAppSelector((state) => state.user);

	const formik = useFormik({
		initialValues: {
			label: isEdit ? currentPlaylist?.label || "" : "",
			desc: isEdit ? currentPlaylist?.desc || "" : "",
			visibility: isEdit
				? currentPlaylist?.visibility || "PRIVATE"
				: ("PRIVATE" as Visibility),
			playlistArt: isEdit
				? currentPlaylist?.playlistArtURL || ""
				: (undefined as any),
		},
		validationSchema: playlistSchema,
		onSubmit: (values, actions) => {
			if (!isEdit) {
				dispatch(
					addPlaylistRequest({
						token: user?.token || "",
						playlist: values,
					})
				);
			} else {
				dispatch(
					editPlaylistRequest({
						token: user?.token || "",
						playlist: values,
						playlistID: currentPlaylist?.id || "",
					})
				);
			}
		},
	});

	useEffect(() => {
		if (!isEdit) {
			dispatch(setCurrentPlaylist(undefined));
		}
	}, [isEdit]);

	return (
		<DashboardPage>
			<Flex direction={"column"} gap="5px">
				<SectionTitle>
					{isEdit ? "Edit" : "Create"} Playlist
				</SectionTitle>
				<SectionSubtitle>
					{isEdit
						? "Update your playlist info"
						: "Add a new playlist to your collections."}
				</SectionSubtitle>
			</Flex>

			<form onSubmit={formik.handleSubmit}>
				<Flex
					direction={["column", "column", "row"]}
					marginTop="40px"
					gap={"40px"}
					alignItems={"flex-start"}
				>
					<Flex gap="20px" direction={"column"} flex="2">
						<FormikFormField
							label="Playlist Label"
							formik={formik}
							name="label"
							size="md"
						/>
						<FormikTextArea
							label="Playlist Description (optional)"
							formik={formik}
							name="desc"
							rows={10}
							size="md"
						/>
					</Flex>
					<Flex
						direction={"column"}
						gap="25px"
						flex="1"
						justifyContent={"flex-start"}
					>
						<Flex>
							<VisibilityField
								formik={formik}
								name="visibility"
							/>
						</Flex>
						<Flex>
							<PlaylistArtField
								name="playlistArt"
								formik={formik}
								disabled={isEdit}
							/>
						</Flex>
					</Flex>
				</Flex>
				<Flex direction={"column"} marginTop="60px">
					<Flex alignSelf={"center"}>
						<Button
							type="submit"
							colorScheme="yellow"
							shape="round"
							glow
							leftIcon={isEdit ? <BiSave /> : <BiAddToQueue />}
							isLoading={loading}
						>
							{isEdit ? "Save" : "Create"} Playlist
						</Button>
					</Flex>
				</Flex>
			</form>
		</DashboardPage>
	);
};
