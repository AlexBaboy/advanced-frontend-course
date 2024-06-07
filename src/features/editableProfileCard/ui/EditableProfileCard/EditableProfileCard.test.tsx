import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from 'features/editableProfileCard';

describe('EditableProfileCard tests', () => {

    test('render', () => {
        componentRender(<EditableProfileCard id="1" />);
        expect(screen.getByTestId('sidebar'))
            .toBeInTheDocument();
        screen.debug();
    });

});
