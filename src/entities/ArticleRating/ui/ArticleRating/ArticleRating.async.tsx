import { lazy, Suspense } from 'react';
import { ArticleRatingProps } from '@/entities/ArticleRating/ui/ArticleRating/ArticleRating';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense fallback={<Skeleton width="100%" height={120} />}>
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};
