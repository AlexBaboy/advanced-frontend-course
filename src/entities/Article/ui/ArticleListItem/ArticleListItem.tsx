import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article, ArticleView } from '../..';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemDeprecated } from '@/entities/Article/ui/ArticleListItem/ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from '@/entities/Article/ui/ArticleListItem/ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    index?: number;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={<ArticleListItemRedesigned {...props} />}
            off={<ArticleListItemDeprecated {...props} />}
        />
    );
});
