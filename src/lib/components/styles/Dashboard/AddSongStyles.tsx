import { Flex } from "$components/Layout/Flex";
import {
	FormError,
	FormField,
	FormLabel,
	Input,
} from "$components/Layout/FormField";
import { apiUrl } from "$config/api/api";
import { colors } from "$config/Theme/colors";
import { IFormikSong } from "$pages/dashboard/AddSong";
import styled from "@emotion/styled";
import axios from "axios";
import { FormikContextType } from "formik";
import { useEffect, useState } from "react";
import { Skeleton } from "./HomeStyles";
import { SongCard } from "./PlaylistStyles";

interface ISongAutoCompleteField {
	formik: FormikContextType<IFormikSong>;
}

interface DeezerSongResponse {
	title: string;
	duration: number;
	deezerURL: string;
	album: string;
	artist: string;
	cover: string;
}

let timeToSearch: NodeJS.Timeout;
export const SongAutoCompleteField = ({ formik }: ISongAutoCompleteField) => {
	const [isLoading, setLoading] = useState(false);
	const [data, setData] = useState([] as DeezerSongResponse[]);
	const [showAutoComplete, setShowAutoComplete] = useState(false);
	const title = formik.values.title;

	useEffect(() => {
		if (timeToSearch) {
			clearTimeout(timeToSearch);
		}

		timeToSearch = setTimeout(() => {
			if (title === "") {
				setData([]);
				return;
			}
			setLoading(true);
			axios
				.get(`${apiUrl}/songs/autocomplete?q=` + title)
				.then((res) => res.data as DeezerSongResponse[])
				.then((res) => setData(res))
				.finally(() => setLoading(false));
		}, 500);
	}, [title]);

	const fillData = (data: DeezerSongResponse) => {
		formik.setValues({
			title: data.title,
			artist: data.artist,
			duration: data.duration,
			album: data.album,
			deezerURL: data.deezerURL,
			releaseYear: undefined,
		});
		setShowAutoComplete(false);
	};

	return (
		<AutoCompleteField>
			<FormField tabIndex={1}>
				<FormLabel>
					Title
					<i>
						<small>
							(Press <kbd>ESC</kbd> to disable auto complete)
						</small>
					</i>
				</FormLabel>
				<Input
					className="auto-input"
					name="title"
					value={formik.values.title}
					onChange={formik.handleChange}
					onFocus={() => setShowAutoComplete(true)}
				></Input>
				<Flex position="relative">
					{showAutoComplete && (
						<AutoCompleteContainer className="auto-complete-container">
							{isLoading ? (
								<Flex
									justifyContent={"space-between"}
									padding="20px"
								>
									<Skeleton
										height="10px"
										width="50px"
									></Skeleton>
									<Skeleton
										height="10px"
										width="50px"
									></Skeleton>
									<Skeleton
										height="10px"
										width="50px"
									></Skeleton>
									<Skeleton
										height="10px"
										width="50px"
									></Skeleton>
									<Skeleton
										height="10px"
										width="50px"
									></Skeleton>
								</Flex>
							) : (
								data.map((d, k) => (
									<Flex
										role={"button"}
										onClick={() => fillData(d)}
										key={k}
										cursor="pointer"
									>
										<SongCard {...d} suggestion={true} />
									</Flex>
								))
							)}
						</AutoCompleteContainer>
					)}
				</Flex>
				<FormError>
					{formik.touched.title && formik.errors.title}
				</FormError>
			</FormField>
		</AutoCompleteField>
	);
};

const AutoCompleteContainer = styled.div({
	display: "none",
	flexDirection: "column",
	background: colors.background,
	width: "100%",
	maxHeight: "400px",
	overflowY: "auto",
	padding: "10px 0",
	boxShadow:
		"rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px",
	position: "absolute",
	top: "calc(100% + 5px)",
});

const AutoCompleteField = styled.div({
	"&:focus-within .auto-complete-container": {
		display: "flex",
	},
});
