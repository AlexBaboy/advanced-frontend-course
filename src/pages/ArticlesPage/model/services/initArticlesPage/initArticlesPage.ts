import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getArticlesPageInited} from "../../selectors/articlesPageSelectors";
import {articlesPageActions} from "../../slices/articlesPageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";
import {SortOrder} from "shared/types";
import {ArticleSortField, ArticleType} from "entities/Article";

export const initArticlesPage = createAsyncThunk<void, URLSearchParams,
    ThunkConfig<string>>
(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkAPI) => {
        const {dispatch, getState} = thunkAPI
        const inited = getArticlesPageInited(getState())
        if (!inited) {

            const orderFromUrl = searchParams.get('order') as SortOrder
            const sortFromUrl = searchParams.get('sort') as ArticleSortField
            const searchFromUrl = searchParams.get('search')
            const typeFromUrl = searchParams.get('type') as ArticleType

            orderFromUrl && dispatch(articlesPageActions.setOrder(orderFromUrl))
            sortFromUrl && dispatch(articlesPageActions.setSort(sortFromUrl))
            searchFromUrl && dispatch(articlesPageActions.setSearch(searchFromUrl))
            typeFromUrl && dispatch(articlesPageActions.setType(typeFromUrl))

            dispatch(articlesPageActions.initState())
            dispatch(fetchArticlesList({}))
        }
    }
)