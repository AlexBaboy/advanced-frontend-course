import {memo} from 'react';
import {ArticleViewSelector} from '@/entities/Article';
import {useArticlesFilters} from "@/pages/ArticlesPage/hooks/useArticlesFilters";

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;

        const {view, onChangeView} =  useArticlesFilters()

        return (
            <ArticleViewSelector
                view={view}
                onViewClick={onChangeView}
                className={className}
            />
        );
    },
);
