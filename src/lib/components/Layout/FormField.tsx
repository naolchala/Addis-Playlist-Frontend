import { colors } from "$config/Theme/colors";
import { textFieldSizes } from "$config/Theme/sizes";
import styled from "@emotion/styled";
import { FC } from "react";

export const FormField = styled.div({
	display: "flex",
	flexDirection: "column",
	flex: "1",
});
export const FormLabel = styled.label({
	marginBottom: "8px",
	fontSize: "0.9rem",
});

interface InputProps {
	inputSize?: keyof typeof textFieldSizes;
}

export const Input = styled.input((props: InputProps) => ({
	outline: "none",
	border: "none",
	background: colors.whiteAlpha[200],
	color: colors.white,
	padding: textFieldSizes[props.inputSize || "sm"].padding,
	fontSize: textFieldSizes[props.inputSize || "sm"].fontSize,
	borderRadius: "4px",
	transition: "all 300ms ease-out",

	":focus": {
		boxShadow: "0 0 0 1px " + colors.whiteAlpha[400],
	},
}));

export const Textarea = styled.textarea((props: InputProps) => ({
	outline: "none",
	border: "none",
	background: colors.whiteAlpha[200],
	color: colors.white,
	padding: textFieldSizes[props.inputSize || "sm"].padding,
	fontSize: textFieldSizes[props.inputSize || "sm"].fontSize,
	borderRadius: "4px",
	transition: "all 300ms ease-out",

	":focus": {
		boxShadow: "0 0 0 1px " + colors.whiteAlpha[400],
	},
}));

export const FormError = styled.span({
	display: "block",
	color: colors.red[400],
	fontSize: "0.8rem",
	marginTop: "5px",
});

interface IFormikFormField {
	label: string;
	name: string;
	formik: any;
	rows?: number;
	type?: string;
	size?: keyof typeof textFieldSizes;
}
export const FormikFormField: FC<IFormikFormField> = ({
	label,
	name,
	formik,
	type,
	size,
}) => {
	return (
		<FormField>
			<FormLabel>{label}</FormLabel>
			<Input
				type={type || "text"}
				name={name}
				value={formik.values[name]}
				onChange={formik.handleChange}
				inputSize={size}
			></Input>
			<FormError>
				{formik.touched[name] ? formik.errors[name] : ""}
			</FormError>
		</FormField>
	);
};

export const FormikTextArea: FC<IFormikFormField> = ({
	label,
	formik,
	name,
	rows,
	size,
}) => {
	return (
		<FormField>
			<FormLabel>{label}</FormLabel>
			<Textarea
				name={name}
				value={formik.values[name]}
				onChange={formik.handleChange}
				rows={rows}
				inputSize={size}
			/>
			<FormError>
				{formik.touched[name] ? formik.errors[name] : ""}
			</FormError>
		</FormField>
	);
};
