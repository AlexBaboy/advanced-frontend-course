import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { ReactElement } from 'react';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';

export const useAppToolbar = () => {
    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
    };
};
