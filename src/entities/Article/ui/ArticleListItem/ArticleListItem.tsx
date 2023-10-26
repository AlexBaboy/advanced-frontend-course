import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {Article, ArticleView} from "entities/Article";

interface ArticleListItemProps {
    className?: string
    article: Article
    view?: ArticleView
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {

    const {
        className,
        article,
        view = ArticleView.SMALL} = props

    const {t} = useTranslation()


    return (
        <div className={classNames(
            cls.ArticleList,
            {},
            [className]
        )}>
            {article.title}
        </div>
    );
});
