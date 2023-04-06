import { Background } from "$components/Background";
import { Button } from "$components/Layout/Button";
import {
	HeroButtonsContainer,
	HeroHeader,
	HeroSection,
	HeroSubtitle,
	HighlightedHeader,
	LandingPageContainer,
	Navbar,
	NavbarItem,
} from "./LandingPage.style";
import { BiPlay } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
	const router = useNavigate();
	return (
		<Background>
			<LandingPageContainer>
				<Navbar>
					<NavbarItem to="/">Home</NavbarItem>
					<NavbarItem
						to="https://neobrutalist-portfolio.vercel.app/"
						target={"_blank"}
					>
						About
					</NavbarItem>
					<NavbarItem
						to="https://github.com/naolchala/Addis-Playlist-Frontend"
						target={"_blank"}
					>
						Github
					</NavbarItem>
					<NavbarItem to="/auth/login" primary={true}>
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
							onClick={() => router("/auth/register")}
							shape="round"
							leftIcon={<BiPlay size={"1.3em"} />}
							colorScheme="yellow"
							size="xl"
							glow
						>
							Get Started
						</Button>
						<Button
							onClick={() =>
								router(
									"https://neobrutalist-portfolio.vercel.app/"
								)
							}
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
