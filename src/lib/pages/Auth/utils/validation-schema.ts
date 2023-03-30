import * as yup from "yup";

export const loginSchema = yup.object().shape({
	email: yup.string().required("Please, Enter your email"),
	password: yup
		.string()
		.required("Please, Enter your password")
		.min(6, "Password should be at least 6 chars."),
});

export const registerSchema = yup.object().shape({
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
