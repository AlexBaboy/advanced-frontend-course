import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {ArticleDetails, ArticleList} from "entities/Article";
import {useNavigate, useParams} from "react-router-dom";
import {Text, TextSize} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {getArticleComments} from "../../model/slices/ArticleDetailsCommentSlice";
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
import {getArticleRecommendations} from "../../model/slices/ArticleDetailsPageRecommendationsSlice";
import {getArticleRecommendationsIsLoading} from "../../model/selectors/recommendations/recommendations";
import {
    fetchArticleRecommendations
} from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import {articleDetailsPageReducer} from "../../model/slices";

interface ArticleDetailsPage {
    className?: string
}

const reducers: ReducersList = {
    articlesDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPage) => {

    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const navigate = useNavigate()

    useInitialEffect(() => {
        id && dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations())
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

                <Text
                    title={t('Рекомендуем')}
                    className={cls.commentTitle}
                    size={TextSize.L}/>
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                    target={'_blank'}
                />

                <Text
                    title={t('Комментарии')}
                    className={cls.commentTitle}
                    size={TextSize.L}/>

                <AddCommentForm onSendComment={onSendComment} />
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage)