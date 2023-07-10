import React from "react";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import AboutIcon from 'shared/assets/icons/clarity-list.svg'
import MainIcon from 'shared/assets/icons/home.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'

export type SidebarItemType = {
    path: string
    text: string
    icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SideBarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        icon: MainIcon,
        text: 'Главная'
    },
    {
        path: RoutePath.about,
        icon: AboutIcon,
        text: 'О приложении'
    },
    {
        path: RoutePath.profile,
        icon: ProfileIcon,
        text: 'Профиль'
    }
]
