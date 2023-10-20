import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUserAuthData} from "entities/User";
import {ThunkConfig} from "app/providers/StoreProvider";
import {CommentItem} from "entities/Comment";
import {getAddCommentFormText} from "../../selectors/addCommentFormSelectors";
import {getArticleDetailsData} from "entities/Article/model/selectors/articleDetails";

export const sendComment = createAsyncThunk<CommentItem, void,
    ThunkConfig<string>>
(
    'addCommentForm/sendComment',
    async (authData, thunkAPI) => {

        const {extra, dispatch, rejectWithValue, getState} = thunkAPI
        const userData = getUserAuthData(getState())
        const text = getAddCommentFormText(getState())
        const article = getArticleDetailsData(getState())

        if (!userData || !text || !article) {
            return rejectWithValue('no data')
        }

        try {

            const response = await extra.api.post<CommentItem>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text
            })

            if (!response.data) {
                throw new Error('no data!')
            }

            return response.data
        } catch (e) {
            return rejectWithValue('error')
        }
    }
)
