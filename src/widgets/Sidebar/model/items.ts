import React from "react";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import AboutIcon from 'shared/assets/icons/clarity-list.svg'
import MainIcon from 'shared/assets/icons/home.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'

export type SidebarItemType = {
    path: string
    text: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SideBarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'Главная'
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: 'О приложении'
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: 'Профиль'
    }
]