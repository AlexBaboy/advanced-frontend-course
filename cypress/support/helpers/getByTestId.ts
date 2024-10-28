import { selectByTestId } from '../../helpers/selectByTestId';

export const getByTestId = (testId: string) => {
    return cy.get(selectByTestId(testId));
};
