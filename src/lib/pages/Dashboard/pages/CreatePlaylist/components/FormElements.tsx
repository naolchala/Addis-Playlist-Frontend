import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormField, FormLabel } from "$components/Layout/FormField";
import { IPlaylistFormik } from "$pages/Dashboard/utils/validation-schema";
import { FormikContextType } from "formik";
import { FC, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { FileUploadImage, FileUploadLabel } from "../CreatePlaylist.styles";

interface IOtherFormType {
	name: string;
	formik: FormikContextType<IPlaylistFormik>;
}

export const VisibilityField: FC<IOtherFormType> = ({ name, formik }) => {
	const visibilityValues = ["PRIVATE", "PUBLIC"];

	return (
		<FormField>
			<FormLabel>Playlist Visibility</FormLabel>
			<Flex gap={"10px"} padding="2px 0">
				{visibilityValues.map((v, k) => (
					<Button
						type="button"
						key={v}
						size="xs"
						shape="round"
						colorScheme={
							formik.values.visibility == v
								? "yellow"
								: "whiteAlpha"
						}
						onClick={(e) => formik.setFieldValue(name, v)}
					>
						{v}
					</Button>
				))}
			</Flex>
		</FormField>
	);
};

export const PlaylistArtField: FC<IOtherFormType> = ({ name, formik }) => {
	const [file, setFile] = useState(null as any);
	return (
		<FormField>
			<FormLabel>Playlist Art</FormLabel>
			<FileUploadLabel htmlFor={name}>
				{formik.values.playlistArt ? (
					<FileUploadImage
						src={
							typeof formik.values.playlistArt === "string"
								? formik.values.playlistArt
								: URL.createObjectURL(formik.values.playlistArt)
						}
					/>
				) : (
					<>
						<BiUpload size="4em" />
						<span>Upload Picture</span>
					</>
				)}
			</FileUploadLabel>
			<input
				type="file"
				onChange={(e) => {
					formik.setFieldValue(
						name,
						e.target.files && e.target.files[0]
					);
				}}
				name={name}
				id={name}
				accept="images/*"
				hidden
			/>
		</FormField>
	);
};
