import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

export type ArticleDetailsRecommendationsSchema = EntityState<Article> & {
    isLoading?: boolean;
    error?: string;
};
