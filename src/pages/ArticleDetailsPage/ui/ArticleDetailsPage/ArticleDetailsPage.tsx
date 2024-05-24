import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentFormActions } from 'features/addCommentForm/model/slice/addCommentFormSlice';
import { Page } from 'widgets/Page/Page';
import ArticleDetailsPageHeader from 'pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleRecommendations } from '../../model/slices/ArticleDetailsPageRecommendationsSlice';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations/recommendations';
import {
    fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import {VStack} from "shared/ui/Stack";
import {ArticleRecommendationsList} from "features/articleRecommendationsList";

interface ArticleDetailsPage {
    className?: string
}

const reducers: ReducersList = {
    articlesDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPage) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
        id && dispatch(fetchCommentsByArticleId(id));

    });

    const onSendComment = useCallback(async (text) => {
        dispatch(addCommentForArticle(text));
        await dispatch(addCommentFormActions.setText(''));
        await dispatch(fetchCommentsByArticleId(id));
    }, []);

    if (!id) {
        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <Page className={classNames(
                    cls.ArticleDetailsPage,
                    {},
                    [className],
                )}
                >
                    {t('Статья не найдена')}
                </Page>
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(
                cls.ArticleDetailsPage,
                {},
                [className],
            )}
            >
                <VStack gap={'16'} max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />

                    <ArticleRecommendationsList />

                    <Text
                        title={t('Комментарии')}
                        className={cls.commentTitle}
                        size={TextSize.L}
                    />

                    <AddCommentForm onSendComment={onSendComment} />
                    <CommentList isLoading={commentsIsLoading} comments={comments} />
                </VStack>

            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
