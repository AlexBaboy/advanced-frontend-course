import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleTypeTabs } from './ArticleTypeTabs';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/Articles/ArticleTypeTabs',
    component: ArticleTypeTabs,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTypeTabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => (
    <ArticleTypeTabs {...args} />
);

export const Big = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Big.args = {};

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {};
