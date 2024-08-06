import {ComponentMeta, ComponentStory} from '@storybook/react';
import ProfilePage from './ProfilePage';
import {ThemeDecorator} from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import {Theme} from "@/app/providers/ThemeProvider";
import {StoreDecorator} from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import {profileData} from "@/shared/mocks/profileData";

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;


const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Light = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Light.args = {};
Light.decorators = [StoreDecorator({
        profile: {
            form: profileData
        }
    })
]

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: profileData
        }
    })
]
