import {StateSchema} from "app/providers/StoreProvider";

export const getArticleCommentsData = (state: StateSchema) => state.articleDetailsComments?.entities
export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailsComments?.isLoading
export const getArticleCommentsIsError = (state: StateSchema) => state.articleDetailsComments?.error