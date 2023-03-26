import react from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormField, FormLabel, Input } from "./FormField";
import { GlobalStyle } from "$components/GlobalStyle";
import { Global } from "@emotion/react";

export default {
	title: "FormField",
	component: FormField,
} as ComponentMeta<typeof FormField>;

const Template: ComponentStory<typeof FormField> = (args) => (
	<>
		<Global styles={GlobalStyle}></Global>
		<FormField {...args}>
			<FormLabel>Label</FormLabel>
			<Input />
		</FormField>
	</>
);

export const Textfield = Template.bind({});
