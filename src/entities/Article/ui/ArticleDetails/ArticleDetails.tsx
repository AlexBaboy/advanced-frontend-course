import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetails.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useEffect} from "react";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slice/articleDetailsSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticleById} from "../../model/services/fetchArticleById/fetchArticleById";

interface ArticleDetailsProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {

    const {className} = props

    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('26 !!!')
        dispatch(fetchArticleById('1'))
    }, [])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(
                cls.ArticleDetails,
                {},
                [className]
            )}>
                ArticleDetails
            </div>
        </DynamicModuleLoader>
    );
});
