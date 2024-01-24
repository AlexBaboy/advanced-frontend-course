import {EntityState} from "@reduxjs/toolkit";
import {Article, ArticleView} from "entities/Article";

export type ArticlesPageSchema = EntityState<Article> & {
    isLoading?: boolean,
    error?: string,

    // pagination
    page: number,
    limit?: number,
    hasMore: boolean,

    // filters
    view?: ArticleView,
    order: 'asc' | 'desc',
    _inited?: boolean
}