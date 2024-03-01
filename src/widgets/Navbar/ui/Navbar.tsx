import React, {memo, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {LoginModal} from "features/AuthByUserName";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData, userActions} from "entities/User";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/config/routeConfig/routeConfig";

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {

    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)
    const dispatch = useDispatch()

    const onCloseModal = () => {
        setIsAuthModal(false)
    }

    const onShowModal = () => {
        setIsAuthModal(true)
    }

    const onLogout = () => {
        dispatch(userActions.logout())
    }

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>

                <div className={cls.headerLeftPart}>
                    <Text
                        title={'Art App'}
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

                <div>
                    <Button
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={cls.mainLink}
                        onClick={onLogout}
                    >
                        {t('Выйти')}
                    </Button>
                </div>
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

            {isAuthModal && <LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />}
        </header>
    )
})
