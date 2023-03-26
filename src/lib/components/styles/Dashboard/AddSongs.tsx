import { Flex } from "$components/Layout/Flex";
import { FormField, FormLabel, Input } from "$components/Layout/FormField";
import { colors } from "$config/Theme/colors";
import { IFormikSong } from "$pages/dashboard/AddSong";
import styled from "@emotion/styled";
import axios from "axios";
import { FormikContextType } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton } from "./HomeStyles";
import { ExampleSong, SongCard } from "./PlaylistStyles";

interface ISongAutoCompleteField {
	formik: FormikContextType<IFormikSong>;
}

interface DeezerSongResponse {
	title: string;
	deezerURL: string;
	duration: string;
	album: string;
	artists: string[];
	imgURL: string;
	releaseYear?: number;
}

let t: NodeJS.Timeout;
export const SongAutoCompleteField = ({ formik }: ISongAutoCompleteField) => {
	const [isLoading, setLoading] = useState(false);
	const [data, setData] = useState([] as DeezerSongResponse[]);
	const [showAutocomplete, setShowAutocomplete] = useState(false);
	const title = formik.values.title;

	useEffect(() => {
		if (t) {
			clearTimeout(t);
		}

		t = setTimeout(() => {
			if (title === "") {
				setData([]);
				return;
			}

			setLoading(true);
			axios
				.get(
					"http://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" +
						title
				)
				.then((res) => res.data.data as any[])
				.then((res) => {
					const data = res.splice(0, 5).map((value: any, key) => {
						const { title, link: deezerURL, duration } = value;
						let album = value?.album?.title;
						let artists = [value?.artist?.name];
						let imgURL = value?.album?.cover_small;
						return {
							title,
							deezerURL,
							duration,
							album,
							artists,
							imgURL,
						};
					});

					setData(data);
				})
				.finally(() => setLoading(false));
		}, 500);
	}, [formik.values.title]);

	const fillData = (data: DeezerSongResponse) => {
		formik.setValues({
			title: data.title,
			artists: data.artists.join(","),
			album: data.album,
			duration: parseInt(data.duration),
			deezerURL: data.deezerURL,
			releaseYear: data.releaseYear,
		});
		setShowAutocomplete(false);
	};

	return (
		<FormField
			tabIndex={1}
			onBlur={(event) => setShowAutocomplete(false)}
			onFocus={() => setShowAutocomplete(true)}
		>
			<FormLabel>
				Title
				<i>
					<small>
						{" "}
						(Press <kbd>ESC</kbd> to disable auto complete)
					</small>
				</i>
			</FormLabel>
			<Input
				name="title"
				value={formik.values.title}
				onChange={formik.handleChange}
			></Input>
			<Flex position="relative">
				{title && showAutocomplete && (
					<AutoCompleteContainer>
						{isLoading ? (
							<Flex
								justifyContent={"space-between"}
								padding="20px"
							>
								<Skeleton height="10px" width="50px"></Skeleton>
								<Skeleton height="10px" width="50px"></Skeleton>
								<Skeleton height="10px" width="50px"></Skeleton>
								<Skeleton height="10px" width="50px"></Skeleton>
								<Skeleton height="10px" width="50px"></Skeleton>
							</Flex>
						) : (
							data.map((d, k) => (
								<Flex
									role={"button"}
									onClick={() => fillData(d)}
									key={k}
								>
									<SongCard {...d} suggestion={true} />
								</Flex>
							))
						)}
					</AutoCompleteContainer>
				)}
			</Flex>
		</FormField>
	);
};

const AutoCompleteContainer = styled.div({
	display: "flex",
	flexDirection: "column",
	background: colors.background,
	width: "100%",
	padding: "10px 0",
	boxShadow:
		"rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px",
	position: "absolute",
	top: "100%",
});
