import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { CommentItem } from '../../../Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNotifications } from '@/entities/Notification/api/notificationApi';
import cls from './NotificationList.module.scss';
import { VStack } from 'src/shared/ui/redesigned/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

interface NotificationListProps {
    className?: string;
    comments?: CommentItem[];
    isLoading?: boolean;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;

    const { t } = useTranslation();
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});
