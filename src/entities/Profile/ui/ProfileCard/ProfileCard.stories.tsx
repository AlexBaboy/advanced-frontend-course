import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ProfileCard} from "entities/Profile";
import {Currency} from "entities/Currency";
import {Country} from "entities/Country";
import avatar from 'shared/assets/tests/avatar.jpg'

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        first: "Тимур123",
        lastname: "Ульби",
        age: 22,
        currency: Currency.RUB,
        country: Country.Belarus,
        city: "Moscow123",
        username: "admin",
        avatar
    }
};

export const WithError = Template.bind({});
WithError.args = {
    error: 'error message'
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true
};