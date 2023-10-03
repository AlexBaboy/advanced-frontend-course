import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Skeleton} from "shared/ui/Skeleton/Skeleton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    width: '100%',
    height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
    border: '50%',
    width: 100,
    height: 100,
};