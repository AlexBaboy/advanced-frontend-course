import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) =>
    state.articlesDetailsPage?.comments?.isLoading;
export const getArticleCommentsIsError = (state: StateSchema) =>
    state.articlesDetailsPage?.comments?.error;
