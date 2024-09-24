import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Code } from '@/shared/ui/Code/Code';

export default {
    title: 'shared/Code',
    component: Code,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    text:
`    export default {
        title: 'shared/Code',
        component: Code,
        // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
        argTypes: {
            backgroundColor: {control: 'color'},
        },
    } as ComponentMeta<typeof Code>;
    const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;`,
};
