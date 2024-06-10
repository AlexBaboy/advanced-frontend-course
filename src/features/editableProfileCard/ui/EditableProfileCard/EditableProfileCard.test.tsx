import {screen} from '@testing-library/react';
import {componentRender} from 'shared/lib/tests/componentRender/componentRender';
import {EditableProfileCard} from 'features/editableProfileCard';
import {profileData} from 'shared/mocks/profileData';
import {profileReducer} from "features/editableProfileCard/model/slice/profileSlice";

describe('EditableProfileCard tests', () => {

    test('render', () => {
        componentRender(<EditableProfileCard id="1" />, {
            initialState: {
                profile: {
                    readonly: true,
                    data: profileData,
                    form: profileData,
                },
            },
            asyncReducers: {
                profile:  profileReducer,
            },
        });
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        screen.debug();
    });
});
