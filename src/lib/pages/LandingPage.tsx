import { Background } from "$components/Background";
import {
	HeroButtonsContainer,
	HeroHeader,
	HeroSection,
	HeroSubtitle,
	HighlightedHeader,
	LandingPageContainer,
	Navbar,
	NavbarItem,
} from "$components/LandingPage/Styles";
import { Button } from "$components/Layout/Button";
import { BiPlay } from "react-icons/bi";
import {
	useNavigate,
	useNavigation,
	useNavigationType,
} from "react-router-dom";

export const LandingPage = () => {
	const router = useNavigate();

	return (
		<Background>
			<LandingPageContainer>
				<Navbar>
					<NavbarItem href="/">Home</NavbarItem>
					<NavbarItem href="/about">About</NavbarItem>
					<NavbarItem href="http://github.com">Github</NavbarItem>
					<NavbarItem href="/login" primary>
						Login
					</NavbarItem>
				</Navbar>
				<HeroSection>
					<HeroHeader>
						Addis <HighlightedHeader>Playlist</HighlightedHeader>
					</HeroHeader>
					<HeroSubtitle>
						simple and user-friendly music playlist manager,
						designed to make organizing your music collection
						effortless.
					</HeroSubtitle>
					<HeroButtonsContainer>
						<Button
							onClick={() => router("/register")}
							shape="round"
							leftIcon={<BiPlay size={"1.3em"} />}
							colorScheme="yellow"
							size="xl"
							glow
						>
							Get Started
						</Button>
						<Button
							size="xl"
							shape="round"
							colorScheme="whiteAlpha"
						>
							About Me!
						</Button>
					</HeroButtonsContainer>
				</HeroSection>
			</LandingPageContainer>
		</Background>
	);
};
