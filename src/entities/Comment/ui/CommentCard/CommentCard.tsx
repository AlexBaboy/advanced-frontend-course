import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { CommentItem } from '../..';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { getRouteProfile } from '@/shared/config/routeConfig/routeConfig';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './CommentCard.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';

interface CommentCardProps {
    className?: string;
    comment?: CommentItem;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    const mods: Mods = {};

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                max
                gap="8"
                className={classNames(cls.CommentCard, mods, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        width={100}
                        height={16}
                        className={cls.username}
                    />
                </div>
                <Skeleton width="100%" height={50} className={cls.text} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Card padding={'24'} border={'partial'} max>
                    <VStack
                        data-testid="CommentCard.Content"
                        gap="8"
                        max
                        className={classNames(cls.CommentCardRedesigned, mods, [
                            className,
                        ])}
                    >
                        <AppLink to={getRouteProfile(comment?.user.id)}>
                            <HStack gap={'8'}>
                                {comment?.user?.avatar ? (
                                    <Avatar
                                        size={30}
                                        src={comment?.user?.avatar}
                                    />
                                ) : null}
                                <Text text={comment?.user.username} bold />
                            </HStack>
                        </AppLink>
                        <Text text={comment?.text} />
                    </VStack>
                </Card>
            }
            off={
                <VStack
                    data-testid="CommentCard.Content"
                    gap="8"
                    max
                    className={classNames(cls.CommentCard, mods, [className])}
                >
                    <AppLinkDeprecated
                        to={getRouteProfile(comment?.user.id)}
                        className={cls.header}
                    >
                        {comment?.user?.avatar ? (
                            <AvatarDeprecated
                                size={30}
                                src={comment?.user?.avatar}
                            />
                        ) : null}
                        <TextDeprecated
                            title={comment?.user.username}
                            className={cls.username}
                        />
                    </AppLinkDeprecated>
                    <Text text={comment?.text} className={cls.text} />
                </VStack>
            }
        />
    );
});
