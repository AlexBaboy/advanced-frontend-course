import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {StateSchema} from "app/providers/StoreProvider";
import {Article, ArticleView} from "entities/Article";
import {ArticlesPageSchema} from "pages/ArticlesPage";
import {fetchArticlesList} from "../../model/services/fetchArticlesList/fetchArticlesList";

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
        }
    },
    extraReducers: builder => {
        builder
            // fetch
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = ''
                state.isLoading = true
            })
            .addCase(
                fetchArticlesList.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false
                    articlesAdapter.setAll(state, action.payload)
                    console.log('extra reducer state', state)
                })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string | undefined
            })
    }
})

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions
} = articlesPageSlice