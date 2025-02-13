import {memo} from 'react';
import {ArticlesFilters} from "@/widgets/ArticlesFilters/ui/ArticlesFilters";
import {useArticlesFilters} from "@/pages/ArticlesPage/hooks/useArticlesFilters";

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className} = props;

    const {onChangeSort, onChangeType, sort, type, onChangeOrder, order, onChangeSearch, search, view, onChangeView} =  useArticlesFilters()

    return (
        <ArticlesFilters
            className={className}
            onChangeType={onChangeType}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            order={order}
            sort={sort}
            search={search}
            type={type}
        />
    );
});
