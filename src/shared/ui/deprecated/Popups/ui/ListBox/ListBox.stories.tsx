import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/ListBox',
    component: ListBox,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof ListBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    value: 'menu item',
    items: [
        { content: 'qweqweqwe', value: '123' },
        { content: 'asdasdasd', value: '456' },
    ],
};

export const TopLeft = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TopLeft.args = {
    value: 'menu item',
    direction: 'top left',
    items: [
        { content: 'qweqweqwe', value: '123' },
        { content: 'asdasdasd', value: '456' },
    ],
};

export const TopRight = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TopRight.args = {
    value: 'menu item',
    direction: 'top right',
    items: [
        { content: 'qweqweqwe', value: '123' },
        { content: 'asdasdasd', value: '456' },
    ],
};

export const BottomLeft = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BottomLeft.args = {
    value: 'menu item',
    direction: 'bottom left',
    items: [
        { content: 'qweqweqwe', value: '123' },
        { content: 'asdasdasd', value: '456' },
    ],
};

export const BottomRight = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BottomRight.args = {
    value: 'menu item',
    direction: 'bottom right',
    items: [
        { content: 'qweqweqwe', value: '123' },
        { content: 'asdasdasd', value: '456' },
    ],
};
