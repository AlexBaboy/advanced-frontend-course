import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dropdown } from '@/shared/ui/Popups/ui/Dropdown/Dropdown';
import { Button } from '@/shared/ui/Button/Button';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    trigger: <Button>Open!</Button>,
    items: [{ content: 'first' }, { content: 'second' }, { content: 'third' }],
};
