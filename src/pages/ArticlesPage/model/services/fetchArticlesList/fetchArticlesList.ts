import {createAsyncThunk} from "@reduxjs/toolkit";
import i18n from "i18next";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Article} from "entities/Article";
import {getArticlesPageLimit} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";

type FetchArticlesListProps = {
    page?: number
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps,
    ThunkConfig<string>>
(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {

        const {extra, rejectWithValue, getState} = thunkAPI
        const {page = 1} = props
        const limit = getArticlesPageLimit(getState()) || 9

        try {

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
        }
    }
)