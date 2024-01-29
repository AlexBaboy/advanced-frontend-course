import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesSortSelector.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useMemo} from "react";
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

    const sortFieldOptions = useMemo<SelectOption[]>(() => [
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
        ,[])

    const orderOptions = useMemo<SelectOption[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию')
        },
        {
            value: 'desc',
            content: t('убыванию')
        }
    ]
    ,[])

    return (
        <div className={classNames(
            cls.ArticleSortSelector,
            {},
            [className]
        )}>
            <div className={cls.sortWrapper}>
                <Select
                    options={sortFieldOptions}
                    label={t('Сортировать по')}
                    value={sort}
                    onChange={onChangeSort}
                />
                <Select
                    options={orderOptions}
                    label={t('по')}
                    value={order}
                    onChange={onChangeOrder}
                />
            </div>
        </div>
    );
});