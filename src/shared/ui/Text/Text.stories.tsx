import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Text',
    component: Text,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    title: 'Title',
    text: 'Text',
};

export const Error = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
    title: 'Title',
    text: 'Text',
    theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
OnlyTitle.args = {
    title: 'Title',
};

export const OnlyText = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
OnlyText.args = {
    text: 'Text',
};

export const PrimaryDark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryDark.args = {
    title: 'Title',
    text: 'Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTitleDark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
OnlyTitleDark.args = {
    title: 'Title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
OnlyTextDark.args = {
    text: 'Text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeL = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SizeL.args = {
    title: 'Title',
    text: 'Text',
    size: TextSize.L,
};

export const SizeM = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SizeM.args = {
    title: 'Title',
    text: 'Text',
    size: TextSize.M,
};

export const SizeS = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SizeS.args = {
    title: 'Title',
    text: 'Text',
    size: TextSize.S,
};