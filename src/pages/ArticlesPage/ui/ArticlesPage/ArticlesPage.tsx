import { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleInfiniteList } from '@/pages/ArticlesPage/ui/ArticleInfiniteList/ArticleInfiniteList';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import cls from './ArticlesPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ArticlesPage {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPage) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const onLoadNextPart = useCallback(async () => {
        dispatch(fetchNextArticlesPage());
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                data-testid="ArticlesPage"
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticleInfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
