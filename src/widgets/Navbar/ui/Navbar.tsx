import React, {useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {useTranslation} from "react-i18next";
import {Modal} from "shared/ui/Modal/Modal";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {LoginModal} from "features/AuthByUserName";

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {

    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)

    const onCloseModal = () => {
        setIsAuthModal(false)
    }

    const onShowModal = () => {
        setIsAuthModal(true)
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
              {t('Войти')}
            </Button>

            <LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />
        </div>
    )
}
