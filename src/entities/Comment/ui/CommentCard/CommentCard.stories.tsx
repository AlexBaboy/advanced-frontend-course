import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { commentList } from '@/shared/mocks/commentList';
import { CommentCard } from '@/entities/Comment/ui/CommentCard/CommentCard';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

const args = commentList[0];

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    comment: args,
};

export const PrimaryRedesigned = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryRedesigned.args = {
    comment: args,
};
PrimaryRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Loading.args = {
    isLoading: true,
};
