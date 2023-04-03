import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormikFormField } from "$components/Layout/FormField";
import { DashboardPage } from "$pages/Dashboard/Dashboard.styles";
import {
	IFormikSong,
	songSchema,
} from "$pages/Dashboard/utils/validation-schema";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { addSongRequested } from "$stores/playlist/songSlice";
import { useFormik } from "formik";
import { BiMusic } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { SectionTitle, SectionSubtitle } from "../Home.style";
import { SongAutoCompleteField } from "./components/SongAutoComplete";

interface IAddSongs {
	isEdit?: boolean;
}

export const AddSong = ({ isEdit }: IAddSongs) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { currentSong, loading } = useAppSelector((state) => state.songs);
	const { currentPlaylist } = useAppSelector((state) => state.playlist);
	const { user } = useAppSelector((state) => state.user);

	const initialSong: IFormikSong = {
		title: currentSong?.title || "",
		album: currentSong?.album || "",
		artist: currentSong?.artist || "",
		releaseYear: currentSong?.releaseYear || new Date().getFullYear(),
		duration: currentSong?.duration || 0,
		deezerURL: currentSong?.deezerURL || "",
	};

	const formik = useFormik({
		initialValues: initialSong,
		validationSchema: songSchema,
		onSubmit: (values, actions) => {
			if (!isEdit) {
				dispatch(
					addSongRequested({
						token: user?.token || "",
						playlistID: currentPlaylist?.id || "",
						song: values,
					})
				);
			}
		},
	});

	return (
		<DashboardPage>
			<SectionTitle>{currentPlaylist?.label}</SectionTitle>
			<SectionSubtitle>{isEdit ? "Edit" : "Add"} Song</SectionSubtitle>
			<form onSubmit={formik.handleSubmit}>
				<Flex direction={"column"} marginTop="50px">
					<SongAutoCompleteField formik={formik} disabled={loading} />
					<Flex gap="20px" marginTop={"20px"}>
						<FormikFormField
							disabled={loading}
							formik={formik}
							name="album"
							label="Album"
						></FormikFormField>
						<FormikFormField
							formik={formik}
							name="artist"
							label="Artists"
							disabled={loading}
						></FormikFormField>
					</Flex>
					<Flex gap="20px" marginTop={"20px"}>
						<FormikFormField
							formik={formik}
							name="releaseYear"
							label="Release Year"
							type="number"
							disabled={loading}
						></FormikFormField>
						<FormikFormField
							formik={formik}
							name="duration"
							label="Duration"
							type="number"
							disabled={loading}
						></FormikFormField>
						<FormikFormField
							formik={formik}
							name="deezerURL"
							label="Deezer URL"
							disabled={loading}
						></FormikFormField>
					</Flex>
					<Flex gap="20px" marginTop={"70px"} alignSelf="flex-end">
						<Button
							type="submit"
							colorScheme="yellow"
							shape="round"
							leftIcon={<BiMusic></BiMusic>}
							isLoading={loading}
							glow
						>
							{isEdit ? "Edit " : "Add "}
							Song
						</Button>
						<Button
							type="button"
							onClick={() =>
								navigate(
									"/dashboard/playlist/" + currentPlaylist?.id
								)
							}
							colorScheme="whiteAlpha"
							shape="round"
						>
							Cancel
						</Button>
					</Flex>
				</Flex>
			</form>
		</DashboardPage>
	);
};
