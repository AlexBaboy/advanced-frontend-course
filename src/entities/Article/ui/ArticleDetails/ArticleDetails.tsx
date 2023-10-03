import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetails.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useEffect} from "react";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slice/articleDetailsSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticleById} from "../../model/services/fetchArticleById/fetchArticleById";
import {useSelector} from "react-redux";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "../../model/selectors/articleDetails";
import {Text, TextAlign} from "shared/ui/Text/Text";

interface ArticleDetailsProps {
    className?: string
    id: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {

    const {className, id} = props

    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const article = useSelector(getArticleDetailsData)
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const error = useSelector(getArticleDetailsError)

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [id])

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (error) {
        content = (
            <Text
                title={t('Произошла ошибка при загрузке статьи')}
                align={TextAlign.CENTER}
            />
        )
    } else {
        content = <div>ArticleDetails</div>
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(
                cls.ArticleDetails,
                {},
                [className]
            )}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
