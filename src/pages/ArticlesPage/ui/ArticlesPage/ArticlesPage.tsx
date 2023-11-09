import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {Article, ArticleList, ArticleView} from "entities/Article";
import {articlesMocked} from "shared/mocks/articles";

interface ArticlesPage {
    className?: string
}

const ArticlesPage = (props: ArticlesPage) => {

    const {className} = props
    const {t} = useTranslation()


    return (
        <div className={classNames(
            cls.ArticlesPage,
            {},
            [className]
        )}>
            <ArticleList
                // @ts-ignore
                articles={
                new Array(16)
                    .fill(0)
                    .map((item, index) => ({
                        ...articlesMocked[0],
                        id: String(index)
                    }))
                //articlesMocked as Article[]
            }
                view={ArticleView.BIG}
                isLoading
            />
        </div>
    );
};

export default memo(ArticlesPage)