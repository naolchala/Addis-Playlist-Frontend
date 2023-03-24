import { DashboardBackground } from "$components/Background";
import { Flex } from "$components/Layout/Flex";
import { FormikFormField, FormikTextArea } from "$components/Layout/FormField";
import {
	SectionSubtitle,
	SectionTitle,
} from "$components/styles/Dashboard/HomeStyles";
import { DashboardPage } from "$components/styles/DashboardStyles";
import { useFormik } from "formik";
import * as yup from "yup";

const playlistValidationSchema = yup.object().shape({
	label: yup.string().required("Please, provide label of the playlist"),
	desc: yup.string(),
	visibility: yup
		.string()
		.oneOf(["PUBLIC", "PRIVATE"], "only public or Private are allowed"),
});

export const CreatePlaylist = () => {
	const formik = useFormik({
		initialValues: {
			label: "",
			desc: "",
			visibility: "PRIVATE",
			playlistArt: null,
		},
		validationSchema: playlistValidationSchema,
		onSubmit: (values, actions) => {},
	});
	return (
		<DashboardPage>
			<Flex direction={"column"} gap="5px">
				<SectionTitle>Create Playlist</SectionTitle>
				<SectionSubtitle>
					Add a new playlist to your collections.
				</SectionSubtitle>
			</Flex>
			<Flex direction={"column"} marginTop="40px">
				<Flex gap="20px">
					<FormikFormField
						label="Playlist Label"
						formik={formik}
						name="label"
					/>
					<FormikTextArea
						label="Playlist Description"
						formik={formik}
						name="label"
					/>
				</Flex>
			</Flex>
		</DashboardPage>
	);
};
