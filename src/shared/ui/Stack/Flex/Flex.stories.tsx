import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Flex } from 'shared/ui/Stack/Flex/Flex';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Flex',
    component: Flex,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
    children: (
        <div>
            <div>text 1</div>
            <div>text 2</div>
            <div>text 3</div>
            <div>text 4</div>
            <div>text 5</div>
        </div>
    )
};

export const Circle = Template.bind({});
Circle.args = {
    border: '50%',
    width: 100,
    height: 100,
};