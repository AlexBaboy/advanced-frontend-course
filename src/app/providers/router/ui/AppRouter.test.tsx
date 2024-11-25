import { screen } from '@testing-library/react';

import { AppRouter } from '@/app/providers/router';
import {
    getRouteAbout,
    getRouteAdmin,
    getRouteProfile,
} from '@/shared/config/routeConfig/routeConfig';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { UserRole } from '@/entities/User';

describe('test router component', () => {
    test('Страница отрисовывается', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('Страница не найдена', async () => {
        componentRender(<AppRouter />, {
            route: '/13123321231',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('Редирект неавторизованного пользователя на главную', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('Доступ к закрытой странице для авторизованного пользователя', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: {
                    _inited: true,
                    authData: { id: '1', username: 'admin' },
                },
            },
        });

        const page = await screen.findByTestId('ProfilePage');
        expect(page).toBeInTheDocument();
    });

    test('Доступ запрещен', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                // @ts-ignore
                user: { _inited: false, authData: {} },
            },
        });

        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });

    test('Доступ разрешен', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                // @ts-ignore
                user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
            },
        });

        const page = await screen.findByTestId('AdminPanel');
        expect(page).toBeInTheDocument();
    });
});
