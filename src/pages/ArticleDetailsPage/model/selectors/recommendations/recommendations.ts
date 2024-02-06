import {StateSchema} from "app/providers/StoreProvider";

export const getArticleRecommendationsIsLoading = (state: StateSchema) => state.articleDetailsRecommendations?.isLoading
export const getArticleRecommendationsIsError = (state: StateSchema) => state.articleDetailsRecommendations?.error