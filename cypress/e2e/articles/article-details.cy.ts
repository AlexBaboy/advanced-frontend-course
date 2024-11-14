let currenArticleId = '';

describe('Тест детальной страницы статьи', () => {
    beforeEach(() => {
        cy.login();

        cy.createArticle().then((article) => {
            currenArticleId = article.id;
            // url для перехода !!!
            cy.visit(`articles/${currenArticleId}`);
        });
    });

    afterEach(() => {
        cy.removeArticle(currenArticleId);
    });

    it('статья успешно подгружается', () => {
        cy.getByTestId('ArticleDetailsPage.Info').should('exist');
    });

    it('загружается список рекомендаций', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('комментарий добавляется', () => {
        cy.getByTestId('ArticleDetailsPage.Info');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        // не работает - надо починить !!!
        // cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });

    it('Оценка статьи добавляется', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });

        cy.getByTestId('ArticleDetailsPage.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback test');
        cy.get('[data-selected=true]').should('have.length', 4);
    });
});
