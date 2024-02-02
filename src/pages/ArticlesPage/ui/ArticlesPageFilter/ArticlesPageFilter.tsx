import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPageFilers.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback, useEffect, useMemo} from "react";
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
import {TabItem, Tabs} from "shared/ui/Tabs/Tabs";
import {ArticleType} from "entities/Article/model/types/article";

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

    useEffect(() => {
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
        dispatch(articlesPageActions.setOrder(newOrder))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    },[])

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    },[])

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search))
        dispatch(articlesPageActions.setPage(1))
        debouncedFetchData()
    },[])

    const onChangeType = useCallback((tab: TabItem) => {
        dispatch(articlesPageActions.setType(tab.value as ArticleType))
        dispatch(articlesPageActions.setPage(1))
        debouncedFetchData()
    },[])

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('Все')
        },
        {
            value: ArticleType.IT,
            content: t('Айти')
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука')
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика')
        }
    ], [t])

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
                <Tabs
                    tabs={typeTabs}
                    value={}
                    onTabClick={onChangeType}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPageFilter)