import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Sidebar} from './Sidebar';
import {ThemeDecorator} from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import {Theme} from "@/app/providers/ThemeProvider";
import {StoreDecorator} from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        user: {authData: {id: '123', username: 'test'}}
    })
]

export const Dark = Template.bind({});
Dark.args = {};

Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: {authData: {id: '123', username: 'test'}}
    })
]

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [
    StoreDecorator({user: {}})
]