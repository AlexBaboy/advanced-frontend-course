import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleList, ArticleView } from '../../../Article';
import { article } from '@/shared/mocks/articleDetail';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/Articles/ArticleList',
    component: ArticleList,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

export const isLoadingBig = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
isLoadingBig.args = {
    isLoading: true,
    articles: [],
    view: ArticleView.BIG,
};

export const isLoadingSmall = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
isLoadingSmall.args = {
    isLoading: true,
    articles: [],
    view: ArticleView.SMALL,
};

export const ListSmall = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ListSmall.args = {
    isLoading: false,
    articles:
        new Array(9)
            .fill(0)
            .map((item, index) => ({
                ...article,
                id: String(index),
            })),
    view: ArticleView.SMALL,
};

export const ListBig = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ListBig.args = {
    isLoading: false,
    articles: new Array(9)
        .fill(0)
        .map((item, index) => ({
            ...article,
            id: String(index),
        })),
    view: ArticleView.BIG,
};
