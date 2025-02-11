import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article, ArticleView } from '../..';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Icon } from '@/shared/ui/deprecated/Icon/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { getRouteArticleDetails } from '@/shared/config/routeConfig/routeConfig';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { ARTICLES_LIST_ITEM_INDEX } from '@/shared/const/localStorage';
import { ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';
import { ArticleBlockType } from '../../model/constants/constants';
import { AppImage } from 'src/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    index?: number;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleView.SMALL,
        target,
        index,
    } = props;

    const { t } = useTranslation();

    const types = (
        <Text text={article?.type?.join(', ')} className={cls.types} />
    );
    const views = (
        <>
            <Text
                text={article?.views?.toString() || '0'}
                className={cls.views}
            />
            <Icon Svg={EyeIcon} />
        </>
    );

    const handleButtonClick = () => {
        sessionStorage.setItem(ARTICLES_LIST_ITEM_INDEX, JSON.stringify(index));
    };

    if (view === ArticleView.BIG) {
        const texBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
                data-testid="ArticleListItem"
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article?.user?.avatar} />
                        <Text
                            text={article.user?.username}
                            className={cls.username}
                        />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text text={article.title} className={cls.title} />
                    {types}
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                    />
                    {texBlock && (
                        <ArticleTextBlockComponent
                            block={texBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article?.id)}
                        >
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={handleButtonClick}
                            >
                                {t('Читать далее')}
                            </Button>
                        </AppLink>

                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article?.id)}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
            onClick={handleButtonClick}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton width={200} height={200} />}
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});
