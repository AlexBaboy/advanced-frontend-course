import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentItem } from '@/entities/Comment';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    ArticleDetailsRecommendationsSchema,
} from '../../model/types/ArticleDetailsRecommendationsSchema';
import { Article } from '@/entities/Article';
import {
    fetchArticleRecommendations,
} from '@/pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articlesDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const ENDPOINT = fetchArticleRecommendations;

const ArticleDetailsPageRecommendationsSlice = createSlice({
    name: 'ArticleDetailsPageRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(ENDPOINT.pending, (state, action) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(
                ENDPOINT.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    recommendationsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(ENDPOINT.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string | undefined;
            });
    },
});

export const {
    reducer: articleDetailsPageRecommendationsReducer,
} = ArticleDetailsPageRecommendationsSlice;
