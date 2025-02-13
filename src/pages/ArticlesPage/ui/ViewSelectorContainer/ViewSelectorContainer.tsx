import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticlesPageView } from '@/pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { ArticleView, ArticleViewSelector } from '@/entities/Article';
import { articlesPageActions } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';
import { fetchArticlesList } from '@/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;

        const dispatch = useAppDispatch();
        const view = useSelector(getArticlesPageView);

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, []);

        const onChangeView = useCallback((view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        }, []);

        return (
            <ArticleViewSelector
                view={view}
                onViewClick={onChangeView}
                className={className}
            />
        );
    },
);
