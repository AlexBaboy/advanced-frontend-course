import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import {useNotifications} from "entities/Notification/api/notificationApi";
import cls from './NotificationItem.module.scss'
import {Notification} from "../../model/types/notifications";
import {Card, CardTheme} from "shared/ui/Card/Card";
import { Text } from 'shared/ui/Text/Text';

interface NotificationItemProps {
    className?: string
    item: Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const {
        className,
        item
    } = props;

    const {t} = useTranslation();
    const { data, isLoading } = useNotifications(null)

    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(cls.NotificationItem, {}, [className])}>
            <Text title={item.title} text={item.description} />
        </Card>
    )

    if (item.href) {
        return (
            <a
                target={"_blank"}
                href={item.href}
                className={cls.link}
                rel="noreferrer"
            >
                {content}
            </a>
        )
    }

    return content
})
