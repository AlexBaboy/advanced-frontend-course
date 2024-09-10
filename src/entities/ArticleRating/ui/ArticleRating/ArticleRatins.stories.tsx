import {ComponentMeta, ComponentStory} from '@storybook/react';
import {StoreDecorator} from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import {article} from "@/shared/mocks/articleDetail";
import {ArticleRating} from "@/entities/ArticleRating";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/ArticleRating',
    component: ArticleRating,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRating>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

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
Error.args = {
    articleId: '1'
};

