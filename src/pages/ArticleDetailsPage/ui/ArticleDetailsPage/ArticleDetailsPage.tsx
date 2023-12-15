import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {ArticleDetails} from "entities/Article";
import {useNavigate, useParams} from "react-router-dom";
import {Text} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsCommentReducer, getArticleComments} from "../../model/slices/ArticleDetailsCommentSlice";
import {useSelector} from "react-redux";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments/comments";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchCommentsByArticleId} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {AddCommentForm} from "features/addCommentForm";
import {addCommentFormActions} from "features/addCommentForm/model/slice/addCommentFormSlice";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {Page} from "widgets/Page/Page";

interface ArticleDetailsPage {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPage) => {

    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const navigate = useNavigate()

    useInitialEffect(() => {
        id && dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback(async (text) => {
        dispatch(addCommentForArticle(text))
        await dispatch(addCommentFormActions.setText(''))
        await dispatch(fetchCommentsByArticleId(id))
    }, [])

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    },[])

    if (!id) {
        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <Page className={classNames(
                    cls.ArticleDetailsPage,
                    {},
                    [className]
                )}>
                    {t('Статья не найдена')}
                </Page>
            </DynamicModuleLoader>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(
                cls.ArticleDetailsPage,
                {},
                [className]
            )}>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onBackToList}
                >
                    {t('Назад к списку')}
                </Button>
                <ArticleDetails id={id} />
                <Text title={t('Комментарии')} className={cls.commentTitle} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage)