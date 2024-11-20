import {EditableProfileCard} from "@/features/editableProfileCard";
import {TestProvider} from "@/shared/lib/tests/componentRender/componentRender";

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {

        cy.intercept('GET', '**/profile/*', {fixture: 'profile.json'})

        cy.mount(
            <TestProvider>
                <EditableProfileCard id={'1'}/>
            </TestProvider>
        );
    });
});
