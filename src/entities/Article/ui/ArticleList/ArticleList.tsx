import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss'
import {useTranslation} from "react-i18next";
import {HTMLAttributeAnchorTarget, memo, useRef, useState} from "react";
import {Article, ArticleView} from "entities/Article";
import {ArticleListItem} from "../../ui/ArticleListItem/ArticleListItem";
import {ArticleListItemSkeleton} from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";
import {Text, TextSize} from "shared/ui/Text/Text";
import {Virtuoso, VirtuosoHandle} from "react-virtuoso";
import {article} from "shared/mocks/articleDetail";
import ArticlesPageFilter from "pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilter";

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
        ))
}

const Header = () => <ArticlesPageFilter />

export const ArticleList = memo((props: ArticleListProps) => {

    const {
        className,
        articles,
        isLoading,
        view = ArticleView.BIG,
        target,
        onLoadNextPart
    } = props

    const {t} = useTranslation()
    const [selectedArticleId, setSelectedArticleId] = useState(1)
    const virtuosoRef = useRef<VirtuosoHandle | null>(null);

    const renderArticle = (index: number, article: Article) => {
        return (
            <ArticleListItem
                article={article}
                className={cls.card}
                key={article.id}
                view={view}
                target={target}
                index={index}
            />
        )
    }

    if (!isLoading && !articles.length) {
        return (
            <>
                <Text
                    title={t('Статьи не найдены')}
                    size={TextSize.L}
                />
            </>
        )
    }

    const Footer = () => {
        if (isLoading) {
            return (
                <div className={cls.skeleton}>
                    {getSkeletons(view)}
                </div>
            )
        }
        return null
    }

    return (
        <div className={classNames(
            cls.ArticleList,
            {},
            [className, cls[view]]
        )}>

            {view === ArticleView.BIG ? (
                <Virtuoso
                  style={{ height: "100%" }}
                  data={articles}
                  itemContent={renderArticle}
                  endReached={onLoadNextPart}
                  initialTopMostItemIndex={selectedArticleId}
                  components={{
                      Header,
                      Footer
                  }}
                  ref={virtuosoRef}/>
            ) : (
                <></>
            )}

            {/*{articles.length > 0
                ? articles.map(renderArticle)
                : null
            }
            {isLoading && getSkeletons(view)}*/}
        </div>
    );
});
