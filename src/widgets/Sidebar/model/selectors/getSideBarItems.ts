import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/config/routeConfig/routeConfig';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/clarity-list.svg';
import ArticlesIcon from '@/shared/assets/icons/contract.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';

import { SidebarItemType } from '@/widgets/Sidebar/model/types/Sidebar';

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
    const sideBarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'О приложении',
        },
    ];

    if (userData) {
        sideBarItemsList.push(
            {
                path: getRouteArticles(),
                Icon: ArticlesIcon,
                text: 'Статьи',
                authOnly: true,
            },
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'Профиль',
                authOnly: true,
            },
        );
    }
    return sideBarItemsList;
});
