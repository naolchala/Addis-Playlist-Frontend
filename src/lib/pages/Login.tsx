import { Background } from "$components/Background";
import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormikFormField } from "$components/Layout/FormField";
import { HighlightedHeader } from "$components/styles/LandingPageStyles";
import {
	RegisterPageContainer,
	RegisterIntroSection,
	IntroHeader,
	IntroParagraph,
	Spacer,
	BottomLink,
	RegisterFormContainer,
	FormHeader,
	Form,
} from "$components/styles/RegisterStyles";
import { useFormik } from "formik";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const loginSchema = yup.object().shape({
	email: yup.string().required("Please, Enter your email"),
	password: yup
		.string()
		.required("Please, Enter your password")
		.min(6, "Password should be at least 6 chars."),
});

export const LoginPage = () => {
	const route = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (values, actions) => {
			actions.setSubmitting(true);
		},
	});

	return (
		<Background>
			<RegisterPageContainer>
				<RegisterIntroSection>
					<IntroHeader onClick={() => route("/")}>
						Addis <HighlightedHeader>Playlist</HighlightedHeader>
					</IntroHeader>
					<IntroParagraph>
						With our platform, you can easily create, edit, and
						customize your playlists to suit your mood and
						preferences. Our intuitive interface allows you to add
						or remove songs with just a few clicks, and our smart
						suggestions feature will help you discover new music to
						add to your collection.
					</IntroParagraph>
					<Spacer></Spacer>
					<BottomLink href="/auth/register">
						Create new Account
					</BottomLink>
				</RegisterIntroSection>
				<RegisterFormContainer>
					<Form onSubmit={formik.handleSubmit}>
						<FormHeader>Login</FormHeader>

						<Flex flexDirection="column">
							<FormikFormField
								name="email"
								label="Email"
								formik={formik}
								type="email"
							/>
						</Flex>

						<Flex flexDirection="column">
							<FormikFormField
								name="password"
								label="Password"
								formik={formik}
								type="password"
							/>
						</Flex>

						<Flex alignSelf="flex-end" marginTop={"50px"}>
							<Button
								type="submit"
								colorScheme="yellow"
								shape="round"
								glow
								isLoading={formik.isSubmitting}
								leftIcon={<BiLogInCircle />}
							>
								Login
							</Button>
						</Flex>
					</Form>
				</RegisterFormContainer>
			</RegisterPageContainer>
		</Background>
	);
};
