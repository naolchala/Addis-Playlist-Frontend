import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormField, FormikFormField } from "$components/Layout/FormField";
import { SongAutoCompleteField } from "$components/styles/Dashboard/AddSongStyles";
import {
	SectionSubtitle,
	SectionTitle,
} from "$components/styles/Dashboard/HomeStyles";
import { DashboardPage } from "$components/styles/DashboardStyles";
import { useFormik } from "formik";
import { BiMusic } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const songSchema = yup.object().shape({
	title: yup.string().required("Please, Enter the title of the song"),
	album: yup.string(),
	artist: yup.string(),
});

const initialSong: IFormikSong = {
	title: "",
	album: "",
	artist: "",
	releaseYear: 0,
	duration: 0,
	deezerURL: "",
};

export interface IFormikSong {
	title: string;
	album?: string;
	artist: string;
	releaseYear?: number;
	duration: number;
	deezerURL?: string;
}

export const EditSong = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const formik = useFormik({
		initialValues: initialSong,
		validationSchema: songSchema,
		onSubmit: (values, actions) => {
			console.log(values);
		},
	});

	return (
		<DashboardPage>
			<SectionTitle>LO-FI Hits </SectionTitle>
			<SectionSubtitle>Edit Song</SectionSubtitle>
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
							Save Song
						</Button>
						<Button
							type="button"
							onClick={() =>
								navigate("/dashboard/playlist/" + id)
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
