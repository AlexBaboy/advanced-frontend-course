import { EditableProfileCard } from '@/features/editableProfileCard';
import { TestProvider } from '@/shared/lib/tests/componentRender/componentRender';

const USER_ID = '1';

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {
        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });

        const initialState = { user: { authData: { id: USER_ID } } };

        cy.mount(
            <TestProvider
                options={{
                    // @ts-ignore
                    initialState,
                }}
            >
                <EditableProfileCard id={USER_ID} />
            </TestProvider>,
        );
    });
});
