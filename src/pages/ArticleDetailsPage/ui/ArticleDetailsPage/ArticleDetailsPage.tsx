import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {ArticleDetails} from "entities/Article";
import {useParams} from "react-router-dom";
import {Text} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsCommentReducer, getArticleComments} from "../../model/slices/ArticleDetailsCommentSlice";
import {useSelector} from "react-redux";
import {
    getArticleCommentsIsError,
    getArticleCommentsIsLoading
} from "../../model/selectors/comments/comments";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentsByArticleId
} from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

interface ArticleDetailsPage {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPage) => {

    const {className} = props
    const {t} = useTranslation('comment')
    const {id} = useParams<{id: string}>()
    const dispatch = useAppDispatch()

    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const commentsError = useSelector(getArticleCommentsIsError)

    console.log('35 comments', comments)
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) {
        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <div className={classNames(
                    cls.ArticleDetailsPage,
                    {},
                    [className]
                )}>
                    {t('Статья не найдена')}
                </div>
            </DynamicModuleLoader>
        )
    }

    return (
        <div className={classNames(
            cls.ArticleDetailsPage,
            {},
            [className]
        )}>
            <ArticleDetails id={id} />
            <Text title={t('Комментарии')} className={cls.commentTitle} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </div>
    );
};

export default memo(ArticleDetailsPage)