import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (state: StateSchema) => {
    return state.articlesDetailsPage?.recommendations?.isLoading;
};
export const getArticleRecommendationsIsError = (state: StateSchema) => {
    return state.articlesDetailsPage?.recommendations?.error;
};
