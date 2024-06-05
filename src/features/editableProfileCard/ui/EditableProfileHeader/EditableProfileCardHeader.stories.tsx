import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {EditableProfileHeader} from "features/editableProfileCard/ui/EditableProfileHeader/EditableProfileHeader";

export default {
    title: 'features/EditableProfileCard/EditableProfileCardHeader',
    component: EditableProfileHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileHeader>;

const Template: ComponentStory<typeof EditableProfileHeader> = (args) => <EditableProfileHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};