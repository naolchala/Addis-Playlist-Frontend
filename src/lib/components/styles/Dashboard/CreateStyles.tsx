import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormField, FormLabel } from "$components/Layout/FormField";
import { colors } from "$config/Theme/colors";
import { IPlaylistFormik } from "$pages/dashboard/CreatePlaylist";
import styled from "@emotion/styled";
import { FormikConfig, FormikContextType, useFormikContext } from "formik";
import { FC, useState } from "react";
import { BiUpload } from "react-icons/bi";

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
						src={URL.createObjectURL(formik.values.playlistArt)}
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

const FileUploadLabel = styled.label({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	color: colors.blue[700],
	border: "2px solid " + colors.whiteAlpha[200],
	height: "250px",
	borderRadius: "4px",
	gap: "20px",
	textAlign: "center",
	textTransform: "uppercase",
});

const FileUploadImage = styled.img({
	width: "200px",
	height: "200px",
	borderRadius: "10px",
	objectFit: "cover",
});
