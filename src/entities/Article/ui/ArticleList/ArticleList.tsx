import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    FC, HTMLAttributeAnchorTarget, memo, useEffect, useRef, useState,
} from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Virtuoso, VirtuosoGrid, VirtuosoHandle } from 'react-virtuoso';
import ArticlesPageFilter from 'pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilter';
import { ARTICLES_LIST_ITEM_INDEX } from 'shared/const/localStorage';
import { ArticleListItemSkeleton } from '../../ui/ArticleListItem/ArticleListItemSkeleton';
import { Article, ArticleView } from '../../../Article';
import { ArticleListItem } from '../../ui/ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
    onLoadNextPart?: () => {}
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                key={index}
                view={view}
                className={cls.card}
            />
        ));
};

const Header = () => <ArticlesPageFilter />;

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.BIG,
        target,
        onLoadNextPart,
    } = props;

    const { t } = useTranslation();
    const [selectedArticleId, setSelectedArticleId] = useState(1);
    const virtuosoGridRef = useRef<VirtuosoHandle | null>(null);

    useEffect(() => {
        const selectedArticeIndex = sessionStorage.getItem(ARTICLES_LIST_ITEM_INDEX) || 1;
        setSelectedArticleId(Number(selectedArticeIndex));
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (view === ArticleView.SMALL) {
            timeoutId = setTimeout(() => {
                virtuosoGridRef.current && virtuosoGridRef.current?.scrollToIndex(selectedArticleId);
            }, 100);
        }
        return () => clearInterval(timeoutId);
    }, [selectedArticleId, view]);

    const renderArticle = (index: number, article: Article) => {
        if (!article) return null;

        return (
            <ArticleListItem
                article={article}
                className={cls.card}
                key={article?.id}
                view={view}
                target={target}
                index={index}
            />
        );
    };

    if (!isLoading && !articles.length) {
        return (
            <Text
                title={t('Статьи не найдены')}
                size={TextSize.L}
            />
        );
    }

    const Footer = () => {
        if (isLoading) {
            return (
                <div className={cls.skeleton}>
                    {getSkeletons(view)}
                </div>
            );
        }
        return null;
    };

    console.log('102 articles.length', articles.length);
    console.log('102 articles', articles);

    const ItemContainerComp: FC<{height: number, width: number, index: number}> = ({ height, width, index }) => {
        console.log('111 !!!');

        return (
            <div className={cls.itemContainer}>
                <ArticleListItemSkeleton
                    key={index}
                    view={view}
                    className={cls.card}
                />
            </div>
        );
    };

    return (
        <div className={classNames(
            cls.ArticleList,
            {},
            [className, cls[view]],
        )}
        >

            {view === ArticleView.BIG ? (
                <Virtuoso
                    style={{ height: '20vh', width: 'calc(100vw - var(--sidebar-width))' }}
                    data={articles}
                    // itemContent={(index, article) => renderArticle(index, article)}
                    itemContent={renderArticle}
                    endReached={onLoadNextPart}
                    initialTopMostItemIndex={selectedArticleId}
                    components={{
                        //Header,
                        Footer,
                    }}
                />
            ) : (
                <VirtuosoGrid
                    style={{ height: '80vh', width: 'calc(100vw - var(--sidebar-width))' }}
                    ref={virtuosoGridRef}
                    totalCount={articles.length}
                    components={{
                        Header,
                        ScrollSeekPlaceholder: ItemContainerComp,
                    }}
                    endReached={onLoadNextPart}
                    itemContent={(index) => renderArticle(index, articles[index])}
                    listClassName={cls.itemsWrapper}
                    scrollSeekConfiguration={{
                        enter: (velocity) => Math.abs(velocity) > 200,
                        exit: (velocity) => Math.abs(velocity) < 30,
                    }}
                />
            )}

            {/* {articles.length > 0
                ? articles.map(renderArticle)
                : null
            }
            {isLoading && getSkeletons(view)} */}
        </div>
    );
});
