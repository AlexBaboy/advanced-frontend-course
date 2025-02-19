import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from './Modal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Modal',
    component: Modal,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium, assumenda commodi consequatur debitis deleniti deserunt dignissimos dolor dolore ea eum expedita fuga illum ipsam labore molestias necessitatibus nihil nostrum nulla officia quos rem sit sunt temporibus veritatis. Blanditiis consequuntur culpa explicabo minus nam non odio officia optio quidem repellendus.',
};

export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium, assumenda commodi consequatur debitis deleniti deserunt dignissimos dolor dolore ea eum expedita fuga illum ipsam labore molestias necessitatibus nihil nostrum nulla officia quos rem sit sunt temporibus veritatis. Blanditiis consequuntur culpa explicabo minus nam non odio officia optio quidem repellendus.',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
