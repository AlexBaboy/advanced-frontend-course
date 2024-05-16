import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from 'shared/ui/ListBox/ListBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/ListBox',
    component: ListBox,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
/* Default.args = {
    readonly: false,

}; */
