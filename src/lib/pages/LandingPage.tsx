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
} from "$components/styles/LandingPageStyles";
import axios from "axios";
import { useEffect } from "react";
import { BiPlay } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export const LandingPage = () => {
	const router = useNavigate();

	useEffect(() => {
		axios
			.post("https://addis-playlist-backend.netlify.app/api/user/login", {
				email: "naolchala6@gmail.com",
				password: "123456",
			})
			.then((res) => {
				console.log(res.data);
			});
	}, []);

	return (
		<Background>
			<LandingPageContainer>
				<Navbar>
					<NavbarItem to="/">Home</NavbarItem>
					<NavbarItem to="/about">About</NavbarItem>
					<NavbarItem to="http://github.com">Github</NavbarItem>
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
