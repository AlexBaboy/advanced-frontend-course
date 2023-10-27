import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {Article, ArticleView} from "entities/Article";
import {ArticleListItem} from "../../ui/ArticleListItem/ArticleListItem";

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
}

export const ArticleList = memo((props: ArticleListProps) => {

    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL} = props

    const {t} = useTranslation()

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem article={articles[0]} className={cls.card} />
        )
    }

    return (
            <div className={classNames(
                cls.ArticleList,
                {},
                [className]
            )}>
                {articles.length
                    ? articles.map(renderArticle)
                    : null
                }
            </div>
    );
});
