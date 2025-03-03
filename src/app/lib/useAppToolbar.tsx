import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { ReactElement } from 'react';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';

export const useAppToolbar = () => {

    const currentRoute = useRouteChange()

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    };

    return toolbarByAppRoute[currentRoute]
};
