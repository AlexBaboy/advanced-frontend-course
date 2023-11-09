import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {Article, ArticleView} from "entities/Article";
import {ArticleListItem} from "../../ui/ArticleListItem/ArticleListItem";
import {ArticleListItemSkeleton} from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
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

export const ArticleList = memo((props: ArticleListProps) => {

    const {
        className,
        articles,
        isLoading,
        view = ArticleView.BIG} = props

    const {t} = useTranslation()

    if (isLoading) {
        return (
            <div className={classNames(
                cls.ArticleList,
                {},
                [className, cls[view]]
            )}>
                {getSkeletons(view)}
            </div>
        )
    }

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                article={article}
                className={cls.card}
                key={article.id}
                view={view}
            />
        )
    }

    return (
            <div className={classNames(
                cls.ArticleList,
                {},
                [className, cls[view]]
            )}>
                {articles.length
                    ? articles.map(renderArticle)
                    : null
                }
            </div>
    );
});
