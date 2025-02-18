import {useTranslation} from 'react-i18next';
import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown as DropdownDeprecated} from '@/shared/ui/deprecated/Popups';
import {Avatar as AvatarDeprecated} from '@/shared/ui/deprecated/Avatar/Avatar';
import {
    getRouteAdmin,
    getRouteProfile, getRouteSettings,
} from '@/shared/config/routeConfig/routeConfig';

import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import {ToggleFeatures} from "@/shared/lib/features";
import {Dropdown} from "@/shared/ui/redesigned/Popups";
import {Avatar} from "@/shared/ui/redesigned/Avatar";

interface AvatarDropdownProps {
    className?: string;
    isLoading?: boolean;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const {className} = props;

    const {t} = useTranslation();

    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const onLogout = () => {
        dispatch(userActions.logout());
    };

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) return null;

    const items = [
        ...(isAdminPanelAvailable
            ? [
                {
                    content: t('Админка'),
                    href: getRouteAdmin(),
                },
            ]
            : []),
        {
            content: t('Настройки'),
            href: getRouteSettings(),
        },
        {
            content: t('Профиль'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ]

    return (
        <ToggleFeatures
            on={<Dropdown
                direction="bottom left"
                items={items}
                trigger={
                    <Avatar size={40} src={authData.avatar} />
                }
            />}
            off={<DropdownDeprecated
                direction="bottom left"
                items={items}
                trigger={
                    <AvatarDeprecated size={30} src={authData.avatar} fallbackInverted/>
                }
            />}
            feature={'isAppRedesigned'}
        />

    );
});
