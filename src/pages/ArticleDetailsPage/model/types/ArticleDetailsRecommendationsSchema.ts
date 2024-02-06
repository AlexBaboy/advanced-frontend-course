import {Article} from "entities/Article";
import {EntityState} from "@reduxjs/toolkit";

export type ArticleDetailsRecommendationsSchema = EntityState<Article> & {
    isLoading?: boolean,
    error?: string,
}