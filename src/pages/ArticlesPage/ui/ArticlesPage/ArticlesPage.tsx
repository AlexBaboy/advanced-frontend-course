import { memo, useCallback } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleInfiniteList } from '@/pages/ArticlesPage/ui/ArticleInfiniteList/ArticleInfiniteList';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import cls from './ArticlesPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { ArticlesPageGreetings } from '@/features/ArticesPageGreetings';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '@/pages/ArticlesPage/ui/ViewSelectorContainer/ViewSelectorContainer';
import {FiltersContainer} from "@/pages/ArticlesPage/ui/FiltersContainer/FiltersContainer";

interface ArticlesPage {
    className?: string;
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

    const content = (
        <ToggleFeatures
            on={
                <StickyContentLayout
                    content={
                        <Page
                            data-testid="ArticlesPage"
                            onScrollEnd={onLoadNextPart}
                            className={classNames('', {}, [className])}
                        >
                            <ArticleInfiniteList className={cls.list} />
                            <ArticlesPageGreetings />
                        </Page>
                    }
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer />}
                />
            }
            off={
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ArticlesPage, {}, [className])}
                >
                    <ArticleInfiniteList className={cls.list} />
                    <ArticlesPageGreetings />
                </Page>
            }
            feature={'isAppRedesigned'}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers}>{content}</DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
