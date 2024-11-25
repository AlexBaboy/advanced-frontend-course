import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleView } from '../../../Article';
import { ArticleListItem } from '../../ui/ArticleListItem/ArticleListItem';
import { article } from '@/shared/mocks/articleDetail';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/Articles/ArticleListItem',
    component: ArticleListItem,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleListItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ArticleListItem> = (args) => (
    <ArticleListItem {...args} />
);

export const Big = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Big.args = {
    article,
    view: ArticleView.BIG,
};

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
    article,
    view: ArticleView.SMALL,
};
