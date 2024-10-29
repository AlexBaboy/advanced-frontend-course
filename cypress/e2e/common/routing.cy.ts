import {selectByTestId} from '../../helpers/selectByTestId';

describe('Маршрутизация', () => {
    describe('Пользователь НЕ авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Переход на страницу профиля', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Переход на несуществующий маршрут', () => {
            cy.visit('/123');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('Пользователь авторизован', () => {

        beforeEach(() => {
            cy.login();
        });

        it('Переход на страницу профиля', () => {
            //login('admin', '123');
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });
        it('Переход на страницу со списком статей', () => {
            //login('admin', '123');
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
