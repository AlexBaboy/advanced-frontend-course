import cls from 'pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.module.scss';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {ArticleList} from "entities/Article";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getArticles} from "pages/ArticlesPage/model/slices/articlesPageSlice";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import {useSearchParams} from "react-router-dom";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {initArticlesPage} from "pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";
import { Text } from 'shared/ui/Text/Text';

interface ArticleInfiniteListProps {
    className?: string,
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('article-details');

    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);

    const view = useSelector(getArticlesPageView);
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const repeatedArticles = Array(5).fill(articles).flat();

    if (error) {
        return <Text title={t('Ошибка при загрузке статей')} />
    }

    return (
        <ArticleList
            articles={repeatedArticles}
            view={view}
            isLoading={isLoading}
            className={cls.list}
        />
    )
})
