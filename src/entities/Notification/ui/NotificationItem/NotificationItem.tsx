import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNotifications } from '@/entities/Notification/api/notificationApi';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notifications';
import {
    Card as CardDeprecated,
    CardTheme,
} from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <ToggleFeatures
            on={
                <Card
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <Text title={item.title} text={item.description} />
                </Card>
            }
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <TextDeprecated
                        title={item.title}
                        text={item.description}
                    />
                </CardDeprecated>
            }
            feature={'isAppRedesigned'}
        />
    );

    if (item.href) {
        return (
            <a
                target="_blank"
                href={item.href}
                className={cls.link}
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }

    return content;
});
