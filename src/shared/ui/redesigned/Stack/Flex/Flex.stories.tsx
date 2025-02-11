import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex';

const childrenLayout = (
    <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>fourth</div>
        <div>fifth</div>
    </>
);

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
    children: childrenLayout,
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
    gap: '4',
    children: childrenLayout,
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
    gap: '8',
    children: childrenLayout,
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
    gap: '16',
    children: childrenLayout,
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
    gap: '32',
    children: childrenLayout,
};

export const Column = Template.bind({});
Column.args = {
    direction: 'column',
    children: childrenLayout,
};

export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
    direction: 'column',
    gap: '4',
    children: childrenLayout,
};

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
    direction: 'column',
    gap: '8',
    children: childrenLayout,
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
    direction: 'column',
    gap: '16',
    children: childrenLayout,
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
    direction: 'column',
    gap: '32',
    children: childrenLayout,
};

export const ColumnAlignEnd = Template.bind({});
ColumnAlignEnd.args = {
    direction: 'column',
    align: 'end',
    children: childrenLayout,
};
