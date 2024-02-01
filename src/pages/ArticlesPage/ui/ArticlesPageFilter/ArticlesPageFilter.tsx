import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPageFilers.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback, useEffect} from "react";
import {ArticleSortField, ArticleSortSelector, ArticleView, ArticleViewSelector} from "entities/Article";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlesPageActions, articlesPageReducer} from "../../model/slices/articlesPageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {
    getArticlesPageOrder, getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageView
} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import {Card} from "shared/ui/Card/Card";
import {Input} from "shared/ui/Input/Input";
import {SortOrder} from "shared/types";
import {fetchArticlesList} from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import {useDebounce} from "shared/lib/hooks/useDebounce/useDebounce";

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
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    //const type = useSelector(getArticlesPageType);

    console.log('40 sort')
    useEffect(() => {
        console.log(`42 sort`, sort)
        console.log(`42 order`, order)
        console.log(`42 search`, search)
    }, [sort, order, search])

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({replace: true}))
    }, [])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    },[])

    const onChangeOrder = useCallback((newOrder: SortOrder) => {

        console.log('54 newOrder', newOrder)

        dispatch(articlesPageActions.setOrder(newOrder))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    },[])

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        console.log('54 newSort', newSort)
        dispatch(articlesPageActions.setSort(newSort))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    },[])

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search))
        dispatch(articlesPageActions.setPage(1))
        debouncedFetchData()
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
                    <Input
                        placeholder={t('Поиск')}
                        value={search}
                        onChange={onChangeSearch}
                    />
                </Card>

            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPageFilter)