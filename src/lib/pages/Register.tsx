import { Background } from "$components/Background";
import { Button } from "$components/Layout/Button";
import { Flex } from "$components/Layout/Flex";
import {
	FormError,
	FormField,
	FormikFormField,
	FormLabel,
	Input,
} from "$components/Layout/FormField";
import { HighlightedHeader } from "$components/styles/LandingPageStyles";
import {
	BottomLink,
	FormHeader,
	IntroHeader,
	IntroParagraph,
	RegisterFormContainer,
	RegisterIntroSection,
	RegisterPageContainer,
	Spacer,
} from "$components/styles/RegisterStyles";
import { Form } from "$components/styles/RegisterStyles";
import { useFormik } from "formik";
import { BiUserPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const registerValidationSchema = yup.object().shape({
	firstName: yup.string().required("Please, Enter your First name"),
	lastName: yup.string().required("Please, Enter your Last name"),
	email: yup
		.string()
		.required("Please, Enter your email")
		.email("Please, Enter a valid email"),
	password: yup
		.string()
		.required("Please, Enter your password")
		.min(6, "Password should be at least 6 chars."),
	confirmPassword: yup
		.string()
		.required("Please, Confirm your password")
		.oneOf([yup.ref("password")], "Your passwords don't match"),
});

export const Register = () => {
	const route = useNavigate();
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: registerValidationSchema,
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
					<BottomLink href="/login">
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
								isLoading={formik.isSubmitting}
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
