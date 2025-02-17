import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { ArticleView } from '@/entities/Article';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

interface ArticleListItemSkeletonProps {
    className?: string;
    view?: ArticleView;
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view = ArticleView.SMALL } = props;

        const Card = toggleFeatures({
            name: 'isArticleRatingEnabled',
            on: () => CardRedesigned,
            off: () => CardDeprecated,
        });

        const Skeleton = toggleFeatures({
            name: 'isArticleRatingEnabled',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });

        if (view === ArticleView.BIG) {
            return (
                <div
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card className={cls.card}>
                        <div className={cls.header}>
                            <Skeleton border="50%" width={30} height={30} />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.username}
                            />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.date}
                            />
                        </div>
                        <Skeleton
                            width={250}
                            height={24}
                            className={cls.title}
                        />
                        <Skeleton height={200} className={cls.img} />
                        <div className={cls.footer}>
                            <Skeleton width={200} height={36} />
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <Skeleton width={200} height={200} />
                    </div>
                    <div className={cls.infoWrapper}>
                        <Skeleton width={130} height={16} />
                    </div>
                    <Skeleton width={150} height={16} />
                </Card>
            </div>
        );
    },
);
