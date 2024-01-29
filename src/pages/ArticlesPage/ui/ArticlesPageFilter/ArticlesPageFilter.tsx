import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPageFilers.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {ArticleSortField, ArticleSortSelector, ArticleView, ArticleViewSelector} from "entities/Article";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlesPageActions, articlesPageReducer} from "../../model/slices/articlesPageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {
    getArticlesPageOrder,
    getArticlesPageSort,
    getArticlesPageView
} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import {Card} from "shared/ui/Card/Card";
import {Input} from "shared/ui/Input/Input";
import {SortOrder} from "shared/types";

interface ArticlesPageFilterProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPageFilter = (props: ArticlesPageFilterProps) => {

    const {className} = props
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const view = useSelector(getArticlesPageView)

    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
    },[])

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder))
    },[])

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort))
    },[])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(
                cls.ArticlesPageFilers,
                {},
                [className]
            )}>
                <div className={cls.sortWrapper}>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input placeholder={t('Поиск')} />
                </Card>

            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPageFilter)