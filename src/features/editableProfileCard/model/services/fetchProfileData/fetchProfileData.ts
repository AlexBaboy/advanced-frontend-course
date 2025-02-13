import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<Profile>(`/profile/${profileId}`);

        if (!response?.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.error(e);
        return rejectWithValue(i18n.t('Некорректный логин или пароль'));
    }
});
