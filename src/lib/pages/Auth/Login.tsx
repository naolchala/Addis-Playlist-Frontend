import { Background } from "$components/Background";
import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormikFormField } from "$components/Layout/FormField";
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
} from "./Auth.style";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { loginRequest } from "$stores/user/userSlice";
import { useFormik } from "formik";
import { useEffect } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { HighlightedHeader } from "$pages/LandingPage/LandingPage.style";
import { loginSchema } from "./utils/validation-schema";

export const LoginPage = () => {
	const route = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: async (values, actions) => {
			dispatch(loginRequest(values));
		},
	});

	useEffect(() => {
		if (user.user) {
			route("/dashboard/");
		}
	}, [user.user]);

	useEffect(() => {
		if (user.error && user.error.field) {
			formik.setFieldError(user.error.field, user.error.msg);
		}
	}, [user.error]);

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
					<BottomLink to="/auth/register">
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
								disabled={user.loading}
							/>
						</Flex>

						<Flex flexDirection="column">
							<FormikFormField
								name="password"
								label="Password"
								formik={formik}
								type="password"
								disabled={user.loading}
							/>
						</Flex>

						<Flex alignSelf="flex-end" marginTop={"50px"}>
							<Button
								type="submit"
								colorScheme="yellow"
								shape="round"
								glow
								isLoading={user.loading}
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
