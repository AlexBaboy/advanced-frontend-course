import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector/ArticleSortSelector';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs/ArticleTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

interface ArticlesFiltersProps {
    className?: string;
    onClick?: () => void;
    search: string;
    onChangeSearch: (value: string) => void;

    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;

    type: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        onClick,
        onChangeSort,
        sort,
        onChangeSearch,
        search,
        onChangeType,
        type,
        onChangeOrder,
        order,
    } = props;

    const { t } = useTranslation();

    return (
        <Card
            onClick={onClick}
            className={classNames(cls.Overlay, {}, [className])}
            padding={'24'}
        >
            <VStack gap={'32'}>
                <Input
                    placeholder={t('Поиск')}
                    value={search}
                    onChange={onChangeSearch}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />

                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />

                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
            </VStack>
        </Card>
    );
});
