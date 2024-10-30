import * as loginCommands from './commands/login';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';

Cypress.Commands.addAll(loginCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);

export {};
