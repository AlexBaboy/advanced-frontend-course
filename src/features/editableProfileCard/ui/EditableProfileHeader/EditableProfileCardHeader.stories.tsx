import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { EditableProfileHeader } from '@/features/editableProfileCard/ui/EditableProfileHeader/EditableProfileHeader';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/EditableProfileCard/EditableProfileCardHeader',
    component: EditableProfileHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileHeader>;

const Template: ComponentStory<typeof EditableProfileHeader> = (args) => <EditableProfileHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
