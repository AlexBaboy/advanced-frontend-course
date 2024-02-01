import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesSortSelector.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback, useMemo} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Select, SelectOption} from "shared/ui/Select/Select";
import {ArticleSortField} from "entities/Article/model/types/article";
import {SortOrder} from "shared/types";

interface ArticlesSortSelectorProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticlesSortSelectorProps) => {

    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort,
    } = props

    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
            {
                value: ArticleSortField.CREATED,
                content: t('дате создания')
            },
            {
                value: ArticleSortField.TITLE,
                content: t('названию')
            },
            {
                value: ArticleSortField.VIEWS,
                content: t('количеству просмотров')
            },
        ]
        ,[t])

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию')
        },
        {
            value: 'desc',
            content: t('убыванию')
        }
    ]
    ,[t])

    const changeSortHandler = useCallback((newSort: string) => {
        onChangeSort(newSort as ArticleSortField);
    }, []);

    const changeOrderHandler = useCallback((newOrder: string) => {
        onChangeOrder(newOrder as SortOrder);
    }, []);

    return (
        <div className={classNames(
            cls.ArticleSortSelector,
            {},
            [className]
        )}>
            <Select
                options={sortFieldOptions}
                label={t('Сортировать по')}
                value={sort}
                onChange={changeSortHandler}
            />
            <Select
                options={orderOptions}
                label={t('по')}
                value={order}
                onChange={changeOrderHandler}
                className={cls.order}
            />
        </div>
    );
});