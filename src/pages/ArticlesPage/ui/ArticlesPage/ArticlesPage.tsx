import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import { getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import cls from './ArticlesPage.module.scss';

interface ArticlesPage {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPage) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(async () => {
        dispatch(fetchNextArticlesPage());
    }, []);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, []);

    const repeatedArticles = Array(5).fill(articles).flat();

    return (
        <DynamicModuleLoader reducers={reducers}>
            {/* <ArticlesPageFilter /> */}
            <ArticleList
                articles={repeatedArticles}
                view={view}
                isLoading={isLoading}
                className={cls.list}
                onLoadNextPart={onLoadNextPart}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
