import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsPageRecommendationsReducer } from './ArticleDetailsPageRecommendationsSlice';
import { articleDetailsCommentReducer } from './ArticleDetailsCommentSlice';

export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        recommendations: articleDetailsPageRecommendationsReducer,
        comments: articleDetailsCommentReducer,
    });
