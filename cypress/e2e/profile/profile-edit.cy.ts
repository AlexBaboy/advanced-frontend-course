let profileId = '';

describe('Страница профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });

    afterEach(() => {
        cy.resetProfile(profileId);
    });

    it('загрузка профиля', () => {
        cy.getByTestId('ProfileCard.firstname').should(
            'have.value',
            'testuser',
        );
    });

    it('редактирование профиля', () => {
        const firstname = 'new firstname';
        const lastname = 'new lastname';
        cy.updateProfile(firstname, lastname);
        cy.getByTestId('ProfileCard.firstname').should('have.value', firstname);
        cy.getByTestId('ProfileCard.lastname').should('have.value', lastname);
    });
});
