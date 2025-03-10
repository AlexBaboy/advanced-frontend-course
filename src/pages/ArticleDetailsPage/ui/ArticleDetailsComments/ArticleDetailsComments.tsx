import { memo, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    Text as TextDeprecated,
    TextSize,
} from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import cls from '@/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.module.scss';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { getArticleComments } from '@/pages/ArticleDetailsPage/model/slices/ArticleDetailsCommentSlice';
import { getArticleCommentsIsLoading } from '@/pages/ArticleDetailsPage/model/selectors/comments/comments';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '@/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { addCommentFormActions } from '@/features/addCommentForm/model/slice/addCommentFormSlice';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { className, id } = props;

        const { t } = useTranslation('article-details');

        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
        const dispatch = useAppDispatch();

        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(id));
        });

        const onSendComment = useCallback(
            async (text: string) => {
                dispatch(addCommentForArticle(text));
                dispatch(addCommentFormActions.setText(''));
                await dispatch(fetchCommentsByArticleId(id));
            },
            [id],
        );

        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.ArticleDetailsComments, {}, [
                    className,
                ])}
            >
                <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={
                        <Text
                            title={t('Комментарии')}
                            className={cls.commentTitle}
                            size={'l'}
                        />
                    }
                    off={
                        <TextDeprecated
                            title={t('Комментарии')}
                            className={cls.commentTitle}
                            size={TextSize.L}
                        />
                    }
                />

                <Suspense fallback={<Loader />}>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        );
    },
);
