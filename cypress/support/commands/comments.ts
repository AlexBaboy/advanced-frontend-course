export const addComment = (text: string) => {
    /* cy.getByTestId('AddCommentForm.Input').type(text);
    cy.getByTestId('AddCommentForm.Button').click(); */

    cy.getByTestId('AddCommentForm.Input').should('be.visible').type(text);
    cy.getByTestId('AddCommentForm.Button').should('be.visible').click({ force: true });

    // Проверяем, что комментарий появился в списке
    cy.getByTestId('CommentCard.Content').should('have.length.greaterThan', 0);
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<void>;
        }
    }
}
