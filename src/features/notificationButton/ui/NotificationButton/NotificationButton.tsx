import React, {memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './NotificationButton.module.scss'
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import NotificationIcon from "shared/assets/icons/notification.svg";
import {NotificationList} from "entities/Notification";
import {Popover} from "shared/ui/Popups";

interface NotificationButtonProps {
    className?: string
    isLoading?: boolean
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {
        className,
    } = props;

    return (
        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            direction={'bottom left'}
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon
                        Svg={NotificationIcon}
                        inverted
                    />
                </Button>
            )}>

            <NotificationList
                className={cls.notifications}
            />

        </Popover>
    )
})