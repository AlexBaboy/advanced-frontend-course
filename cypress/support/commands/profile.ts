export const updateProfile = (firstname: string, lastname: string) => {
    console.log('3 firstname', firstname);
    console.log('3 lastname', lastname);

    // жмем кнопку редактирования
    cy.getByTestId('EditableProfileHeader.EditButton').click();

    // вводим новые значения в поля
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname);

    // жмем кнопку - сохранить
    cy.getByTestId('EditableProfileHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'qweqweqwe' },
        body: {
            id: '4',
            first: 'testuser',
            lastname: 'user',
            age: 465,
            currency: 'EUR',
            country: 'Russia',
            city: 'Moscow',
            username: 'testuser',
            avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
