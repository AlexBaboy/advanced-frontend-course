import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {articlesPageReducer} from '../../model/slices/articlesPageSlice';
import {fetchNextArticlesPage} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import cls from './ArticlesPage.module.scss';
import {Page} from "widgets/Page/Page";
import {classNames} from "shared/lib/classNames/classNames";
import {ArticleInfiniteList} from "pages/ArticlesPage/ui/ArticleInfiniteList/ArticleInfiniteList";

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
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticleInfiniteList />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
