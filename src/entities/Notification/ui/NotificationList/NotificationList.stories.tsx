import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationList } from '../..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/NotificationList',
    component: NotificationList,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

Default.decorators = [
    StoreDecorator({}),
];

Default.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'get',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Какое-то описание',
                },
                {
                    id: '2',
                    title: 'Уведомление 2',
                    description: 'Какое-то описание 2',
                },
                {
                    id: '3',
                    title: 'Уведомление 3',
                    description: 'Какое-то описание 3',
                },
            ],
        },
    ],
};
