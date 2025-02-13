import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPageFilers.module.scss';
import {ArticleSortSelector, ArticleTypeTabs, ArticleViewSelector,} from '@/entities/Article';
import {DynamicModuleLoader, ReducersList,} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {articlesPageReducer,} from '../../model/slices/articlesPageSlice';
import {Card} from '@/shared/ui/deprecated/Card/Card';
import {Input} from '@/shared/ui/deprecated/Input/Input';
import {useArticlesFilters} from "@/pages/ArticlesPage/hooks/useArticlesFilters";

interface ArticlesPageFilterProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPageFilter = (props: ArticlesPageFilterProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const {onChangeSort, onChangeType, sort, type, onChangeOrder, order, onChangeSearch, search, view, onChangeView} =  useArticlesFilters()

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div
                className={classNames(cls.ArticlesPageFilers, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input
                        placeholder={t('Поиск')}
                        value={search}
                        onChange={onChangeSearch}
                    />
                </Card>
                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPageFilter);
