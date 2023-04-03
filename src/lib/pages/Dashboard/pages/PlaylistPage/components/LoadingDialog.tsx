import {
	Dialog,
	DialogContent,
	IDialog,
} from "$components/Layout/Dialog/Dialog";
import { Flex } from "$components/Layout/Flex";
import { SpinnerContainer } from "$components/Layout/Spinner";
import { BiLoader, BiLoaderAlt, BiLoaderCircle } from "react-icons/bi";
import { SectionSubtitle, SectionTitle } from "../../Home.style";

export const LoadingDialog = ({ isOpen, onClose }: IDialog) => {
	return (
		<Dialog isOpen={isOpen} onClose={onClose}>
			<DialogContent>
				<Flex
					direction={"column"}
					padding={"10px"}
					alignItems="center"
					justifyContent={"center"}
				>
					<SpinnerContainer>
						<BiLoaderCircle size={"90px"} />
					</SpinnerContainer>
					<SectionTitle>Deleting.</SectionTitle>
				</Flex>
			</DialogContent>
		</Dialog>
	);
};
