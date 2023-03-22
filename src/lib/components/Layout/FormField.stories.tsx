import react from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormField, FormLabel, Input } from "./FormField";

export default {
	title: "FormField",
	component: FormField,
} as ComponentMeta<typeof FormField>;

const Template: ComponentStory<typeof FormField> = (args) => (
	<FormField {...args}>
		<FormLabel>Label</FormLabel>
		<Input />
	</FormField>
);

export const Textfield = Template.bind({});
