import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { CommentItem } from '../..';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteProfile } from '@/shared/config/routeConfig/routeConfig';
import { VStack } from '@/shared/ui/Stack';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string
    comment?: CommentItem
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        comment,
        isLoading,
    } = props;

    const mods: Mods = {};

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                max
                gap="8"
                className={classNames(
                    cls.CommentCard,
                    mods,
                    [className, cls.loading],
                )}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} className={cls.text} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack
            data-testid="CommentCard.Content"
            gap="8"
            max
            className={classNames(
                cls.CommentCard,
                mods,
                [className],
            )}
        >
            <AppLink to={getRouteProfile(comment?.user.id)} className={cls.header}>
                {comment?.user?.avatar ? <Avatar size={30} src={comment?.user?.avatar} /> : null}
                <Text title={comment?.user.username} className={cls.username} />
            </AppLink>
            <Text text={comment?.text} className={cls.text} />
        </VStack>
    );
});
