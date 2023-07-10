import {classNames} from "shared/lib/classNames/classNames";
import cls from './SidebarItem.module.scss'
import {useTranslation} from "react-i18next";
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import MainIcon from "shared/assets/icons/home.svg";
import React from "react";
import {SidebarItemType} from "../Sidebar/model/items";

interface SidebarItemProps {
    item?: SidebarItemType
    collapsed?: boolean
}

export const SidebarItem = ({}: SidebarItemProps) => {

    const {t} = useTranslation()

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={RoutePath.main}
            className={cls.item}
        >
            <MainIcon className={cls.icon} />
            <span className={cls.link}>
                          {t('Главная')}
                      </span>
        </AppLink>
    );
};
