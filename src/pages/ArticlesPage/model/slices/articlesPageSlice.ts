import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {StateSchema} from "app/providers/StoreProvider";
import {Article, ArticleView} from "entities/Article";
import {ArticlesPageSchema} from "../types/ArticlesPageSchema";
import {fetchArticlesList} from "../../model/services/fetchArticlesList/fetchArticlesList";
import {ARTICLES_VIEW_LOCALSTORAGE_KEY} from "shared/const/localStorage";
import {ArticleSortField} from "entities/Article/model/types/article";
import {SortOrder} from "shared/types";

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState()
)

export const enum limits {
    VIEW_BIG_LIMIT = 4,
    VIEW_SMALL_LIMIT = 9
}

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: limits.VIEW_SMALL_LIMIT,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: ''
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        initState: state => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
            state.view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
            state.limit = view === ArticleView.BIG ? limits.VIEW_BIG_LIMIT : limits.VIEW_SMALL_LIMIT
            state._inited = true
        },
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
                    articlesAdapter.addMany(state, action.payload)
                    state.hasMore = action.payload.length > 0
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