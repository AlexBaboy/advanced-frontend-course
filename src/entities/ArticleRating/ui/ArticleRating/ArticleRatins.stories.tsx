import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { ArticleRating } from '@/entities/ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/ArticleRating',
    component: ArticleRating,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    articleId: '1',
};

Default.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                username: 'admin',
            },
        },
    }),
];

Default.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'get',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};

/// ///////////////////////////////////////////////////////////////
export const WithoutRate = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithoutRate.args = {
    articleId: '1',
};

WithoutRate.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                username: 'admin',
            },
        },
    }),
];

WithoutRate.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'get',
            status: 200,
            response: [],
        },
    ],
};
