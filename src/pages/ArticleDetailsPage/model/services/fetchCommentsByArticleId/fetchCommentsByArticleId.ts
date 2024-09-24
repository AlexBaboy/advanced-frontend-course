import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentItem } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<CommentItem[], string | undefined,
    ThunkConfig<string>>(
        'articleDetails/fetchCommentsByArticleId',
        async (articleId, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            if (!articleId) {
                return rejectWithValue('error');
            }

            try {
                const response = await extra.api.get<CommentItem[]>('/comments', {
                    params: {
                        articleId,
                        _expand: 'user',
                    },
                });

                if (!response?.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.error(e);
                return rejectWithValue(
                    i18n.t('Некорректный логин или пароль'),
                );
            }
        },
    );
