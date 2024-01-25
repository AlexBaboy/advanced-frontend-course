import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPageFilers.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {ArticleView, ArticleViewSelector} from "entities/Article";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlesPageActions, articlesPageReducer} from "../../model/slices/articlesPageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getArticlesPageView} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import {Select} from "shared/ui/Select/Select";
import {Card} from "shared/ui/Card/Card";
import {Input} from "shared/ui/Input/Input";

interface ArticlesPageFilterProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPageFilter = (props: ArticlesPageFilterProps) => {

    const {className} = props
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const view = useSelector(getArticlesPageView)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
    },[])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(
                cls.ArticlesPageFilers,
                {},
                [className]
            )}>
                <div className={cls.sortWrapper}>
                    <Select label={t('Сортировать по')} />
                    <ArticleViewSelector
                        view={view}
                        // @ts-ignore
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input placeholder={t('Поиск')} />
                </Card>

            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPageFilter)