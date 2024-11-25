import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { profileData } from '@/shared/mocks/profileData';
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { $api } from '@/shared/api/api';

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profileData,
            form: profileData,
        },
        user: {
            authData: {
                id: '1',
                // name: 'John Doe',
                username: 'John Doe',
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('EditableProfileCard tests', () => {
    test('режим редактирвоания', async () => {
        // @ts-ignore
        componentRender(<EditableProfileCard id="1" />, options);
        userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));
        expect(
            screen.getByTestId('EditableProfileHeader.CancelButton'),
        ).toBeInTheDocument();
    });

    test('при отмене сбрасываются введенные значения', async () => {
        // @ts-ignore
        componentRender(<EditableProfileCard id="1" />, options);
        userEvent.click(screen.getByTestId('EditableProfileHeader.EditButton'));

        userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

        userEvent.click(
            screen.getByTestId('EditableProfileHeader.CancelButton'),
        );

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(
            'admin',
        );
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    });

    test('должна появиться ошибка', async () => {
        // @ts-ignore
        componentRender(<EditableProfileCard id="1" />, options);
        userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );
        userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        userEvent.click(screen.getByTestId('EditableProfileHeader.SaveButton'));
        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph'),
        ).toBeInTheDocument();
    });

    test('при отсутствии ошибок валидации должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        // @ts-ignore
        componentRender(<EditableProfileCard id="1" />, options);
        userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );
        userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        userEvent.click(screen.getByTestId('EditableProfileHeader.SaveButton'));
        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph'),
        ).toBeInTheDocument();
        expect(mockPutReq).toHaveBeenCalled();
    });
});
