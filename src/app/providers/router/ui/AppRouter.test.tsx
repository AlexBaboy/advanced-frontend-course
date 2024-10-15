import { screen } from '@testing-library/react';

// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { AppRouter } from '@/app/providers/router';
import { getRouteAbout } from '@/shared/config/routeConfig/routeConfig';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

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
});
