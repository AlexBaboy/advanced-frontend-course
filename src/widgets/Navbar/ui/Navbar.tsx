import React, {useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {useTranslation} from "react-i18next";
import {Modal} from "shared/ui/Modal/Modal";
import {Button, ButtonTheme} from "shared/ui/Button/Button";

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {

    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const onToggleModal = () => {
        setIsAuthModal(auth => !auth)
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
              {t('Войти')}
            </Button>

            <Modal
              isOpen={isAuthModal}
              onClose={onToggleModal}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium, assumenda commodi consequatur debitis deleniti deserunt dignissimos dolor dolore ea eum expedita fuga illum ipsam labore molestias necessitatibus nihil nostrum nulla officia quos rem sit sunt temporibus veritatis. Blanditiis consequuntur culpa explicabo minus nam non odio officia optio quidem repellendus.
            </Modal>
        </div>
    )
}
