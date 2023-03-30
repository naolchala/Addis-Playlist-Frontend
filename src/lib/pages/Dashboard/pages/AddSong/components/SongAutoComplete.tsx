import { Flex } from "$components/Layout/Flex";
import {
	FormField,
	FormLabel,
	Input,
	FormError,
} from "$components/Layout/FormField";
import { Skeleton } from "$components/Layout/Skeleton";
import { apiUrl } from "$config/api/api";
import {
	SongItem,
	SongItemLoading,
} from "$pages/Dashboard/components/Songs/SongItem";
import { IFormikSong } from "$pages/Dashboard/utils/validation-schema";
import { DeezerSongResponse } from "$types/songs.types";
import axios from "axios";
import { FormikContextType } from "formik";
import { useState, useEffect } from "react";
import {
	AutoCompleteField,
	AutoCompleteContainer,
} from "./SongAutoComplete.style";

interface ISongAutoCompleteField {
	formik: FormikContextType<IFormikSong>;
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
								<SongItemLoading />
							) : (
								data.map((response, key) => (
									<Flex
										role={"button"}
										onClick={() => fillData(response)}
										key={key}
										cursor="pointer"
									>
										<SongItem
											{...response}
											suggestion={true}
										/>
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
