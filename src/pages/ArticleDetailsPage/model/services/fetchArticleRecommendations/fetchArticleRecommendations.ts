import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

export const LIMIT_RECOMMENDATIONS_COUNT = 4;

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesDetailsPage/fetchArticleRecommendations',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: LIMIT_RECOMMENDATIONS_COUNT,
                },
            });

            if (!response?.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.error(e);
            return rejectWithValue(i18n.t('Некорректный логин или пароль'));
        }
    },
);
