import { Text, TextSize } from 'shared/ui/Text/Text';
import cls from 'pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.module.scss';
import { AddCommentForm } from 'features/addCommentForm';
import { CommentList } from 'entities/Comment';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getArticleComments } from 'pages/ArticleDetailsPage/model/slices/ArticleDetailsCommentSlice';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/comments/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { addCommentFormActions } from 'features/addCommentForm/model/slice/addCommentFormSlice';
import { VStack } from 'shared/ui/Stack';

interface ArticleDetailsCommentsProps {
    className?: string,
    id: string
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const {
        className,
        id,
    } = props;

    const { t } = useTranslation('article-details');

    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback(async (text) => {
        dispatch(addCommentForArticle(text));
        dispatch(addCommentFormActions.setText(''));
        await dispatch(fetchCommentsByArticleId(id));
    }, [id]);

    return (
        <VStack gap="16" max className={classNames(cls.ArticleDetailsComments, {}, [className])}>
            <Text
                title={t('Комментарии')}
                className={cls.commentTitle}
                size={TextSize.L}
            />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
    )
})
