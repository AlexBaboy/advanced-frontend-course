import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum
} from "../../selectors/articlesPageSelectors";
import {articlesPageActions} from "../../slices/articlesPageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlesPage = createAsyncThunk<void, void,
    ThunkConfig<string>>
(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkAPI) => {

        const {dispatch, getState} = thunkAPI
        const hasMore = getArticlesPageHasMore(getState())
        const page = getArticlesPageNum(getState())
        const isLoading = getArticlesPageIsLoading(getState())

        if (hasMore && !isLoading) {
            console.log('41 page', page)
            const nextPage = page + 1
            await dispatch(articlesPageActions.setPage(nextPage))
            await dispatch(fetchArticlesList({
                page: nextPage
            }))
        }

        /*try {

            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page
                }
            })

            if (!response?.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            console.error(e)
            return rejectWithValue(
                i18n.t('Некорректный логин или пароль')
            )
        }*/
    }
)