import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ArticleCodeBlockComponent} from './ArticleCodeBlockComponent';
import {ThemeDecorator} from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import {Theme} from "app/providers/ThemeProvider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/ArticleCodeBlockComponent',
    component: ArticleCodeBlockComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCodeBlockComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof ArticleCodeBlockComponent> = (args) => <ArticleCodeBlockComponent {...args} />;

export const Light = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)]
