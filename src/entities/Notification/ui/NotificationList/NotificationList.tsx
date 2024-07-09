import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {CommentItem} from '../../../Comment';
import {classNames} from "shared/lib/classNames/classNames";
import {useNotifications} from "entities/Notification/api/notificationApi";
import cls from './NotificationList.module.scss'
import {VStack} from "shared/ui/Stack";
import {NotificationItem} from "../NotificationItem/NotificationItem";

interface NotificationListProps {
    className?: string
    comments?: CommentItem[]
    isLoading?: boolean
}

export const NotificationList = memo((props: NotificationListProps) => {
    const {
        className,
    } = props;

    const {t} = useTranslation();
    const { data, isLoading } = useNotifications(null)

    return (
        <VStack
            gap={"16"}
            max
            className={classNames(cls.NotificationList, {}, [className])}>

            {data?.map(item => (
                <NotificationItem
                    key={item.id}
                    item={item}
                />
            ))}

        </VStack>
    )
})
