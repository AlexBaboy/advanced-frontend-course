import {EntityState} from "@reduxjs/toolkit";
import {Article, ArticleView} from "entities/Article";
import {SortOrder} from "shared/types";

export type ArticlesPageSchema = EntityState<Article> & {
    isLoading?: boolean,
    error?: string,

    // pagination
    page: number,
    limit?: number,
    hasMore: boolean,

    // filters
    view?: ArticleView,
    order?: SortOrder,
    _inited?: boolean
}