import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';
import { getJsonSettings, getUserAuthData } from '@/entities/User';
import { setJsonSettingsMutation } from '@/entities/User/api/userApi';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('no userData!');
    }

    try {
        const response = await dispatch(
            setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
        ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('no jsonSettings');
        }

        return response.jsonSettings;
    } catch (e) {
        console.error(e);
        return rejectWithValue('no saved json settings');
    }
});
