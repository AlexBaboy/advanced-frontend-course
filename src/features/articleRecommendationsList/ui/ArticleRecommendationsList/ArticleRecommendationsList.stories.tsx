import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {StoreDecorator} from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import {ArticleRecommendationsList} from './ArticleRecommendationsList';
import withMock from 'storybook-addon-mock'
import {articlesMocked} from "shared/mocks/articles";

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock]
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

const article = articlesMocked

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
    mockData: [
        {
            url: 'https://www.google.com/search?q=',
            method: 'get',
            status: 200,
            response: [
                {...article, id: '1'},
                {...article, id: '2'},
                {...article, id: '3'},
            ]
        }
    ]
}
