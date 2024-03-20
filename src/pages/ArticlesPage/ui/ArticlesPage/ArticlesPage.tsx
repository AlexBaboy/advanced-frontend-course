import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {ArticleList, ArticleView, ArticleViewSelector} from "entities/Article";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlesPageActions, articlesPageReducer, getArticles} from "../../model/slices/articlesPageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useSelector} from "react-redux";
import {getArticlesPageIsLoading, getArticlesPageView} from "../../model/selectors/articlesPageSelectors";
import {Page} from "widgets/Page/Page";
import {fetchNextArticlesPage} from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import {initArticlesPage} from "../../model/services/initArticlesPage/initArticlesPage";
import ArticlesPageFilter from "pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilter";
import {useSearchParams} from 'react-router-dom'

interface ArticlesPage {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = (props: ArticlesPage) => {

    const {className} = props
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const [searchParams] = useSearchParams()

    const onLoadNextPart = useCallback(async () => {
        dispatch(fetchNextArticlesPage())
    }, [])

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    })

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
    },[])

    return (
        <DynamicModuleLoader reducers={reducers}>
                {/*<ArticlesPageFilter />*/}
                <ArticleList
                    articles={articles}
                    view={view}
                    isLoading={isLoading}
                    className={cls.list}
                    onLoadNextPart={onLoadNextPart}
                />
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage)