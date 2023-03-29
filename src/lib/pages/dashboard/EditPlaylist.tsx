import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormikFormField, FormikTextArea } from "$components/Layout/FormField";
import {
	PlaylistArtField,
	VisibilityField,
} from "$components/styles/Dashboard/CreateStyles";
import {
	SectionSubtitle,
	SectionTitle,
} from "$components/styles/Dashboard/HomeStyles";
import { DashboardPage } from "$components/styles/DashboardStyles";
import { useFormik } from "formik";
import { BiSave } from "react-icons/bi";
import * as yup from "yup";

const playlistValidationSchema = yup.object().shape({
	label: yup.string().required("Please, provide label of the playlist"),
	desc: yup.string(),
	visibility: yup
		.string()
		.oneOf(["PUBLIC", "PRIVATE"], "only public or Private are allowed"),
});

export interface IPlaylistFormik {
	label: string;
	desc: string;
	visibility: string;
	playlistArt: any;
}

export const EditPlaylist = () => {
	const formik = useFormik({
		initialValues: {
			label: "",
			desc: "",
			visibility: "PRIVATE",
			playlistArt: undefined as any,
		},
		validationSchema: playlistValidationSchema,
		onSubmit: (values, actions) => {},
	});
	return (
		<DashboardPage>
			<Flex direction={"column"} gap="5px">
				<SectionTitle>Edit Playlist</SectionTitle>
				<SectionSubtitle>LO-FI HITS</SectionSubtitle>
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
							/>
						</Flex>
					</Flex>
				</Flex>
				<Flex direction={"column"} marginTop="60px">
					<Flex alignSelf={"center"}>
						<Button
							colorScheme="yellow"
							shape="round"
							glow
							leftIcon={<BiSave />}
						>
							Save Playlist
						</Button>
					</Flex>
				</Flex>
			</form>
		</DashboardPage>
	);
};
