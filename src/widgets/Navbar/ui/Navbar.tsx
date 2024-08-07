import React, {memo, useState} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {useTranslation} from 'react-i18next';
import {Button, ButtonTheme} from '@/shared/ui/Button/Button';
import {LoginModal} from '@/features/AuthByUserName';
import {useSelector} from 'react-redux';
import {getUserAuthData} from '@/entities/User';
import {Text, TextTheme} from '@/shared/ui/Text/Text';
import {AppLink, AppLinkTheme} from '@/shared/ui/AppLink/AppLink';
import {RoutePath} from '@/shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss'
import {HStack} from "@/shared/ui/Stack";
import {NotificationButton} from "@/features/notificationButton";
import {AvatarDropdown} from "@/features/avatarDropdown";

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({className}: NavbarProps) => {
    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)

    const onCloseModal = () => {
        setIsAuthModal(false)
    }

    const onShowModal = () => {
        setIsAuthModal(true)
    }

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>

                <div className={cls.headerLeftPart}>
                    <Text
                        title="Art App"
                        theme={TextTheme.INVERTED}
                        className={cls.appName}
                    />
                    <AppLink
                        to={RoutePath.article_create}
                        theme={AppLinkTheme.SECONDARY}
                        className={cls.createBtn}
                    >
                        {t('Создать статью')}
                    </AppLink>
                </div>

                <HStack
                    gap={"16"}
                    className={cls.actions}
                >
                    <NotificationButton />
                    <AvatarDropdown />

                </HStack>
            </header>
        )
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>

            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    )
})
