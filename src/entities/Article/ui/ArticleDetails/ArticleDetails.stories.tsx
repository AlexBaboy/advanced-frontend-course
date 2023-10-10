import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ArticleDetails} from './ArticleDetails';
import {StoreDecorator} from "shared/config/storybook/StoreDecorator/StoreDecorator";
import {article} from "shared/mocks/articleDetail";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/ArticleDetails',
    component: ArticleDetails,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetails>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof ArticleDetails> = (args) => <ArticleDetails {...args} />;

export const Light = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Light.args = {};
Light.decorators = [StoreDecorator({
    articleDetails: {data: article, isLoading: false}
})]

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
    articleDetails: {isLoading: true}
})]

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
    articleDetails: {error: 'error message', isLoading: false}
})]
