describe('Тест страницы со списком статей', () => {
    beforeEach(() => {
        cy.login();
        // url для перехода !!!
        cy.visit('articles');
    });

    it('статьи успешно подгружаются', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });

    it('статьи успешно подгружаются на моках', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });

        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
});
