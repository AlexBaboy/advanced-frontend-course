import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {StoreDecorator} from "shared/config/storybook/StoreDecorator/StoreDecorator";
import AddCommentForm from "features/addCommentForm/ui/AddCommentForm/AddCommentForm";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddCommentForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
Primary.decorators = [StoreDecorator({
    loginForm: {
        username: 'usernameTest',
        password: '123',
        isLoading: false
    }
})]

export const WithError = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithError.args = {};
WithError.decorators = [StoreDecorator({
    loginForm: {
        username: 'usernameTest',
        password: '123',
        error: 'error message',
        isLoading: false
    }
})]

export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Loading.args = {};
Loading.decorators = [StoreDecorator({
    loginForm: {
        isLoading: true
    }
})]
