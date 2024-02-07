import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss'
import {useTranslation} from "react-i18next";
import {HTMLAttributeAnchorTarget, memo} from "react";
import {Article, ArticleView} from "entities/Article";
import {ArticleListItem} from "../../ui/ArticleListItem/ArticleListItem";
import {ArticleListItemSkeleton} from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";
import {Text, TextSize} from "shared/ui/Text/Text";

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
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
        view = ArticleView.BIG,
        target
    } = props

    const {t} = useTranslation()

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                article={article}
                className={cls.card}
                key={article.id}
                view={view}
                target={target}
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

    return (
            <div className={classNames(
                cls.ArticleList,
                {},
                [className, cls[view]]
            )}>
                {articles.length > 0
                    ? articles.map(renderArticle)
                    : null
                }
                {isLoading && getSkeletons(view)}
            </div>
    );
});
