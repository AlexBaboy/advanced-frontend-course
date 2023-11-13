import {EntityState} from "@reduxjs/toolkit";
import {Article, ArticleView} from "entities/Article";

export type ArticlesPageSchema = EntityState<Article> & {
    isLoading?: boolean,
    error?: string,
    view: ArticleView
}