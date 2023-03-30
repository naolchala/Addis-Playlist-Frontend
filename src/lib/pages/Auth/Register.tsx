import { Background } from "$components/Background";
import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import { FormikFormField } from "$components/Layout/FormField";
import {
	BottomLink,
	Form,
	FormHeader,
	IntroHeader,
	IntroParagraph,
	RegisterFormContainer,
	RegisterIntroSection,
	RegisterPageContainer,
	Spacer,
} from "./Auth.style";
import { useAppDispatch, useAppSelector } from "$stores/hooks";
import { signUpRequest } from "$stores/user/userSlice";
import { useFormik } from "formik";
import { useEffect } from "react";
import { BiUserPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { HighlightedHeader } from "$pages/LandingPage/LandingPage.style";
import { registerSchema } from "./utils/validation-schema";

export const Register = () => {
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const route = useNavigate();
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: registerSchema,
		onSubmit: (values, actions) => {
			dispatch(signUpRequest(values));
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
					<BottomLink to="/auth/login">
						Already Have an Account?
					</BottomLink>
				</RegisterIntroSection>
				<RegisterFormContainer>
					<Form onSubmit={formik.handleSubmit}>
						<FormHeader>Create Account</FormHeader>
						<Flex
							direction={["column", "column", "row"]}
							gap="30px"
						>
							<FormikFormField
								name="firstName"
								label="First Name"
								formik={formik}
							/>
							<FormikFormField
								name="lastName"
								label="Last Name"
								formik={formik}
							/>
						</Flex>

						<Flex flexDirection="column">
							<FormikFormField
								name="email"
								label="Email"
								formik={formik}
								type="email"
							/>
						</Flex>

						<Flex
							direction={["column", "column", "row"]}
							gap="30px"
						>
							<FormikFormField
								name="password"
								label="Password"
								formik={formik}
								type="password"
							/>
							<FormikFormField
								name="confirmPassword"
								label="Confirm Password"
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
								isLoading={user.loading}
								leftIcon={<BiUserPlus />}
							>
								Create Account
							</Button>
						</Flex>
					</Form>
				</RegisterFormContainer>
			</RegisterPageContainer>
		</Background>
	);
};
