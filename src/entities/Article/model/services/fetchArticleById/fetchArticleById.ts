import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/Article';

export const fetchArticleById = createAsyncThunk<Article, string | undefined,
    ThunkConfig<string>>(
        'articleDetails/fetchArticleById',
        async (articleId, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI

            try {

                if (!articleId) {
                    throw new Error('Не передан id статьи!')
                }

                const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                    params: {
                        _expand: 'user',
                    },
                })

                if (!response?.data) {
                    throw new Error()
                }

                return response.data
            } catch (e) {
                console.error(e)
                return rejectWithValue(
                    i18n.t('Некорректный логин или пароль'),
                )
            }
        },
    )
