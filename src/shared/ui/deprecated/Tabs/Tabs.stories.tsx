import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Tabs } from '@/shared/ui/deprecated/Tabs/Tabs';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Tabs',
    component: Tabs,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    tabs: [
        {
            value: 'tab 1',
            content: 'content tab 1',
        },
        {
            value: 'tab 2',
            content: 'content tab 2',
        },
        {
            value: 'tab 3',
            content: 'content tab 3',
        },
    ],
    value: 'tab 2',
    onTabClick: action('onTabClick'),
};
