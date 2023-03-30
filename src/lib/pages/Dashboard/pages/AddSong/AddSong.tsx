import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormikFormField } from "$components/Layout/FormField";
import { DashboardPage } from "$pages/Dashboard/Dashboard.styles";
import {
	IFormikSong,
	songSchema,
} from "$pages/Dashboard/utils/validation-schema";
import { useAppSelector } from "$stores/hooks";
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
	const { id } = useParams();
	const { currentSong } = useAppSelector((state) => state.songs);
	const { currentPlaylist } = useAppSelector((state) => state.playlist);

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
			console.log(values);
		},
	});

	return (
		<DashboardPage>
			<SectionTitle>{currentPlaylist?.label}</SectionTitle>
			<SectionSubtitle>{isEdit ? "Edit" : "Add"} Song</SectionSubtitle>
			<form onSubmit={formik.handleSubmit}>
				<Flex direction={"column"} marginTop="50px">
					<SongAutoCompleteField formik={formik} />
					<Flex gap="20px" marginTop={"20px"}>
						<FormikFormField
							formik={formik}
							name="album"
							label="Album"
						></FormikFormField>
						<FormikFormField
							formik={formik}
							name="artist"
							label="Artists"
						></FormikFormField>
					</Flex>
					<Flex gap="20px" marginTop={"20px"}>
						<FormikFormField
							formik={formik}
							name="releaseYear"
							label="Release Year"
							type="number"
						></FormikFormField>
						<FormikFormField
							formik={formik}
							name="duration"
							label="Duration"
							type="number"
						></FormikFormField>
						<FormikFormField
							formik={formik}
							name="deezerURL"
							label="Deezer URL"
						></FormikFormField>
					</Flex>
					<Flex gap="20px" marginTop={"70px"} alignSelf="flex-end">
						<Button
							type="submit"
							colorScheme="yellow"
							shape="round"
							leftIcon={<BiMusic></BiMusic>}
							glow
						>
							{isEdit ? "Edit" : "Add"}
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
