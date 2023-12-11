import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {ArticleList, ArticleView, ArticleViewSelector} from "entities/Article";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlesPageActions, articlesPageReducer, getArticles} from "../../model/slices/articlesPageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {fetchArticlesList} from "../../model/services/fetchArticlesList/fetchArticlesList";
import {useSelector} from "react-redux";
import {
    getArticlesPageError,
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
    getArticlesPageView
} from "../../model/selectors/articlesPageSelectors";
import {Page} from "shared/ui/Page/Page";
import {fetchNextArticlesPage} from "pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage";

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

    const onLoadNexPart = useCallback(async () => {
        dispatch(fetchNextArticlesPage())
    }, [])

    useInitialEffect(() => {
        dispatch(articlesPageActions.initState())
        dispatch(fetchArticlesList({
            page: 1
        }))
    })

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
    },[])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                onScrollEnd={onLoadNexPart}
                className={classNames(
                cls.ArticlesPage,
                {},
                [className]
            )}>
                <ArticleViewSelector
                    view={view}
                    // @ts-ignore
                    onViewClick={onChangeView}
                />
                <ArticleList
                    articles={articles}
                    view={view}
                    isLoading={isLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage)