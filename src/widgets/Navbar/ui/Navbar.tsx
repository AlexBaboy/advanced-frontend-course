import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {classNames} from '@/shared/lib/classNames/classNames';
import {Button as ButtonDeprecated, ButtonTheme} from '@/shared/ui/deprecated/Button/Button';
import {Button} from '@/shared/ui/redesigned/Button/Button';
import {LoginModal} from '@/features/AuthByUserName';
import {getUserAuthData} from '@/entities/User';
import {Text, TextTheme} from '@/shared/ui/deprecated/Text/Text';
import {AppLink} from '@/shared/ui/redesigned/AppLink/AppLink';
import {getRouteArticleCreate} from '@/shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss';
import {HStack} from '@/shared/ui/redesigned/Stack';
import {NotificationButton} from '@/features/notificationButton';
import {AvatarDropdown} from '@/features/avatarDropdown';
import {toggleFeatures, ToggleFeatures} from '@/shared/lib/features';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
    const {t} = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = () => {
        setIsAuthModal(false);
    };

    const onShowModal = () => {
        setIsAuthModal(true);
    };


    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    })

    const renderComponent = () => {
        return (
            <ToggleFeatures
                on={
                    <header
                        className={classNames(mainClass, {}, [
                            className,
                        ])}
                    >
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton/>
                            <AvatarDropdown/>
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(mainClass, {}, [className])}>
                        <div className={cls.headerLeftPart}>
                            <Text
                                title="Art App"
                                theme={TextTheme.INVERTED}
                                className={cls.appName}
                            />
                            <AppLink
                                to={getRouteArticleCreate()}
                                variant={'secondary'}
                                className={cls.createBtn}
                            >
                                {t('Создать статью')}
                            </AppLink>
                        </div>

                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton/>
                            <AvatarDropdown/>
                        </HStack>
                    </header>
                }
                feature={'isAppRedesigned'}
            />
        );
    };

    if (authData) {
        return renderComponent();
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>

            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={<Button
                    variant={'clear'}
                    className={cls.links}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                </Button>}
                off={<ButtonDeprecated
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                </ButtonDeprecated>}
            />

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>
            )}
        </header>
    );
});
