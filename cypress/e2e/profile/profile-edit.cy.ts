describe('Страница профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            cy.visit(`profile/${data.id}`);
        });
    });

    it('загрузка профиля', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
    });
});
