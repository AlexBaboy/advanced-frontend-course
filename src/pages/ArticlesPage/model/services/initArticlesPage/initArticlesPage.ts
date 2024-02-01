import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getArticlesPageInited} from "../../selectors/articlesPageSelectors";
import {articlesPageActions} from "../../slices/articlesPageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";
import {SortOrder} from "shared/types";
import {ArticleSortField} from "entities/Article";

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

            orderFromUrl && dispatch(articlesPageActions.setOrder(orderFromUrl))
            sortFromUrl && dispatch(articlesPageActions.setSort(sortFromUrl))
            searchFromUrl && dispatch(articlesPageActions.setSearch(searchFromUrl))

            dispatch(articlesPageActions.initState())
            dispatch(fetchArticlesList({}))
        }
    }
)